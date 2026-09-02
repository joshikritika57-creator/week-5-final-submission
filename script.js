const app=document.querySelector("#app");
const backButton=document.querySelector("#backButton");

const pages={
home:{title:"Build better digital experiences.",html:`<section class="view hero" aria-labelledby="home-title"><div><p class="eyebrow">Single Page Application</p><h1 id="home-title">One page. Smooth navigation. No reloads.</h1><p>Welcome to Innova, a small SPA simulation using plain HTML, CSS and JavaScript. Navigation changes the URL and updates only the main content area.</p><a class="button" href="#/services" data-route="services">Explore services</a></div><div class="stat-card"><strong>SPA</strong><span>Client-side routing</span></div></section>`},
services:{title:"Services",html:`<section class="view" aria-labelledby="services-title"><p class="eyebrow">What we do</p><h1 class="section-title" id="services-title">Services</h1><div class="cards"><article class="card"><div class="icon" aria-hidden="true">⚡</div><h3>Performance</h3><p>Lightweight interfaces designed for fast loading and responsive experiences.</p></article><article class="card"><div class="icon" aria-hidden="true">🎨</div><h3>UI Design</h3><p>Clean, accessible and user-friendly layouts that remain consistent across devices.</p></article><article class="card"><div class="icon" aria-hidden="true">💻</div><h3>Web Development</h3><p>Semantic HTML, modern CSS and JavaScript-driven experiences built for the web.</p></article></div></section>`},
about:{title:"About",html:`<section class="view" aria-labelledby="about-title"><p class="eyebrow">Our approach</p><h1 class="section-title" id="about-title">About Innova</h1><div class="about-grid"><article class="panel"><h2>Why a SPA?</h2><p>A single page application can update content dynamically without requesting a completely new document for every navigation action.</p></article><article class="panel"><h2>How it works</h2><p>The application reads the current hash, selects a view, updates the DOM, and keeps navigation smooth without a full page reload.</p></article></div></section>`},
contact:{title:"Contact",html:`<section class="view" aria-labelledby="contact-title"><p class="eyebrow">Let's connect</p><h1 class="section-title" id="contact-title">Contact</h1><form class="contact-form" id="contactForm" novalidate><div class="field"><label for="name">Name</label><input id="name" name="name" type="text" required><p class="error" id="nameError" aria-live="polite"></p></div><div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required><p class="error" id="emailError" aria-live="polite"></p></div><div class="field"><label for="message">Message</label><textarea id="message" rows="4" required></textarea><p class="error" id="messageError" aria-live="polite"></p></div><button class="button" type="submit">Send message</button><p class="status" id="formStatus" role="status" aria-live="polite"></p></form></section>`}
};

function routeFromHash(){
 const hash=location.hash.replace(/^#\/?/,"").replace(/\/+$/,"");
 return hash===""?"home":(pages[hash]?hash:"not-found");
}
function render(route){
 if(route==="not-found"){
  app.innerHTML=`<section class="view not-found"><p class="eyebrow">404</p><h1 class="section-title">Page not found</h1><p>The requested route does not exist.</p><a class="button" href="#/" data-route="home">Return home</a></section>`;
 }else app.innerHTML=pages[route].html;
 document.title=route==="not-found"?"Innova | Page Not Found":`Innova | ${pages[route].title}`;
 document.querySelectorAll("nav a[data-route]").forEach(link=>{
  const active=link.dataset.route===route;
  link.classList.toggle("active",active);
  active?link.setAttribute("aria-current","page"):link.removeAttribute("aria-current");
 });
 bindViewEvents();bindContactForm();window.scrollTo({top:0,behavior:"smooth"});app.focus({preventScroll:true});
}
function navigate(route){
 const target=route==="home"?"#/":`#/${route}`;
 if(location.hash===target)render(route);else location.hash=target;
}
function bindViewEvents(){
 document.querySelectorAll("[data-route]").forEach(link=>link.addEventListener("click",e=>{e.preventDefault();navigate(link.dataset.route)}));
}
function bindContactForm(){
 const form=document.querySelector("#contactForm");if(!form)return;
 form.addEventListener("submit",e=>{
  e.preventDefault();
  const name=document.querySelector("#name"),email=document.querySelector("#email"),message=document.querySelector("#message");
  const ne=document.querySelector("#nameError"),ee=document.querySelector("#emailError"),me=document.querySelector("#messageError"),status=document.querySelector("#formStatus");
  ne.textContent=name.value.trim()?"":"Please enter your name.";
  ee.textContent=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())?"":"Please enter a valid email.";
  me.textContent=message.value.trim()?"":"Please enter a message.";
  status.textContent="";
  if(ne.textContent||ee.textContent||me.textContent)return;
  status.textContent="Thank you! Your message was submitted successfully.";form.reset();
 });
}
window.addEventListener("hashchange",()=>render(routeFromHash()));
window.addEventListener("popstate",()=>render(routeFromHash()));
backButton.addEventListener("click",()=>history.length>1&&location.hash!=="#/"?history.back():navigate("home"));
render(routeFromHash());
