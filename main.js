// Shashwattech Ultra-Premium SPA
// Custom dynamic structure, icons and SPA nav

// SVG abstract animated lines background
const svgBG = `<svg id='background-svg' viewBox='0 0 1800 1000' fill='none' xmlns='http://www.w3.org/2000/svg'>
<g stroke="#E5E5E5" stroke-width="2">
<rect x="150" y="150" width="1500" height="700" rx="80"/><rect x="490" y="260" width="820" height="480" rx="69" opacity="0.60"/>
</g>
<g stroke="#E5E5E5" stroke-width="1.3" opacity="0.38">
<rect x="310" y="205" width="1180" height="590" rx="64"/>
<rect x="650" y="380" width="500" height="250" rx="32" opacity=".70"/>
</g>
<g stroke="#2B2BBA" stroke-width="1.8" opacity="0.057">
<rect x="22" y="40" width="1760" height="930" rx="118"/>
</g>
<g><animate attributeName="x" values="0;50;0" dur="11s" repeatCount="indefinite"/></g>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('bg-abstract').innerHTML = svgBG;
  renderSPA();
});

const pages = {};
function renderSPA() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  root.appendChild(Header());
  const main = document.createElement('main');
  root.appendChild(main);
  root.appendChild(Footer());
  pages.home = Home;
  pages.about = About;
  pages.services = Services;
  pages.projects = Projects; // Correctly maps to the Projects function
  pages.contact = Contact;
  navigate(window.location.hash.replace('#', '') || 'home');
}

function el(tag, attrs = {}, children = []) {
  const $el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => (k.startsWith('on') ? $el.addEventListener(k.slice(2).toLowerCase(), v) : $el.setAttribute(k, v)));
  (Array.isArray(children) ? children : [children]).forEach(child => {
    if (typeof child === 'string') $el.appendChild(document.createTextNode(child));
    else if (child) $el.appendChild(child);
  });
  return $el;
}

function navigate(page) {
  if(window.location.hash !== `#${page}`) window.location.hash = `#${page}`;
  document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
  const activeA = document.querySelector(`nav a[data-page="${page}"]`);
  if(activeA) activeA.classList.add('active');
  const main = document.querySelector('main');
  main.innerHTML = '';
  const sec = pages[page]();
  sec.classList.add('section');
  main.appendChild(sec);
  setTimeout(()=>sec.classList.add('visible'),33);
  window.scrollTo(0,0);
}
window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  if(pages[page]) navigate(page);
});

// --- HEADER WITH LOGO (Asset 4.png) --- //
function Header() {
  return el('header', {}, [
    // Logo container: Displaying Asset 4.png
    el('div', { class: 'logo', onclick: () => navigate('home') }, [
      el('img', { src: 'Asset 4.png', alt: 'Shashwattech Logo' }) 
    ]),
    el('nav', {}, [
      el('a', { href: '#home', 'data-page': 'home' }, 'Home'),
      el('a', { href: '#about', 'data-page': 'about' }, 'About'),
      el('a', { href: '#services', 'data-page': 'services' }, 'Services'),
      el('a', { href: '#projects', 'data-page': 'projects' }, 'Projects'),
      el('a', { href: '#contact', 'data-page': 'contact' }, 'Contact')
    ])
  ]);
}

function Footer() {
  return el('footer', { style: 'padding:30px 0 18px 0;text-align:center;opacity:0.87;font-size:1rem;margin-top:66px;' },
    `© ${(new Date()).getFullYear()} Shashwattech. All rights reserved.`)
}

// --- PAGE RENDERERS --- //
function Home() {
  return el('section', { class: 'hero' }, [
    el('h1', {}, 'Engineering Digital Foundations That Last.'),
    el('div', { class: 'tagline' }, 'Shashwattech – Your Strategic Technology Partner'),
    el('span', { class: 'hero-support' }, 'From strategy to execution, we build technology designed for growth.'),
    el('div', { class: 'cta-row' }, [
      el('button', { class: 'cta', onclick: () => navigate('contact') }, 'Start a Project'),
      el('button', { class: 'cta secondary', onclick: () => navigate('services') }, 'Explore Services')
    ]),
    MetricsBar(),
    CapabilitiesPreview(),
    WhyShashwattech()
  ]);
}

// --- UPDATED STATS --- //
function MetricsBar() {
  const metrics = [
    { num: '1', desc: 'Years Experience' },   // Updated to 10+
    { num: '1', desc: 'Projects Delivered' }, // Updated to 70+
    { num: '99.9%', desc: 'Delivery Reliability' }
  ];
  return el('div', { class: 'metric-bar' }, metrics.map(m => 
    el('div', { class: 'metric' }, [
      el('div', { class: 'metric-num' }, m.num),
      el('div', { class: 'metric-desc' }, m.desc)
    ])
  ));
}

function svgEl(inner) { const div=document.createElement('span'); div.innerHTML = inner; return div.firstChild; }

function CapabilitiesPreview() {
  const caps = [
    {title:'Website Development',icon:'<svg fill="none" stroke="#2B2BBA" stroke-width="2.3" viewBox="0 0 28 28"><rect x="3" y="5" width="22" height="14" rx="3" fill="#CACACA"/><rect x="10" y="21" width="8" height="2" rx="1" fill="#2B2BBA"/></svg>',desc:'Enterprise-grade, strategy-led, performance-optimized web platforms.'},
    {title:'Backend Engineering',icon:'<svg fill="none" viewBox="0 0 28 28"><ellipse cx="14" cy="7.5" rx="10" ry="4.5" fill="#CACACA"/><ellipse cx="14" cy="14" rx="10" ry="4.5" fill="#E5E5E5"/><ellipse cx="14" cy="20.5" rx="10" ry="4.5" fill="#CACACA"/></svg>',desc:'APIs and systems built for security, scalability and speed.'},
    {title:'Full-Stack Development',icon:'<svg fill="none" viewBox="0 0 28 28"><circle fill="#2B2BBA" cx="14" cy="14" r="12"/><circle fill="#CACACA" cx="14" cy="14" r="7"/></svg>',desc:'Integrated solutions, from UX to deployment, with end-to-end ownership.'},
    {title:'UI/UX Design Systems',icon:'<svg fill="#CACACA" viewBox="0 0 28 28"><rect x="4" y="8" width="20" height="12" rx="5"/><rect fill="#2B2BBA" x="8" y="14" width="12" height="2" rx="1"/></svg>',desc:'Brand-defining interfaces, beautiful & accessible by default.'}
  ];
  return el('div', { class: 'capabilities' }, caps.map(c => el('div', { class: 'cap-card' }, [svgEl(c.icon), el('div', { class: 'cap-card-title' }, c.title), el('div', { class: 'cap-card-desc' }, c.desc)])));
}
function WhyShashwattech() {
  const items = [
    {icon:'<svg fill="#fff" viewBox="0 0 27 27"><rect x="6" y="2.5" width="15" height="12" rx="4"/><rect fill="#E74A00" x="8" y="10" width="11" height="2.6" rx="1.2"/></svg>',title:'Long-term Thinking',desc:'We build for adaptability and longevity, not quick fixes.'},
    {icon:'<svg fill="#fff" viewBox="0 0 27 27"><rect x="2" y="7" width="23" height="12" rx="5"/><rect fill="#2B2BBA" x="9" y="11.7" width="9" height="2.6" rx="1.3"/></svg>',title:'End-to-End Ownership',desc:'From discovery to launch and beyond, we’re with you at every phase.'},
    {icon:'<svg fill="#fff" viewBox="0 0 27 27"><ellipse cx="13.5" cy="13.5" rx="12" ry="8"/><ellipse fill="#2B2BBA" cx="13.5" cy="13.5" rx="5" ry="3.5"/></svg>',title:'Speed Without Compromise',desc:'Move fast, but with proven process and engineering rigor.'}
  ];
  return el('div', { class: 'why-row' }, items.map(c => el('div', { class: 'why-card' }, [svgEl(c.icon), el('div', { class: 'why-title' }, c.title), el('div', { class: 'why-desc' }, c.desc)])));
}

function About() {
  return el('section', {}, [
    el('h2', { style: 'font-size:2rem;font-weight:900;margin-bottom:8px;' }, 'Our Origin Story'),
    el('div', { style: 'margin-bottom:20px;font-weight:500;font-size:1.07rem;' }, 'Shashwattech was founded by lifelong friends Keval and Himanshu, united by a shared belief that technology should be purposeful, scalable, and built to endure. What began as a passion for innovation evolved into a company dedicated to crafting reliable digital systems that empower businesses to grow with confidence.'),
    el('div', { class: 'timeline' }, [
      TimelinePoint('Mission', 'Build technology that outlives trends.'),
      TimelinePoint('Vision', 'Become your most trusted long-term technology partner.')
    ])
  ]);
}
function TimelinePoint(title, desc) {
  return el('div', { class: 'timeline-point' }, [
    el('div', { class: 'timeline-dot' }),
    el('div', { class: 'timeline-content' }, [el('div', { class: 'timeline-title' }, title), el('div', { class: 'timeline-desc' }, desc)])
  ]);
}

function Services() {
  const services = [
    {icon:'<svg fill="none" stroke="#2B2BBA" stroke-width="2.6" viewBox="0 0 32 32"><rect fill="#CACACA" x="3" y="7" width="26" height="16" rx="4"/></svg>',title:'Website Development',desc:'Websites engineered for scalability, speed, and real-world results.',highlight:true},
    {icon:'<svg fill="#E5E5E5" viewBox="0 0 32 32"><ellipse cx="16" cy="8.5" rx="11" ry="4.5"/><ellipse fill="#CACACA" cx="16" cy="16" rx="11" ry="4.5"/><ellipse fill="#E5E5E5" cx="16" cy="24.5" rx="11" ry="4.5"/></svg>',title:'Backend Engineering',desc:'Secure APIs and architectures, purpose-built for scale.'},
    {icon:'<svg fill="none" viewBox="0 0 32 32"><circle fill="#2B2BBA" cx="16" cy="16" r="13"/><circle fill="#CACACA" cx="16" cy="16" r="8"/></svg>',title:'Full-Stack Development',desc:'End-to-end delivery with unified business impact.'},
    {icon:'<svg fill="#CACACA" viewBox="0 0 32 32"><rect x="6" y="10" width="20" height="12" rx="5"/><rect fill="#2B2BBA" x="12" y="18.5" width="8" height="2.7" rx="1.3"/></svg>',title:'UI/UX Design Systems',desc:'Design systems ready for enterprise-level growth.'}
  ];
  return el('section', {}, [
    el('h2', { style: 'font-size:2rem;font-weight:900;margin-bottom:19px;' }, 'Our Capabilities'),
    el('div', { class: 'services-grid' }, services.map(s =>
      el('div', { class: 'service-card', tabindex:0 }, [svgEl(s.icon), el('div', { class: 'service-title' }, s.title), el('div', { class: 'service-desc' }, s.desc)])))
  ]);
}

// --- PROJECTS SECTION (Updated: MMH Contractor) --- //
function Projects() {
  const projects = [
    {
      title: 'MMH Contractor',
      desc: 'A comprehensive digital platform for construction and contracting services.',
      url: 'https://mistry-jeji.vercel.app/',
      cta: 'Visit Website'
    }
  ];
  return el('section', {}, [
    el('h2', { style: 'font-size:2rem;font-weight:900;margin-bottom:19px;' }, 'Our Work'),
    el('div', { class: 'projects-grid' }, projects.map(p =>
      el('div', { 
        class: 'project-card', 
        onmouseenter:e=>e.currentTarget.style.transform='translateY(-6px) scale(1.012)',
        onmouseleave:e=>e.currentTarget.style.transform='' 
      }, [
        el('div', { class: 'project-title' }, p.title), 
        el('div', { class: 'project-desc' }, p.desc), 
        el('button', { class: 'cta secondary', onclick:()=>window.open(p.url, '_blank') }, p.cta)
      ])))
  ]);
}

function Contact() {
  return el('section', { class: 'contact-section' }, [
    el('h2', {}, 'Build With Shashwattech'),
    el('div', { class: 'mail-direct' }, [
      'Prefer direct email? ',
      el('a', { href: 'mailto:shashwattechinfo@gmail.com' }, 'shashwattechinfo@gmail.com')
    ]),
    el('form', {
      class: 'contact-form',
      id: 'contact-form',
      style: 'width:100%' }, [
      ContactField('Full Name', 'name', true),
      ContactField('Work Email', 'email', true, 'email'),
      ContactField('Company', 'company', false),
      ContactTextArea('How can we help?', 'message', true),
      el('button', { type: 'submit', class: 'cta', style:'margin-top:9px;'}, 'Send Message'),
      el('div', { id: 'form-confirm' }, 'Thank you! We’ll be in touch within 1 business day.')
    ]),
    el('div', { style:'color:var(--deep-blue);font-size:1.03rem;font-weight:600;margin-top:7px;opacity:0.89;' }, 'We typically respond within 1 business day. Your inquiry will be treated with utmost confidentiality.')
  ]);
}
function ContactField(label, name, required, type='text') {
  return el('label', {}, [
    el('span', { class: 'input-label' }, label),
    el('input', { name, type, required, class: 'input', autocomplete: 'on' })
  ]);
}
function ContactTextArea(label, name, required) {
  return el('label', {}, [
    el('span', { class: 'input-label' }, label),
    el('textarea', { name, required, rows: 4, class: 'textarea', autocomplete: 'on' })
  ]);
}

addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      // basic validation
      const fd = new FormData(form);
      if (!fd.get('name') || !fd.get('email') || !fd.get('message')) return alert('Please fill all required fields.');
      document.getElementById('form-confirm').style.display = 'block';
      form.reset();
    });
  }
});

