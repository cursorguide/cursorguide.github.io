document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing dark mode');

    setTimeout(function() {
        const moonNavLink = document.querySelector('.nav-moon .nav-link');
        const moonIcon = document.querySelector('.nav-moon i');

        console.log('Dark mode init - moonNavLink:', moonNavLink);
        console.log('Dark mode init - moonIcon:', moonIcon);
        console.log('All .nav-item elements:', document.querySelectorAll('.nav-item'));
        console.log('.nav-moon element:', document.querySelector('.nav-moon'));

        if (!moonNavLink) {
            console.error('Could not find .nav-moon .nav-link element');
            return;
        }

        function setDarkMode(isDark) {
            console.log('Setting dark mode to:', isDark);
            document.body.classList.toggle('dark-mode', isDark);

            const currentIcon = document.querySelector('.nav-moon i');
            if (currentIcon) {
                currentIcon.classList.remove('fa-moon', 'fa-sun');
                currentIcon.classList.add(isDark ? 'fa-sun' : 'fa-moon');
            } else {
                console.error('Could not find icon to update');
            }
            localStorage.setItem('darkMode', isDark);
        }

        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        console.log('Initial dark mode from localStorage:', isDarkMode);
        setDarkMode(isDarkMode);

        moonNavLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Moon icon clicked!');
            const isDark = !document.body.classList.contains('dark-mode');
            console.log('Current dark mode:', document.body.classList.contains('dark-mode'));
            console.log('Toggling to dark mode:', isDark);
            setDarkMode(isDark);
        });

        console.log('Dark mode initialization complete');
    }, 200);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

function copyCode(button) {
    const codeBlock = button.closest('.rules-example').querySelector('pre code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(function() {

        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#27ca3f';

        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.style.color = '';
        }, 2000);
    }).catch(function(err) {
        console.error('Failed to copy code: ', err);

        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.style.color = '#27ca3f';

        setTimeout(function() {
            button.innerHTML = originalHTML;
            button.style.color = '';
        }, 2000);
    });
}

document.addEventListener('keydown', function(event) {

    if (event.ctrlKey || event.metaKey) {
        const shortcuts = document.querySelectorAll('kbd');
        shortcuts.forEach(kbd => {
            kbd.style.boxShadow = '0 0 10px rgba(0, 102, 204, 0.5)';
            kbd.style.transform = 'scale(1.05)';
        });

        setTimeout(() => {
            shortcuts.forEach(kbd => {
                kbd.style.boxShadow = '';
                kbd.style.transform = '';
            });
        }, 2000);
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll(
        '.overview-card, .notebook-card, .tip-card, .reference-card, .feature-content, .yolo-content'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

const style = document.createElement('style');
style.textContent = `
    .overview-card,
    .notebook-card,
    .tip-card,
    .reference-card,
    .feature-content,
    .yolo-content {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .nav-link.active {
        color: var(--primary-color) !important;
    }

    .nav-link.active::after {
        width: 100% !important;
    }

    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active .bar:nth-child(1) {
        transform: translateY(8px) rotate(45deg);
    }

    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-8px) rotate(-45deg);
    }
`;
document.head.appendChild(style);

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length < 2) {
                searchResults.innerHTML = '';
                return;
            }

            const searchableElements = document.querySelectorAll('h1, h2, h3, h4, p, li');
            const results = [];

            searchableElements.forEach(element => {
                if (element.textContent.toLowerCase().includes(query)) {
                    results.push({
                        text: element.textContent,
                        element: element
                    });
                }
            });

            displaySearchResults(results.slice(0, 5)); 
        });
    }
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;

    if (results.length === 0) {
        searchResults.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }

    const resultsHTML = results.map(result => `
        <div class="search-result" onclick="scrollToElement(this)" data-target="${result.element.id}">
            ${result.text.substring(0, 100)}...
        </div>
    `).join('');

    searchResults.innerHTML = resultsHTML;
}

function scrollToElement(resultElement) {
    const targetId = resultElement.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    document.body.appendChild(progressBar);

    const progressFill = progressBar.querySelector('.progress-fill');

    window.addEventListener('scroll', function() {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / docHeight) * 100;

        progressFill.style.width = progress + '%';
    });
}

const progressStyle = document.createElement('style');
progressStyle.textContent = `
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(0, 0, 0, 0.1);
        z-index: 9999;
    }

    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        width: 0%;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(progressStyle);

document.addEventListener('DOMContentLoaded', createProgressBar);

function createBackToTopButton() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.title = 'Back to Top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

const backToTopStyle = document.createElement('style');
backToTopStyle.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        z-index: 1000;
    }

    .back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }

    .back-to-top:hover {
        background: var(--secondary-color);
        transform: translateY(-2px);
    }

    @media (max-width: 768px) {
        .back-to-top {
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
        }
    }
`;
document.head.appendChild(backToTopStyle);

document.addEventListener('DOMContentLoaded', createBackToTopButton);

const printStyle = document.createElement('style');
printStyle.textContent = `
    @media print {
        .header,
        .hero,
        .back-to-top,
        .dark-mode-toggle,
        .reading-progress {
            display: none !important;
        }

        body {
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
            background: #fff;
        }

        .section {
            page-break-inside: avoid;
            margin-bottom: 2rem;
        }

        .section-title {
            page-break-after: avoid;
        }

        .overview-card,
        .notebook-card,
        .tip-card {
            break-inside: avoid;
            margin-bottom: 1rem;
        }
    }
`;
document.head.appendChild(printStyle);

window.addEventListener('error', function(event) {
    console.error('JavaScript Error:', event.error);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cursor Documentation Site Loaded Successfully!');

    initializeSearch();

    initializeEasterEggs();

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) * {
        animation-duration: 0s !important;
        transition-duration: 0s !important;
    }
`;
document.head.appendChild(loadingStyle);

function initializeEasterEggs() {

    const codeEasterEgg = document.querySelector('.code-easter-egg');
    if (codeEasterEgg) {
        let clickCount = 0;
        codeEasterEgg.addEventListener('dblclick', function() {
            clickCount++;

            const message = document.createElement('div');
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 2rem;
                border-radius: 12px;
                font-size: 1.2rem;
                z-index: 10000;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                animation: easterEggPop 3s ease-out forwards;
                text-align: center;
                max-width: 300px;
            `;

            const messages = [
                "🎉 You found the secret! You're clearly a thorough reader!",
                "🤓 Pro tip: Cursor loves when you explore!",
                "🚀 Easter egg level: Advanced! Keep exploring...",
                "🎭 The real Cursor tips were the easter eggs we found along the way",
                "🔍 Okay okay, you've found them all! Time to actually use Cursor 😉"
            ];

            message.innerHTML = messages[Math.min(clickCount - 1, messages.length - 1)];
            document.body.appendChild(message);

            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 3000);
        });
    }

    let konamiCode = [];
    const expectedKonami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > expectedKonami.length) {
            konamiCode.shift();
        }

        if (konamiCode.length === expectedKonami.length && 
            konamiCode.every((key, index) => key === expectedKonami[index])) {

            triggerKonamiEasterEgg();
            konamiCode = []; 
        }
    });
}

function triggerKonamiEasterEgg() {

    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        .konami-active {
            animation: rainbow 2s linear infinite;
        }
    `;
    document.head.appendChild(style);

    document.body.classList.add('konami-active');

    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
        background-size: 400% 400%;
        animation: rainbow-bg 2s ease infinite;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        font-size: 1.1rem;
        z-index: 10001;
        font-weight: bold;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
    `;
    message.innerHTML = "🎮 KONAMI CODE ACTIVATED! You're a true developer! 🌈";
    document.body.appendChild(message);

    setTimeout(() => {
        document.body.classList.remove('konami-active');
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
        document.head.removeChild(style);
    }, 5000);
}

function toggleRequest(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('i');

    header.classList.toggle('active');
    content.classList.toggle('active');

    if (content.classList.contains('active')) {
        icon.style.transform = 'rotate(180deg)';
    } else {
        icon.style.transform = 'rotate(0deg)';
    }
}

const lostJokes = [
  "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25!",
  "404: Coffee not found. Programmer halted.",
  "To understand recursion, you must first understand recursion.",
  "Why did the developer go broke? Because he used up all his cache.",
  "There are only 10 types of people in the world: those who understand binary and those who don't.",
  "AI tried to debug itself. Now it's stuck in an infinite loop of self-reflection.",
  "I would tell you a UDP joke, but you might not get it.",
  "Why did the function return early? It had a date with an exception!"
];

function showLostModal() {
  const modal = document.getElementById('lost-modal');
  const joke = document.getElementById('lost-joke');
  joke.textContent = lostJokes[Math.floor(Math.random() * lostJokes.length)];
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function hideLostModal() {
  const modal = document.getElementById('lost-modal');
  modal.style.display = 'none';
  document.body.style.overflow = '';
}

window.addEventListener('hashchange', function() {
  const hash = window.location.hash.replace('#', '');
  if (!hash) return;
  if (!document.getElementById(hash) && !sessionStorage.getItem('lostModalShown')) {
    showLostModal();
    sessionStorage.setItem('lostModalShown', '1');
  }
});

const lostModal = document.getElementById('lost-modal');
if (lostModal) {
  lostModal.addEventListener('click', function(e) {
    if (e.target === lostModal) hideLostModal();
  });
}

const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = `
    body.dark-mode {
        --text-primary: #ffffff;
        --text-secondary: #e2e8f0;
        --bg-light: #2d3748;
        --bg-dark: #1a202c;
        --border-color: #4a5568;
        --primary-color: #d6bcfa;
        --secondary-color: #fbb6ce;
        --accent-color: #f687b3;
        background-color: #1a202c;
        color: #ffffff;
    }

    body.dark-mode .header {
        background: #2d3748;
        border-bottom: 1px solid #4a5568;
    }

    body.dark-mode .overview-card,
    body.dark-mode .notebook-card,
    body.dark-mode .tip-card,
    body.dark-mode .reference-card,
    body.dark-mode .chat-example,
    body.dark-mode .mode-card,
    body.dark-mode .attach-card,
    body.dark-mode .usage-card,
    body.dark-mode .command-card,
    body.dark-mode .workflow-step,
    body.dark-mode .feature-card,
    body.dark-mode .tip-item,
    body.dark-mode .issue-card {
        background: #2d3748;
        color: #ffffff;
        border: 1px solid #4a5568;
    }

    body.dark-mode .section-title,
    body.dark-mode h1,
    body.dark-mode h2,
    body.dark-mode h3,
    body.dark-mode h4 {
        color: #ffffff;
    }

    body.dark-mode .step-content h4,
    body.dark-mode .faq-item h4 {
        color: #d6bcfa;
    }

    body.dark-mode .message.user .message-content {
        background: #4a5568;
        color: #ffffff;
    }

    body.dark-mode .message.ai .message-content {
        background: #2d3748;
        color: #ffffff;
        border: 1px solid #4a5568;
    }

    body.dark-mode kbd {
        background: #3c366b;
        border: 1px solid #b794f6;
        color: #fbb6ce;
        box-shadow: 0 1px 2px rgba(183, 148, 246, 0.2);
    }

    body.dark-mode .warning-box {
        background: #b7791f;
        color: #fff;
        border: 1px solid #f6e05e;
    }

    body.dark-mode .warning-box h4,
    body.dark-mode .warning-box p {
        color: #fff;
    }

    body.dark-mode .warning-box i {
        color: #f6e05e;
    }

    body.dark-mode .hero {
        background: #23263a;
        color: #fff;
    }

    body.dark-mode .hero-title, 
    body.dark-mode .hero-subtitle {
        color: #fff;
    }

    body.dark-mode .highlight {
        color: #fbb6ce;
    }

    body.dark-mode .btn-primary {
        background: #b794f6;
        color: #23263a;
    }

    body.dark-mode .btn-primary:hover {
        background: #fbb6ce;
        color: #23263a;
    }

    body.dark-mode .btn-secondary {
        background: transparent;
        color: #b794f6;
        border-color: #b794f6;
    }

    body.dark-mode .btn-secondary:hover {
        background: #b794f6;
        color: #23263a;
    }

    body.dark-mode .model-guide-box {
        background: linear-gradient(135deg, #553c9a 0%, #7c4dff 100%);
    }

    body.dark-mode .model-card {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    body.dark-mode .model-card:hover {
        background: rgba(255, 255, 255, 0.1);
    }

    body.dark-mode .model-card.featured {
        border: 2px solid rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.1);
    }

    body.dark-mode .hidden-gems-box {
        background: linear-gradient(135deg, #2d1b69 0%, #5b21b6 100%);
        border-color: rgba(183, 148, 246, 0.5);
    }

    body.dark-mode .gem-item {
        background: rgba(255, 255, 255, 0.08);
        border-color: rgba(183, 148, 246, 0.3);
    }

    body.dark-mode .gem-item:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(183, 148, 246, 0.5);
    }

    body.dark-mode .bonus-checklist {
        background: rgba(183, 148, 246, 0.15);
        border-color: rgba(183, 148, 246, 0.4);
    }

    body.dark-mode .pro-tip-box {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(183, 148, 246, 0.4);
    }
`;
document.head.appendChild(darkModeStyle);
