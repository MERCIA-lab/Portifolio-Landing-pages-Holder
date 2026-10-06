(() => {
  const defaults = [
    {id:'meek',name:'Meek',title:'Software Engineer & Network Administrator',discipline:'Technology',location:'Kigali, Rwanda',bio:'Building reliable digital systems, useful software experiences, and network infrastructure.',portfolioUrl:'meek/meek.html',photo:'assets/icons/meek.jpeg',featured:true,createdAt:'2025-01-01'},
    {id:'amen',name:'Amen',title:'Creative Professional',discipline:'Creative',location:'Kigali, Rwanda',bio:'Exploring creative ideas, digital experiences, and meaningful visual work.',portfolioUrl:'amen/amen.html',photo:'assets/icons/amen.png',featured:true,createdAt:'2025-01-02'},
    {id:'severien',name:'Severien',title:'Creative Professional',discipline:'Design',location:'Kigali, Rwanda',bio:'Exploring design, visual communication, and thoughtful digital experiences.',portfolioUrl:'severien/severien.html',photo:'assets/icons/severien.png',featured:true,createdAt:'2025-01-03'}
  ];
  const storageKey = 'portfolioProfiles';
  const grid = document.querySelector('#profile-grid');
  const search = document.querySelector('#profile-search');
  const sort = document.querySelector('#profile-sort');
  const empty = document.querySelector('#empty-state');
  const form = document.querySelector('#profile-form');
  const modal = document.querySelector('#profile-modal');
  let localProfiles = readLocalProfiles();
  let activeFilter = 'All';
  let lastFocus = null;

  function readLocalProfiles() {
    try { const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]'); return Array.isArray(parsed) ? parsed.filter(p => p && typeof p === 'object' && p.name && p.title && p.portfolioUrl) : []; }
    catch { return []; }
  }
  function saveLocalProfiles() {
    try { localStorage.setItem(storageKey, JSON.stringify(localProfiles)); return true; }
    catch { showToast('Storage is unavailable in this browser.'); return false; }
  }
  function safeHref(profile) {
    const url = String(profile.portfolioUrl || '#').trim();
    if (/^(https?:\/\/)/i.test(url)) return {href:url,external:true};
    if (/^(javascript:|data:|\/\/)/i.test(url)) return {href:'#',external:false};
    return {href:url,external:false};
  }
  function renderProfiles() {
    const term = (search.value || '').trim().toLowerCase();
    let profiles = [...defaults, ...localProfiles].filter((p,i,a) => a.findIndex(q => q.id === p.id) === i);
    profiles = profiles.filter(p => (activeFilter === 'All' || p.discipline.toLowerCase() === activeFilter.toLowerCase()) && [p.name,p.title,p.discipline,p.location,p.bio].some(v => String(v || '').toLowerCase().includes(term)));
    if (sort.value === 'az') profiles.sort((a,b) => a.name.localeCompare(b.name));
    else if (sort.value === 'za') profiles.sort((a,b) => b.name.localeCompare(a.name));
    else if (sort.value === 'newest') profiles.sort((a,b) => new Date(b.createdAt || 0)-new Date(a.createdAt || 0));
    else profiles.sort((a,b) => Number(Boolean(b.featured))-Number(Boolean(a.featured)) || a.name.localeCompare(b.name));
    grid.innerHTML = profiles.map((p,index) => {
      const link = safeHref(p);
      const initial = escapeHTML(p.name.trim().slice(0,1).toUpperCase());
      const portrait = p.photo ? `<img class="profile-photo photo-${escapeAttr(p.id)}" src="${escapeAttr(p.photo)}" alt="${escapeAttr(p.name)} portrait" loading="lazy">` : `<span class="portrait-letter" aria-hidden="true">${initial}</span>`;
      return `<article class="profile-card"><div class="profile-art"><span class="profile-discipline">${escapeHTML(p.discipline)}</span>${portrait}</div><div class="profile-info"><h3>${escapeHTML(p.name)}</h3><p class="profile-title">${escapeHTML(p.title)}</p><span class="profile-location"> ${escapeHTML(p.location)}</span><p class="profile-bio">${escapeHTML(p.bio)}</p><div class="card-bottom"><a href="${escapeAttr(link.href)}" ${link.external?'target="_blank" rel="noopener noreferrer"':''}>View profile </a></div></div></article>`;
    }).join('');
    grid.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;},{once:true}));
    empty.hidden = profiles.length !== 0;
    grid.hidden = profiles.length === 0;
  }
  function escapeHTML(value) { return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
  const escapeAttr = escapeHTML;
  function showToast(message) { const toast=document.querySelector('#toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('show'),2800); }
  function openModal() { lastFocus=document.activeElement; modal.hidden=false; document.body.style.overflow='hidden'; modal.querySelector('input').focus(); }
  function closeModal() { if (modal.hidden) return; modal.hidden=true; document.body.style.overflow=''; form.reset(); clearErrors(); if(lastFocus) lastFocus.focus(); }
  function clearErrors() { form.querySelectorAll('label').forEach(label=>{const small=label.querySelector('small'); if(small) small.textContent='';}); }
  function setError(input,message) { const small=input.closest('label').querySelector('small'); if(small) small.textContent=message; }
  function handleSubmit(event) {
    event.preventDefault(); clearErrors(); let valid=true;
    const data=Object.fromEntries(new FormData(form).entries());
    for(const key of ['name','title','discipline','location','bio','portfolioUrl']) { const input=form.elements[key]; if(!String(data[key]||'').trim()){setError(input,'Please complete this field.');valid=false;} }
    if(data.portfolioUrl && !/^https?:\/\//i.test(data.portfolioUrl.trim())){setError(form.elements.portfolioUrl,'Use a URL beginning with http:// or https://.');valid=false;}
    try { if(data.portfolioUrl && !['http:','https:'].includes(new URL(data.portfolioUrl).protocol)) throw new Error(); } catch { if(data.portfolioUrl){setError(form.elements.portfolioUrl,'Enter a valid portfolio URL.');valid=false;} }
    if(!valid) { form.querySelector('small:not(:empty)')?.closest('label')?.querySelector('input,select,textarea')?.focus(); return; }
    const id=`profile-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
    localProfiles.unshift({id,name:data.name.trim(),title:data.title.trim(),discipline:data.discipline,location:data.location.trim(),bio:data.bio.trim(),portfolioUrl:data.portfolioUrl.trim(),featured:false,createdAt:new Date().toISOString()});
    saveLocalProfiles(); renderProfiles(); closeModal(); showToast('Profile added successfully.');
  }
  document.querySelectorAll('[data-open-modal]').forEach(button=>button.addEventListener('click',openModal));
  document.querySelector('.modal-close').addEventListener('click',closeModal);
  modal.addEventListener('click',event=>{if(event.target===modal) closeModal();});
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'){
      closeModal();
      document.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
      document.querySelector('#nav-links')?.classList.remove('is-open');
    }
    if(event.key==='Tab' && !modal.hidden){
      const focusable=[...modal.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),a[href]')].filter(el=>el.offsetParent!==null);
      const first=focusable[0],last=focusable[focusable.length-1];
      if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
    }
  });
  form.addEventListener('submit',handleSubmit);
  search.addEventListener('input',renderProfiles); sort.addEventListener('change',renderProfiles);
  document.querySelectorAll('.filter-chip').forEach(button=>button.addEventListener('click',()=>{activeFilter=button.dataset.filter;document.querySelectorAll('.filter-chip').forEach(chip=>{const active=chip===button;chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));});renderProfiles();}));
  document.querySelector('#clear-search').addEventListener('click',()=>{search.value='';activeFilter='All';document.querySelectorAll('.filter-chip').forEach(chip=>{const active=chip.dataset.filter==='All';chip.classList.toggle('active',active);chip.setAttribute('aria-pressed',String(active));});renderProfiles();search.focus();});
  const toggle=document.querySelector('.menu-toggle'), nav=document.querySelector('#nav-links');
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);});
  nav.addEventListener('click',event=>{if(event.target.closest('a,button')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}});
  document.addEventListener('click',event=>{if(nav.classList.contains('is-open') && !event.target.closest('.site-header')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');}});
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus();}});
  document.querySelectorAll('.faq-list details').forEach(detail=>detail.addEventListener('toggle',()=>{if(detail.open)document.querySelectorAll('.faq-list details').forEach(other=>{if(other!==detail)other.open=false;});}));
  document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;},{once:true}));
  renderProfiles();
  if(window.location.hash==='#add-profile') openModal();
})();
