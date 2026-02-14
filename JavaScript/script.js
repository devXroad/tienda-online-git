    (function() {
      // LENIS (scroll suave profesional)
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // GSAP ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);

      // Header cambio de estilo al scrollear
      const header = document.getElementById('main-header');
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');
      });

      // Cursor personalizado
      const cursor = document.querySelector('.custom-cursor');
      const follower = document.querySelector('.custom-cursor-follower');
      document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        follower.style.left = e.clientX + 'px';
        follower.style.top = e.clientY + 'px';
      });

      // REVEAL CARDS con GSAP
      gsap.utils.toArray('.exp-card').forEach((card, i) => {
        gsap.fromTo(card, 
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1
          }
        );
      });

      // Parallax text flotante
      gsap.to('#parallax1', {
        x: 300,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.8,
        }
      });

      // Tilt 3D efecto en tarjetas
      const tiltCards = document.querySelectorAll('[data-tilt]');
      tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
        });
      });

      // SISTEMA DE NAVEGACIÓN (subpáginas con experiencia)
      const navInicio = document.getElementById('nav-inicio');
      const navBaniadores = document.getElementById('nav-baniadores');
      const navZapatillas = document.getElementById('nav-zapatillas');
      const navChandal = document.getElementById('nav-chandal');
      
      const pages = {
        inicio: document.getElementById('page-inicio'),
        baniadores: document.getElementById('page-baniadores'),
        zapatillas: document.getElementById('page-zapatillas'),
        chandal: document.getElementById('page-chandal')
      };

      function activatePage(pageId) {
        Object.values(pages).forEach(p => p.classList.remove('active-page'));
        [navInicio, navBaniadores, navZapatillas, navChandal].forEach(l => l.classList.remove('active'));
        
        if (pageId === 'inicio') {
          pages.inicio.classList.add('active-page');
          navInicio.classList.add('active');
        } else if (pageId === 'baniadores') {
          pages.baniadores.classList.add('active-page');
          navBaniadores.classList.add('active');
        } else if (pageId === 'zapatillas') {
          pages.zapatillas.classList.add('active-page');
          navZapatillas.classList.add('active');
        } else if (pageId === 'chandal') {
          pages.chandal.classList.add('active-page');
          navChandal.classList.add('active');
        }
        lenis.scrollTo(0, { immediate: true, duration: 0 });
      }

      navInicio.addEventListener('click', (e) => { e.preventDefault(); activatePage('inicio'); });
      navBaniadores.addEventListener('click', (e) => { e.preventDefault(); activatePage('baniadores'); });
      navZapatillas.addEventListener('click', (e) => { e.preventDefault(); activatePage('zapatillas'); });
      navChandal.addEventListener('click', (e) => { e.preventDefault(); activatePage('chandal'); });

      document.querySelectorAll('a[href="index.html"], a[href="baniadores.html"], a[href="zapatillas.html"], a[href="chandal.html"]').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          if (link.href.includes('index')) activatePage('inicio');
          else if (link.href.includes('baniadores')) activatePage('baniadores');
          else if (link.href.includes('zapatillas')) activatePage('zapatillas');
          else if (link.href.includes('chandal')) activatePage('chandal');
        });
      });

      if (window.location.hash.includes('baniadores')) activatePage('baniadores');
      else if (window.location.hash.includes('zapatillas')) activatePage('zapatillas');
      else if (window.location.hash.includes('chandal')) activatePage('chandal');
      else activatePage('inicio');
    })();