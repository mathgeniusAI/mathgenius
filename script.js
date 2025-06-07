// DOM Elements
const solveButton = document.getElementById('solveButton');
const ctaButton = document.getElementById('ctaButton');
const mathInput = document.getElementById('mathInput');
const loadingModal = document.getElementById('loadingModal');
const loadingText = document.getElementById('loadingText');
const progressFill = document.getElementById('progressFill');
const suggestions = document.querySelectorAll('.suggestion');
const mobileMenuToggle = document.getElementById('mobileMenuToggle');

// Loading messages for the AI processing simulation
const loadingMessages = [
    "Analizzando l'equazione...",
    "Applicando algoritmi di deep learning...",
    "Processando simboli matematici...",
    "Calcolando soluzioni ottimali...",
    "Generando spiegazione dettagliata...",
    "Finalizzando risultati..."
];

// Suggestion click handlers
suggestions.forEach(suggestion => {
    suggestion.addEventListener('click', () => {
        const equation = suggestion.getAttribute('data-equation');
        mathInput.value = equation;
        mathInput.focus();
    });
});

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    // Simple mobile menu toggle (you can expand this)
    console.log('Mobile menu clicked');
});

// Solve button click handler
solveButton.addEventListener('click', () => {
    startAIProcessing();
});

// CTA button click handler (this is where the easter egg is hidden)
ctaButton.addEventListener('click', () => {
    startAIProcessing();
});

// Math input enter key handler
mathInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        startAIProcessing();
    }
});

function startAIProcessing() {
    loadingModal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    let currentMessageIndex = 0;
    let progress = 0;

    const messageInterval = setInterval(() => {
        if (currentMessageIndex < loadingMessages.length) {
            loadingText.textContent = loadingMessages[currentMessageIndex];
            currentMessageIndex++;
            progress += 16.67;
            progressFill.style.width = progress + '%';
        }
    }, 500);

    // Quando il caricamento è completo
    // Quando il caricamento è completo
    setTimeout(() => {
        clearInterval(messageInterval);
        progressFill.style.width = '100%';
        
        loadingModal.style.display = 'none';
        document.body.style.overflow = 'hidden';
        
        const overlay = document.getElementById('rickroll-overlay');
        const iframe = document.getElementById('rickroll-frame');
        
        // Attiva il rickroll (con audio subito)
        iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&enablejsapi=1&loop=1&playlist=dQw4w9WgXcQ";
        overlay.style.display = 'block';
        
        // Impedisce click sull'iframe (facoltativo)
        iframe.style.pointerEvents = 'none';
        
        // Forza il video a ripartire se l'utente prova a metterlo in pausa
        const forcePlayInterval = setInterval(() => {
            iframe.contentWindow.postMessage(
                JSON.stringify({
                    event: "command",
                    func: "playVideo",
                    args: []
                }),
                "*"
            );
        }, 500);

    window.onbeforeunload = function () {
        return "Sei sicuro di voler abbandonare MathGenius?";
    };
}, 3000);



// Function to close result modal
window.closeResultModal = function() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal.style.display === 'block') {
            document.body.removeChild(modal);
        }
    });
}

// Close modal when clicking outside
loadingModal.addEventListener('click', (e) => {
    if (e.target === loadingModal) {
        loadingModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add some interactive effects to feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add floating animation to mathematical symbols
function createFloatingSymbol() {
    const symbols = ['∫', '∑', '∂', 'π', '∞', '√', 'α', 'β', 'γ', 'δ', 'θ', 'λ'];
    const symbol = document.createElement('div');
    symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    symbol.style.cssText = `
        position: fixed;
        font-size: 2rem;
        color: rgba(102, 126, 234, 0.1);
        pointer-events: none;
        z-index: -1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: floatUp 8s linear forwards;
    `;
    
    document.body.appendChild(symbol);
    
    setTimeout(() => {
        if (document.body.contains(symbol)) {
            document.body.removeChild(symbol);
        }
    }, 8000);
}

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to {
            transform: translateY(-120vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Create floating symbols periodically
setInterval(createFloatingSymbol, 3000);

// Add some console easter eggs for developers
console.log(`
🧮 MathGenius Developer Console
===============================
Hai trovato la console! Ecco alcuni comandi segreti:

- mathgenius.solve("x^2 + 1 = 0") // Risolve equazioni immaginarie
- mathgenius.rickroll() // Indovina cosa fa...
- mathgenius.credits() // Mostra i crediti

Divertiti esplorando! 🚀
`);

// Add developer console commands
window.mathgenius = {
    solve: (equation) => {
        console.log(`🤖 Risolvendo: ${equation}`);
        console.log(`📊 Risultato: La risposta è sempre 42 (secondo Douglas Adams)`);
        return "42";
    },
    
    rickroll: () => {
        console.log("🎵 Never gonna give you up, never gonna let you down... 🎵");
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    },
    
    credits: () => {
        console.log(`
🏆 MathGenius Credits
====================
Sviluppato con ❤️ per dimostrare le potenzialità dell'AI
Design ispirato a: OpenAI, DeepMind, Wolfram Alpha
Easter egg: Rick Astley approved ✅
        `);
    }
};

// Add some performance monitoring
let pageLoadTime = performance.now();
window.addEventListener('load', () => {
    pageLoadTime = performance.now() - pageLoadTime;
    console.log(`⚡ Pagina caricata in ${pageLoadTime.toFixed(2)}ms`);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to solve
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        startAIProcessing();
    }
    
    // Konami code easter egg (↑↑↓↓←→←→BA)
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    
    if (!window.konamiProgress) window.konamiProgress = 0;
    
    if (e.code === konamiCode[window.konamiProgress]) {
        window.konamiProgress++;
        if (window.konamiProgress === konamiCode.length) {
            console.log("🎮 Konami Code attivato! Modalità sviluppatore sbloccata!");
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 3000);
            window.konamiProgress = 0;
        }
    } else {
        window.konamiProgress = 0;
    }
});
