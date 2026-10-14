const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
class Element {
  constructor(tag='div'){this.tag=tag;this.children=[];this.attributes={};this.textContent='';}
  append(...nodes){this.children.push(...nodes);}
  replaceChildren(){this.children=[];}
  setAttribute(k,v){this.attributes[k]=v;}
  get childElementCount(){return this.children.length;}
}
async function render(kind,data,{failure=false,language='en'}={}){
  const root=new Element();root.dataset={kind};const events={};
  const window={PA_LANGUAGE:language};
  vm.runInNewContext(fs.readFileSync('catalog.js','utf8'),{
    URL,window,document:{getElementById:()=>root,createElement:tag=>new Element(tag),addEventListener:(name,fn)=>events[name]=fn},
    fetch:async()=>{if(failure)throw Error('offline');return {ok:true,json:async()=>data};}
  });
  await new Promise(resolve=>setImmediate(resolve));return {root,window,events};
}
function all(node){return [node,...node.children.flatMap(all)];}
test('minimal tools retain title and Open Tool without empty optional containers',async()=>{
  const {root}=await render('tools',[{published:true,title:'Minimal tool',url:'https://example.com/tool'},{published:true,title:'Empty optional fields',url:'https://example.com/other',description:' ',category:'',labels:['',null,' ']}]);
  const nodes=all(root);assert.equal(nodes.filter(n=>n.tag==='h2').length,2);assert.equal(nodes.filter(n=>n.tag==='a').length,2);
  assert.equal(nodes.filter(n=>n.tag==='ul'||n.tag==='p').length,0);assert.ok(nodes.filter(n=>n.tag==='a').every(n=>n.textContent==='Open Tool ↗'));
});
test('tool metadata and badges render literally and ignore invalid label values',async()=>{
  const {root}=await render('tools',[{published:true,title:'Tool',url:'https://example.com',category:'PTA <b>category</b>',description:'Description <img src=x>',labels:['Free','<script>literal</script>',null,42,' ']}]);
  const nodes=all(root);assert.equal(nodes.find(n=>n.className==='tool-category').textContent,'PTA <b>category</b>');
  assert.deepEqual(nodes.filter(n=>n.tag==='li').map(n=>n.textContent),['Free','<script>literal</script>']);
  assert.equal(nodes.filter(n=>n.tag==='a').length,1);
});
test('tool optional metadata is isolated from courses and supports supplied Arabic text',async()=>{
  const item={published:true,title:'Tool',url:'https://example.com',category:'PTA',category_ar:'تحليل الضغط',labels:['Educational'],labels_ar:['تعليمي']};
  const {root}=await render('tools',[item],{language:'ar'});assert.equal(all(root).find(n=>n.className==='tool-category').textContent,'تحليل الضغط');assert.equal(all(root).find(n=>n.tag==='li').textContent,'تعليمي');
  const course=await render('courses',[item]);assert.equal(all(course.root).filter(n=>n.className==='tool-category'||n.tag==='ul').length,0);
});
test('tools require publishing and safe URL; titles are literal text',async()=>{
  const {root}=await render('tools',[
    {published:false,title:'Hidden',url:'https://example.com'},
    {published:true,title:'Unsafe',url:'javascript:alert(1)'},
    {published:true,title:'Credentials',url:'https://name:secret@example.com'},
    {published:true,title:'<img onerror=alert(1)>',url:'http://example.com/tool'}
  ]);
  const nodes=all(root),links=nodes.filter(n=>n.tag==='a');assert.equal(links.length,1);
  assert.equal(links[0].target,'_blank');assert.equal(links[0].rel,'noopener noreferrer');
  assert.equal(nodes.find(n=>n.tag==='h2').textContent,'<img onerror=alert(1)>');
});
test('courses omit empty optional fields and unsafe action',async()=>{
  const {root}=await render('courses',[{published:true,title:'Lecture',date:'Whenever announced',price:'Contact us',url:'data:text/html,unsafe',instructor:'',status:'Registration Closed'}]);
  const nodes=all(root);assert.equal(nodes.filter(n=>n.tag==='a').length,0);assert.equal(nodes.filter(n=>n.tag==='dt').length,2);
  assert.ok(nodes.some(n=>n.textContent==='Whenever announced'));assert.ok(nodes.some(n=>n.textContent==='Registration Closed'));
});
test('empty lists and failures produce clear states',async()=>{
  for(const kind of ['tools','courses']){const {root}=await render(kind,[{published:false,title:'Sample'}]);assert.match(all(root).find(n=>n.tag==='h2').textContent,/No .* published yet/);}
  for(const options of [{failure:true},{}]){const {root}=await render('tools',{invalid:true},options);assert.match(all(root).find(n=>n.tag==='h2').textContent,/couldn’t load/);assert.equal(root.attributes['aria-busy'],'false');}
});
test('Arabic updates asynchronous listings and preserves links',async()=>{
  const {root,window,events}=await render('courses',[{published:true,title:'Lecture',title_ar:'محاضرة',status:'Available',url:'https://example.com',buttonLabel:'Register',buttonLabel_ar:'سجل'}]);
  window.PA_LANGUAGE='ar';events['pa-language-change']();const nodes=all(root);
  assert.equal(nodes.find(n=>n.tag==='h2').textContent,'محاضرة');assert.ok(nodes.some(n=>n.textContent==='متاح'));
  assert.equal(nodes.find(n=>n.tag==='a').textContent,'سجل ↗');
});
