const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',open);});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

// Replace # with the final LinkedIn Company Page URL once confirmed.
const linkedinLink=document.getElementById('linkedin-link');
linkedinLink.href='https://www.linkedin.com/company/frontline-login-system/';
