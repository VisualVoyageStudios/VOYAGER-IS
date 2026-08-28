'use strict';

const CONFIG = {
    email:    'visualvoyagerbsn@gmail.com',
    whatsapp: '27814758138',
    // Add/remove wallets here — each renders as a copy-able option in
    // the crypto modal. Replace with real addresses before going live.
    crypto: [
        { label: 'USDT (ERC-20)', address: '0xe1c299d679858a28ded7b038cd090c230aa26f8c' },
        { label: 'Bitcoin (BTC)', address: '1MGGbUgQbksV4vWMkWEoxTanvcSRyJJqvb' },
    ],
};

// ── Product catalogue ────────────────────────────────────────────────────────
// cardUrl  → Lemon Squeezy hosted checkout link (card payment)
// eftUrl   → Ozow payment link (instant EFT)
// Leave either empty ('') to fall back to the manual order modal.
const PRODUCTS = [
    {
        id:          'momentum-pulse-v1',
        name:        'Momentum Pulse',
        type:        'indicator',
        tagline:     'Momentum, confirmed across timeframes',
        description: 'Scores RSI-based momentum across the current chart plus two higher timeframes, and only signals conviction when they agree — filtering out single-timeframe noise.',
        features:    ['Multi-timeframe composite scoring', 'Histogram intensity reflects conviction strength', 'Live timeframe breakdown table'],
        price:       450,
        billing:     'once-off',
        version:     '1.0',
        updated:     '2026-07-01',
        status:      'Actively maintained',
        forWho:      'Built for swing and position traders — not for scalpers on sub-5-minute charts.',
        compatibility: 'Best on liquid forex pairs, indices, and major crypto — 15m and above.',
        limitations: 'Not designed for scalping under 5-minute charts or thinly-traded assets.',
        cardUrl:     '', //paste lemone squeezy chack out link
        eftUrl:      '', // paste Ozow payment link here
    },
    {
        id:          'supply-demand-pro-v1',
        name:        'Supply & Demand Pro',
        type:        'indicator',
        tagline:     'A persistent volume-profile sweep engine',
        description: 'Builds a real volume profile across your chosen lookback, isolating the price levels where the most volume actually traded. Zones persist until swept or refreshed — no redrawing, no repainting.',
        features:    ['Persistent zones — no repaint on every bar', 'Auto-refreshes on a timer or range breakout', 'Fade or delete swept zones, your choice'],
        price:       650,
        billing:     'once-off',
        version:     '1.0',
        updated:     '2026-07-01',
        status:      'Actively maintained',
        forWho:      'Built for swing and position traders — not for scalpers on sub-5-minute charts.',
        compatibility: 'Best on liquid forex pairs, indices, and major crypto — 15m and above.',
        limitations: 'Not designed for scalping under 5-minute charts or thinly-traded assets.',
        cardUrl:     '',
        eftUrl:      '',
    },
    {
        id:          'dynamic-sma-ribbon-v1',
        name:        'Dynamic SMA Ribbon',
        type:        'indicator',
        tagline:     'Trend direction, at a glance',
        description: 'Three SMAs that colour themselves and the space between them based on alignment — clean green when the trend is stacked bullish, red when bearish, grey when the market is undecided.',
        features:    ['Colour-coded trend alignment', 'Configurable fast/mid/slow lengths', 'Background tint on clean alignment only'],
        price:       300,
        billing:     'once-off',
        version:     '1.0',
        updated:     '2026-07-01',
        status:      'Actively maintained',
        forWho:      'Built for traders who want a fast visual read on trend direction — a good entry point into the library.',
        compatibility: 'Works on any market and timeframe.',
        limitations: 'A trend-alignment tool only — it does not generate entry or exit signals on its own.',
        cardUrl:     '',
        eftUrl:      '',
    },
    {
        id:          'session-range-tracker-v2',
        name:        'Session Range Tracker',
        type:        'indicator',
        tagline:     'London and New York, mapped in real time',
        description: 'Plots the high, low, and midpoint of the London and New York sessions as they develop, then carries the completed range forward as a reference for the sessions that follow.',
        features:    ['Live session range boxes', 'Midpoint acts as an intraday pivot', 'Previous session levels carried forward'],
        price:       250,
        billing:     'once-off',
        version:     '2.0',
        updated:     '2026-07-01',
        status:      'Actively maintained',
        forWho:      'Built for intraday forex and indices traders who trade session opens and overlaps.',
        compatibility: 'Best on 1m–4H charts for forex, indices, and other near-24h markets.',
        limitations: 'Session logic is built around London/New York hours — less relevant on markets without defined trading sessions.',
        cardUrl:     '',
        eftUrl:      '',
    },
    {
        id:          'candle-range-theory-v2',
        name:        'Candle Range Theory',
        type:        'indicator',
        tagline:     'Weekly range, daily sweeps, and fair value gaps in one system',
        description: 'Tracks the prior week\'s candle range and automatically finds the CRT zone from the largest daily range inside it, carries daily highs and lows onto intraday charts, flags liquidity sweeps as they happen, and layers in a full fair value gap engine — all in a single indicator.',
        features: [
            'Automatic weekly CRT zone detection',
            'Daily liquidity sweep markers',
            'Live fair value gap tracking with fill detection'
        ],
        price:       950,
        billing:     'once-off',
        version:     '2.1',
        updated:     '2026-03-01',
        status:      'Final version',
        forWho:      'Built for traders who work weekly and daily range theory alongside fair value gaps — not a single-signal tool.',
        compatibility: 'Best on forex, indices, and major crypto — works on both intraday and daily charts.',
        limitations: 'A multi-part system with a lot of visual information on screen at once — takes a session or two to learn what everything means.',
        cardUrl:     '',
        eftUrl:      '',
    },

    // EA List
    {
        id:          'voyager-fvg-v1',
        name:        'Voyager FVG EA',
        type:        'ea',
        tagline:     'Fair value gaps, detected, plotted, and optionally traded',
        description: 'Detects bullish and bearish fair value gaps on MT5, plots them directly on your chart with a configurable radar zone for visibility, and can optionally place trades automatically when price retraces back into a gap — full stop-loss and target logic included.',
        features: [
            'Automatic bullish/bearish FVG detection and plotting',
            'Configurable radar zone keeps the chart clean',
            'Optional auto-trading on retracement entries — off by default'
        ],
        price:       2000,
        billing:     'once-off',
        version:     '1.0',
        updated:     '2026-08-25',
        status:      'Actively maintained',
        forWho:      'Built for MT5 traders who want fair value gaps handled automatically — with hands-off trading as an option, not a requirement.',
        compatibility: 'MT5 desktop only — mobile MT5 can\'t run custom Expert Advisors. Works on any symbol with clean gap-forming price action.',
        limitations: 'Auto-trading should be tested on a demo account first. A license activates one MT5 account and broker server at a time.',
        cardUrl:     '',
        eftUrl:      '',
    }, 

];

const FAQS = [
    {
        q: 'Do I need a paid TradingView plan?',
        a: 'No. Invite-only scripts work on TradingView\'s free plan. The practical difference is how many indicators you can run on a chart at the same time.',
    },
    {
        q: 'How long does access take after purchase?',
        a: 'Access is granted manually to your TradingView username, usually within a few hours. You\'ll see the script appear under your "Invite-only scripts" tab once it\'s added.',
    },
    {
        q: 'What payment methods are accepted?',
        a: 'Card (Visa, Mastercard) and South African instant EFT are both handled through Paystack at checkout. A direct bank transfer option is also available if you\'d rather pay that way.',
    },
    {
        q: 'How is an Expert Advisor different from an indicator?',
        a: 'An indicator only displays analysis on your chart — you still place every trade yourself. An Expert Advisor (EA) runs on MT5 and can optionally place trades automatically based on its rules. Auto-trading is always off by default; you choose if and when to turn it on.',
    },
    {
        q: 'Which MT5 platform do Expert Advisors work on?',
        a: 'MT5 desktop only. MT5\'s mobile apps can\'t run custom Expert Advisors — that\'s a limitation of MetaTrader itself, not something specific to Voyager. Your license still shows on mobile since it\'s the same account, you just can\'t attach the EA there directly.',
    },
    {
        q: 'What if I entered the wrong TradingView username?',
        a: 'Just get in touch with the correct one. Access is tied to the username — it\'s an easy fix before it\'s been granted.',
    },
    {
        q: 'Is there a guarantee of profit?',
        a: 'No. No indicator or strategy can guarantee results. These are analysis tools — they support decisions; they don\'t make them.',
    },
    {
        q: 'How do refunds work?',
        a: 'Reach out before access is granted and it\'ll be handled quickly. Once access is active, refunds are handled case-by-case.',
    },
    {
        q: 'Do I get free updates when a tool changes?',
        a: 'Yes. Once you have access to a script, updates and fixes are pushed to the same invite-only script — you don\'t need to buy it again. Check the Build Log on this page for what\'s recently changed.',
    },
    {
        q: 'What happens if a tool is discontinued?',
        a: 'If a once-off tool is ever discontinued, existing access isn\'t revoked. If a subscription strategy is discontinued, active subscribers are notified in advance so no one is billed for something no longer supported.',
    },
];

const ICONS = {
    // INDICATOR icons
    'dynamic-sma-ribbon-v1':   `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 15c4-2 6-6 9-6s5 4 9 6" opacity="1"/><path d="M2 12c4-2 6-6 9-6s5 4 9 6" opacity=".6"/><path d="M2 9c4-2 6-6 9-6s5 4 9 6" opacity=".3"/></svg>`,
    'momentum-pulse-v1':       `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="2,13 6,8 10,15 14,5 18,11 20,11"/></svg>`,
    'session-range-tracker-v2':`<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="7" height="10" rx="1" opacity=".7"/><rect x="11" y="4" width="7" height="14" rx="1" opacity=".7"/><line x1="2" y1="11" x2="18" y2="11" stroke-dasharray="1.5 1.5"/></svg>`,
    'supply-demand-pro-v1':  `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="2" y="3" width="6" height="16" rx="1" opacity=".9"/><rect x="9" y="7" width="6" height="12" rx="1" opacity=".55"/><rect x="16" y="11" width="4" height="8" rx="1" opacity=".3"/></svg>`,
    'candle-range-theory-v2':  `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3,17 8,11 12,14 19,5"/><polyline points="15,5 19,5 19,9"/></svg>`,

    // STRATEGY icons

    // EA icons
    'voyager-fvg-v1': `<svg viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="18" height="4" rx="1" opacity=".8"/><rect x="2" y="14" width="18" height="4" rx="1" opacity=".8"/><path d="M9 9.5v3M13 9.5v3"/></svg>`,
};

// ── Product preview visuals ──────────────────────────────────────────────────
// These are stylised placeholder chart illustrations — NOT real screenshots.
// To swap in a real chart screenshot later, just replace the .product-visual
// innerHTML below with: <img src="images/momentum-pulse-preview.png" alt="...">
// (or edit renderProducts() to use an <img> tag when a product has a
// `previewImage` field set).
const PREVIEWS = {
    // INDICATOR previews
    'momentum-pulse-v1': `
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="0,100 30,92 60,98 90,70 120,78 150,50 180,58 210,32 240,40 270,18 300,26 320,14"
                fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="0,110 30,108 60,112 90,104 120,106 150,96 180,98 210,88 240,90 270,80 300,82 320,76"
                fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".5"/>
        </svg>`,

    'supply-demand-pro-v1': `
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
            <rect x="0" y="30" width="320" height="18" fill="var(--gold)" opacity=".14"/>
            <rect x="0" y="86" width="320" height="14" fill="var(--gold)" opacity=".14"/>
            <polyline points="0,90 25,85 50,95 75,60 100,72 125,40 150,55 175,38 200,64 225,44 250,30 275,50 300,20 320,35"
                fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`,

    'dynamic-sma-ribbon-v1': `
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,14"
                fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,42"
                fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="0 400" class="vv-trend-line"/>
            <circle cx="200" cy="60" r="4.5" fill="var(--gold)"/>
            <circle cx="280" cy="35" r="4.5" fill="var(--gold)"/>
        </svg>`,
        
    'session-range-tracker-v2': `
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,42"
                fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,42"
                fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="0 400" class="vv-trend-line"/>
            <circle cx="200" cy="60" r="4.5" fill="var(--gold)"/>
            <circle cx="280" cy="35" r="4.5" fill="var(--gold)"/>
        </svg>`,

    'candle-range-theory-v2': `
        <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,42"
                fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
            <polyline points="0,115 40,110 80,118 120,95 160,100 200,60 240,68 280,35 320,42"
                fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                stroke-dasharray="0 400" class="vv-trend-line"/>
            <circle cx="200" cy="60" r="4.5" fill="var(--gold)"/>
            <circle cx="280" cy="35" r="4.5" fill="var(--gold)"/>
        </svg>`,

    // EA previews
    'voyager-fvg-v1': `
       <svg viewBox="0 0 320 140" preserveAspectRatio="none" aria-hidden="true">
          <rect x="120" y="40" width="60" height="35" fill="var(--gold)" opacity=".18"/>
          <polyline points="0,100 40,90 80,95 120,55 160,60 200,30 240,45 280,20 320,35"
              fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`,


    // STRATEGY previews

};

// ── State ────────────────────────────────────────────────────────────────────
let activeFilter  = 'all';

// ── Helpers ──────────────────────────────────────────────────────────────────
function esc(str) {
    return String(str).replace(/[&<>"']/g, c => (
        {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]
    ));
}

function formatPrice(p) {
    const r = `R${p.price.toLocaleString('en-ZA')}`;
    return p.billing === 'once-off'
        ? `${r}<span class="product-price-note">once-off</span>`
        : `${r}<span class="product-price-note">per month</span>`;
}

function formatUpdated(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' });
}

// ── Render products ──────────────────────────────────────────────────────────
function renderProducts() {
    const grid  = document.getElementById('productGrid');
    const count = document.getElementById('libraryCount');
    const empty = document.getElementById('emptyState');

    const filtered = PRODUCTS.filter(p =>
        activeFilter === 'all' || p.type === activeFilter
    );

    count.textContent = PRODUCTS.length;

    if (!filtered.length) {
        grid.innerHTML = '';
        empty.hidden = false;
        return;
    }
    empty.hidden = true;

    grid.innerHTML = filtered.map(p => `
        <article class="product-card" data-product-card="${esc(p.id)}">
            <div class="product-visual">
                <span class="product-visual-tag">Preview</span>
                ${PREVIEWS[p.id] || ''}
            </div>
            <div class="product-icon">${ICONS[p.id] || ICONS['momentum-pulse-v1']}</div>
            <div class="product-top-row">
                <span class="product-type-tag ${esc(p.type)}">${p.type === 'ea' ? 'expert advisor' : esc(p.type)}</span>
                <span class="product-status-badge">
                    <span class="status-dot" aria-hidden="true"></span>${esc(p.status)}
                </span>
            </div>
            <div class="product-version-row">
                <span class="product-version" title="Last updated ${esc(formatUpdated(p.updated))}">v${esc(p.version)} · updated ${esc(formatUpdated(p.updated))}</span>
            </div>
            <h3 class="product-name">${esc(p.name)}</h3>
            <p class="product-tagline">${esc(p.tagline)}</p>
            <p class="product-for-who">${esc(p.forWho)}</p>
            <p class="product-desc">${esc(p.description)}</p>
            <ul class="product-features">
                ${p.features.map(f => `<li>${esc(f)}</li>`).join('')}
            </ul>
            <div class="product-meta">
                <p class="product-meta-line"><strong>Works well on:</strong> ${esc(p.compatibility)}</p>
                <p class="product-meta-line product-meta-limits"><strong>Keep in mind:</strong> ${esc(p.limitations)}</p>
            </div>
            <a class="product-report-link" href="mailto:${CONFIG.email}?subject=${encodeURIComponent('Issue report: ' + p.name)}&body=${encodeURIComponent('Product: ' + p.name + '\nTradingView username:\n\nWhat happened:\n\nWhat I expected:\n')}">
                <svg width="13" height="13" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="9"/><path d="M11 7v5M11 15h.01"/></svg>
                Report an issue with this tool
            </a>

            <div class="product-footer">
                <a class="btn btn-gold product-pricing-link" href="pricing.html">
                    View pricing &amp; buy
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </a>
            </div>

                <p class="product-access-note">
                    <svg width="12" height="12" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="9"/><path d="M11 6v5l3.5 3.5"/></svg>
                    Access usually granted within a few hours
                </p>
        </article>
    `).join('');
}

// ── Render FAQ ───────────────────────────────────────────────────────────────
function renderFAQs() {
    const list = document.getElementById('faqList');
    list.innerHTML = FAQS.map((item, i) => `
        <div class="faq-item" id="faq-${i}">
            <button class="faq-trigger" type="button" aria-expanded="false" aria-controls="faq-body-${i}">
                <span>${esc(item.q)}</span>
                <span class="faq-trigger-icon" aria-hidden="true">+</span>
            </button>
            <div class="faq-body" id="faq-body-${i}" role="region">
                <div class="faq-body-inner">
                    <p>${esc(item.a)}</p>
                </div>
            </div>
        </div>
    `).join('');
}


// ── Events ───────────────────────────────────────────────────────────────────
function setupEvents() {
    // Mobile nav
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu   = document.querySelector('[data-nav-menu]');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
        menu.addEventListener('click', e => {
            if (e.target.closest('a')) {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Filter buttons
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('[data-filter]').forEach(b =>
                b.classList.remove('active')
            );
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderProducts();
        });
    });


    // Crypto wallet copy buttons (delegated — list is regenerated each open)
    document.getElementById('cryptoWalletList').addEventListener('click', e => {
        const btn = e.target.closest('.crypto-copy-btn');
        if (!btn) return;
        navigator.clipboard.writeText(btn.dataset.address).then(() => {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            btn.classList.add('copied');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('copied');
            }, 1500);
        });
    });

    // FAQ accordion (delegated)
    document.getElementById('faqList').addEventListener('click', e => {
        const trigger = e.target.closest('.faq-trigger');
        if (!trigger) return;
        const item = trigger.closest('.faq-item');
        const open = item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(open));
    });

    // Newsletter / waitlist capture (mailto-based, no backend required)
    document.querySelectorAll('[data-newsletter-form]').forEach(f => {
        f.addEventListener('submit', e => {
            e.preventDefault();
            const email = f.querySelector('input').value.trim();
            if (!email) return;
            const subject = encodeURIComponent('Waitlist signup');
            const body = encodeURIComponent(`Please add me to the Voyager updates list.\nEmail: ${email}`);
            window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
        });
    });

    // Interactive comparison table — click/Enter a row to jump to that product card
    document.querySelectorAll('[data-compare-row]').forEach(row => {
        const goToProduct = () => {
            const card = document.querySelector(`[data-product-card="${row.dataset.compareRow}"]`);
            if (!card) return;
            card.scrollIntoView({ behavior: 'smooth', block: 'center' });
            card.classList.add('product-card--flash');
            setTimeout(() => card.classList.remove('product-card--flash'), 1100);
        };
        row.addEventListener('click', goToProduct);
        row.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToProduct(); }
        });
    });
}

// ── Scroll reveal ────────────────────────────────────────────────────────────
function setupScrollReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-stagger');
    if (!targets.length) return;

    if (!('IntersectionObserver' in window)) {
        targets.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => observer.observe(el));
}

// ── Navbar scroll state ───────────────────────────────────────────────────────
function setupNavbarScroll() {
    const nav = document.querySelector('.navbar');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

// ── Subtle tilt effect (hero kicker + product chart previews) ───────────────
// Desktop/mouse only — skipped on touch devices and when the user
// prefers reduced motion.
function setupTiltEffect() {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!supportsHover || reducedMotion) return;

    const MAX_TILT = 7; // degrees

    function bind(el) {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const px = (e.clientX - rect.left) / rect.width;  // 0..1
            const py = (e.clientY - rect.top) / rect.height;  // 0..1
            const rotateY = (px - 0.5) * MAX_TILT * 2;
            const rotateX = (0.5 - py) * MAX_TILT * 2;
            el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)';
        });
    }

    document.querySelectorAll('.hero-kicker').forEach(bind);
    // Product visuals are re-rendered on filter change, so re-bind each time
    document.getElementById('productGrid')?.addEventListener('mouseover', e => {
        const visual = e.target.closest('.product-visual');
        if (visual && !visual.dataset.tiltBound) {
            visual.dataset.tiltBound = 'true';
            bind(visual);
        }
    });
}

// ── Scroll progress indicator ────────────────────────────────────────────────
function setupScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    const update = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${pct}%`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
}

// ── Animated count-up (library stat) ─────────────────────────────────────────
function setupCountUp() {
    const el = document.getElementById('libraryCount');
    if (!el) return;
    const target = PRODUCTS.length;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion || !('IntersectionObserver' in window)) {
        el.textContent = target;
        return;
    }

    const animate = () => {
        const duration = 900;
        const start = performance.now();
        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animate();
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    observer.observe(el);
}

// ── Init ─────────────────────────────────────────────────────────────────────
renderProducts();
renderFAQs();
setupEvents();
setupScrollReveal();
setupNavbarScroll();
setupTiltEffect();
setupScrollProgress();
setupCountUp();