const $=s=>document.querySelector(s);
const LS='reclab-ratings';
let ratings={};let shown=18;
function load(){try{ratings=JSON.parse(localStorage.getItem(LS))||{};}catch(e){ratings={};}
  Object.keys(ratings).forEach(k=>{if(!MOVIES[+k])delete ratings[k];});}
function save(){localStorage.setItem(LS,JSON.stringify(ratings));updateCount();}
function updateCount(){const n=Object.keys(ratings).length;$('#rateCount').textContent=n+' rated';}

/* tabs */
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));t.classList.add('active');
  document.querySelectorAll('.view').forEach(v=>v.hidden=true);
  $('#view-'+t.dataset.view).hidden=false;
  if(t.dataset.view==='recs')renderRecs();
  if(t.dataset.view==='compare')renderCompare();
}));

const starSVG='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8z"/></svg>';

/* catalog */
function genreOptions(){
  $('#genreFilter').innerHTML='<option value="">All genres</option>'+GENRES.map(g=>`<option>${g}</option>`).join('');
}
function renderCatalog(){
  const g=$('#genreFilter').value;
  const q=($('#catalogSearch').value||'').toLowerCase();
  let list=MOVIES.filter(m=>(!g||m.genres.includes(g))&&(!q||m.title.toLowerCase().includes(q)));
  const total=list.length;
  list=list.slice(0,shown);
  $('#catalog').innerHTML=list.map(m=>{
    const my=ratings[m.id]||0;
    return `<div class="movie" data-mid="${m.id}">
      <h4>${esc(m.title)}</h4>
      <div class="sub">${m.year} · ${m.genres.join(', ')}</div>
      <div class="stars" role="radiogroup" aria-label="Rate ${esc(m.title)}">
        ${[1,2,3,4,5].map(s=>`<button class="${s<=my?'on':''}" data-star="${s}" onclick="rate(${m.id},${s})" aria-label="${s} stars">${starSVG}</button>`).join('')}
      </div></div>`;
  }).join('');
  $('#moreBtn').hidden=shown>=total;
}
function rate(id,stars){
  if(ratings[id]===stars)delete ratings[id];else ratings[id]=stars;
  save();renderCatalog();
}
function showMore(){shown+=24;renderCatalog();}
function resetRatings(){ratings={};save();renderCatalog();toast('Ratings cleared');}

/* recommendations */
function renderRecs(){
  const engine=$('#enginePick').value;
  const res=REC.recommend(ratings,engine,12,+$('#hybridW')?.value||50);
  const meta=$('#recMeta'),list=$('#recList');
  if(res.empty){meta.textContent='';list.innerHTML=`<p class="muted">${res.empty}</p>`;return;}
  const names={content:'Content-based filtering',cf:'Collaborative filtering',hybrid:'Hybrid'};
  meta.textContent=`${names[res.kind==='hybrid-content-only'||res.kind==='hybrid-cf-only'?'hybrid':engine]} engine`+
    (engine==='hybrid'?(res.kind==='hybrid-content-only'?' (content only until CF has enough overlap)':res.kind==='hybrid-cf-only'?' (CF only)':` · ${res.neighbors} taste neighbors`):'')+
    (engine==='cf'?` · ${res.neighbors} taste neighbors`:'');
  list.innerHTML=res.list.map((r,i)=>`
    <div class="rec-item">
      <div class="rec-rank">${i+1}</div>
      <div class="rec-body">
        <h4>${esc(r.title)} <span class="muted small" style="font-weight:400">${r.year}</span></h4>
        <div class="sub muted small">${r.genres.join(', ')}</div>
        ${r.why?`<div class="why">Why: ${esc(r.why)}</div>`:''}
        <div class="scorebar"><i style="width:${Math.round((engine==='cf'?r.score/5:r.score)*100)}%"></i></div>
      </div>
      <div class="row" style="align-items:flex-start"><button class="btn btn-ghost btn-sm" onclick="quickRate(${r.id})" title="Rate it">Rate</button></div>
    </div>`).join('');
}
function quickRate(id){
  const cur=ratings[id]||0;
  ratings[id]=cur>=5?1:cur+1;save();renderRecs();
  toast(`${MOVIES[id].title}: ${ratings[id]}/5`);
}

/* compare */
function renderCompare(){
  const w=+$('#hybridW').value;
  $('#hybridWVal').textContent=w+'%';
  const engines=[['content','Content-based','#f59e0b'],['cf','Collaborative','#22c55e'],['hybrid','Hybrid','#4f46e5']];
  const cols=engines.map(([key,name,color])=>{
    const res=REC.recommend(ratings,key,8,w);
    if(res.empty)return`<div class="compare-col"><h3><span class="dot" style="background:${color}"></span>${name}</h3><p class="muted small">${res.empty}</p></div>`;
    return`<div class="compare-col"><h3><span class="dot" style="background:${color}"></span>${name}</h3>`+
      res.list.map(r=>`<div class="mini"><b>${esc(r.title)}</b><span>${r.year}</span></div>`).join('')+`</div>`;
  });
  $('#compareGrid').innerHTML=cols.join('');
}

load();genreOptions();renderCatalog();updateCount();
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
