/* MathGenius – script.js
   ==================================================
   Logica front‑end dell’applicazione.
   Aggiunta modalità Full‑Screen (API Fullscreen) al rickroll.
*/

(() => {
  'use strict';

  // Assicuriamoci che l’intero DOM sia pronto prima di procedere
  document.addEventListener('DOMContentLoaded', init);

  // ────────────────────────────────────────────────────────────
  //  FUNZIONE DI AVVIO
  // ────────────────────────────────────────────────────────────
  function init () {
    // Helper query functions
    const qs  = (sel) => document.querySelector(sel);
    const qsa = (sel) => document.querySelectorAll(sel);

    // DOM --------------------------------------------------------------------
    const solveButton      = qs('#solveButton');
    const ctaButton        = qs('#ctaButton');
    const mathInput        = qs('#mathInput');
    const loadingModal     = qs('#loadingModal');
    const loadingText      = qs('#loadingText');
    const progressFill     = qs('#progressFill');
    const mobileMenuToggle = qs('#mobileMenuToggle');
    const suggestions      = qsa('.suggestion');
    const rickrollOverlay  = qs('#rickroll-overlay');
    const rickrollFrame    = qs('#rickroll-frame');
    const header           = qs('.header');
    const featureCards     = qsa('.feature-card');

    // Se #solveButton non esiste, avviso in console
    if (!solveButton) {
      console.warn('[MathGenius] elemento #solveButton non trovato – controlla l’HTML.');
    }

    // Messaggi di caricamento fake ------------------------------------------
    const loadingMessages = [
      "Analizzando l'equazione…",
      "Applicando algoritmi di deep learning…",
      "Processando simboli matematici…",
      "Calcolando soluzioni ottimali…",
      "Generando spiegazione dettagliata…",
      "Finalizzando risultati…"
    ];

    // ────────────────────────────────────────────────────────────
    //  FULLSCREEN UTILS
    // ────────────────────────────────────────────────────────────
    function enterFullscreen (elem = document.documentElement) {
      if (document.fullscreenElement) return; // già in fullscreen
      const req = elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen;
      if (req) {
        try { req.call(elem); } catch (err) { /* silenzioso */ }
      }
    }

    // ────────────────────────────────────────────────────────────
    //  AI PROCESSING + RICKROLL
    // ────────────────────────────────────────────────────────────
    function startAIProcessing () {
      // mostro la modal di caricamento
      loadingModal.style.display = 'block';
      document.body.style.overflow = 'hidden';

      let idx = 0;
      let progress = 0;
      const step = 100 / loadingMessages.length;

      const iv = setInterval(() => {
        if (idx < loadingMessages.length) {
          loadingText.textContent = loadingMessages[idx++];
          progress = Math.min(progress + step, 100);
          progressFill.style.width = `${progress}%`;
        }
      }, 500);

      setTimeout(() => {
        clearInterval(iv);
        progressFill.style.width = '100%';

        loadingModal.style.display = 'none';
        document.body.style.overflow = 'auto';

        // Rickroll overlay + video autoplay
        rickrollFrame.src =
          'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ';
        rickrollOverlay.style.display = 'block';

        // Prova ad andare in Full‑Screen
        enterFullscreen(rickrollOverlay);

        window.onbeforeunload = () => 'Sei sicuro di voler abbandonare MathGenius?';
      }, 3000);
    }

    // Event Listeners --------------------------------------------------------
    solveButton?.addEventListener('click', startAIProcessing);
    ctaButton  ?.addEventListener('click', startAIProcessing);

    mathInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        startAIProcessing();
      }
    });

    suggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const eq = btn.getAttribute('data-equation');
        mathInput.value = eq;
        mathInput.focus();
      });
    });

    mobileMenuToggle?.addEventListener('click', () => {
      document.body.classList.toggle('mobile-menu-open');
    });

    loadingModal?.addEventListener('click', (e) => {
      if (e.target === loadingModal) {
        loadingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });

    qsa('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const target = qs(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      if (!header) return;
      if (window.scrollY > 100) {
        header.style.background = 'rgba(255,255,255,.98)';
        header.style.boxShadow   = '0 2px 20px rgba(0,0,0,.1)';
      } else {
        header.style.background = 'rgba(255,255,255,.95)';
        header.style.boxShadow   = 'none';
      }
    });

    featureCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Animazione simboli matematici ------------------------------------------
    function createFloatingSymbol () {
      const symbols = ['∫','∑','∂','π','∞','√','α','β','γ','δ','θ','λ'];
      const el = document.createElement('div');
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.cssText = `
        position: fixed;
        font-size: 2rem;
        color: rgba(102,126,234,.1);
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp 8s linear forwards;`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 8000);
    }

    // Inseriamo @keyframes per l’animazione
    (() => {
      const style = document.createElement('style');
      style.textContent = `@keyframes floatUp { to { transform: translateY(-120vh) rotate(360deg); opacity: 0; } }`;
      document.head.appendChild(style);
    })();

    setInterval(createFloatingSymbol, 3000);

    // Developer console easter eggs -----------------------------------------
    console.log(`\n🧮 MathGenius Developer Console\n===============================\nComandi segreti:\n- mathgenius.solve('x^2 + 1 = 0')\n- mathgenius.rickroll()\n- mathgenius.credits()\nBuon divertimento! 🚀`);

    window.mathgenius = {
      solve: (equation) => {
        console.log(`🤖 Risolvendo: ${equation}`);
        console.log('📊 Risultato: la risposta è sempre 42 (secondo Douglas Adams)');
        return 42;
      },
      rickroll: () => {
        console.log('🎵 Never gonna give you up, never gonna let you down… 🎵');
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      },
      credits: () => {
        console.log('\n🏆 MathGenius Credits\n====================\nSviluppato con ❤️, ispirato a OpenAI / DeepMind / Wolfram Alpha\nEaster egg: Rick Astley approved ✅');
      }
    };

    // Performance log --------------------------------------------------------
    const navStart = performance.now();
    window.addEventListener('load', () => {
      const loadTime = (performance.now() - navStart).toFixed(2);
      console.log(`⚡ Pagina caricata in ${loadTime} ms`);
    });

    // Shortcuts + Konami -----------------------------------------------------
    const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'];
    let konamiPos = 0;

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        startAIProcessing();
        return;
      }
      konamiPos = (e.code === konami[konamiPos]) ? konamiPos + 1 : 0;
      if (konamiPos === konami.length) {
        console.log('🎮 Konami Code attivato!');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => (document.body.style.filter = 'none'), 3000);
        konamiPos = 0;
      }
    });
  }
})();
