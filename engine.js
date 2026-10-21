/* RecLab engines: content-based, user-user collaborative filtering, hybrid */
const REC=(()=>{
function cosine(a,b){
  let dot=0,na=0,nb=0;
  for(const k in a){na+=a[k]*a[k];if(b[k])dot+=a[k]*b[k];}
  for(const k in b)nb+=b[k]*b[k];
  return (na&&nb)?dot/(Math.sqrt(na)*Math.sqrt(nb)):0;
}
/* content profile from my ratings: (rating-3) weighted sum of feature vectors */
function contentProfile(myRatings){
  const prof={};let any=false;
  Object.entries(myRatings).forEach(([id,r])=>{
    const m=MOVIES[+id];if(!m)return;any=true;
    const w=r-3;
    Object.entries(m.vec).forEach(([k,v])=>{prof[k]=(prof[k]||0)+w*v;});
  });
  return any?prof:null;
}
function contentScores(myRatings){
  const prof=contentProfile(myRatings);
  if(!prof)return null;
  const scores={};
  MOVIES.forEach(m=>{
    if(myRatings[m.id]!=null)return;
    scores[m.id]=cosine(prof,m.vec);
  });
  return scores;
}
/* Pearson similarity between me and each synthetic user */
function pearson(a,b){
  const keys=Object.keys(a).filter(k=>b[k]!=null);
  if(keys.length<3)return 0;
  const n=keys.length;
  let sa=0,sb=0;keys.forEach(k=>{sa+=a[k];sb+=b[k];});
  const ma=sa/n,mb=sb/n;
  let num=0,da=0,db=0,diff=0;
  keys.forEach(k=>{const x=a[k]-ma,y=b[k]-mb;num+=x*y;da+=x*x;db+=y*y;diff+=Math.abs(a[k]-b[k]);});
  if(da&&db)return num/(Math.sqrt(da)*Math.sqrt(db));
  /* zero variance (e.g. all 5s): fall back to agreement by rating closeness */
  return Math.max(0,1-(diff/n)/2)*0.6;
}
function cfScores(myRatings){
  if(Object.keys(myRatings).length<2)return null;
  const sims=USERS.map(u=>({u,sim:pearson(myRatings,u.ratings)})).filter(x=>x.sim>0.1)
    .sort((a,b)=>b.sim-a.sim).slice(0,15);
  if(!sims.length)return null;
  const scores={},weights={},explan={};
  sims.forEach(({u,sim})=>{
    Object.entries(u.ratings).forEach(([mid,r])=>{
      if(myRatings[mid]!=null)return;
      scores[mid]=(scores[mid]||0)+sim*r;
      weights[mid]=(weights[mid]||0)+sim;
      if(!explan[mid]||explan[mid].sim<sim)explan[mid]={sim,persona:u.persona,uid:u.id,r};
    });
  });
  const out={};
  Object.keys(scores).forEach(mid=>{out[mid]=scores[mid]/weights[mid];});
  return{scores:out,neighbors:sims,explan};
}
function normalize(scores){
  const vals=Object.values(scores);if(!vals.length)return{};
  const mn=Math.min(...vals),mx=Math.max(...vals);
  const out={};
  Object.entries(scores).forEach(([k,v])=>{out[k]=mx>mn?(v-mn)/(mx-mn):0.5;});
  return out;
}
function recommend(myRatings,engine,topN,hybridW){
  const c=contentScores(myRatings);
  const cf=cfScores(myRatings);
  let combined=null,kind=engine;
  if(engine==='content'){
    if(!c)return{empty:'Rate a few movies first - the content engine needs at least 1 rating.'};
    combined=c;
  }else if(engine==='cf'){
    if(!cf)return{empty:'Collaborative filtering needs at least 2 ratings that overlap with the community.'};
    combined=cf.scores;
  }else{
    const nc=c?normalize(c):null;
    const ncf=cf?normalize(cf.scores):null;
    if(!nc&&!ncf)return{empty:'Rate a few movies first.'};
    combined={};
    const w=(hybridW!=null?hybridW:50)/100;
    const keys=new Set([...Object.keys(nc||{}),...Object.keys(ncf||{})]);
    keys.forEach(k=>{
      const a=nc?(nc[k]??0):0, b=ncf?(ncf[k]??0):0;
      if(nc&&ncf)combined[k]=w*a+(1-w)*b;
      else combined[k]=nc?a:b;
    });
    if(!ncf)kind='hybrid-content-only';
    if(!nc)kind='hybrid-cf-only';
  }
  const cNorm=normalize(c||{}),cfNorm=cf?normalize(cf.scores):{};
  const list=Object.entries(combined).map(([id,score])=>{
    const m=MOVIES[+id];
    /* why: top genre affinities or neighbor persona */
    let why='';
    if(engine==='cf'||engine==='hybrid'){
      if(cf&&cf.explan[id])why=`${Math.round(cf.explan[id].sim*100)}% match with a ${cf.explan[id].persona} who rated it ${cf.explan[id].r}/5`;
    }
    if(!why&&c){
      const prof=contentProfile(myRatings);
      const feats=Object.entries(m.vec).filter(([k])=>prof&&prof[k]>0.5).sort((a,b)=>b[1]*prof[b[0]]-a[1]*prof[a[0]]).slice(0,2);
      if(feats.length){
        const liked=Object.entries(myRatings).filter(([mid,r])=>r>=4&&MOVIES[+mid].genres.some(g=>feats[0][0]==='g:'+g));
        why=feats.map(([k])=>k.startsWith('g:')?'you rate '+k.slice(2)+' highly':k.startsWith('d:')?'you like '+k.slice(2)+'s films':'matches your era taste').join(' · ');
        if(liked.length)why+=` (you gave ${MOVIES[+liked[0][0]].title} ${liked[0][1]}/5)`;
      }
    }
    return{id:+id,score,title:m.title,year:m.year,genres:m.genres,why,
      cScore:cNorm[id]??null,cfScore:cfNorm[id]??null};
  }).sort((a,b)=>b.score-a.score).slice(0,topN||12);
  return{list,kind,hasC:!!c,hasCF:!!cf,neighbors:cf?cf.neighbors.length:0};
}
return{cosine,pearson,contentScores,cfScores,recommend,normalize};
})();
