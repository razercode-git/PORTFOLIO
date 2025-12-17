document.addEventListener('DOMContentLoaded',function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  const menu = document.querySelector('.sidebar');
  const toggle = document.getElementById('menuToggle');
  if(toggle && menu){
    toggle.addEventListener('click',()=>menu.classList.toggle('open'));
    // close when clicking outside on small screens
    document.addEventListener('click',e=>{
      if(window.innerWidth<=900 && menu.classList.contains('open')){
        if(!menu.contains(e.target) && e.target!==toggle) menu.classList.remove('open');
      }
    });
  }

  // Basic contact form handler (no backend)
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      alert('Thanks! Message captured locally. Replace with real backend to send.');
      form.reset();
    });
  }
  // Add animated background element
  const landing = document.querySelector('.landing');
  if(landing){
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    landing.appendChild(bg);
  }

  // Custom cursor (dot + ring)
  const dot = document.createElement('div'); dot.className='cursor-dot';
  const ring = document.createElement('div'); ring.className='cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  let mouseX = -100, mouseY = -100, ringX = -100, ringY = -100;
  const lerp = (a,b,n)=> (1-n)*a + n*b;
  window.addEventListener('mousemove',e=>{
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });
  window.addEventListener('mousedown',()=>{ ring.classList.add('click'); setTimeout(()=>ring.classList.remove('click'),150); });
  // hover effects on interactive elements
  const interactives = document.querySelectorAll('a,button,.card');
  interactives.forEach(el=>{
    el.addEventListener('mouseenter',()=>{ ring.style.transform='translate(-50%,-50%) scale(1.3)'; dot.style.transform='translate(-50%,-50%) scale(0.6)'; });
    el.addEventListener('mouseleave',()=>{ ring.style.transform='translate(-50%,-50%) scale(1)'; dot.style.transform='translate(-50%,-50%) scale(1)'; });
  });
  function animateRing(){
    ringX = lerp(ringX, mouseX, 0.18);
    ringY = lerp(ringY, mouseY, 0.18);
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Scroll reveal for elements with .reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});
  reveals.forEach(r=>io.observe(r));

  // Auto-show sidebar when cursor is near left edge (desktop only)
  const sidebar = document.querySelector('.sidebar');
  let sidebarPinned = false; // if user toggles, respect manual toggle
  let initialTimeout = null; // timeout used to hide sidebar after initial show
  if(toggle){
    toggle.addEventListener('click', ()=>{
      // treat manual toggle as pinning until user clicks again
      sidebarPinned = sidebar.classList.contains('open');
      if(initialTimeout){ clearTimeout(initialTimeout); initialTimeout = null; }
    });
  }

  let hideTimeout = null;
  function tryShowSidebar(x){
    if(window.innerWidth <= 900) return;
    if(!sidebar) return;
    if(x <= 28){
      // show immediately
      sidebar.classList.add('open');
      if(initialTimeout){ clearTimeout(initialTimeout); initialTimeout = null; }
    } else if(x > 340){
      // hide after short delay unless pinned
      if(hideTimeout) clearTimeout(hideTimeout);
      hideTimeout = setTimeout(()=>{
        if(!sidebarPinned) sidebar.classList.remove('open');
      }, 220);
    }
  }

  // handle mousemove near left edge
  window.addEventListener('mousemove', (e)=>{
    tryShowSidebar(e.clientX);
  });

  // also show when sensor area is hovered (for accessibility)
  const sensor = document.createElement('div');
  sensor.style.position = 'fixed';
  sensor.style.left = '0';
  sensor.style.top = '0';
  sensor.style.width = '28px';
  sensor.style.height = '100vh';
  sensor.style.zIndex = '45';
  sensor.style.pointerEvents = 'auto';
  sensor.style.background = 'transparent';
  document.body.appendChild(sensor);
  sensor.addEventListener('mouseenter', ()=>{ if(window.innerWidth>900) { sidebar.classList.add('open'); if(initialTimeout){ clearTimeout(initialTimeout); initialTimeout = null; } } });
  sensor.addEventListener('mouseleave', ()=>{ if(window.innerWidth>900 && !sidebarPinned) sidebar.classList.remove('open'); });

  // Show sidebar on initial load briefly, then hide
  if(window.innerWidth > 900 && sidebar){
    sidebar.classList.add('open');
    // hide after 3 seconds unless user interacts
    initialTimeout = setTimeout(()=>{
      if(!sidebarPinned) sidebar.classList.remove('open');
      initialTimeout = null;
    }, 3000);
  }
});
