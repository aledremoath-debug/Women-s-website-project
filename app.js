// ===== STATE =====
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
let recentlyViewed = JSON.parse(localStorage.getItem('rv') || '[]');
let currentCategory = 'all';
let currentFilters = {};
let currentSlide = 0;
let couponApplied = false;
let slideInterval;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initSettings();
    renderHero();
    renderCategories();
    renderNewArrivals();
    renderBestSellers();
    renderTestimonials();
    renderCategoryDropdown();
    renderMobileNav();
    updateCartUI();
    updateWishlistUI();
    renderRecentlyViewed();
    startCountdown();
    initHeaderScroll();
    startSlideshow();
    initAnimations();
});

// ===== DARK MODE =====
function initDarkMode() {
    const saved = localStorage.getItem('theme');
    const sw = document.getElementById('darkModeSwitch');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (sw) sw.checked = true;
    }
}

function toggleDarkMode() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const sw = document.getElementById('darkModeSwitch');
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        if (sw) sw.checked = false;
        showToast('تم تفعيل الوضع النهاري ☀️', 'success');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        if (sw) sw.checked = true;
        showToast('تم تفعيل الوضع الليلي 🌙', 'success');
    }
}

// ===== SETTINGS PANEL =====
let currentFontLevel = 1; // 0=small, 1=medium, 2=large
const fontLabels = ['صغير', 'متوسط', 'كبير'];
const fontScales = [0.9, 1, 1.12];

const CURRENCY_DATA = {
    SAR: { symbol: 'ر.س', rate: 1 },
    AED: { symbol: 'د.إ', rate: 0.98 },
    KWD: { symbol: 'د.ك', rate: 0.082 },
    BHD: { symbol: 'د.ب', rate: 0.1 },
    USD: { symbol: '$', rate: 0.27 }
};
let currentCurrency = 'SAR';

function getCurrencyText(amount) {
    const cur = CURRENCY_DATA[currentCurrency];
    const converted = Math.round(amount * cur.rate);
    return `${converted} ${cur.symbol}`;
}

function initSettings() {
    // Font size
    const savedFont = localStorage.getItem('fontLevel');
    if (savedFont !== null) {
        currentFontLevel = parseInt(savedFont);
        applyFontSize();
    }
    // Currency
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency && CURRENCY_DATA[savedCurrency]) {
        currentCurrency = savedCurrency;
        const sel = document.getElementById('currencySelect');
        if (sel) sel.value = savedCurrency;
    }
    // Notifications
    const savedNotif = localStorage.getItem('notifications');
    const notifSw = document.getElementById('notifSwitch');
    if (savedNotif === 'false' && notifSw) notifSw.checked = false;
    // Language
    const savedLang = localStorage.getItem('lang');
    const langSel = document.getElementById('langSelect');
    if (savedLang && langSel) langSel.value = savedLang;
}

function toggleSettings() {
    const overlay = document.getElementById('settingsOverlay');
    if (overlay) {
        overlay.classList.toggle('active');
        document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
    }
}

function changeFontSize(dir) {
    const newLevel = currentFontLevel + dir;
    if (newLevel < 0 || newLevel > 2) return;
    currentFontLevel = newLevel;
    applyFontSize();
    localStorage.setItem('fontLevel', currentFontLevel);
    showToast('حجم الخط: ' + fontLabels[currentFontLevel], 'success');
}

function applyFontSize() {
    document.documentElement.style.setProperty('--font-scale', fontScales[currentFontLevel]);
    document.body.style.fontSize = (16 * fontScales[currentFontLevel]) + 'px';
    const label = document.getElementById('fontSizeLabel');
    if (label) label.textContent = fontLabels[currentFontLevel];
}

function changeCurrency(val) {
    if (CURRENCY_DATA[val]) {
        currentCurrency = val;
        localStorage.setItem('currency', val);
        // re-render all visible products to show new currency  
        const shownPages = ['home', 'category', 'wishlist'];
        if (document.getElementById('newArrivalsGrid')) renderNewArrivals();
        if (document.getElementById('bestSellersGrid')) renderBestSellers();
        if (document.getElementById('productsGrid')) renderProducts();
        if (document.getElementById('recentGrid')) renderRecentlyViewed();
        showToast('تم تغيير العملة إلى ' + CURRENCY_DATA[val].symbol + ' ✅', 'success');
    }
}

function toggleNotifications(checked) {
    localStorage.setItem('notifications', checked);
    showToast(checked ? 'تم تفعيل الإشعارات 🔔' : 'تم إيقاف الإشعارات 🔕', 'success');
}

function changeLang(val) {
    localStorage.setItem('lang', val);
    if (val === 'en') {
        showToast('English language is not available yet. Coming soon!', 'info');
        // reset to Arabic
        setTimeout(() => {
            const sel = document.getElementById('langSelect');
            if (sel) sel.value = 'ar';
            localStorage.setItem('lang', 'ar');
        }, 800);
    } else {
        showToast('اللغة: العربية ✅', 'success');
    }
}

function clearAllData() {
    if (confirm('هل أنت متأكدة من مسح جميع البيانات؟\nسيتم حذف السلة والمفضلة والإعدادات')) {
        localStorage.clear();
        cart = [];
        wishlist = [];
        updateCartUI();
        updateWishlistUI();
        showToast('تم مسح جميع البيانات ✅', 'success');
        toggleSettings();
        setTimeout(() => location.reload(), 600);
    }
}

// ===== HERO SLIDER =====
function renderHero() {
    const s = document.getElementById('heroSlider');
    const d = document.getElementById('heroDots');
    s.innerHTML = `
    <div class="hero-track" id="heroTrack">
      ${HERO_SLIDES.map((sl, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}" data-slide="${i}">
          <div class="hero-slide-card">
            <div class="hero-slide-content">
              <span class="hero-badge">${sl.badge}</span>
              <h1 class="hero-title">${sl.title}</h1>
              <p class="hero-desc">${sl.desc}</p>
              <div class="hero-btns">
                <button class="btn-primary btn-ripple" onclick="showCategory('all')">تسوّقي الآن</button>
                <button class="btn-outline btn-ripple" onclick="showCategory('dresses')">أحدث التشكيلات</button>
              </div>
            </div>
            <div class="hero-image-wrap">
              <img class="hero-image" src="${sl.img}" alt="${sl.badge}" loading="lazy">
            </div>
          </div>
        </div>
      `).join('')}
    </div>`;
    d.innerHTML = HERO_SLIDES.map((_, i) => `<div class="hero-dot ${i === 0 ? 'active' : ''}" onclick="goToSlide(${i})"></div>`).join('');
}

function goToSlide(n) {
    currentSlide = n;
    const track = document.getElementById('heroTrack');
    if (track) {
        // In RTL, translating the track to the right (positive) brings the next slide into view
        const offset = n * 100;
        track.style.transform = `translateX(${offset}%)`;
    }
    document.querySelectorAll('.hero-slide').forEach((s, i) => s.classList.toggle('active', i === n));
    document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === n));
}
function nextSlide() { goToSlide((currentSlide + 1) % HERO_SLIDES.length); }
function prevSlide() { goToSlide((currentSlide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length); }
function startSlideshow() { slideInterval = setInterval(nextSlide, 5000); }

// ===== CATEGORIES =====
function renderCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map((c, i) => `
        <div class="category-card reveal" onclick="showCategory('${c.id}')">
            <div class="category-img-wrap">
                <img src="${c.img}" alt="${c.name}" class="category-img" loading="lazy">
            </div>
            <div class="category-info">
                <span class="category-icon">${c.icon}</span>
                <h3 class="category-name">${c.name}</h3>
                <span class="category-count">${i * 12 + 45} قطعة</span>
            </div>
        </div>
    `).join('');
}

// ===== PRODUCT CARD =====
function productCardHTML(p) {
    const isWished = wishlist.some(item => item.id === p.id);
    const inCart = cart.some(item => item.id === p.id);
    const isSale = p.salePrice !== null;
    const currentPrice = isSale ? p.salePrice : p.price;
    return `
        <div class="product-card reveal" data-id="${p.id}">
            <div class="product-img-wrap">
                <div class="product-badges">
                    ${isSale ? `<span class="product-badge sale">خصم ${Math.round((1 - p.salePrice / p.price) * 100)}%</span>` : ''}
                    ${p.isNew ? `<span class="product-badge new">جديد</span>` : ''}
                </div>
                <img src="${p.img}" alt="${p.name}" class="product-img" onclick="openProductModal(${p.id})">
                <div class="product-actions">
                    <button class="action-btn ${isWished ? 'active' : ''}" onclick="toggleWishlist(${p.id})">
                        <i class="${isWished ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="openProductModal(${p.id})">
                        <i class="far fa-eye"></i>
                    </button>
                    <button class="action-btn ${inCart ? 'active' : ''}" onclick="addToCart(${p.id})">
                        <i class="fas fa-shopping-basket"></i>
                    </button>
                </div>
            </div>
            <div class="product-info" onclick="openProductModal(${p.id})">
                <div class="product-rating">
                    <div class="rating-stars">${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}</div>
                    <span class="rating-count">(${p.reviews})</span>
                </div>
                <h3 class="product-title">${p.name}</h3>
                <div class="product-price">
                    <span class="price-current">${getCurrencyText(currentPrice)}</span>
                    ${isSale ? `<span class="price-old">${getCurrencyText(p.price)}</span>` : ''}
                </div>
            </div>
        </div>
    `;
}

function renderNewArrivals() {
    document.getElementById('newArrivalsGrid').innerHTML = PRODUCTS.filter(p => p.isNew).slice(0, 8).map(productCardHTML).join('');
    refreshReveal();
}
function renderBestSellers() {
    document.getElementById('bestSellersGrid').innerHTML = PRODUCTS.filter(p => p.isBestseller).slice(0, 8).map(productCardHTML).join('');
    refreshReveal();
}

// ===== SHOW CATEGORY / PAGE =====
function showPage(page) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    const el = document.getElementById(page + 'Page');
    if (el) el.classList.add('active');
    if (page === 'wishlist') renderWishlistPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateBottomNav(page);
}

function showCategory(catId) {
    currentCategory = catId;
    currentFilters = {};
    showPage('products');
    const cat = CATEGORIES.find(c => c.id === catId);
    document.getElementById('productsPageTitle').textContent = catId === 'all' ? 'جميع المنتجات' : catId === 'sale' ? 'عروض وتخفيضات 🔥' : (cat ? cat.name : '');
    document.getElementById('productsPageSubtitle').textContent = catId === 'sale' ? 'خصومات مذهلة على تشكيلة مختارة' : '';
    renderProducts();
}

function getFilteredProducts() {
    let items = currentCategory === 'all' ? [...PRODUCTS] : currentCategory === 'sale' ? PRODUCTS.filter(p => p.salePrice !== null) : PRODUCTS.filter(p => p.category === currentCategory);
    Object.keys(currentFilters).forEach(key => {
        const val = currentFilters[key];
        if (!val || (Array.isArray(val) && val.length === 0)) return;
        if (key === 'priceMin') items = items.filter(p => (p.salePrice || p.price) >= val);
        else if (key === 'priceMax') items = items.filter(p => (p.salePrice || p.price) <= val);
        else if (key === 'saleOnly') items = items.filter(p => p.salePrice !== null);
        else if (key === 'color' && p.filters) { } // color filter handled via product filters
        else items = items.filter(p => p.filters && p.filters[key] === val);
    });
    return items;
}

function renderProducts() {
    const items = getFilteredProducts();
    document.getElementById('productsGrid').innerHTML = items.length ? items.map(productCardHTML).join('') : '<p style="text-align:center;padding:40px;color:var(--gray-500);grid-column:1/-1">لا توجد منتجات مطابقة للفلاتر المحددة</p>';
    document.getElementById('productsCount').textContent = `${items.length} منتج`;
    refreshReveal();
}

function sortProducts(val) {
    const grid = document.getElementById('productsGrid');
    let items = getFilteredProducts();
    if (val === 'price-asc') items.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
    else if (val === 'price-desc') items.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
    else if (val === 'name') items.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
    else if (val === 'rating') items.sort((a, b) => b.rating - a.rating);
    grid.innerHTML = items.map(productCardHTML).join('');
}

// ===== FILTER PANEL =====
function toggleFilter() {
    const o = document.getElementById('filterOverlay');
    const p = document.getElementById('filterPanel');
    const isActive = p.classList.contains('active');
    o.classList.toggle('active', !isActive);
    p.classList.toggle('active', !isActive);
    document.body.style.overflow = isActive ? '' : 'hidden';
    if (!isActive) renderFilterPanel();
}

function renderFilterPanel() {
    const catId = currentCategory === 'all' || currentCategory === 'sale' ? 'dresses' : currentCategory;
    const config = FILTERS_CONFIG[catId] || FILTERS_CONFIG.dresses;
    const body = document.getElementById('filterBody');
    body.innerHTML = config.map(f => {
        if (f.type === 'chips') {
            return `<div class="filter-section"><div class="filter-section-title">${f.title}</div><div class="filter-options">${f.options.map(o => `<span class="filter-chip ${currentFilters[f.key] === o ? 'selected' : ''}" onclick="selectFilter('${f.key}','${o}',this)">${o}</span>`).join('')}</div></div>`;
        } else if (f.type === 'colors') {
            return `<div class="filter-section"><div class="filter-section-title">${f.title}</div><div class="filter-color-options">${f.options.map(o => `<span class="filter-color-chip ${currentFilters[f.key] === o.name ? 'selected' : ''}" onclick="selectFilter('${f.key}','${o.name}',this)"><span class="filter-color-dot" style="background:${o.hex}"></span>${o.name}</span>`).join('')}</div></div>`;
        } else if (f.type === 'price') {
            return `<div class="filter-section"><div class="filter-section-title">السعر</div><div class="filter-price-row"><div class="filter-price-input"><label>من</label><input type="number" id="filterPriceMin" value="${currentFilters.priceMin || ''}" placeholder="0.0"></div><div class="filter-price-input"><label>إلى</label><input type="number" id="filterPriceMax" value="${currentFilters.priceMax || ''}" placeholder="0.0"></div></div></div>`;
        } else if (f.type === 'sale') {
            return `<div class="filter-checkbox-row"><input type="checkbox" id="filterSaleOnly" ${currentFilters.saleOnly ? 'checked' : ''}><label for="filterSaleOnly">عرض التخفيضات فقط</label></div>`;
        }
        return '';
    }).join('');
}

function selectFilter(key, val, el) {
    if (currentFilters[key] === val) { delete currentFilters[key]; el.classList.remove('selected'); }
    else {
        currentFilters[key] = val;
        el.parentElement.querySelectorAll('.filter-chip,.filter-color-chip').forEach(c => c.classList.remove('selected'));
        el.classList.add('selected');
    }
}

function applyFilters() {
    const minEl = document.getElementById('filterPriceMin');
    const maxEl = document.getElementById('filterPriceMax');
    const saleEl = document.getElementById('filterSaleOnly');
    if (minEl && minEl.value) currentFilters.priceMin = Number(minEl.value);
    else delete currentFilters.priceMin;
    if (maxEl && maxEl.value) currentFilters.priceMax = Number(maxEl.value);
    else delete currentFilters.priceMax;
    if (saleEl) currentFilters.saleOnly = saleEl.checked;
    renderProducts();
    toggleFilter();
    showToast('تم تطبيق الفلاتر', 'success');
}

function clearFilters() {
    currentFilters = {};
    renderFilterPanel();
    renderProducts();
    showToast('تم مسح الفلاتر', 'success');
}

// ===== PRODUCT MODAL =====
function openProductModal(id) {
    const p = PRODUCTS.find(pr => pr.id === id);
    if (!p) return;
    addToRecentlyViewed(id);
    const isSale = p.salePrice !== null;
    const price = isSale ? p.salePrice : p.price;
    const stars = Array(5).fill(0).map((_, i) => `<i class="fa${i < Math.round(p.rating) ? 's' : 'r'} fa-star"></i>`).join('');
    const isWish = wishlist.includes(p.id);
    const relatedProds = PRODUCTS.filter(r => r.category === p.category && r.id !== p.id).slice(0, 4);

    document.getElementById('modalBody').innerHTML = `
    <div class="modal-gallery">
      <div class="modal-main-wrap">
        <img class="modal-main-img" id="modalMainImg" src="${p.imgs[0]}" alt="${p.name}">
      </div>
      <div class="modal-thumbs">
        ${p.imgs.map((img, i) => `
          <div class="modal-thumb-wrap ${i === 0 ? 'active' : ''}" onclick="changeModalImg(this,'${img}')">
            <img class="modal-thumb" src="${img}" alt="${p.name} thumb ${i + 1}">
          </div>
        `).join('')}
      </div>
    </div>
    <div class="modal-info">
      <div class="modal-info-top">
        <div class="modal-category">${(CATEGORIES.find(c => c.id === p.category) || { name: '' }).name}</div>
        <h2 class="modal-title">${p.name}</h2>
        <div class="modal-rating">${stars}<span>${p.rating} (${p.reviews} تقييم)</span></div>
        <div class="modal-price-row">
          <span class="modal-price">${getCurrencyText(price)}</span>
          ${isSale ? `<span class="modal-old-price">${getCurrencyText(p.price)}</span>` : ''}
        </div>
      </div>
      
      <div class="modal-scroll-area">
        <p class="modal-desc">${p.desc}</p>
        
        ${p.sizes.length ? `
          <div class="modal-option">
            <div class="modal-option-title">المقاس</div>
            <div class="modal-sizes">${p.sizes.map((s, i) => `<span class="modal-size ${i === 0 ? 'selected' : ''}" onclick="selectModalSize(this)">${s}</span>`).join('')}</div>
          </div>
        ` : ''}
        
        ${p.colors.length ? `
          <div class="modal-option">
            <div class="modal-option-title">اللون</div>
            <div class="modal-colors">${p.colors.map((c, i) => `<span class="modal-color ${i === 0 ? 'selected' : ''}" style="background:${c}" onclick="selectModalColor(this)"></span>`).join('')}</div>
          </div>
        ` : ''}
        
        <div class="modal-actions-wrap">
          <div class="modal-qty-row">
            <div class="modal-qty">
              <button onclick="changeQty(-1)">−</button>
              <span id="modalQty">1</span>
              <button onclick="changeQty(1)">+</button>
            </div>
            <button class="modal-add-btn btn-ripple" onclick="addToCart(${p.id})">
              <i class="fas fa-shopping-bag"></i> 
              أضيفي للسلة
            </button>
            <button class="modal-wishlist-btn ${isWish ? 'wishlisted' : ''}" onclick="toggleWishlist(${p.id});this.classList.toggle('wishlisted')">
              <i class="fa${isWish ? 's' : 'r'} fa-heart"></i>
            </button>
          </div>
        </div>

        ${relatedProds.length ? `
          <div class="modal-related">
            <div class="modal-option-title">قد يعجبك أيضاً</div>
            <div class="modal-related-grid">
              ${relatedProds.map(r => `
                <div class="modal-related-card" onclick="openProductModal(${r.id})">
                  <div class="related-img-wrap">
                    <img src="${r.img}" alt="${r.name}">
                  </div>
                  <div class="related-info">
                    <div class="related-name">${r.name.substring(0, 20)}...</div>
                    <div class="related-price">${getCurrencyText(r.salePrice || r.price)}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </div>`;
    document.getElementById('productModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.body.style.overflow = '';
}
function changeModalImg(el, src) {
    document.getElementById('modalMainImg').src = src;
    el.parentElement.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
}
function selectModalSize(el) { el.parentElement.querySelectorAll('.modal-size').forEach(s => s.classList.remove('selected')); el.classList.add('selected'); }
function selectModalColor(el) { el.parentElement.querySelectorAll('.modal-color').forEach(c => c.classList.remove('selected')); el.classList.add('selected'); }
function changeQty(d) {
    const el = document.getElementById('modalQty');
    el.textContent = Math.max(1, parseInt(el.textContent) + d);
}

// ===== CART =====
function addToCart(id) {
    const qty = parseInt(document.getElementById('modalQty')?.textContent || '1');
    const existing = cart.find(c => c.id === id);
    if (existing) existing.qty += qty;
    else cart.push({ id, qty });
    saveCart();
    updateCartUI();
    closeProductModal();
    showToast('تمت الإضافة للسلة ✓', 'success');
}

function quickAddToCart(id) {
    const existing = cart.find(c => c.id === id);
    if (existing) existing.qty++;
    else cart.push({ id, qty: 1 });
    saveCart();
    updateCartUI();
    showToast('تمت الإضافة للسلة ✓', 'success');
}

function removeFromCart(id) {
    cart = cart.filter(c => c.id !== id);
    saveCart();
    updateCartUI();
    renderCartPanel();
}

function updateCartQty(id, d) {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + d);
    saveCart();
    updateCartUI();
    renderCartPanel();
}

function saveCart() { localStorage.setItem('cart', JSON.stringify(cart)); }

function updateCartUI() {
    const total = cart.reduce((s, c) => s + c.qty, 0);
    document.getElementById('cartCount').textContent = total;
    document.getElementById('cartItemsLabel').textContent = `(${total})`;
}

function toggleCart() {
    const o = document.getElementById('cartOverlay');
    const p = document.getElementById('cartPanel');
    const isActive = p.classList.contains('active');
    o.classList.toggle('active', !isActive);
    p.classList.toggle('active', !isActive);
    document.body.style.overflow = isActive ? '' : 'hidden';
    if (!isActive) renderCartPanel();
}

function renderCartPanel() {
    const items = document.getElementById('cartItems');
    const empty = document.getElementById('cartEmpty');
    const footer = document.getElementById('cartFooter');
    if (cart.length === 0) {
        empty.style.display = 'block'; items.innerHTML = ''; footer.style.display = 'none';
        return;
    }
    empty.style.display = 'none'; footer.style.display = 'block';
    items.innerHTML = cart.map(c => {
        const p = PRODUCTS.find(pr => pr.id === c.id);
        if (!p) return '';
        const price = p.salePrice || p.price;
        return `<div class="cart-item">
      <img class="cart-item-img" src="${p.img}" alt="${p.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-meta">${(CATEGORIES.find(ca => ca.id === p.category) || { name: '' }).name}</div>
        <div class="cart-item-bottom">
          <span class="cart-item-price">${getCurrencyText(price * c.qty)}</span>
          <div class="cart-item-qty">
            <button onclick="updateCartQty(${p.id},-1)">−</button>
            <span>${c.qty}</span>
            <button onclick="updateCartQty(${p.id},1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${p.id})"><i class="fas fa-trash-alt"></i> إزالة</button>
      </div>
    </div>`;
    }).join('');

    const subtotal = cart.reduce((s, c) => { const p = PRODUCTS.find(pr => pr.id === c.id); return s + (p ? (p.salePrice || p.price) * c.qty : 0); }, 0);
    const shipping = subtotal >= 299 ? 0 : 25;
    const discount = couponApplied ? Math.round(subtotal * 0.15) : 0;
    const total = subtotal + shipping - discount;
    document.getElementById('cartSubtotal').textContent = getCurrencyText(subtotal);
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'مجاني' : getCurrencyText(shipping);
    document.getElementById('cartDiscount').textContent = discount > 0 ? '-' + getCurrencyText(discount) : getCurrencyText(0);
    document.getElementById('cartTotal').textContent = getCurrencyText(total);
}

function applyCoupon() {
    const code = document.getElementById('couponInput').value.trim().toUpperCase();
    if (code === 'ANAQATI15') { couponApplied = true; renderCartPanel(); showToast('تم تطبيق كود الخصم 15% ✓', 'success'); }
    else showToast('كود الخصم غير صالح', 'error');
}

function checkout() {
    if (cart.length === 0) return;
    showToast('شكراً لطلبك! سيتم التواصل معك قريباً 🎉', 'success');
    cart = []; saveCart(); updateCartUI(); renderCartPanel();
    setTimeout(() => toggleCart(), 1500);
}

// ===== WISHLIST =====
function toggleWishlist(id) {
    const idx = wishlist.indexOf(id);
    if (idx > -1) { wishlist.splice(idx, 1); showToast('تمت الإزالة من المفضلة', 'success'); }
    else { wishlist.push(id); showToast('تمت الإضافة للمفضلة ❤️', 'success'); }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
    // Re-render current view
    if (document.getElementById('productsPage').classList.contains('active')) renderProducts();
    if (document.getElementById('homePage').classList.contains('active')) { renderNewArrivals(); renderBestSellers(); }
    if (document.getElementById('wishlistPage').classList.contains('active')) renderWishlistPage();
}

function updateWishlistUI() {
    document.getElementById('wishlistCount').textContent = wishlist.length;
}

function renderWishlistPage() {
    const grid = document.getElementById('wishlistGrid');
    const empty = document.getElementById('wishlistEmpty');
    if (wishlist.length === 0) { grid.innerHTML = ''; empty.classList.remove('hidden'); }
    else {
        empty.classList.add('hidden');
        grid.innerHTML = wishlist.map(id => { const p = PRODUCTS.find(pr => pr.id === id); return p ? productCardHTML(p) : '' }).join('');
    }
}

// ===== RECENTLY VIEWED =====
function addToRecentlyViewed(id) {
    recentlyViewed = recentlyViewed.filter(r => r !== id);
    recentlyViewed.unshift(id);
    if (recentlyViewed.length > 10) recentlyViewed = recentlyViewed.slice(0, 10);
    localStorage.setItem('rv', JSON.stringify(recentlyViewed));
    renderRecentlyViewed();
}

function renderRecentlyViewed() {
    const sec = document.getElementById('recentlyViewedSection');
    const list = document.getElementById('recentlyViewedList');
    if (recentlyViewed.length === 0) { sec.style.display = 'none'; return; }
    sec.style.display = 'block';
    list.innerHTML = recentlyViewed.map(id => {
        const p = PRODUCTS.find(pr => pr.id === id);
        if (!p) return '';
        return `<div class="rv-card reveal" onclick="openProductModal(${p.id})"><img src="${p.img}" alt="${p.name}" loading="lazy"><div class="rv-name">${p.name}</div><div class="rv-price">${getCurrencyText(p.salePrice || p.price)}</div></div>`;
    }).join('');
    refreshReveal();
}

// ===== SEARCH =====
function toggleSearch() {
    const o = document.getElementById('searchOverlay');
    o.classList.toggle('active');
    if (o.classList.contains('active')) {
        document.getElementById('searchInput').focus();
        document.body.style.overflow = 'hidden';
    } else document.body.style.overflow = '';
}

function handleSearch(val) {
    const results = document.getElementById('searchResults');
    const suggest = document.getElementById('searchSuggestions');
    if (val.length < 2) { results.classList.add('hidden'); suggest.classList.remove('hidden'); return; }
    suggest.classList.add('hidden'); results.classList.remove('hidden');
    const matches = PRODUCTS.filter(p => p.name.includes(val) || p.desc.includes(val)).slice(0, 8);
    results.innerHTML = matches.length ? matches.map(p => `
    <div style="display:flex;gap:10px;padding:10px;cursor:pointer;border-bottom:1px solid var(--gray-100);align-items:center" onclick="toggleSearch();openProductModal(${p.id})">
      <img src="${p.img}" style="width:50px;height:60px;object-fit:cover;border-radius:6px">
      <div><div style="font-size:.88rem;font-weight:600">${p.name}</div><div style="font-size:.82rem;color:var(--accent);font-weight:700">${p.salePrice || p.price} ر.س</div></div>
    </div>`).join('') : '<p style="padding:20px;text-align:center;color:var(--gray-500)">لا توجد نتائج</p>';
}

function quickSearch(q) {
    document.getElementById('searchInput').value = q;
    handleSearch(q);
}

// ===== AUTH =====
function toggleAuth() {
    document.getElementById('authOverlay').classList.toggle('active');
}
function switchAuthTab(tab, el) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
    document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
}
function handleLogin(e) { e.preventDefault(); showToast('تم تسجيل الدخول بنجاح ✓', 'success'); toggleAuth(); }
function handleRegister(e) { e.preventDefault(); showToast('تم إنشاء الحساب بنجاح ✓', 'success'); toggleAuth(); }

// ===== INFO MODALS =====
function openInfoModal(key) {
    const data = INFO_PAGES[key];
    if (!data) return;
    document.getElementById('infoModalContent').innerHTML = data.content;
    document.getElementById('infoModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeInfoModal() {
    document.getElementById('infoModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ===== TESTIMONIALS =====
function renderTestimonials() {
    document.getElementById('testimonialsGrid').innerHTML = TESTIMONIALS.map(t => {
        const stars = Array(5).fill(0).map((_, i) => `<i class="fa${i < t.rating ? 's' : 'r'} fa-star"></i>`).join('');
        const initials = t.name.split(' ').map(w => w[0]).join('');
        return `<div class="testimonial-card reveal"><div class="testimonial-stars">${stars}</div><p class="testimonial-text">"${t.text}"</p><div class="testimonial-author"><div class="testimonial-avatar">${initials}</div><div><div class="testimonial-name">${t.name}</div><div class="testimonial-date">${t.date}</div></div></div></div>`;
    }).join('');
    refreshReveal();
}

// ===== COUNTDOWN =====
function startCountdown() {
    const end = new Date();
    end.setDate(end.getDate() + 3);
    end.setHours(23, 59, 59);
    function update() {
        const now = new Date(), diff = end - now;
        if (diff <= 0) return;
        const d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5), m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
        document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
        document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
        document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
        document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);
}

// ===== NAV HELPERS =====
function renderCategoryDropdown() {
    document.getElementById('catDropdown').innerHTML = CATEGORIES.map(c => `<a href="#" onclick="showCategory('${c.id}')">${c.icon} ${c.name}</a>`).join('');
}

function renderMobileNav() {
    const list = document.getElementById('mobileNavList');
    list.innerHTML = `
    <div class="mobile-nav-item"><a href="#" onclick="showPage('home');toggleMobileSidebar()">🏠 الرئيسية</a></div>
    ${CATEGORIES.map(c => `<div class="mobile-nav-item"><a href="#" onclick="showCategory('${c.id}');toggleMobileSidebar()">${c.icon} ${c.name}</a></div>`).join('')}
    <div class="mobile-nav-item"><a href="#" onclick="showCategory('sale');toggleMobileSidebar()">🔥 العروض</a></div>
    <div class="mobile-nav-item"><a href="#" onclick="showPage('wishlist');toggleMobileSidebar()">❤️ المفضلة</a></div>
  `;
}

function toggleMobileSidebar() {
    document.getElementById('mobileSidebarOverlay').classList.toggle('active');
    document.getElementById('mobileSidebar').classList.toggle('active');
}

function updateBottomNav(page) {
    document.querySelectorAll('.bottom-nav-item').forEach(b => b.classList.remove('active'));
    const idx = page === 'home' ? 0 : page === 'wishlist' ? 3 : -1;
    if (idx >= 0) document.querySelectorAll('.bottom-nav-item')[idx]?.classList.add('active');
}

// ===== HEADER SCROLL + PROGRESS BAR + SCROLL TO TOP =====
function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Header glassmorphism
        document.getElementById('header').classList.toggle('scrolled', scrollY > 50);

        // Progress bar
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
        document.getElementById('progressBar').style.width = scrollPct + '%';

        // Scroll-to-top button
        document.getElementById('scrollTopBtn').classList.toggle('visible', scrollY > 400);
    });

    // Scroll Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
        revealObserver.observe(el);
    });

    // Image lazy load fade-in
    document.addEventListener('load', (e) => {
        if (e.target.tagName === 'IMG') e.target.classList.add('loaded');
    }, true);

    // Handle already-loaded images
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) img.classList.add('loaded');
    });
}

// ===== TOAST =====
function showToast(msg, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(-100%)'; setTimeout(() => toast.remove(), 400); }, 3000);
}

// ===== ANIMATION ENGINE =====
function initAnimations() {
    // 1. Reveal on Scroll (Intersection Observer)
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Initialize Particles
    createHeroParticles();

    // 3. Floating Icons and Micro-interactions
    document.querySelectorAll('.features-item i, .category-card i').forEach(icon => {
        icon.classList.add('float-anim');
    });

    document.querySelectorAll('.social-links a, .header-btn').forEach(btn => {
        btn.classList.add('rotate-hover');
    });

    // 4. Hero Content Entrance
    const heroContent = document.querySelector('.hero-slide.active');
    if (heroContent) {
        heroContent.classList.add('active');
    }
}

function createHeroParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Remove existing if any
    const existing = hero.querySelector('.hero-particles');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.className = 'hero-particles';
    hero.appendChild(container);

    const particleCount = 20;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 10 + 5 + 'px';
        particle.style.width = size;
        particle.style.height = size;

        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';

        const duration = Math.random() * 5 + 3 + 's';
        const delay = Math.random() * 5 + 's';
        particle.style.animationDuration = duration;
        particle.style.animationDelay = delay;

        container.appendChild(particle);
    }
}

// Re-run observer after dynamic content render
function refreshReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('active');
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}
