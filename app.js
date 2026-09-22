
const intro = document.querySelector('.intro');
if (intro) {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = sessionStorage.getItem('onlybm-intro-seen-v2');
  const finishIntro = () => {
    intro.classList.add('is-hidden');
    document.body.classList.remove('intro-lock');
    sessionStorage.setItem('onlybm-intro-seen-v2','1');
    setTimeout(()=>intro.remove(),1100);
  };
  if (seen || reduced) {
    intro.remove();
    document.body.classList.remove('intro-lock');
  } else {
    document.body.classList.add('intro-lock');
    const t = setTimeout(finishIntro, 5200);
    intro.addEventListener('click', ()=>{ clearTimeout(t); finishIntro(); }, {once:true});
    window.addEventListener('keydown', e=>{
      if (['Escape','Enter',' '].includes(e.key)) { clearTimeout(t); finishIntro(); }
    }, {once:true});
  }
}


document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button');
    const original=btn.textContent;
    btn.textContent='Enquiry ready';
    setTimeout(()=>btn.textContent=original,2600);
  });
});
