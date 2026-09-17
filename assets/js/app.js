/* THE PARTY DROP — site logic
   Catalog, cart (localStorage), Build Your Drop wizard, product & drop pages, checkout.
   Prices are ILLUSTRATIVE placeholders until the cost model is final. */

const TPD = (() => {
  // ---------- Catalog ----------
  const CATALOG = {
    food: [
      { id: 'grazing', name: 'The Grazing Board', tag: 'Food · Best seller', desc: 'Cheese, charcuterie, fruit, dips',
        long: 'Cheese, charcuterie, fresh fruit, nuts, olives, crackers and dips. Styled, chilled and ready to serve the moment it lands.',
        img: 'assets/img/grazing-board.jpg', photos: ['assets/img/grazing-board.jpg', 'assets/img/charcuterie-tray.jpg', 'assets/img/canapes.jpg'],
        sizes: { XS: 79, S: 149, L: 239 },
        includes: ['3 artisan cheeses (brie, manchego, aged gouda)', '2 cured meats (jamón serrano, salami)', 'Seasonal fresh fruit', 'Nuts & marinated olives', 'Crackers & sliced baguette', '2 house dips + honey', 'Board or tray included, no return needed'],
        perfect: 'A light lunch for 4–6, or a grazing snack for 8–10. Arrival day, pool day, before dinner.',
        dietary: 'Contains dairy, gluten, tree nuts. Meat-free option available at the same price.' },
      { id: 'brunch', name: 'The Brunch Board', tag: 'Food · Brunch', desc: 'Croissant sandwiches, pastries, fruit',
        long: 'Mini croissant sandwiches, seasonal pastries, fresh fruit and a house-made accompaniment. The birthday brunch, solved.',
        img: 'assets/img/brunch-bagel.jpg', photos: ['assets/img/brunch-bagel.jpg', 'assets/img/brunch-bagel-drink.jpg', 'assets/img/espresso.jpg'],
        sizes: { XS: 75, S: 139, L: 219 },
        includes: ['Mini croissant sandwiches (ham & cheese · turkey & avocado)', 'Seasonal pastries', 'Fresh fruit', 'House-made jam & butter', 'Napkins & serving tongs', 'Board or tray included'],
        perfect: 'A full brunch for 4–6 (12 sandwiches) or 8–12 (24 sandwiches). Pairs with the Mimosa Kit.',
        dietary: 'Contains dairy, gluten, eggs. Vegetarian sandwiches on request.' },
      { id: 'fruit', name: 'The Fruit Board', tag: 'Food · Fresh', desc: 'Tropical fruit, cut and styled',
        long: 'Tropical fruit of the season, cut, chilled and styled on a board. The lightest way to start a pool day.',
        img: 'assets/img/salmon-toast.jpg', photos: ['assets/img/salmon-toast.jpg', 'assets/img/canapes.jpg', 'assets/img/churros-hands.jpg'],
        sizes: { XS: 49, S: 89, L: 139 },
        includes: ['Mango, papaya, pineapple, watermelon (seasonal)', 'Berries', 'Lime wedges & Tajín on the side', 'Fresh mint', 'Board or tray included'],
        perfect: 'Pool day, welcome day, or the fresh side of any brunch. Serves 4–6 or 8–12.',
        dietary: 'Vegan, gluten-free, nut-free.' },
      { id: 'botana', name: 'La Botana Board', tag: 'Food · Mexican', desc: 'Mexican cheeses, botana, salsas',
        long: 'The grazing board, Mexican style: Oaxaca and panela cheese, artisanal botana, fruit with chile, salsas and tostadas.',
        img: 'assets/img/botana.jpg', photos: ['assets/img/botana.jpg', 'assets/img/churros-hands.jpg', 'assets/img/charcuterie-tray.jpg'],
        sizes: { XS: 75, S: 139, L: 219 },
        includes: ['Queso Oaxaca, panela & cotija', 'Artisanal botana: cacahuates, chicharrón de harina', 'Jícama, cucumber & mango with chile', '2 house salsas + guacamole', 'Tostadas & totopos', 'Board or tray included'],
        perfect: 'Sunset snacks, pool day, the "we\'re in Mexico" moment. Serves 4–6 or 8–12.',
        dietary: 'Contains dairy, gluten (tostadas), peanuts. Vegetarian.' }
    ],
    bubbles: [
      { id: 'b2',  name: 'Bubbles for 2',    desc: '1 bottle · juice · garnish · 2 flutes', price: 45,
        includes: ['1 bottle of sparkling wine*', 'Fresh orange juice', 'Fruit garnish', '2 glass flutes (yours to keep)'] },
      { id: 'b6',  name: 'Mimosa Kit for 6',  desc: '2 bottles · 2 juices · garnish · 6 cups', price: 79,
        includes: ['2 bottles of sparkling wine*', 'Fresh orange juice + seasonal juice', 'Fruit garnish', '6 premium cups', 'Ice, when available'] },
      { id: 'b12', name: 'Mimosa Kit for 12', desc: '4 bottles · 3 juices · garnish · 12 cups', price: 129,
        includes: ['4 bottles of sparkling wine*', 'Fresh orange juice + 2 seasonal juices', 'Fruit garnish', '12 premium cups', 'Ice, when available'] },
      { id: 'mich2',  name: 'Michelada Kit for 2',  desc: '2 beers · clamato · limes · chamoy rim · 2 cups', price: 35,
        includes: ['2 Mexican beers*', 'Clamato & house michelada mix', 'Limes', 'Chamoy & Tajín for the rim', '2 premium cups'] },
      { id: 'mich6',  name: 'Michelada Kit for 6',  desc: '6 beers · clamato · limes · chamoy rim · 6 cups', price: 69,
        includes: ['6 Mexican beers*', 'Clamato & house michelada mix', 'Limes', 'Chamoy & Tajín for the rim', '6 premium cups', 'Ice, when available'] },
      { id: 'mich12', name: 'Michelada Kit for 12', desc: '12 beers · clamato · limes · chamoy rim · 12 cups', price: 119,
        includes: ['12 Mexican beers*', 'Clamato & house michelada mix', 'Limes', 'Chamoy & Tajín for the rim', '12 premium cups', 'Ice, when available'] },
      { id: 'bloody6', name: 'Bloody Mary Kit for 6', desc: 'vodka · house tomato mix · celery · olives · 6 cups', price: 89,
        includes: ['1 bottle of vodka*', 'House bloody mary mix', 'Celery, limes & olives', 'Tajín for the rim', '6 premium cups', 'Ice, when available'] }
    ],
    sweets: [
      { id: 'straw', name: 'Chocolate-Dipped Strawberries', desc: '12 strawberries, dark & white chocolate', price: 39,
        includes: ['12 fresh strawberries', 'Dark & white chocolate, hand-dipped', 'Styled in our box', 'Best within 24h, keep refrigerated'] },
      { id: 'choc',  name: 'Artisan Chocolate Board', desc: 'Mexican bean-to-bar chocolate, tasting board', price: 49,
        includes: ['Selection of Mexican bean-to-bar chocolate', 'Dried fruit & nuts', 'Tasting card', 'Board included'] }
    ],
    flowers: [
      { id: 'fp', name: 'Fresh Flowers · Petite',    desc: 'A small seasonal arrangement', price: 65,  includes: ['Seasonal stems, styled to the table', 'Vase included', 'Care card'] },
      { id: 'fs', name: 'Fresh Flowers · Statement', desc: 'A full table arrangement', price: 110, includes: ['Full seasonal arrangement', 'Statement vase included', 'Care card'] },
      { id: 'fr', name: 'Romantic Flowers',          desc: 'Roses, for anniversaries and surprises', price: 95, includes: ['12 roses (red or blush)', 'Eucalyptus & greenery', 'Vase included', 'Handwritten card'] }
    ],
    balloons: [
      { id: 'bb', name: 'Birthday Set',     desc: '"Happy Birthday" sign · candles · card', price: 85, includes: ['Balloon set in our palette (12–15 balloons)', '"Happy Birthday" sign', 'Candles + matches', 'Confetti', 'Handwritten card'] },
      { id: 'bh', name: 'Bachelorette Set', desc: 'Bride sign · candles · card', price: 85, includes: ['Balloon set in our palette (12–15 balloons)', '"Bride" sign', 'Candles + matches', 'Confetti', 'Handwritten card'] },
      { id: 'bc', name: 'Celebration Set',  desc: 'Anniversary, welcome, congrats · candles · card', price: 85, includes: ['Balloon set in our palette (12–15 balloons)', 'Neutral celebration sign', 'Candles + matches', 'Confetti', 'Handwritten card'] }
    ],
    pinata: { name: 'Piñata', desc: 'Handmade, filled, ready to hang', price: 59,
      includes: ['Handmade piñata (star, or ask for a shape)', 'Filled with candy & confetti', 'Stick & blindfold', 'Rope, ready to hang'] },
    setup: { name: 'Set It Up', desc: 'We style the table before they walk in', price: 120,
      includes: ['Our team arrives 30–45 min before', 'Table styled: food, cups, flowers, balloons', 'A photo sent to you when it\'s ready', 'Zones A & B · 72h notice'] }
  };
  const SIZE_LABEL = { XS: 'For 2', S: 'Serves 4–6', L: 'Serves 8–12' };
  const SIZE_PEOPLE = { XS: 2, S: 5, L: 10 };
  const ZONES = {
    A: { name: 'Zone A', fee: 25, min: 150 },
    B: { name: 'Zone B', fee: 45, min: 250 },
    C: { name: 'Zone C', fee: 75, min: 350 }
  };
  const DROPS = {
    birthday: { name: 'The Birthday Drop', tagline: 'The surprise, ready when they walk in.', img: 'assets/img/birthday-cake.jpg', serves: 'Serves 4–6',
      cart: { food: 'grazing', size: 'S', bubbles: 'b6', sweet: null, flowers: 'fp', balloons: 'bb', pinata: false, setup: false } },
    brunch: { name: 'The Brunch Drop', tagline: 'A slow morning, without the shopping.', img: 'assets/img/brunch-bagel-drink.jpg', serves: 'Serves 4–6',
      cart: { food: 'brunch', size: 'S', bubbles: 'b6', sweet: null, flowers: null, balloons: null, pinata: false, setup: false } },
    girls: { name: 'The Girls Trip Drop', tagline: 'Big board, twelve cups, one bride sign.', img: 'assets/img/canapes.jpg', serves: 'Serves 8–12',
      cart: { food: 'grazing', size: 'L', bubbles: 'b12', sweet: null, flowers: null, balloons: 'bh', pinata: false, setup: false } },
    romantic: { name: 'The Romantic Drop', tagline: 'Roses, bubbles, chocolate strawberries and a table for two.', img: 'assets/img/bubbles-mr-mrs.jpg', serves: 'For 2',
      cart: { food: 'grazing', size: 'XS', bubbles: 'b2', sweet: 'straw', flowers: 'fr', balloons: null, pinata: false, setup: false } },
    fiesta: { name: 'The Fiesta Drop', tagline: 'A Mexican gathering: botana, micheladas, balloons and a piñata.', img: 'assets/img/botana.jpg', serves: 'Serves 8–12',
      cart: { food: 'botana', size: 'L', bubbles: 'mich12', sweet: null, flowers: null, balloons: 'bc', pinata: true, setup: false } },
    welcome: { name: 'The Welcome Drop', tagline: 'Delivered before check-in. Coordinated with your host.', img: 'assets/img/flowers.jpg', serves: 'Serves 8–12',
      cart: { food: 'fruit', size: 'L', bubbles: 'b6', sweet: null, flowers: 'fp', balloons: null, pinata: false, setup: false } }
  };

  // ---------- Cart ----------
  const EMPTY = { food: null, size: 'S', bubbles: null, sweet: null, flowers: null, balloons: null, pinata: false, setup: false };
  const KEY = 'tpd_cart_v1';
  function getCart() {
    try { return Object.assign({}, EMPTY, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) { return { ...EMPTY }; }
  }
  function saveCart(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} updateCartBadge(); }
  function clearCart() { try { localStorage.removeItem(KEY); } catch (e) {} updateCartBadge(); }
  const find = (list, id) => list.find(x => x.id === id);

  function lines(c) {
    const out = [];
    if (c.food) { const f = find(CATALOG.food, c.food); out.push({ name: `${f.name} · ${SIZE_LABEL[c.size].replace('Serves ', '')}`, price: f.sizes[c.size], includes: f.includes }); }
    if (c.sweet) { const s = find(CATALOG.sweets, c.sweet); out.push({ name: s.name, price: s.price, includes: s.includes }); }
    if (c.bubbles) { const b = find(CATALOG.bubbles, c.bubbles); out.push({ name: b.name, price: b.price, includes: b.includes }); }
    if (c.flowers) { const f = find(CATALOG.flowers, c.flowers); out.push({ name: f.name, price: f.price, includes: f.includes }); }
    if (c.balloons) { const b = find(CATALOG.balloons, c.balloons); out.push({ name: b.name, price: b.price, includes: b.includes }); }
    if (c.pinata) out.push({ name: CATALOG.pinata.name, price: CATALOG.pinata.price, includes: CATALOG.pinata.includes });
    if (c.setup) out.push({ name: CATALOG.setup.name, price: CATALOG.setup.price, includes: CATALOG.setup.includes });
    return out;
  }
  const subtotal = c => lines(c).reduce((s, l) => s + l.price, 0);
  const count = c => lines(c).length;
  const dropPrice = id => subtotal(DROPS[id].cart);

  function updateCartBadge() {
    const n = count(getCart());
    document.querySelectorAll('.cart-count').forEach(el => { el.textContent = n; el.classList.toggle('show', n > 0); });
  }

  // ---------- Shared UI ----------
  const money = n => `$${n}`;
  const listHTML = arr => `<ul class="includes">${arr.map(i => `<li>${i}</li>`).join('')}</ul>`;
  const param = k => new URLSearchParams(location.search).get(k);
  function initNav() {
    const t = document.querySelector('.menu-toggle');
    const m = document.querySelector('.mobile-menu');
    if (t && m) t.addEventListener('click', () => m.classList.toggle('open'));
    updateCartBadge();
    // Drop prices on home cards
    document.querySelectorAll('[data-drop-price]').forEach(el => { const id = el.dataset.dropPrice; if (DROPS[id]) el.textContent = money(dropPrice(id)); });
  }

  // ---------- Product page (any board) ----------
  function initProduct() {
    const $ = s => document.querySelector(s);
    const id = CATALOG.food.some(f => f.id === param('id')) ? param('id') : 'grazing';
    const food = find(CATALOG.food, id);
    const c = getCart();
    const same = c.food === id;
    const state = { size: same ? c.size : 'S', veg: false, bubbles: same && !!c.bubbles, sweet: same && !!c.sweet, flowers: same && !!c.flowers, balloons: same && !!c.balloons, pinata: same && c.pinata, setup: same && c.setup };

    document.title = `${food.name} — delivered in Puerto Vallarta | The Party Drop`;
    $('#pTag').textContent = food.tag;
    $('#pName').textContent = food.name;
    $('#pLong').textContent = food.long;
    $('#pIncludes').innerHTML = listHTML(food.includes) + `<p class="muted" style="margin-top:8px">Three sizes: for 2, serves 4–6, serves 8–12. [Exact weights per size.]</p>`;
    $('#pPerfect').textContent = food.perfect;
    $('#pDietary').textContent = food.dietary;
    $('#gallery').innerHTML = food.photos.map((p, i) => `<img src="${p}" alt="${food.name}" ${i ? 'loading="lazy"' : ''}>`).join('');
    $('#sizeXS').innerHTML = `<strong>For 2</strong><small>${money(food.sizes.XS)}</small>`;
    $('#sizeS').innerHTML = `<strong>Serves 4–6</strong><small>${money(food.sizes.S)}</small>`;
    $('#sizeL').innerHTML = `<strong>Serves 8–12</strong><small>${money(food.sizes.L)} · best value</small>`;
    $('#pairs').innerHTML = CATALOG.food.filter(f => f.id !== id).map(f => `
      <a href="product.html?id=${f.id}" class="card"><div class="card-img"><img src="${f.img}" alt="" loading="lazy"></div>
      <div class="card-body"><div class="card-title" style="font-size:15px">${f.name}</div><div class="card-sub">from ${money(f.sizes.S)} · ${f.desc}</div></div></a>`).join('')
      + `<a href="index.html#drops" class="card"><div class="card-img"><img src="assets/img/birthday-cake.jpg" alt="" loading="lazy"></div>
      <div class="card-body"><div class="card-title" style="font-size:15px">The Drops</div><div class="card-sub">Curated bundles with this board</div></div></a>`;

    const render = () => {
      const base = food.sizes[state.size];
      const drink = food.id === 'botana' ? (state.size === 'XS' ? find(CATALOG.bubbles, 'mich2') : find(CATALOG.bubbles, 'mich6')) : (state.size === 'XS' ? find(CATALOG.bubbles, 'b2') : find(CATALOG.bubbles, 'b6'));
      const bub = drink.price;
      const total = base + (state.bubbles ? bub : 0) + (state.sweet ? 39 : 0) + (state.flowers ? 65 : 0) + (state.balloons ? 85 : 0) + (state.pinata ? CATALOG.pinata.price : 0) + (state.setup ? 120 : 0);
      $('#boardPrice').textContent = money(base);
      const pp = Math.round(base / SIZE_PEOPLE[state.size]);
      $('#bubblesPrice').textContent = `+${money(bub)}`;
      $('#bubblesDesc').textContent = `${drink.name}: ${drink.desc}`;
      $('#bubblesTitle').textContent = food.id === 'botana' ? 'Add Micheladas' : 'Add Bubbles';
      $('#bubblesImg').src = food.id === 'botana' ? 'assets/img/botana.jpg' : 'assets/img/bubbles-bottle.jpg';
      $('#serves').textContent = `${SIZE_LABEL[state.size]} · ~$${pp} per person`;
      document.querySelectorAll('[data-size]').forEach(b => b.classList.toggle('on', b.dataset.size === state.size));
      document.querySelectorAll('[data-toggle]').forEach(el => el.classList.toggle('on', !!state[el.dataset.toggle]));
      document.querySelectorAll('.js-total').forEach(el => el.textContent = money(total));
    };
    document.querySelectorAll('[data-size]').forEach(b => b.addEventListener('click', () => { state.size = b.dataset.size; render(); }));
    document.querySelectorAll('[data-toggle]').forEach(b => b.addEventListener('click', e => { if (e.target.closest('.details-btn')) return; state[b.dataset.toggle] = !state[b.dataset.toggle]; render(); }));
    bindDetails(document);
    $('#addToDrop').addEventListener('click', () => {
      saveCart({ food: id, size: state.size, bubbles: state.bubbles ? (id === 'botana' ? (state.size === 'XS' ? 'mich2' : 'mich6') : (state.size === 'XS' ? 'b2' : 'b6')) : null, sweet: state.sweet ? 'straw' : null, flowers: state.flowers ? 'fp' : null, balloons: state.balloons ? 'bb' : null, pinata: state.pinata, setup: state.setup });
      window.location.href = 'build.html?step=5';
    });
    render();
  }

  // ---------- Drop page ----------
  function initDrop() {
    const $ = s => document.querySelector(s);
    const id = DROPS[param('id')] ? param('id') : 'birthday';
    const d = DROPS[id];
    document.title = `${d.name} | The Party Drop`;
    $('#dName').textContent = d.name;
    $('#dTagline').textContent = d.tagline;
    $('#dServes').textContent = d.serves;
    $('#dImg').src = d.img; $('#dImg').alt = d.name;
    $('#dPrice').textContent = money(dropPrice(id));
    $('#dAdd').href = `build.html?drop=${id}`;
    $('#dLines').innerHTML = lines(d.cart).map(l => `
      <div class="drop-line"><div class="drop-line-head"><strong>${l.name}</strong><span>${money(l.price)}</span></div>${listHTML(l.includes)}</div>`).join('');
    $('#otherDrops').innerHTML = Object.keys(DROPS).filter(k => k !== id).map(k => `
      <a href="drop.html?id=${k}" class="card"><div class="card-img"><img src="${DROPS[k].img}" alt="" loading="lazy"></div>
      <div class="card-body"><div class="card-title" style="font-size:15px">${DROPS[k].name}</div><div class="card-sub">${DROPS[k].serves} · ${money(dropPrice(k))}</div></div></a>`).join('');
  }

  // ---------- Details toggles (shared) ----------
  function bindDetails(root) {
    root.querySelectorAll('.details-btn').forEach(b => {
      if (b.dataset.bound) return; b.dataset.bound = '1';
      b.addEventListener('click', e => {
        e.preventDefault(); e.stopPropagation();
        const panel = b.closest('.opt-wrap').querySelector('.details-panel');
        const open = panel.classList.toggle('open');
        b.textContent = open ? 'Hide' : 'Details';
      });
    });
  }

  // ---------- Build Your Drop wizard ----------
  function initBuild() {
    const $ = s => document.querySelector(s);
    const preset = param('drop');
    let cart = preset && DROPS[preset] ? { ...DROPS[preset].cart } : getCart();
    if (!cart.food) cart.food = 'grazing';
    let step = preset ? 5 : Math.min(5, Math.max(1, parseInt(param('step') || '1', 10)));
    const labels = ['Pick your food', 'Add your drinks', 'Add something pretty', 'Make it a party', 'Ready'];

    const optHTML = (o, on, extra, includes) => `
      <div class="opt-wrap">
        <button type="button" class="opt ${on ? 'on' : ''}" data-id="${o.id}">
          <span class="opt-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF9F3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
          ${o.img ? `<img class="opt-thumb" src="${o.img}" alt="">` : ''}
          <span class="opt-text"><strong>${o.name}</strong><span>${o.desc}</span></span>
          <span class="opt-right"><span class="opt-price">${extra}</span>${includes ? '<span class="details-btn">Details</span>' : ''}</span>
        </button>
        ${includes ? `<div class="details-panel">${listHTML(includes)}${o.sizes ? `<a href="product.html?id=${o.id}" class="details-link">See full product page →</a>` : ''}</div>` : ''}
      </div>`;
    const noneHTML = (on, label) => `
      <div class="opt-wrap"><button type="button" class="opt ${on ? 'on' : ''}" data-id="">
        <span class="opt-check"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFF9F3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7"/></svg></span>
        <span class="opt-text"><strong>${label}</strong></span>
      </button></div>`;

    function render() {
      document.querySelectorAll('.progress span').forEach((s, i) => s.classList.toggle('on', i < Math.min(step, 4)));
      $('#stepLabel').textContent = labels[step - 1];
      $('#stepNum').textContent = `Step ${Math.min(step, 4)} of 4`;
      document.querySelectorAll('.wizard-step').forEach((s, i) => s.classList.toggle('active', i === step - 1));
      $('#foodList').innerHTML = CATALOG.food.map(f => optHTML(f, cart.food === f.id, `from ${money(f.sizes.S)}`, f.includes)).join('');
      const food = find(CATALOG.food, cart.food);
      $('#sizeXS').innerHTML = `<strong>For 2</strong><small>${money(food.sizes.XS)}</small>`;
      $('#sizeS').innerHTML = `<strong>Serves 4–6</strong><small>${money(food.sizes.S)}</small>`;
      $('#sizeL').innerHTML = `<strong>Serves 8–12</strong><small>${money(food.sizes.L)} · best value</small>`;
      $('#sizeXS').classList.toggle('on', cart.size === 'XS');
      $('#sizeS').classList.toggle('on', cart.size === 'S');
      $('#sweetsList').innerHTML = noneHTML(!cart.sweet, 'No sweets') + CATALOG.sweets.map(s => optHTML(s, cart.sweet === s.id, `+${money(s.price)}`, s.includes)).join('');
      $('#sizeL').classList.toggle('on', cart.size === 'L');
      $('#bubblesList').innerHTML = noneHTML(!cart.bubbles, 'No bubbles this time') + CATALOG.bubbles.map(b => optHTML(b, cart.bubbles === b.id, `+${money(b.price)}`, b.includes)).join('');
      $('#flowersList').innerHTML = noneHTML(!cart.flowers, 'No flowers') + CATALOG.flowers.map(f => optHTML(f, cart.flowers === f.id, `+${money(f.price)}`, f.includes)).join('');
      $('#balloonsList').innerHTML = noneHTML(!cart.balloons, 'No balloons') + CATALOG.balloons.map(b => optHTML(b, cart.balloons === b.id, `+${money(b.price)}`, b.includes)).join('');
      $('#pinataOpt').classList.toggle('on', cart.pinata);
      $('#setupOpt').classList.toggle('on', cart.setup);
      $('#summaryLines').innerHTML = lines(cart).map(l => `<div class="summary-line"><span>${l.name}</span><strong>${money(l.price)}</strong></div>`).join('');
      $('#summaryIncludes').innerHTML = lines(cart).map(l => `<div class="drop-line"><div class="drop-line-head"><strong>${l.name}</strong></div>${listHTML(l.includes)}</div>`).join('');
      document.querySelectorAll('.js-total').forEach(el => el.textContent = money(subtotal(cart)));
      $('#wizardFooter').classList.toggle('hide', step === 5);
      $('#nextBtn').textContent = step === 4 ? 'Review my Drop' : 'Next';
      $('#backBtn').classList.toggle('hide', step === 1);
      $('#skipBtn').classList.toggle('hide', step === 1 || step === 5);
      bindDetails(document);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    const pick = (listId, key) => $('#' + listId).addEventListener('click', e => {
      if (e.target.closest('.details-btn')) return;
      const b = e.target.closest('[data-id]'); if (!b) return;
      cart[key] = b.dataset.id || null; render();
    });
    pick('foodList', 'food'); pick('sweetsList', 'sweet'); pick('bubblesList', 'bubbles'); pick('flowersList', 'flowers'); pick('balloonsList', 'balloons');
    $('#sizeXS').addEventListener('click', () => { cart.size = 'XS'; render(); });
    $('#sizeS').addEventListener('click', () => { cart.size = 'S'; render(); });
    $('#sizeL').addEventListener('click', () => { cart.size = 'L'; render(); });
    $('#pinataOpt').addEventListener('click', e => { if (e.target.closest('.details-btn')) return; cart.pinata = !cart.pinata; render(); });
    $('#setupOpt').addEventListener('click', e => { if (e.target.closest('.details-btn')) return; cart.setup = !cart.setup; render(); });
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
    if (page === 'drop') initDrop();
    if (page === 'build') initBuild();
    if (page === 'checkout') initCheckout();
    if (page === 'confirmation') initConfirmation();
  });

  return { CATALOG, DROPS, getCart, saveCart, clearCart };
})();
