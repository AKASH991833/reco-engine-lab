/* 120 well-known movies: [title, year, genres] */
const MOVIES_RAW=[
["The Shawshank Redemption",1994,["Drama","Crime"]],["The Godfather",1972,["Crime","Drama"]],
["The Dark Knight",2008,["Action","Crime"]],["Pulp Fiction",1994,["Crime","Thriller"]],
["Forrest Gump",1994,["Drama","Romance"]],["Inception",2010,["Sci-Fi","Thriller"]],
["The Matrix",1999,["Sci-Fi","Action"]],["Interstellar",2014,["Sci-Fi","Drama","Adventure"]],
["Gladiator",2000,["Action","Drama"]],["The Silence of the Lambs",1991,["Thriller","Crime","Horror"]],
["Saving Private Ryan",1998,["War","Drama"]],["Schindler's List",1993,["War","Drama"]],
["The Lord of the Rings: The Fellowship of the Ring",2001,["Fantasy","Adventure"]],
["The Lord of the Rings: The Two Towers",2002,["Fantasy","Adventure"]],
["The Lord of the Rings: The Return of the King",2003,["Fantasy","Adventure"]],
["Star Wars: A New Hope",1977,["Sci-Fi","Adventure","Fantasy"]],["The Empire Strikes Back",1980,["Sci-Fi","Adventure"]],
["Raiders of the Lost Ark",1981,["Adventure","Action"]],["Jurassic Park",1993,["Sci-Fi","Adventure"]],
["Back to the Future",1985,["Sci-Fi","Comedy","Adventure"]],["Terminator 2: Judgment Day",1991,["Sci-Fi","Action"]],
["Alien",1979,["Sci-Fi","Horror"]],["Aliens",1986,["Sci-Fi","Action","Horror"]],
["Blade Runner",1982,["Sci-Fi","Thriller"]],["2001: A Space Odyssey",1968,["Sci-Fi","Mystery"]],
["The Avengers",2012,["Action","Adventure","Sci-Fi"]],["Iron Man",2008,["Action","Sci-Fi"]],
["Spider-Man: Into the Spider-Verse",2018,["Animation","Action","Adventure"]],
["The Lion King",1994,["Animation","Family","Drama"]],["Toy Story",1995,["Animation","Family","Comedy"]],
["Finding Nemo",2003,["Animation","Family","Adventure"]],["Up",2009,["Animation","Family","Drama"]],
["Inside Out",2015,["Animation","Family","Comedy"]],["Coco",2017,["Animation","Family","Fantasy"]],
["Spirited Away",2001,["Animation","Fantasy","Adventure"]],["Your Name",2016,["Animation","Romance","Fantasy"]],
["WALL-E",2008,["Animation","Sci-Fi","Family"]],["Shrek",2001,["Animation","Comedy","Fantasy"]],
["Frozen",2013,["Animation","Family","Fantasy"]],["The Incredibles",2004,["Animation","Action","Family"]],
["Titanic",1997,["Romance","Drama"]],["La La Land",2016,["Romance","Drama","Comedy"]],
["The Notebook",2004,["Romance","Drama"]],["Pride and Prejudice",2005,["Romance","Drama"]],
["Casablanca",1942,["Romance","Drama","War"]],["Notting Hill",1999,["Romance","Comedy"]],
["Eternal Sunshine of the Spotless Mind",2004,["Romance","Drama","Sci-Fi"]],
["Before Sunrise",1995,["Romance","Drama"]],["Crazy Rich Asians",2018,["Romance","Comedy"]],
["The Princess Bride",1987,["Romance","Fantasy","Adventure","Comedy"]],
["Superbad",2007,["Comedy"]],["The Hangover",2009,["Comedy"]],["Groundhog Day",1993,["Comedy","Fantasy","Romance"]],
["The Grand Budapest Hotel",2014,["Comedy","Crime","Drama"]],["Deadpool",2016,["Comedy","Action"]],
["Monty Python and the Holy Grail",1975,["Comedy","Fantasy","Adventure"]],["Bridesmaids",2011,["Comedy"]],
["21 Jump Street",2012,["Comedy","Action","Crime"]],["The Big Short",2015,["Comedy","Drama"]],
["Parasite",2019,["Thriller","Drama","Comedy"]],["Get Out",2017,["Horror","Thriller","Mystery"]],
["A Quiet Place",2018,["Horror","Thriller"]],["The Conjuring",2013,["Horror","Mystery"]],
["It",2017,["Horror"]],["The Shining",1980,["Horror","Thriller"]],["Hereditary",2018,["Horror","Mystery"]],
["The Exorcist",1973,["Horror"]],["Us",2019,["Horror","Thriller"]],["Psycho",1960,["Horror","Thriller","Mystery"]],
["Seven",1995,["Crime","Thriller","Mystery"]],["Gone Girl",2014,["Thriller","Mystery","Drama"]],
["Shutter Island",2010,["Thriller","Mystery"]],["The Sixth Sense",1999,["Thriller","Mystery","Drama"]],
["Zodiac",2007,["Crime","Thriller","Mystery"]],["Prisoners",2013,["Crime","Thriller","Mystery"]],
["Memento",2000,["Thriller","Mystery"]],["The Prestige",2006,["Drama","Mystery","Thriller"]],
["Fight Club",1999,["Drama","Thriller"]],["The Departed",2006,["Crime","Thriller","Drama"]],
["Goodfellas",1990,["Crime","Drama"]],["Heat",1995,["Crime","Action","Thriller"]],
["The Usual Suspects",1995,["Crime","Mystery","Thriller"]],["No Country for Old Men",2007,["Crime","Thriller","Drama"]],
["John Wick",2014,["Action","Thriller"]],["Mad Max: Fury Road",2015,["Action","Adventure","Sci-Fi"]],
["Die Hard",1988,["Action","Thriller"]],["The Bourne Identity",2002,["Action","Thriller","Mystery"]],
["Mission: Impossible - Fallout",2018,["Action","Thriller","Adventure"]],["Top Gun: Maverick",2022,["Action","Drama"]],
["The Revenant",2015,["Adventure","Drama","Thriller"]],["Cast Away",2000,["Adventure","Drama"]],
["Life of Pi",2012,["Adventure","Drama","Fantasy"]],["The Martian",2015,["Sci-Fi","Adventure","Drama"]],
["Arrival",2016,["Sci-Fi","Drama","Mystery"]],["Ex Machina",2014,["Sci-Fi","Thriller","Drama"]],
["Her",2013,["Sci-Fi","Romance","Drama"]],["Gravity",2013,["Sci-Fi","Thriller","Drama"]],
["Dune",2021,["Sci-Fi","Adventure"]],["District 9",2009,["Sci-Fi","Action","Thriller"]],
["Whiplash",2014,["Drama"]],["The Social Network",2010,["Drama"]],["12 Years a Slave",2013,["Drama"]],
["The Pursuit of Happyness",2006,["Drama"]],["A Beautiful Mind",2001,["Drama"]],
["Good Will Hunting",1997,["Drama"]],["Dead Poets Society",1989,["Drama"]],
["The Truman Show",1998,["Drama","Comedy","Sci-Fi"]],["Forrest Gump 2 placeholder",0,["Drama"]],
["Black Panther",2018,["Action","Adventure","Sci-Fi"]],["Wonder Woman",2017,["Action","Adventure","Fantasy"]],
["The Batman",2022,["Action","Crime","Mystery"]],["Joker",2019,["Crime","Drama","Thriller"]],
["Guardians of the Galaxy",2014,["Action","Adventure","Comedy","Sci-Fi"]],["Thor: Ragnarok",2017,["Action","Comedy","Adventure"]],
["Harry Potter and the Sorcerer's Stone",2001,["Fantasy","Adventure","Family"]],
["Harry Potter and the Prisoner of Azkaban",2004,["Fantasy","Adventure","Mystery"]],
["The Hobbit: An Unexpected Journey",2012,["Fantasy","Adventure"]],
["Pirates of the Caribbean: The Curse of the Black Pearl",2003,["Adventure","Fantasy","Action"]],
["Avatar",2009,["Sci-Fi","Adventure","Fantasy"]],["The Hunger Games",2012,["Sci-Fi","Action","Adventure"]],
["The Maze Runner",2014,["Sci-Fi","Action","Thriller"]],["Divergent",2014,["Sci-Fi","Action","Romance"]],
["Knives Out",2019,["Mystery","Comedy","Crime"]],["Murder on the Orient Express",2017,["Mystery","Crime","Drama"]],
["The Girl with the Dragon Tattoo",2011,["Crime","Mystery","Thriller"]],
["Oppenheimer",2023,["Drama","Thriller"]],["Dunkirk",2017,["War","Action","Thriller"]],
["1917",2019,["War","Drama","Thriller"]],["Hacksaw Ridge",2016,["War","Drama"]],
["Free Solo",2018,["Documentary","Adventure"]],["Planet Earth II",2016,["Documentary","Family"]],
["The Social Dilemma",2020,["Documentary","Drama"]],["13th",2016,["Documentary","Crime"]]
];
/* drop the placeholder, index */
const MOVIES=MOVIES_RAW.filter(m=>m[1]>0).map((m,i)=>({id:i,title:m[0],year:m[1],genres:m[2]}));
const GENRES=[...new Set(MOVIES.flatMap(m=>m.genres))].sort();
function decade(y){return Math.floor(y/10)*10;}
/* feature vector: genres (weight 3), decade (1), era keywords */
function featVec(m){
  const v={};
  m.genres.forEach(g=>{v['g:'+g]=3;});
  v['d:'+decade(m.year)]=1;
  v['e:'+(m.year<1980?'classic':m.year<2000?'90s':'modern')]=1.5;
  return v;
}
MOVIES.forEach(m=>{m.vec=featVec(m);});
/* 60 synthetic users across 8 personas, deterministic seeded rng */
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const rng=mulberry32(20261021);
const PERSONAS=[
 {name:'Action Fan',loves:['Action','Thriller','Adventure'],hates:['Romance','Documentary']},
 {name:'Sci-Fi Nerd',loves:['Sci-Fi','Thriller','Mystery'],hates:['Romance','War']},
 {name:'Hopeless Romantic',loves:['Romance','Comedy','Drama'],hates:['Horror','War']},
 {name:'Horror Junkie',loves:['Horror','Thriller','Mystery'],hates:['Animation','Family']},
 {name:'Film Snob',loves:['Drama','Crime','Mystery'],hates:['Action','Animation']},
 {name:'Family Viewer',loves:['Animation','Family','Adventure'],hates:['Horror','Crime']},
 {name:'Comedy Fan',loves:['Comedy','Adventure'],hates:['Horror','War']},
 {name:'Doc Watcher',loves:['Documentary','Drama','War'],hates:['Fantasy','Animation']}
];
function buildUsers(){
  const users=[];
  for(let u=0;u<60;u++){
    const p=PERSONAS[u%PERSONAS.length];
    const ratings={};
    MOVIES.forEach(m=>{
      const r=rng();
      if(r>0.45)return; /* each user rates ~45% of catalog */
      const overlap=m.genres.filter(g=>p.loves.includes(g)).length;
      const bad=m.genres.filter(g=>p.hates.includes(g)).length;
      let base=3+overlap*1.1-bad*1.4+(rng()-0.5)*1.2;
      base=Math.max(1,Math.min(5,Math.round(base)));
      ratings[m.id]=base;
    });
    users.push({id:u,persona:p.name,ratings});
  }
  return users;
}
const USERS=buildUsers();
