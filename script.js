const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent='2025';

const linkedinLink=document.getElementById('linkedin-link');
linkedinLink.href='https://www.linkedin.com/company/frontline-login-system/';

// Click any service card to open the enquiry form with that service selected.
const modal=document.getElementById('service-modal');
const serviceForm=document.getElementById('service-form');
const serviceChoice=document.getElementById('service-choice');
const closeModal=()=>{if(!modal)return;modal.classList.remove('open');modal.style.display='none';modal.setAttribute('aria-hidden','true');document.body.style.overflow='';};
const openModal=(service)=>{if(!modal)return;modal.classList.add('open');modal.style.display='flex';modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';if(service)serviceChoice.value=service;setTimeout(()=>document.getElementById('customer-name')?.focus(),50);};

document.querySelectorAll('.service-card').forEach(card=>{
  const service=card.querySelector('h3')?.textContent.trim()||'';
  card.setAttribute('role','button');
  card.setAttribute('tabindex','0');
  card.setAttribute('aria-label',`Request expert advice or a quote for ${service}`);
  card.addEventListener('click',()=>openModal(service));
  card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openModal(service);}});
});

document.getElementById('modal-close')?.addEventListener('click',closeModal);
document.getElementById('modal-cancel')?.addEventListener('click',closeModal);
modal?.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('open'))closeModal();});

serviceForm?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(serviceForm);
  const subject=`Frontline service enquiry - ${data.get('service')}`;
  const body=[
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Company: ${data.get('company')||'Not provided'}`,
    `Service: ${data.get('service')}`,
    `Budget / range: ${data.get('budget')||'Not provided'}`,
    `Expected timeline: ${data.get('timeline')||'Not provided'}`,
    '',
    'Requirement / question:',
    data.get('requirement')
  ].join('\n');
  window.location.href=`mailto:loginfrontline@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Additive visual motion: reveal newly added sections as they enter the viewport.
const visualItems=document.querySelectorAll('.visual-project-card,.arch-layer,.visual-hero-strip');
if('IntersectionObserver' in window){
  const visualObserver=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');visualObserver.unobserve(entry.target);}});
  },{threshold:.12});
  visualItems.forEach((el,i)=>{el.style.transitionDelay=`${Math.min(i*70,280)}ms`;visualObserver.observe(el);});
}

// Additive ambient watermark motion for a subtle enterprise-depth effect.
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  let ticking=false;
  window.addEventListener('scroll',()=>{
    if(ticking)return;
    ticking=true;
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      document.body.style.setProperty('--watermark-shift',`${Math.min(y*.018,34)}px`);
      ticking=false;
    });
  },{passive:true});
}

// Additive hero interaction: the existing systems map automatically cycles through
// its four technology nodes; tapping/hovering a node lets the visitor focus it.
const heroPanel=document.querySelector('.hero-panel');
const heroNodes=[...document.querySelectorAll('.hero-panel .node')];
if(heroPanel&&heroNodes.length){
  let heroIndex=0;
  let heroTimer=null;
  const setHeroNode=(index)=>{
    heroIndex=(index+heroNodes.length)%heroNodes.length;
    heroNodes.forEach((node,i)=>node.classList.toggle('is-active',i===heroIndex));
    heroPanel.querySelector('.orbit-core')?.classList.toggle('is-active',true);
  };
  const startHeroCycle=()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    clearInterval(heroTimer);
    heroTimer=setInterval(()=>setHeroNode(heroIndex+1),2800);
  };
  heroNodes.forEach((node,index)=>{
    node.addEventListener('click',()=>{
      setHeroNode(index);
      startHeroCycle();
    });
    node.addEventListener('mouseenter',()=>setHeroNode(index));
  });
  heroPanel.addEventListener('mouseleave',startHeroCycle);
  setHeroNode(0);
  startHeroCycle();
}
