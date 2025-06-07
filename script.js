/* MathGenius – script.js
   ==================================================
   Tutta la logica front‑end dell’applicazione.
   Compatibile con tutti i browser moderni.
*/

/*
 * Avviamo il codice solo dopo che il DOM è pronto.
 * Se includi <script src="script.js" defer></script> subito prima di </body>,
 * questa precauzione non è strettamente necessaria ma rende il file ri‑usabile
 * anche se spostato altrove.
*/
(() => {
  'use strict';

  // ────────────────────────────────────────────────────────────
  //  DOM ELEMENTS
  // ────────────────────────────────────────────────────────────
  const qs   = (sel)  => document.querySelector(sel);
  const qsa  = (sel)  => document.querySelectorAll(sel);

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

  // ────────────────────────────────────────────────────────────
  //  LOADING MESSAGES
  // ────────────────────────────────────────────────────────────
  const loadingMessages = [
    "Analizzando l'equazione…",
    "Applicando algoritmi di deep learning…",
    "Processando simboli matematici…",
    "Calcolando soluzioni ottimali…",
    "Generando spiegazione dettagliata…",
    "Finalizzando risultati…"
  ];

  // ────────────────────────────────────────────────────────────
  //  UTILITIES
  // ────────────────────────────────────────────────────────────
  const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

  // ────────────────────────────────────────────────────────────
  //  AI PROCESSING SIMULATION + RICKROLL EASTER EGG
  // ────────────────────────────────────────────────────────────
  function startAIProcessing () {
    // mostra la modal
    loadingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    let idx = 0;
    let progress = 0;

    const step = 100 / loadingMessages.length;

    const iv = setInterval(() => {
      if (idx < loadingMessages.length) {
        loadingText.textContent = loadingMessages[idx++];
        progress = clamp(progress + step, 0, 100);
        progressFill.style.width = `${progress}%`;
      }
    }, 500);

    // finto tempo di calcolo (3 s)
    setTimeout(() => {
      clearInterval(iv);
      progressFill.style.width = '100%';

      // chiude la modal
      loadingModal.style.display = 'none';
      document.body.style.overflow = 'auto';

      // “Mai darò su…” 🎵
      rickrollFrame.src =
        'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&loop=1&playlist=dQw4w9WgXcQ';
      rickrollOverlay.style.display = 'block';

      // chiede conferma se l’utente prova a lasciare la pagina
      window.onbeforeunload = () => {
        return 'Sei sicuro di voler abbandonare MathGenius?';
      };
    }, 3000);
  }

  // ────────────────────────────────────────────────────────────
  //  EVENT LISTENERS
  // ────────────────────────────────────────────────────────────

  // Pulsanti principali
  solveButton?.addEventListener('click', startAIProcessing);
  ctaButton  ?.addEventListener('click', startAIProcessing);

  // Enter nella casella di testo
  mathInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      startAIProcessing();
    }
  });

  // Suggerimenti rapidi
  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const eq = btn.getAttribute('data-equation');
      mathInput.value = eq;
      mathInput.focus();
    });
  });

  // Toggle menu mobile (da espandere se necessario)
  mobileMenuToggle?.addEventListener('click', () => {
    document.body.classList.toggle('mobile-menu-open');
  });

  // Chiudi modal facendo clic fuori dal contenuto
  loadingModal?.addEventListener('click', (e) => {
    if (e.target === loadingModal) {
      loadingModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });

  // Scroll morbido sui link ancora interni
  qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = qs(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Effetto header dopo scroll
  window.addEventListener('scroll', () => {
    if (!header) return;
    if (window.scrollY > 100) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow   = '0 2px 20px rgba(0,0,0,.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow   = 'none';
    }
  });

  // Hover/tilt leggero sulle feature card
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // ────────────────────────────────────────────────────────────
  //  ANIMAZIONE SIMBOLI MATEMATICI FLUTTUANTI
  // ────────────────────────────────────────────────────────────
  function createFloatingSymbol () {
    const symbols = ['∫', '∑', '∂', 'π', '∞', '√', 'α', 'β', 'γ', 'δ', 'θ', 'λ'];
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
      animation: floatUp 8s linear forwards;
    `;

    document.body.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  }

  // Aggiungiamo il @keyframes floatUp al volo (una sola volta)
  (() => {
    const style = document.createElement('style');
    style.textContent = `@keyframes floatUp { to { transform: translateY(-120vh) rotate(360deg); opacity: 0; } }`;
    document.head.appendChild(style);
  })();

  // Fa apparire un simbolo ogni 3 s
  setInterval(createFloatingSymbol, 3000);

  // ────────────────────────────────────────────────────────────
  //  DEVELOPER CONSOLE EASTER EGGS
  // ────────────────────────────────────────────────────────────
  console.log(`\n🧮 MathGenius Developer Console\n===============================\nHai trovato la console! Ecco alcuni comandi segreti:\n\n- mathgenius.solve("x^2 + 1 = 0") // Risolve equazioni immaginarie\n- mathgenius.rickroll()           // Indovina cosa fa…\n- mathgenius.credits()            // Mostra i crediti\n\nDivertiti a sperimentare! 🚀\n`);

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
      console.log(`\n🏆 MathGenius Credits\n====================\nSviluppato con ❤️ per dimostrare le potenzialità dell'AI\nDesign ispirato a: OpenAI, DeepMind, Wolfram Alpha\nEaster egg: Rick Astley approved ✅\n`);
    }
  };

  // ────────────────────────────────────────────────────────────
  //  PERFORMANCE MONITORING
  // ────────────────────────────────────────────────────────────
  let navigationStart = performance.now();
  window.addEventListener('load', () => {
    const loadTime = performance.now() - navigationStart;
    console.log(`⚡ Pagina caricata in ${loadTime.toFixed(2)} ms`);
  });

  // ────────────────────────────────────────────────────────────
  //  KEYBOARD SHORTCUTS + KONAMI CODE
  // ────────────────────────────────────────────────────────────
  const konamiCode = [
    'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
    'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','KeyB','KeyA'
  ];
  let konamiProgress = 0;

  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd+Enter → risolvi
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      startAIProcessing();
      return;
    }

    // Konami code
    if (e.code === konamiCode[konamiProgress]) {
      konamiProgress++;
      if (konamiProgress === konamiCode.length) {
        console.log('🎮 Konami Code attivato! Modalità sviluppatore sbloccata!');
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => (document.body.style.filter = 'none'), 3000);
        konamiProgress = 0;
      }
    } else {
      konamiProgress = 0;
    }
  });
})();
