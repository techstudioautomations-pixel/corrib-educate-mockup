const reveals=document.querySelectorAll('.reveal');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});reveals.forEach(el=>observer.observe(el));
const photo=document.querySelector('#destination-photo');document.querySelectorAll('.place').forEach(btn=>btn.addEventListener('mouseenter',()=>{document.querySelectorAll('.place').forEach(b=>b.classList.remove('active'));btn.classList.add('active');photo.style.opacity='.2';setTimeout(()=>{photo.src=btn.dataset.img;photo.style.opacity='1'},180)}));
const programmeCards=[...document.querySelectorAll('.card')],programmeCounter=document.querySelector('#programme-counter');let programmeIndex=0;function showProgramme(i){programmeIndex=(i+programmeCards.length)%programmeCards.length;programmeCards.forEach((card,n)=>card.classList.toggle('active',n===programmeIndex));programmeCounter.textContent=`0${programmeIndex+1} / 0${programmeCards.length}`};if(programmeCounter){document.querySelector('#programme-next').onclick=()=>showProgramme(programmeIndex+1);document.querySelector('#programme-prev').onclick=()=>showProgramme(programmeIndex-1)}

const testimonialCards=[...document.querySelectorAll('.testimonial')],testimonialCounter=document.querySelector('#testimonial-counter');let testimonialIndex=0;function showTestimonial(i){testimonialIndex=(i+testimonialCards.length)%testimonialCards.length;testimonialCards.forEach((card,n)=>card.classList.toggle('active',n===testimonialIndex));testimonialCounter.textContent=`0${testimonialIndex+1} / 0${testimonialCards.length}`};if(testimonialCounter){document.querySelector('#testimonial-next').onclick=()=>showTestimonial(testimonialIndex+1);document.querySelector('#testimonial-prev').onclick=()=>showTestimonial(testimonialIndex-1)}

const valuePanel=document.querySelector('#value-panel');
if(valuePanel){
  const valueContent={
    goal:'Our aim is to ensure every mini stay gets the best experience possible in our beautiful country—constantly working to procure the best accommodation, mainly through host families, and to provide the best service for our partners.',
    team:'In the past year we have built a strong team, with each member bringing varying experience that complements how we operate—meet everyone below.',
    standards:'High quality education programmes in a safe environment, with a variety of activities and cultural events, and loyal host families across Galway, Dublin and Monaghan.'
  };
  const valueTabs=[...document.querySelectorAll('.value-tab')];
  valueTabs.forEach(tabBtn=>tabBtn.addEventListener('click',()=>{
    valueTabs.forEach(btn=>{const active=btn===tabBtn;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',active)});
    valuePanel.innerHTML=`<p>${valueContent[tabBtn.dataset.value]}</p>`;
  }));
}

const plannerDays=document.querySelector('#planner-days');
if(plannerDays){
  const plannerData={
    galway:{label:'Galway',image:'assets/galway-harbour.jpg',summary:'A coastal base for Connemara, the Cliffs of Moher, the Aran Islands and Galway city.',pdf:'assets/programmes/galway-sample-programme.pdf',days:[
      ['01','Arrival','Airport or port arrival, transfer west and settle into your Galway centre.'],
      ['02','Connemara','Kylemore Abbey, Connemara National Park and the Leenane Sheep & Wool Centre.'],
      ['03','Clare coast','Cliffs of Moher, Bunratty Castle and an Irish music class arranged by Corrib Educate.'],
      ['04','Aran Islands','A full day on the islands with bike hire and space to explore together.'],
      ['05','Galway city','Walking tour, free time, Irish dancing and a Gaelic football session arranged by Corrib Educate.']
    ]},
    dublin:{label:'Dublin',image:'assets/dublin-temple-bar.jpg',summary:'A city base for museums, GAA culture, living history and a final countryside day.',pdf:'assets/programmes/dublin-sample-programme.pdf',days:[
      ['01','Arrival','Airport or port arrival, optional panoramic city tour and transfer to your centre.'],
      ['02','Sport & story','Croke Park and the GAA Museum, followed by EPIC The Irish Emigration Museum.'],
      ['03','Living history','Dublinia and Experience Gaelic Games.'],
      ['04','The city on foot','Jeanie Johnston, the National Museum of Ireland and an Irish dance party.'],
      ['05','Beyond the city','Causey Farm and Trim Castle before your final evening together.']
    ]},
    monaghan:{label:'Monaghan',image:'assets/monaghan-market.jpg',summary:'A close-knit base with easy access to Tyrone, Antrim, Belfast and Meath.',pdf:'assets/programmes/monaghan-sample-programme.pdf',days:[
      ['01','Arrival','Airport or port arrival, optional Dublin tour and transfer north to Monaghan.'],
      ['02','Shared traditions','Ulster American Folk Park, Irish dancing and Gaelic football in Monaghan.'],
      ['03','Antrim & Derry','The Giant’s Causeway, the Museum of Free Derry and time in the city.'],
      ['04','Belfast','Panoramic Belfast tour, free time and the Titanic Museum.'],
      ['05','Meath','A day at Causey Farm before returning to the centre.']
    ]},
    cork:{label:'Cork · Bandon',image:'assets/cork-city.jpg',summary:'A south coast base for Cork city, Killarney, Blarney and hands-on local history.',pdf:'assets/programmes/cork-sample-programme.pdf',days:[
      ['01','Arrival','Airport or Rosslare arrival and transfer to your centre in Bandon.'],
      ['02','Cork city','Guided Cork walking tour, free time and Experience Gaelic Games.'],
      ['03','Killarney','National Park tour, a lake boat trip and time to explore Killarney.'],
      ['04','Blarney','Blarney Castle and an Irish dancing class arranged by Corrib Educate.'],
      ['05','Local history','Cork City Gaol and Cork City Museum before your final evening.']
    ]}
  };
  let currentCentre='galway',currentDuration='mini';
  const centreButtons=[...document.querySelectorAll('.planner-centre')],durationButtons=[...document.querySelectorAll('.planner-duration-btn')];
  const renderPlanner=()=>{const data=plannerData[currentCentre],count=currentDuration==='mini'?3:5;document.querySelector('#planner-image').src=data.image;document.querySelector('#planner-image').alt=`Students exploring ${data.label}`;document.querySelector('#planner-centre-label').textContent=data.label;document.querySelector('#planner-summary').textContent=data.summary;document.querySelector('#planner-pdf').href=data.pdf;plannerDays.innerHTML=data.days.slice(0,count).map(day=>`<article class="planner-day"><span>${day[0]}</span><div><h3>${day[1]}</h3><p>${day[2]}</p></div></article>`).join('');};
  centreButtons.forEach(btn=>btn.addEventListener('click',()=>{currentCentre=btn.dataset.centre;centreButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-selected',active)});renderPlanner()}));
  durationButtons.forEach(btn=>btn.addEventListener('click',()=>{currentDuration=btn.dataset.duration;durationButtons.forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-selected',active)});renderPlanner()}));
  const requestedCentre=new URLSearchParams(window.location.search).get('centre');
  if(requestedCentre&&plannerData[requestedCentre]){currentCentre=requestedCentre;centreButtons.forEach(btn=>{const active=btn.dataset.centre===currentCentre;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',active)});}
  const requestedDuration=new URLSearchParams(window.location.search).get('duration');
  if(requestedDuration==='longer'){currentDuration='longer';durationButtons.forEach(btn=>{const active=btn.dataset.duration==='longer';btn.classList.toggle('active',active);btn.setAttribute('aria-selected',active)});}
  renderPlanner();
}

// Keep the primary navigation consistent across every page.
document.querySelectorAll('nav[aria-label="Main navigation"]').forEach(nav=>{
  const destinations=nav.querySelector('a[href="destinations.html"]');
  const learnEnglish=nav.querySelector('a[href="learn-english.html"]');
  if(destinations&&learnEnglish) nav.append(learnEnglish);
});

const activityRegionContent=document.querySelector('#activity-region-content');
if(activityRegionContent){
  const activityRegions={
    dublin:{label:'Dublin region',intro:'City stories, coastal towns and heritage within easy reach.',visits:['Brú na Bóinne Visitor Centre, Newgrange & Knowth','Causey Farm','Dublin Castle','Kilkenny Castle','Malahide Castle','Powerscourt House, Gardens & Waterfall',"St. Patrick's Cathedral",'Trim Castle'],museums:['Botanical Gardens','Dublinia, Viking World & Christ Church','EPIC Museum & Jeannie Johnston','Glendalough','GPO Museum','National Gallery','National Museum of Ireland','Trinity College & Book of Kells','Wicklow Jail','James Joyce Centre','Hugh Lane Gallery'],activities:['Gaelic football','Gaelic Games Experience','Irish Dance Party'],planner:'dublin'},
    monaghan:{label:'Monaghan region',intro:'A close-knit base with big northern stories to discover.',visits:['Belfast Castle','Carrick-a-Rede Rope Bridge',"Giant's Causeway",'Titanic Centre','Ulster American Folk Park'],museums:['Belfast City Hall','Guild Hall','Museum of Free Derry','Queen\'s University'],activities:['Gaelic football','Irish dancing'],planner:'monaghan'},
    cork:{label:'Cork region · Bandon',intro:'Heritage, coastline and active days across the south.',visits:['Cobh Heritage Centre','Titanic Experience','Rock of Cashel','Spike Island','Killarney National Park','Cork City Museum','Ring of Kerry (scenic drive)','Blasket Islands tour','Tour of University College Cork','Guided tour of Cork','Doneraile National Park','Kinsale & West Cork'],museums:[],activities:['Gaelic football','Irish dancing'],planner:'cork'},
    galway:{label:'Galway region',intro:'Wild Atlantic landscapes, island days and living culture.',visits:['Kylemore Abbey','Connemara National Park','Leenane Sheep & Wool Centre','Cliffs of Moher','Bunratty Castle','Aran Islands','Guided walking tour of Galway City'],museums:['Galway City Museum'],activities:['Irish music class','Irish dancing','Gaelic football session'],planner:'galway'}
  };
  let activeRegion='dublin';
  const tabs=[...document.querySelectorAll('.activity-region-tab')];
  const renderActivityRegion=()=>{const data=activityRegions[activeRegion];const groups=[['Visits',data.visits],['Museums & galleries',data.museums],['Activities',data.activities]];activityRegionContent.innerHTML=`<div class="activity-region-heading"><div><span>${data.label}</span><h3>${data.intro}</h3></div><a class="inline-link" href="tours.html?centre=${data.planner}#sample-programmes">Have a look at the sample programme ↗</a></div><div class="activity-accordion-list">${groups.filter(([,items])=>items.length).map(([title,items],index)=>`<details class="activity-accordion"${index===0?' open':''}><summary><span>${title}</span><small>${items.length} options</small></summary><ul>${items.map(item=>`<li>${item}</li>`).join('')}</ul></details>`).join('')}</div>`;};
  tabs.forEach(tabBtn=>tabBtn.addEventListener('click',()=>{activeRegion=tabBtn.dataset.region;tabs.forEach(btn=>{const active=btn===tabBtn;btn.classList.toggle('active',active);btn.setAttribute('aria-selected',active)});renderActivityRegion()}));
  renderActivityRegion();
}
