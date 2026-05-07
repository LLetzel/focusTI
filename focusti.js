/* ─ IMAGES ─ */
const BG_URI   = './img/image004.jpg.jpeg';
const LOGO_URI = './img/image004on.png';
document.getElementById('heroBg').style.backgroundImage = `url(${BG_URI})`;
document.getElementById('sobreImg').src = BG_URI;
document.getElementById('navLogo').src  = LOGO_URI;
document.getElementById('footerLogo').src = LOGO_URI;

/* ─ CURSOR ─ */
const dot  = document.getElementById('curDot');
const ring = document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  dot.style.left=mx+'px';dot.style.top=my+'px';
});
(function animRing(){
  rx+=(mx-rx)*.12;ry+=(my-ry)*.12;
  ring.style.left=rx+'px';ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.btn,.card,.srv-card,.sys-card,.dif-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{dot.style.transform='translate(-50%,-50%) scale(2)';ring.style.width='56px';ring.style.height='56px';ring.style.opacity='.25'});
  el.addEventListener('mouseleave',()=>{dot.style.transform='translate(-50%,-50%) scale(1)';ring.style.width='36px';ring.style.height='36px';ring.style.opacity='.5'});
});

/* ─ NAV SCROLL ─ */
const mainNav = document.getElementById('mainNav');
window.addEventListener('scroll',()=>mainNav.classList.toggle('stuck',scrollY>60));

/* ─ MOBILE MENU ─ */
function openMob(){document.getElementById('mobNav').classList.add('open');document.body.style.overflow='hidden'}
function closeMob(){document.getElementById('mobNav').classList.remove('open');document.body.style.overflow=''}

/* ─ SCROLL REVEAL ─ */
const ro = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target)}});
},{threshold:.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.reveal').forEach(el=>ro.observe(el));

/* ─ LOGIN ─ */
function abrirLogin(){document.getElementById('loginModal').classList.add('open');document.body.style.overflow='hidden'}
function fecharLogin(){document.getElementById('loginModal').classList.remove('open');document.body.style.overflow='';document.getElementById('erro').textContent=''}
function fazerLogin(){
  const u=document.getElementById('usuario').value,p=document.getElementById('senha').value;
  if(u==='admin'&&p==='1234'){fecharLogin();alert('Login realizado com sucesso!')}
  else document.getElementById('erro').textContent='Usuário ou senha inválidos.';
}
document.getElementById('loginModal').addEventListener('click',e=>{if(e.target===e.currentTarget)fecharLogin()});

/* ─ CONTACT ─ */
function enviarContato(){
  const n=document.getElementById('nome').value;
  if(!n){alert('Por favor, preencha seu nome.');return}
  alert('Mensagem enviada! Entraremos em contato em breve.');
}

/* ─ ESC ─ */
document.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
    if(document.getElementById('loginModal').classList.contains('open'))fecharLogin();
    else if(document.getElementById('mobNav').classList.contains('open'))closeMob();
    else window.scrollTo({top:0,behavior:'smooth'});
  }
});