// ── Mobile menu toggle ────────────────────────────────────────────────────────
const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileNav = document.getElementById('mobile-nav');
const iconMenu = document.getElementById('icon-menu');
const iconClose = document.getElementById('icon-close');

if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function () {
        const isOpen = !mobileNav.hidden;
        mobileNav.hidden = isOpen;
        hamburgerBtn.setAttribute('aria-expanded', String(!isOpen));
        hamburgerBtn.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
        if (iconMenu) iconMenu.style.display = isOpen ? 'block' : 'none';
        if (iconClose) iconClose.style.display = isOpen ? 'none' : 'block';
    });
}

// ── About page: sub-nav scroll + active state ─────────────────────────────────
const subNavBtns = document.querySelectorAll('.sub-nav__btn');

if (subNavBtns.length > 0) {
    // Click → smooth scroll to section
    subNavBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            const target = document.getElementById(this.dataset.target);
            if (target) {
                const offset = target.getBoundingClientRect().top + window.scrollY - 116;
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
            subNavBtns.forEach(function (b) { b.removeAttribute('aria-current'); });
            this.setAttribute('aria-current', 'true');
        });
    });

    // Scroll → update active button automatically
    const sections = document.querySelectorAll('#what-to-expect, #our-beliefs, #mission, #leadership, #plan-a-visit');
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                subNavBtns.forEach(function (btn) {
                    btn.removeAttribute('aria-current');
                    if (btn.dataset.target === entry.target.id) {
                        btn.setAttribute('aria-current', 'true');
                    }
                });
            }
        });
    }, { rootMargin: '-15% 0px -75% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
}

// ── About page: leadership flip cards (tap/click + keyboard) ───────────────
const leadershipFlipCards = document.querySelectorAll('.leadership-flip-card');

if (leadershipFlipCards.length > 0) {
    leadershipFlipCards.forEach(function (card) {
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');

        card.addEventListener('click', function () {
            const isFlipped = card.classList.contains('is-flipped');
            card.classList.toggle('is-flipped', !isFlipped);
            card.setAttribute('aria-pressed', String(!isFlipped));
        });

        card.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                const isFlipped = card.classList.contains('is-flipped');
                card.classList.toggle('is-flipped', !isFlipped);
                card.setAttribute('aria-pressed', String(!isFlipped));
            }
        });
    });
}