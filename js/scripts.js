document.addEventListener("DOMContentLoaded", () => {

  // NAVBAR SCROLL
  const navbar = document.querySelector(".luxury-nav");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  // SCROLL SUAVE
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth"
      });
    }
  });

  // FADE IN
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".fade-in-on-scroll")
    .forEach(el => observer.observe(el));

  // MENU HAMBURGUESA
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const navbarToggler = document.querySelector(".navbar-toggler");

  document.addEventListener("click", (e) => {
    if (!navbarCollapse.contains(e.target) && 
        !navbarToggler.contains(e.target)) {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    }
  });

  document.querySelectorAll(".navbar-nav a").forEach(link => {
    link.addEventListener("click", () => {
      bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
    });
  });

  // VIDEO SLIDER
  const slides = document.querySelectorAll(".video-slide");
  let current = 0;

  function showSlide(i) {
    slides.forEach((s, idx) => 
      s.classList.toggle("active", idx === i));
  }

  document.addEventListener("click", e => {
    if (e.target.matches(".video-nav.next")) {
      current = (current + 1) % slides.length;
      showSlide(current);
    }
    if (e.target.matches(".video-nav.prev")) {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    }
  });

  // PAUSAR OTROS VIDEOS
  document.addEventListener("play", e => {
    if (e.target.tagName === "VIDEO") {
      document.querySelectorAll("video").forEach(v => {
        if (v !== e.target) v.pause();
      });
    }
  }, true);

  // LOGO SCROLL TOP
  const logo = document.querySelector(".navbar-brand");
  if (logo) {
    logo.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // FORM WHATSAPP
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      const ids = ["nombre","edad","instrumento",
                   "tieneInstrumento","mensaje"];

      const values = ids.map(id =>
        encodeURIComponent(
          document.getElementById(id).value.trim()
        )
      );

      const url = `https://wa.me/50687907832?text=
Hola,%20quiero%20unirme%20a%20la%20Banda%20Melorítmica%20San%20Joaquín%0A
Nombre:%20${values[0]}%0A
Edad:%20${values[1]}%0A
Instrumento:%20${values[2]}%0A
Tiene:%20${values[3]}%0A
Mensaje:%20${values[4]}`;

      window.open(url, "_blank");
    });
  }

  // EVITAR SCROLL RESTORE
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  // SCROLL-TO-TOP BUTTON
  const scrollBtn = document.querySelector('.scroll-top');
  if (scrollBtn) {
    const toggleScrollBtn = () => {
      if (window.scrollY > 300) scrollBtn.classList.add('show');
      else scrollBtn.classList.remove('show');
    };

    toggleScrollBtn();
    window.addEventListener('scroll', toggleScrollBtn);

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      scrollBtn.blur();
    });
  }

  // GALERÍA: asegurar que siempre se vea toda la imagen.
  // - Forzar object-fit: contain en todas las imágenes.
  // - Para retratos (h > w) usar width:auto + height:100% y sesgo superior para mostrar la cabeza.
  (function adjustGalleryImages() {
    const imgs = document.querySelectorAll('#fotos .img-container img, .gallery-frame img');
    imgs.forEach(img => {
      function apply() {
        const w = img.naturalWidth || img.width;
        const h = img.naturalHeight || img.height;
        if (!w || !h) return;

        // Ensure container is a flex center (reinforce CSS)
        if (parent) {
          parent.style.display = 'flex';
          parent.style.alignItems = 'center';
          parent.style.justifyContent = 'center';
          parent.style.overflow = 'hidden';
        }

        // base: mostrar imagen completa
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.margin = 'auto';

        if (h > w) {
          // vertical: usar height 100% y width auto, centrar imagen
          img.style.height = '100%';
          img.style.width = 'auto';
          img.style.objectPosition = '50% 50%';
        } else {
          // horizontal or square: usar width 100% y height auto
          img.style.width = '100%';
          img.style.height = 'auto';
          img.style.objectPosition = '50% 50%';
        }
      }

      if (img.complete) apply(); else img.addEventListener('load', apply);
      const ro = new ResizeObserver(() => apply());
      ro.observe(img);
    });
  })();

  // Gallery: no modifications here; images use <img> with object-fit: cover managed by CSS.

});
const popup = document.getElementById("socialPopup");

function mostrarPopup(){

    const tamaño = 90;

    const margen = 20;

    const navbar = 90;

    const x = Math.random() * (window.innerWidth - tamaño - margen);

    const y = navbar + Math.random() * (window.innerHeight - tamaño - navbar - margen);

    popup.style.left = x + "px";
    popup.style.top = y + "px";

    popup.style.display = "block";
    popup.style.opacity = "1";

    setTimeout(() => {

        popup.style.opacity = "0";

        setTimeout(() => {

            popup.style.display = "none";

        },500);

    },20000);

}

mostrarPopup();

setInterval(mostrarPopup,40000);
