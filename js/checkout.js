'use strict';

// ═════════════════════════════════════════════════════════════════════════
// PAYSTACK CONFIG
// ═════════════════════════════════════════════════════════════════════════
const PAYSTACK_PUBLIC_KEY = 'pk_live_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

const CO_CONFIG = {
    email:    'visualvoyagebsn@gmail.com',
    whatsapp: '27814758138',
};

// ── Product catalogue ────────────────────────────────────────────────────────
// Mirror of PRICING_PRODUCTS in js/pricing.js — keep both in sync manually.
// (Worth knowing: this is now the third copy of this data, alongside store.js
// and pricing.js. Fine for now, but if a 4th product ever gets added, that's
// the moment to pull this into one shared file all three pages import.)
const CO_PRODUCTS = [
    { id: 'momentum-pulse-v1',        name: 'Momentum Pulse',          tagline: 'Momentum, confirmed across timeframes',                          price: 450,  billing: 'once-off', type: 'indicator', deliveryType: 'tradingview' },
    { id: 'liquidity-zones-pro-v1',   name: 'Liquidity Zones Pro',     tagline: 'A persistent volume-profile sweep engine',                        price: 650,  billing: 'once-off', type: 'indicator', deliveryType: 'tradingview' },
    { id: 'dynamic-sma-ribbon-v1',    name: 'Dynamic SMA Ribbon',      tagline: 'Trend direction, at a glance',                                    price: 250,  billing: 'once-off', type: 'indicator', deliveryType: 'tradingview' },
    { id: 'session-range-tracker-v1', name: 'Session Range Tracker',   tagline: 'London and New York, mapped in real time',                        price: 400,  billing: 'once-off', type: 'indicator', deliveryType: 'tradingview' },
    { id: 'candle-range-theory-v2',   name: 'Candle Range Theory v2',  tagline: 'Weekly range, daily sweeps, and fair value gaps in one system',   price: 900,  billing: 'once-off', type: 'indicator', deliveryType: 'tradingview' },
    { id: 'voyager-fvg-v1',           name: 'Voyager FVG EA',          tagline: 'Fair value gap detection, plotting, and retracement auto-trading for MT5', price: 1500, billing: 'once-off', type: 'ea', deliveryType: 'mt5-ea' }, // PLACEHOLDER PRICE
];

let selectedProduct = null;

function escCo(str) {
    return String(str).replace(/[&<>"']/g, c => (
        {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]
    ));
}

function findProduct(id) {
    return CO_PRODUCTS.find(p => p.id === id) || null;
}

function billingLabel(p) {
    return p.billing === 'once-off' ? 'once-off' : 'per month';
}

function isEaProduct(p) {
    return !!p && p.deliveryType === 'mt5-ea';
}

// ── Identifier fields — swaps between TradingView username and MT5 account/broker ──
function renderIdentifierFields(product) {
    const container = document.getElementById('coIdentifierFields');
    if (!container) return;

    if (isEaProduct(product)) {
        container.innerHTML = `
            <div class="co-form-field">
                <label for="coMt5Account">MT5 account number</label>
                <input id="coMt5Account" type="text" required autocomplete="off" inputmode="numeric" placeholder="e.g. 51234567">
                <p class="field-hint">This is how your license gets tied to your account — double-check it's exact before paying.</p>
            </div>
            <div class="co-form-field">
                <label for="coBrokerServer">Broker server</label>
                <input id="coBrokerServer" type="text" required autocomplete="off" placeholder="e.g. IFXBrokers-Live01">
                <p class="field-hint">Found in MT5 under your account details — must match exactly, including capitalisation.</p>
            </div>
        `;
    } else {
        container.innerHTML = `
            <div class="co-form-field">
                <label for="coUsername">TradingView username</label>
                <input id="coUsername" type="text" required autocomplete="off" placeholder="e.g. trader_123">
                <p class="field-hint">This is how access gets linked to your account — double-check it's exact before paying.</p>
            </div>
        `;
    }
    bindIdentifierInputListeners();
}

function bindIdentifierInputListeners() {
    const ids = isEaProduct(selectedProduct) ? ['coMt5Account', 'coBrokerServer'] : ['coUsername'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', refreshEftLinks);
    });
}

// Reads whichever identifier fields are currently on screen, regardless of type.
function getIdentifierValues() {
    if (isEaProduct(selectedProduct)) {
        const acct = document.getElementById('coMt5Account');
        const srv  = document.getElementById('coBrokerServer');
        const acctVal = acct ? acct.value.trim() : '';
        const srvVal  = srv ? srv.value.trim() : '';
        return {
            valid: !!(acctVal && srvVal),
            display: acctVal ? `MT5 account: ${acctVal} (${srvVal || '[broker server not provided]'})` : '',
            mt5Account: acctVal,
            brokerServer: srvVal,
        };
    }
    const el = document.getElementById('coUsername');
    const val = el ? el.value.trim() : '';
    return {
        valid: !!val,
        display: val ? `TradingView username: ${val}` : '',
        username: val,
    };
}

// ── Render: order summary (product chosen) ─────────────────────────────────
function renderSummary(product) {
    const el = document.getElementById('checkoutSummary');
    const bullets = isEaProduct(product)
        ? ['License key emailed after payment', 'Activates on one MT5 account + broker server', 'Free updates for as long as your license is active']
        : ['TradingView invite-only access', 'Access granted within a few hours of payment', 'Free updates for as long as you have access'];

    el.innerHTML = `
        <div class="co-summary-card">
            <span class="co-summary-eyebrow">Your order</span>
            <h2 class="co-summary-name">${escCo(product.name)}</h2>
            <p class="co-summary-tagline">${escCo(product.tagline)}</p>
            <div class="co-summary-price-row">
                <span class="co-summary-price">R${product.price.toLocaleString('en-ZA')}</span>
                <span class="co-summary-billing">${escCo(billingLabel(product))}</span>
            </div>
            <ul class="co-summary-list">
                ${bullets.map(b => `<li>${escCo(b)}</li>`).join('')}
            </ul>
            <button type="button" class="co-change-link" id="coChangeProduct">Choose a different tool</button>
        </div>
    `;
    document.getElementById('coChangeProduct').addEventListener('click', () => {
        selectedProduct = null;
        history.replaceState(null, '', 'checkout.html');
        renderPicker();
    });
}

// ── Render: product picker (no product selected yet) ───────────────────────
function renderPicker() {
    const el = document.getElementById('checkoutSummary');
    el.innerHTML = `
        <div class="co-picker">
            <span class="co-summary-eyebrow">Choose a tool</span>
            <div class="co-picker-list">
                ${CO_PRODUCTS.map(p => `
                    <button type="button" class="co-picker-item" data-pick="${escCo(p.id)}">
                        <span class="co-picker-item-main">
                            <span class="co-picker-item-name">${escCo(p.name)}</span>
                            <span class="co-picker-item-tagline">${escCo(p.tagline)}</span>
                        </span>
                        <span class="co-picker-item-price">R${p.price.toLocaleString('en-ZA')}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    el.querySelectorAll('[data-pick]').forEach(btn => {
        btn.addEventListener('click', () => selectProduct(btn.dataset.pick));
    });
    setFormEnabled(false);
}

function selectProduct(id) {
    const product = findProduct(id);
    if (!product) return;
    selectedProduct = product;
    history.replaceState(null, '', `checkout.html?product=${encodeURIComponent(id)}`);
    renderSummary(product);
    renderIdentifierFields(product);
    setFormEnabled(true);
    updatePayButtonLabel();
    updateSuccessCopy(product);
    refreshEftLinks();
}

function setFormEnabled(enabled) {
    const btn = document.getElementById('payBtn');
    if (btn) btn.disabled = !enabled;
}

function updatePayButtonLabel() {
    const span = document.getElementById('payAmount');
    if (span && selectedProduct) {
        span.textContent = `R${selectedProduct.price.toLocaleString('en-ZA')}`;
    }
}

function updateSuccessCopy(product) {
    const desc = document.getElementById('coSuccessDesc');
    if (!desc) return;
    desc.textContent = isEaProduct(product)
        ? "We'll email your license key to activate it, usually within a few hours. Paste it into the EA's license-key setting once it arrives."
        : 'We grant TradingView access manually, usually within a few hours. You\'ll see the script appear under your "Invite-only scripts" tab once it\'s added.';
}

// ── Manual fallback (email / WhatsApp) ──────────────────────────────────────
function buildOrderMessage(product, idInfo, email) {
    return [
        'Hi,',
        '',
        `I would like access to: ${product.name}`,
        `Price: R${product.price.toLocaleString('en-ZA')} (${billingLabel(product)})`,
        idInfo.display,
        `Email: ${email}`,
        '',
        'Please send payment details.',
    ].join('\n');
}

function showFallback(product, idInfo, email) {
    const panel = document.getElementById('checkoutFallback');
    const subject = encodeURIComponent(`Order: ${product.name}`);
    const body = encodeURIComponent(buildOrderMessage(product, idInfo, email));

    panel.querySelector('#coFallbackEmail').href = `mailto:${CO_CONFIG.email}?subject=${subject}&body=${body}`;
    panel.querySelector('#coFallbackWhatsapp').href = `https://wa.me/${CO_CONFIG.whatsapp}?text=${body}`;
    panel.hidden = false;
    panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Success state ────────────────────────────────────────────────────────
function showSuccess(product, reference) {
    document.getElementById('checkoutFormPanel').hidden = true;
    const success = document.getElementById('checkoutSuccess');
    success.querySelector('#coSuccessProduct').textContent = product.name;
    success.querySelector('#coSuccessRef').textContent = reference || '—';
    success.hidden = false;
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// ── Paystack ─────────────────────────────────────────────────────────────
function paystackReady() {
    return typeof window.PaystackPop !== 'undefined'
        && PAYSTACK_PUBLIC_KEY
        && !PAYSTACK_PUBLIC_KEY.includes('XXXX');
}

function generateRef() {
    return 'VG-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    if (!selectedProduct) return;

    const emailEl = document.getElementById('coEmail');
    if (!emailEl.reportValidity()) return;

    const idInfo = getIdentifierValues();
    if (!idInfo.valid) {
        if (isEaProduct(selectedProduct)) {
            document.getElementById('coMt5Account').reportValidity();
            document.getElementById('coBrokerServer').reportValidity();
        } else {
            document.getElementById('coUsername').reportValidity();
        }
        return;
    }

    const email = emailEl.value.trim();
    const payBtn = document.getElementById('payBtn');

    if (!paystackReady()) {
        showFallback(selectedProduct, idInfo, email);
        return;
    }

    payBtn.disabled = true;
    payBtn.classList.add('is-loading');
    const originalLabel = payBtn.innerHTML;
    payBtn.innerHTML = 'Opening secure checkout…';

    const resetButton = () => {
        payBtn.disabled = false;
        payBtn.classList.remove('is-loading');
        payBtn.innerHTML = originalLabel;
    };

    const customFields = isEaProduct(selectedProduct)
        ? [
            { display_name: 'MT5 Account Number', variable_name: 'mt5_account', value: idInfo.mt5Account },
            { display_name: 'Broker Server', variable_name: 'broker_server', value: idInfo.brokerServer },
            { display_name: 'Product', variable_name: 'product', value: selectedProduct.name },
        ]
        : [
            { display_name: 'TradingView Username', variable_name: 'tradingview_username', value: idInfo.username },
            { display_name: 'Product', variable_name: 'product', value: selectedProduct.name },
        ];

    try {
        const paystack = new PaystackPop();
        paystack.newTransaction({
            key: PAYSTACK_PUBLIC_KEY,
            email: email,
            amount: selectedProduct.price * 100,
            currency: 'ZAR',
            ref: generateRef(),
            metadata: { custom_fields: customFields },
            onSuccess: (transaction) => {
                resetButton();
                showSuccess(selectedProduct, transaction.reference);
            },
            onCancel: () => {
                resetButton();
            },
        });
    } catch (err) {
        resetButton();
        showFallback(selectedProduct, idInfo, email);
    }
}

// ── Alternate payment: direct EFT ───────────────────────────────────────────
function buildEftMessage(product, idInfo, email) {
    return [
        'Hi,',
        '',
        `I've made a direct EFT payment for: ${product ? product.name : '[product]'}`,
        product ? `Amount: R${product.price.toLocaleString('en-ZA')} (${billingLabel(product)})` : '',
        idInfo.display || '[details not provided yet]',
        `Email: ${email || '[not provided yet]'}`,
        '',
        'Proof of payment attached / to follow.',
        'Please confirm and grant access.',
    ].filter(Boolean).join('\n');
}

function refreshEftLinks() {
    const emailLink = document.getElementById('coEftEmail');
    const waLink = document.getElementById('coEftWhatsapp');
    const refEl = document.getElementById('coBankRef');
    if (!emailLink || !waLink) return;

    const emailEl = document.getElementById('coEmail');
    const email = emailEl ? emailEl.value.trim() : '';
    const idInfo = getIdentifierValues();

    const msg = buildEftMessage(selectedProduct, idInfo, email);
    const subject = encodeURIComponent(`EFT payment: ${selectedProduct ? selectedProduct.name : 'Voyager order'}`);

    emailLink.href = `mailto:${CO_CONFIG.email}?subject=${subject}&body=${encodeURIComponent(msg)}`;
    waLink.href = `https://wa.me/${CO_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

    if (refEl) {
        if (isEaProduct(selectedProduct)) {
            refEl.textContent = idInfo.mt5Account ? `${idInfo.mt5Account} (MT5 account number)` : 'Your MT5 account number';
        } else {
            refEl.textContent = idInfo.username ? `${idInfo.username} (TradingView username)` : 'indicator ID + Your TradingView username';
        }
    }
}

function setupAltPayment() {
    const toggle = document.getElementById('coAltToggle');
    const panel = document.getElementById('coAltPanel');
    if (!toggle || !panel) return;

    toggle.addEventListener('click', () => {
        const opening = panel.hidden;
        panel.hidden = !opening;
        toggle.setAttribute('aria-expanded', String(opening));
        toggle.classList.toggle('is-open', opening);
        if (opening) refreshEftLinks();
    });

    panel.addEventListener('click', e => {
        const btn = e.target.closest('.co-copy-btn');
        if (!btn) return;
        const text = btn.dataset.copy;
        const original = btn.textContent;
        const markCopied = () => {
            btn.textContent = 'Copied';
            btn.classList.add('is-copied');
            setTimeout(() => {
                btn.textContent = original;
                btn.classList.remove('is-copied');
            }, 1500);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(markCopied).catch(() => {});
        }
    });

    const emailEl = document.getElementById('coEmail');
    if (emailEl) emailEl.addEventListener('input', refreshEftLinks);
    // Identifier field listeners are bound in bindIdentifierInputListeners(),
    // called every time renderIdentifierFields() runs — those inputs get
    // recreated per product type, so binding them here would go stale.
}

// ── Init ─────────────────────────────────────────────────────────────────
function initCheckout() {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product');
    const product = productId ? findProduct(productId) : null;

    if (product) {
        selectedProduct = product;
        renderSummary(product);
        renderIdentifierFields(product);
        setFormEnabled(true);
        updatePayButtonLabel();
        updateSuccessCopy(product);
    } else {
        renderPicker();
    }

    document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);
    setupAltPayment();
    refreshEftLinks();

    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = document.querySelector('[data-nav-menu]');
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }
}

initCheckout();