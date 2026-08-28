'use strict';

// ── Product catalogue ────────────────────────────────────────────────────────
// Mirror of PRODUCTS in js/store.js — keep name/price/tagline/features in sync
// if the main catalogue changes. Kept separate so this page has no dependency
// on store.js's DOM (productGrid, orderModal, etc.) which doesn't exist here.
const PRICING_PRODUCTS = [
    {
        id:       'momentum-pulse-v1',
        name:     'Momentum Pulse v1',
        type:     'indicator',
        tagline:  'Momentum, confirmed across timeframes',
        price:    450,
        billing:  'once-off',
        features: ['Multi-timeframe composite scoring', 'Histogram intensity reflects conviction strength', 'Live timeframe breakdown table'],
    },

    {
        id:       'supply-demand-pro-v1',
        name:     'Supply & Demand Pro v1',
        type:     'indicator',
        tagline:  'Seeing where price is likely to react',
        price:    650,
        billing:  'once-off',
        features: ['Real volume-based demand zones', 'Visual confirmation of support/resistance levels', 'Customizable zone sensitivity'],
    },
    {
        id:       'dynamic-sma-ribbon-v1',
        name:     'Dynamic SMA Ribbon v1',
        type:     'indicator',
        tagline:  'Trend direction, at a glance',
        price:    250,
        billing:  'once-off',
        features: ['Colour-coded trend alignment', 'Configurable fast/mid/slow lengths', 'Background tint on clean alignment only'],
    },
    {
        id:       'session-range-tracker-v2',
        name:     'Session Range Tracker v2',
        type:     'indicator',
        tagline:  'London and New York, mapped in real time',
        price:    400,
        billing:  'once-off',
        features: ['Live session range boxes', 'Midpoint acts as an intraday pivot', 'Previous session levels carried forward'],
    },
    {
        id:       'candle-range-theory-v2',
        name:     'Candle Range Theory v2',
        type:     'indicator',
        tagline:  'Weekly range, daily sweeps, and fair value gaps in one system',
        price:    900,
        billing:  'once-off',
        features: ['Automatic weekly CRT zone detection', 'Daily liquidity sweep markers', 'Live fair value gap tracking with fill detection'],
    },

    {
        id: 'voyager-fvg-v1',
        name: 'Voyager FVG EA - v3',
        type: 'expert-advisor',
        tagline: 'Fair value gap detection, plotting, and retracement auto-trading for MT5',
        price: 1500, // PLACEHOLDER — set your real price before this goes live
        billing: 'once-off',
        deliveryType: 'mt5-ea',
        features: [
            'Auto-detects and plots bullish/bearish FVGs',
            'Optional auto-trading on FVG retracement entries',
            'Configurable radar zone, fill mode, and risk settings',
        ],
    },

    
];

function escPr(str) {
    return String(str).replace(/[&<>"']/g, c => (
        {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]
    ));
}

function formatPricePr(p) {
    const r = `R${p.price.toLocaleString('en-ZA')}`;
    return p.billing === 'once-off'
        ? `${r}<span class="pr-price-note">once-off</span>`
        : `${r}<span class="pr-price-note">per month</span>`;
}

function renderPricingCards() {
    const grid = document.getElementById('pricingGrid');
    if (!grid) return;

    grid.innerHTML = PRICING_PRODUCTS.map(p => `
        <article class="pr-card">
            <span class="pr-type-tag ${escPr(p.type)}">${escPr(p.type)}</span>
            <h3 class="pr-card-name">${escPr(p.name)}</h3>
            <p class="pr-card-tagline">${escPr(p.tagline)}</p>
            <ul class="pr-card-features">
                ${p.features.map(f => `<li>${escPr(f)}</li>`).join('')}
            </ul>
            <div class="pr-card-footer">
                <div class="pr-card-price">${formatPricePr(p)}</div>
                <a class="btn btn-gold pr-card-btn" href="checkout.html?product=${encodeURIComponent(p.id)}">
                    Buy now
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>
                </a>

                <p class="product-access-note">
                    <svg width="12" height="12" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="9"/><path d="M11 6v5l3.5 3.5"/></svg>
                    Access usually granted within a few hours
                </p>
            </div>
        </article>
    `).join('');
}

// ── Mobile nav (same behaviour as other pages) ──────────────────────────────
function setupPricingNav() {
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
}

function setupPricingNewsletter() {
    document.querySelectorAll('[data-newsletter-form]').forEach(f => {
        f.addEventListener('submit', e => {
            e.preventDefault();
            const email = f.querySelector('input').value.trim();
            if (!email) return;
            const subject = encodeURIComponent('Waitlist signup');
            const body = encodeURIComponent(`Please add me to the Voyager updates list.\nEmail: ${email}`);
            window.location.href = `mailto:visualvoyagerbsn@gmail.com?subject=${subject}&body=${body}`;
        });
    });
}

renderPricingCards();
setupPricingNav();
setupPricingNewsletter();