'use strict';
const services = [
  {id:'design',name:'Design Cloud',description:'Инструменты для макетов, графики и совместного дизайна.',price:1200,icon:'D'},
  {id:'music',name:'Music Stream',description:'Музыкальная подписка для любимых треков и плейлистов.',price:450,icon:'M'},
  {id:'video',name:'Video Plus',description:'Фильмы и сериалы в демонстрационном каталоге.',price:800,icon:'V'},
  {id:'storage',name:'Cloud Drive',description:'Облачное пространство для файлов и документов.',price:350,icon:'C'}
];
function calculate(price,months){const subtotal=price*months;const fee=Math.round(subtotal*0.1);return {subtotal,fee,total:subtotal+fee};}
if(typeof module !== 'undefined') module.exports={calculate,services};
if(typeof document !== 'undefined') {
 const $=id=>document.getElementById(id);
 const money=value=>new Intl.NumberFormat('ru-RU',{style:'currency',currency:'RUB',maximumFractionDigits:0}).format(value);
 let selected=null;
 function update(){
  $('months').disabled=!selected;$('order').disabled=!selected;$('message').textContent='';
  if(!selected)return;
  $('selection').textContent=selected.name;
  const result=calculate(selected.price,Number($('months').value));
  for(const key of ['subtotal','fee','total']) $(key).textContent=money(result[key]);
 }
 function render(){
  const query=$('search').value.trim().toLocaleLowerCase('ru');
  const filtered=services.filter(s=>s.name.toLocaleLowerCase('ru').includes(query));
  $('catalog').replaceChildren();$('empty').hidden=filtered.length>0;
  for(const s of filtered){
   const card=document.createElement('article');card.className='card'+(selected?.id===s.id?' selected':'');
   const icon=document.createElement('span');icon.className='icon';icon.textContent=s.icon;icon.setAttribute('aria-hidden','true');
   const title=document.createElement('h3');title.textContent=s.name;
   const description=document.createElement('p');description.textContent=s.description;
   const price=document.createElement('strong');price.textContent=money(s.price)+' / месяц';
   const button=document.createElement('button');button.textContent=selected?.id===s.id?'Выбрано':'Выбрать';button.setAttribute('aria-label','Выбрать '+s.name);button.setAttribute('aria-pressed',String(selected?.id===s.id));
   button.addEventListener('click',()=>{selected=s;update();render();const buttons=$('catalog').querySelectorAll('button');[...buttons].find(b=>b.getAttribute('aria-label')==='Выбрать '+s.name)?.focus();});
   card.append(icon,title,description,price,button);$('catalog').append(card);
  }
 }
 $('search').addEventListener('input',render);$('months').addEventListener('change',update);
 $('order').addEventListener('click',()=>{if(selected){const result=calculate(selected.price,Number($('months').value));$('message').textContent=`Демозаявка: ${selected.name}, срок — ${$('months').value} мес., итого ${money(result.total)}. Оплата не выполнялась.`;}});
 render();
}
