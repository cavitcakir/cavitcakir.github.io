/*
    cavitcakir.github.io — page behavior
    No dependencies. If this file fails to load, the page still reads fine.
*/
(function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------- theme ---------- */
    var root = document.documentElement;
    var themeBtn = document.getElementById('theme-toggle');

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    /* ---------- mobile nav ---------- */
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');

    function closeNav() {
        if (!navLinks) return;
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', String(open));
            document.body.classList.toggle('nav-open', open);
        });

        navLinks.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') closeNav();
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeNav();
        });
    }

    /* ---------- sticky nav border ---------- */
    var nav = document.getElementById('nav');
    var onScroll = function () {
        if (nav) nav.classList.toggle('scrolled', window.scrollY > 8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- rotating taglines ---------- */
    var lines = [
        'Backend Engineer II at DataRobot',
        'GenAI and agentic AI infrastructure',
        'Python · FastAPI · Redis · LangGraph',
        'Previously: computer vision and NLP research'
    ];

    var typed = document.getElementById('typed');

    if (typed) {
        if (reduceMotion) {
            typed.textContent = lines[0];
        } else {
            var line = 0, char = 0, deleting = false;

            (function tick() {
                var current = lines[line];
                typed.textContent = current.slice(0, char);

                var delay = deleting ? 28 : 55;

                if (!deleting && char === current.length) {
                    deleting = true;
                    delay = 2200;
                } else if (deleting && char === 0) {
                    deleting = false;
                    line = (line + 1) % lines.length;
                    delay = 320;
                } else {
                    char += deleting ? -1 : 1;
                }

                setTimeout(tick, delay);
            })();
        }
    }

    /* ---------- project filters ---------- */
    var filters = document.querySelectorAll('.filter');
    var projects = document.querySelectorAll('#project-grid .proj');

    Array.prototype.forEach.call(filters, function (btn) {
        btn.addEventListener('click', function () {
            var tag = btn.getAttribute('data-filter');

            Array.prototype.forEach.call(filters, function (b) {
                b.setAttribute('aria-pressed', String(b === btn));
            });

            Array.prototype.forEach.call(projects, function (p) {
                var tags = (p.getAttribute('data-tags') || '').split(' ');
                p.hidden = tag !== 'all' && tags.indexOf(tag) === -1;
            });
        });
    });

    /* ---------- reveal on scroll ---------- */
    var revealables = document.querySelectorAll('.reveal');

    if (!('IntersectionObserver' in window) || reduceMotion) {
        Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        Array.prototype.forEach.call(revealables, function (el, i) {
            el.style.transitionDelay = Math.min(i % 4, 3) * 60 + 'ms';
            io.observe(el);
        });
    }

    /* ---------- footer year ---------- */
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
})();
