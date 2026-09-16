/* THE PARTY DROP — site logic
   Catalog, cart (localStorage), Build Your Drop wizard, product page, checkout.
   Prices are ILLUSTRATIVE placeholders until the cost model is final. */

const TPD = (() => {
  // ---------- Catalog ----------
  const CATALOG = {
    food: [
      { id: 'grazing', name: 'The Grazing Board', desc: 'Cheese, charcuterie, fruit, dips', img: 'assets/img/grazing-board.jpg', sizes: { S: 149, L: 239 } },
      { id: 'brunch',  name: 'The Brunch Board',  desc: 'Croissant sandwiches, pastries, fruit', img: 'assets/img/brunch-bagel.jpg', sizes: { S: 139, L: 219 } },
      { id: 'fruit',   name: 'The Fruit Board',   desc: 'Tropical fruit, cut and styled', img: 'assets/img/salmon-toast.jpg', sizes: { S: 89, L: 139 } },
      { id: 'botana',  name: 'La Botana Board',   desc: 'Mexican cheeses, botana, salsas', img: 'assets/img/botana.jpg', sizes: { S: 139, L: 219 } }
    ],
    bubbles: [
      { id: 'b6',  name: 'Mimosa Kit for 6',  desc: '2 bottles · 2 juices · garnish · 6 cups', price: 79 },
      { id: 'b12', name: 'Mimosa Kit for 12', desc: '4 bottles · 3 juices · garnish · 12 cups', price: 129 }
    ],
    flowers: [
      { id: 'fp', name: 'Fresh Flowers · Petite',    desc: 'A small seasonal arrangement', price: 65 },
      { id: 'fs', name: 'Fresh Flowers · Statement', desc: 'A full table arrangement', price: 110 },
      { id: 'fr', name: 'Romantic Flowers',          desc: 'Roses, for anniversaries and surprises', price: 95 }
    ],
    balloons: [
      { id: 'bb', name: 'Birthday Set',     desc: '"Happy Birthday" sign · candles · card', price: 85 },
      { id: 'bh', name: 'Bachelorette Set', desc: 'Bride sign · candles · card', price: 85 },
      { id: 'bc', name: 'Celebration Set',  desc: 'Anniversary, welcome, congrats · candles · card', price: 85 }
    ],
    setup: { name: 'Set It Up', price: 120 }
  };
  const SIZE_LABEL = { S: 'Serves 4–6', L: 'Serves 8–12' };
  const ZONES = {
    A: { name: 'Zone A', fee: 25, min: 150 },
    B: { name: 'Zone B', fee: 45, min: 250 },
    C: { name: 'Zone C', fee: 75, min: 350 }
  };

  // ---------- Cart ----------
  const EMPTY = { food: null, size: 'S', bubbles: null, flowers: null, balloons: null, setup: false };
  const KEY = 'tpd_cart_v1';
  function getCart() {
    try { return Object.assign({}, EMPTY, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { ...EMPTY }; }
  }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updateCartBadge(); }
  function clearCart() { try { localStorage.removeItem(KEY); } catch (e) {} updateCartBadge(); }
  const find = (list, id) => list.find(x => x.id === id);

  function lines(c) {
    const out = [];
    if (c.food) { const f = find(CATALOG.food, c.food); out.push({ name: `${f.name} · ${SIZE_LABEL[c.size].replace('Serves ', '')}`, price: f.sizes[c.size] }); }
    if (c.bubbles) { const b = find(CATALOG.bubbles, c.bubbles); out.push({ name: b.name, price: b.price }); }
    if (c.flowers) { const f = find(CATALOG.flowers, c.flowers); out.push({ name: f.name, price: f.price }); }
    if (c.balloons) { const b = find(CATALOG.balloons, c.balloons); out.push({ name: b.name, price: b.price }); }
    if (c.setup) out.push({ name: CATALOG.setup.name, price: CATALOG.setup.price });
    return out;
  }
  const subtotal = c => lines(c).reduce((s, l) => s + l.price, 0);
  const count = c => lines(c).length;

  function updateCartBadge() {
    const n = count(getCart());
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = n; el.classList.toggle('show', n > 0); });
  }

  // ---------- Shared UI ----------
  function initNav() {
    const t = document.querySelector('.menu-toggle');
    const m = document.querySelector('.mobile-menu');
    if (t && m) t.addEventListener('click', () => m.classList.toggle('open'));
    updateCartBadge();
  }
  const money = n => `$${n}`;

  // ---------- Product page (Grazing Board) ----------
  function initProduct() {
    const c = getCart();
    const state = { size: c.food === 'grazing' ? c.size : 'S', veg: false, bubbles: c.food === 'grazing' && c.bubbles === 'b6', flowers: c.food === 'grazing' && c.flowers === 'fp', balloons: c.food === 'grazing' && c.balloons === 'bb', setup: c.food === 'grazing' && c.setup };
    const food = find(CATALOG.food, 'grazing');
    const $ = s => document.querySelector(s);
    const render = () => {
      const base = food.sizes[state.size];
      const total = base + (state.bubbles ? 79 : 0) + (state.flowers ? 65 : 0) + (state.balloons ? 85 : 0) + (state.setup ? 120 : 0);
      $('#boardPrice').textContent = money(base);
      $('#serves').textContent = state.size === 'L' ? 'Serves 8–12 · ~$22 per person' : 'Serves 4–6 · ~$30 per person';
      document.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('on', b.dataset.size === state.size));
      ['veg', 'bubbles', 'flowers', 'balloons', 'setup'].forEach(k => { const el = $(`[data-toggle="${k}"]`); if (el) el.classList.toggle('on', state[k]); });
      document.querySelectorAll('.js-total').forEach(el => el.textContent = money(total));
    };
    document.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => { state.size = b.dataset.size; render(); }));
    document.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', () => { const k = b.dataset.toggle; state[k] = !state[k]; render(); }));
    $('#addToDrop').addEventListener('click', () => {
      saveCart({ food: 'grazing', size: state.size, bubbles: state.bubbles ? 'b6' : null, flowers: state.flowers ? 'fp' : null, balloons: state.balloons ? 'bb' : null, setup: state.setup });
      window.location.href = 'build.html?step=5';
    });
    render();
  }

  // ---------- Build Your Drop wizard ----------
  function initBuild() {
    const $ = s => document.querySelector(s);
    const params = new URLSearchParams(location.search);
    const preset = params.get('drop');
    const PRESETS = {
      brunch:   { food: 'brunch',  size: 'S', bubbles: 'b6',  flowers: null, balloons: null, setup: false },
      birthday: { food: 'grazing', size: 'S', bubbles: 'b6',  flowers: 'fp', balloons: 'bb', setup: false },
      girls:    { food: 'grazing', size: 'L', bubbles: 'b12', flowers: null, balloons: 'bh', setup: false },
      romantic: { food: 'grazing', size: 'S', bubbles: 'b6',  flowers: 'fr', balloons: 'bc', setup: false },
      welcome:  { food: 'fruit',   size: 'L', bubbles: 'b6',  flowers: 'fp', balloons: null, setup: false }
    };
    let cart = preset && PRESETS[preset] ? { ...PRESETS[preset] } : getCart();
    if (!cart.food) cart.food = 'grazing';
    let step = preset ? 5 : Math.min(5, Math.max(1, parseInt(params.get('step') || '1', 10)));
    const labels = ['Pick your food', 'Add your bubbles', 'Add something pretty', 'Make it a party', 'Ready'];

    const optHTML = (o, on, extra) => `
      <button type="button" class="opt ${on ? 'on' : ''}" data-id="${o.id}">
        <span class="opt-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF9F3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
        ${o.img ? `<img class="opt-thumb" src="${o.img}" alt="">` : ''}
        <span class="opt-text"><strong>${o.name}</strong><span>${o.desc}</span></span>
        <span class="opt-price">${extra}</span>
      </button>`;
    const noneHTML = (on, label) => `
      <button type="button" class="opt ${on ? 'on' : ''}" data-id="">
        <span class="opt-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF9F3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
        <span class="opt-text"><strong>${label}</strong></span>
      </button>`;

    function render() {
      // progress
      document.querySelectorAll('.progress span').forEach((s, i) => s.classList.toggle('on', i < Math.min(step, 4)));
      $('#stepLabel').textContent = labels[step - 1];
      $('#stepNum').textContent = `Step ${Math.min(step, 4)} of 4`;
      document.querySelectorAll('.wizard-step').forEach((s, i) => s.classList.toggle('active', i === step - 1));
      // step 1
      $('#foodList').innerHTML = CATALOG.food.map(f => optHTML(f, cart.food === f.id, `from ${money(f.sizes.S)}`)).join('');
      const food = find(CATALOG.food, cart.food);
      $('#sizeS').innerHTML = `Serves 4–6<small>${money(food.sizes.S)}</small>`;
      $('#sizeL').innerHTML = `Serves 8–12<small>${money(food.sizes.L)} · best value</small>`;
      $('#sizeS').classList.toggle('on', cart.size === 'S');
      $('#sizeL').classList.toggle('on', cart.size === 'L');
      // step 2–4
      $('#bubblesList').innerHTML = noneHTML(!cart.bubbles, 'No bubbles this time') + CATALOG.bubbles.map(b => optHTML(b, cart.bubbles === b.id, `+${money(b.price)}`)).join('');
      $('#flowersList').innerHTML = noneHTML(!cart.flowers, 'No flowers') + CATALOG.flowers.map(f => optHTML(f, cart.flowers === f.id, `+${money(f.price)}`)).join('');
      $('#balloonsList').innerHTML = noneHTML(!cart.balloons, 'No balloons') + CATALOG.balloons.map(b => optHTML(b, cart.balloons === b.id, `+${money(b.price)}`)).join('');
      $('#setupOpt').classList.toggle('on', cart.setup);
      // summary
      $('#summaryLines').innerHTML = lines(cart).map(l => `<div class="summary-line"><span>${l.name}</span><strong>${money(l.price)}</strong></div>`).join('');
      document.querySelectorAll('.js-total').forEach(el => el.textContent = money(subtotal(cart)));
      // footer
      $('#wizardFooter').classList.toggle('hide', step === 5);
      $('#nextBtn').textContent = step === 4 ? 'Review my Drop' : 'Next';
      $('#backBtn').classList.toggle('hide', step === 1);
      $('#skipBtn').classList.toggle('hide', step === 1 || step === 5);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // delegation
    $('#foodList').addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) { cart.food = b.dataset.id; render(); } });
    $('#sizeS').addEventListener('click', () => { cart.size = 'S'; render(); });
    $('#sizeL').addEventListener('click', () => { cart.size = 'L'; render(); });
    [['bubblesList', 'bubbles'], ['flowersList', 'flowers'], ['balloonsList', 'balloons']].forEach(([id, key]) => {
      $('#' + id).addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) { cart[key] = b.dataset.id || null; render(); } });
    });
    $('#setupOpt').addEventListener('click', () => { cart.setup = !cart.setup; render(); });
    $('#nextBtn').addEventListener('click', () => { step = Math.min(5, step + 1); saveCart(cart); render(); });
    $('#skipBtn').addEventListener('click', () => { step = Math.min(5, step + 1); render(); });
    $('#backBtn').addEventListener('click', () => { step = Math.max(1, step - 1); render(); });
    $('#restartBtn').addEventListener('click', () => { cart = { ...EMPTY, food: 'grazing' }; step = 1; saveCart(cart); render(); });
    $('#toCheckout').addEventListener('click', () => { saveCart(cart); });
    document.querySelectorAll('.js-editstep').forEach(b => b.addEventListener('click', () => { step = parseInt(b.dataset.step, 10); render(); }));
    saveCart(cart);
    render();
  }

  // ---------- Checkout ----------
  function initCheckout() {
    const $ = s => document.querySelector(s);
    const cart = getCart();
    if (!cart.food) { window.location.href = 'build.html'; return; }
    const state = { zone: 'A', win: '9-11', prop: 'villa', surprise: true };
    const today = new Date(); today.setDate(today.getDate() + 2);
    $('#date').min = today.toISOString().slice(0, 10);
    $('#date').value = today.toISOString().slice(0, 10);

    function render() {
      const z = ZONES[state.zone];
      const sub = subtotal(cart);
      $('#summaryLines').innerHTML = lines(cart).map(l => `<div class="summary-line"><span>${l.name}</span><strong>${money(l.price)}</strong></div>`).join('')
        + `<div class="summary-line muted"><span>Delivery · ${z.name}</span><span>${money(z.fee)}</span></div>`;
      $('#grand').textContent = money(sub + z.fee);
      $('#placeOrder').textContent = `Place order · ${money(sub + z.fee)}`;
      $('#zoneInfo').innerHTML = `<span>${z.name} · Delivery ${money(z.fee)}</span><span>Minimum order ${money(z.min)}</span>`;
      const under = sub < z.min;
      $('#minError').classList.toggle('show', under);
      $('#minError').textContent = under ? `This zone has a ${money(z.min)} minimum. Add ${money(z.min - sub)} more to your Drop, or choose Zone A.` : '';
      $('#placeOrder').disabled = under;
      document.querySelectorAll('[data-win]').forEach(b => b.classList.toggle('on', b.dataset.win === state.win));
      document.querySelectorAll('[data-prop]').forEach(b => b.classList.toggle('on', b.dataset.prop === state.prop));
      $('#surprise').classList.toggle('on', state.surprise);
      $('#contactLabel').textContent = state.surprise ? 'Who is in on the surprise? (our contact on the day)' : 'Who is receiving the Drop?';
    }
    $('#zone').addEventListener('change', e => { state.zone = e.target.value; render(); });
    document.querySelectorAll('[data-win]').forEach(b => b.addEventListener('click', () => { state.win = b.dataset.win; render(); }));
    document.querySelectorAll('[data-prop]').forEach(b => b.addEventListener('click', () => { state.prop = b.dataset.prop; render(); }));
    $('#surprise').addEventListener('click', () => { state.surprise = !state.surprise; render(); });
    $('#checkoutForm').addEventListener('submit', e => {
      e.preventDefault();
      if (!$('#terms').checked) { $('#termsError').classList.add('show'); return; }
      const order = { id: 'TPD-' + Math.floor(1000 + Math.random() * 9000), date: $('#date').value, win: state.win, zone: state.zone, prop: state.prop, propName: $('#prop').value, setup: cart.setup, total: subtotal(cart) + ZONES[state.zone].fee };
      try { sessionStorage.setItem('tpd_order', JSON.stringify(order)); } catch (err) {}
      clearCart();
      window.location.href = 'confirmation.html';
    });
    render();
  }

  // ---------- Confirmation ----------
  function initConfirmation() {
    let o = null;
    try { o = JSON.parse(sessionStorage.getItem('tpd_order') || 'null'); } catch (e) {}
    if (!o) return;
    const d = new Date(o.date + 'T12:00:00');
    const WIN = { '9-11': '9–11 am', '11-13': '11 am–1 pm', '13-15': '1–3 pm', '15-17': '3–5 pm', 'checkin': 'before check-in' };
    document.querySelector('#orderId').textContent = 'Order #' + o.id;
    document.querySelector('#orderMeta').innerHTML = `${d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} · ${WIN[o.win] || ''}<br>${o.propName || 'Your stay'} · ${o.setup ? 'Set It Up' : 'Drop-Off'}`;
  }

  // ---------- Boot ----------
  document.addEventListener('DOMContentLoaded', () => {
    initNav();
    const page = document.body.dataset.page;
    if (page === 'product') initProduct();
    if (page === 'build') initBuild();
    if (page === 'checkout') initCheckout();
    if (page === 'confirmation') initConfirmation();
  });

  return { CATALOG, getCart, saveCart, clearCart };
})();
