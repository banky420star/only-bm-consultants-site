const intro = document.querySelector('.intro');
if (intro) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('onlybm-intro-seen-v3');
  const finishIntro = () => {
    intro.classList.add('is-hidden');
    document.body.classList.remove('intro-lock');
    sessionStorage.setItem('onlybm-intro-seen-v3','1');
    setTimeout(()=>intro.remove(),1100);
  };
  if (seen || reduced) {
    intro.remove();
    document.body.classList.remove('intro-lock');
  } else {
    document.body.classList.add('intro-lock');
    const t = setTimeout(finishIntro, 5400);
    intro.addEventListener('click', ()=>{ clearTimeout(t); finishIntro(); }, {once:true});
    window.addEventListener('keydown', e=>{
      if (['Escape','Enter',' '].includes(e.key)) { clearTimeout(t); finishIntro(); }
    }, {once:true});
  }
}

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const progress = document.querySelector('.site-progress span');
const nav = document.querySelector('.nav');
let lastY = window.scrollY;const onScroll = () => {
  const y = window.scrollY;
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (progress && h > 0) progress.style.transform = 'scaleX(' + Math.min(1,y/h) + ')';
  if (nav) {
    if (y > lastY && y > 160) nav.classList.add('is-hidden');
    else nav.classList.remove('is-hidden');
  }
  lastY = y;
  document.querySelectorAll('[data-parallax]').forEach(el=>{
    const amount = Number(el.dataset.parallax || 0);
    const r = el.getBoundingClientRect();
    if (r.bottom > 0 && r.top < innerHeight) {
      el.style.backgroundPosition = 'center calc(50% + ' + ((r.top-innerHeight/2)*amount) + 'px)';
    }
  });
};
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:.14, rootMargin:'0px 0px -7% 0px'});
  reveals.forEach((el,i)=>{ el.style.transitionDelay = Math.min(i%4,3)*70 + 'ms'; observer.observe(el); });
} else reveals.forEach(el=>el.classList.add('is-visible'));if (matchMedia('(pointer:fine)').matches && !reducedMotion) {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let rx=0, ry=0, tx=0, ty=0;
  window.addEventListener('mousemove',e=>{
    document.body.classList.add('has-cursor');
    tx=e.clientX; ty=e.clientY;
    if(dot){ dot.style.left=tx+'px'; dot.style.top=ty+'px'; }
  });
  const renderCursor=()=>{
    rx += (tx-rx)*.16; ry += (ty-ry)*.16;
    if(ring){ ring.style.left=rx+'px'; ring.style.top=ry+'px'; }
    requestAnimationFrame(renderCursor);
  };
  renderCursor();
  document.querySelectorAll('a,button,[data-tilt]').forEach(el=>{
    el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-active'));
    el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-active'));
  });

  document.querySelectorAll('.magnetic').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const x=(e.clientX-r.left-r.width/2)*.12;
      const y=(e.clientY-r.top-r.height/2)*.18;
      el.style.transform='translate('+x+'px,'+y+'px)';
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });  document.querySelectorAll('[data-tilt]').forEach(el=>{
    el.addEventListener('mousemove',e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5;
      const py=(e.clientY-r.top)/r.height-.5;
      el.style.transform='perspective(900px) rotateX('+(-py*3)+'deg) rotateY('+(px*4)+'deg) translateY(-3px)';
    });
    el.addEventListener('mouseleave',()=>el.style.transform='');
  });
}

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:reducedMotion?'auto':'smooth'}); }
  });
});

document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button');
    const original=btn.textContent;
    btn.textContent='Enquiry ready';
    setTimeout(()=>btn.textContent=original,2600);
  });
});