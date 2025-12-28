document.addEventListener('DOMContentLoaded', ()=>{
  // Hamburger
  const btn = document.querySelector('.c9c5b815636');
  const nav = document.querySelector('.c3f6ecb3953');
  if (btn && nav) {
    btn.addEventListener('click', ()=>{
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Auto-fallback cho NEWS_EXCERPT nếu chưa được build (tránh hiện token)
  const newsEl = document.querySelector('[data-news-excerpt]');
  if (newsEl && /\{\{NEWS_EXCERPT\}\}/.test(newsEl.textContent)) {
    const missionRaw = "We are a 501(c)(3) organization advancing community services, education, and direct relief through transparent programs, local partnerships, and measurable outcomes. Our team prioritizes accountability and client dignity.";
    const mission = /\{\{MISSION\}\}/.test(missionRaw) ? "" : missionRaw;
    const fallback = mission
      ? (mission.split('.').slice(0,2).join('. ').trim() + '.')
      : "We share periodic updates on our programs and community impact.";
    newsEl.textContent = fallback;
  }

  // Gắn build id để khác fingerprint
  document.documentElement.setAttribute('data-build','65f428052bdb00c469f5fba8713e4e3f');
});

// pretty-url rewrite for Vercel (only on http/https)
(function(){
  try{
    if (!/^https?:/.test(location.protocol)) return;
    var anchors = document.querySelectorAll('a[href$=".html"]');
    anchors.forEach(function(a){
      var href = a.getAttribute('href') || '';
      if (/^https?:\/\//i.test(href) || href.indexOf('index.html')>-1) return;
      if (!href.startsWith('/') && !href.startsWith('./') && !href.startsWith('../')){
        var clean = href.replace(/\.html$/i,'');
        a.setAttribute('href', '/' + clean.replace(/^\/+/,''));
      }
    });
  }catch(e){}
})();
