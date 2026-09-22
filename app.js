
document.querySelectorAll('form[data-demo]').forEach(form=>{
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const btn=form.querySelector('button');
    const original=btn.textContent;
    btn.textContent='Enquiry ready';
    setTimeout(()=>btn.textContent=original,2600);
  });
});
