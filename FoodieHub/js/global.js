// ===== STATE =====
let cart = JSON.parse(localStorage.getItem("foodiehub_cart") || "[]");
let favorites = JSON.parse(localStorage.getItem("foodiehub_favorites") || "[]");
let darkMode = localStorage.getItem("foodiehub_theme") !== "light";
let currentTestimonial = 0;
let lightboxImages = [];
let lightboxIndex = 0;

// ===== THEME =====
function toggleTheme() {
  darkMode = !darkMode;
  localStorage.setItem("foodiehub_theme", darkMode ? "dark" : "light");
  applyTheme();
}
function applyTheme() {
  document.documentElement.setAttribute(
    "data-theme",
    darkMode ? "dark" : "light",
  );
  const icon = document.getElementById("themeIcon");
  if (icon) icon.className = darkMode ? "fas fa-moon" : "fas fa-sun";
}

// ===== TOAST =====
function showToast(type, message) {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon"><i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i></span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(40px)";
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ===== NAVBAR SCROLL =====
function setupNavScroll() {
  window.addEventListener("scroll", () => {
    document
      .getElementById("navbar")
      .classList.toggle("scrolled", window.scrollY > 60);
  });
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  document.getElementById("mobileNav").classList.toggle("open");
  document.getElementById("hamburger").classList.toggle("active");
}

// ===== CART =====
function updateCartBadge() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cartBadge").textContent = count;
  localStorage.setItem("foodiehub_cart", JSON.stringify(cart));
}

function toggleCart() {
  document.getElementById("cartOverlay").classList.toggle("open");
  document.getElementById("cartDrawer").classList.toggle("open");
  renderCart();
}

function renderCart() {
  const container = document.getElementById("cartItems");
  if (!cart.length) {
    container.innerHTML = `<div class="empty-state"><div class="icon"><i class="fas fa-shopping-bag"></i></div><h4>Your cart is empty</h4></div>`;
    document.getElementById("cartTotal").textContent = "₹0";
    return;
  }
  container.innerHTML = cart
    .map((item, idx) => {
      const dish = allMenuItems.find((d) => d.id === item.id);
      return `<div class="cart-item">
      <div class="item-info"><div class="name">${dish.name}</div><div class="price">₹${dish.price}</div></div>
      <div class="qty-control">
        <button onclick="updateQty(${idx}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateQty(${idx}, 1)">+</button>
      </div>
      <button class="remove-btn" onclick="removeFromCart(${idx})"><i class="fas fa-times"></i></button>
    </div>`;
    })
    .join("");
  const total = cart.reduce(
    (sum, i) => sum + allMenuItems.find((d) => d.id === i.id).price * i.qty,
    0,
  );
  document.getElementById("cartTotal").textContent = "₹" + total;
  updateCartBadge();
}

function updateQty(idx, delta) {
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  if (cart[idx].qty === 0) cart.splice(idx, 1);
  renderCart();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  renderCart();
}

function addToCart(id) {
  const existing = cart.find((i) => i.id === id);
  if (existing) existing.qty += 1;
  else cart.push({ id, qty: 1 });
  renderCart();
  showToast("success", "Added to cart!");
}

function checkout() {
  if (!cart.length) {
    showToast("error", "Cart is empty");
    return;
  }
  showToast("success", "Order placed! (Demo)");
  cart = [];
  renderCart();
  toggleCart();
}

// ===== FAVORITES =====
function toggleFavorite(id) {
  const idx = favorites.indexOf(id);
  if (idx > -1) favorites.splice(idx, 1);
  else favorites.push(id);
  localStorage.setItem("foodiehub_favorites", JSON.stringify(favorites));
  if (typeof renderDishes === "function") renderDishes();
  if (typeof filterMenu === "function") filterMenu();
  showToast(
    "success",
    idx > -1 ? "Removed from favorites" : "Added to favorites",
  );
}

// ===== TESTIMONIALS =====
function renderTestimonials() {
  const track = document.getElementById("testimonialsTrack");
  if (!track) return;
  track.innerHTML = testimonialsData
    .map(
      (t) => `
    <div class="testimonial-card">
      <div class="avatar">${t.avatar}</div>
      <div class="stars">${"★".repeat(t.rating)}</div>
      <blockquote>${t.text}</blockquote>
      <div class="name">${t.name}</div>
      <div class="role">${t.role}</div>
    </div>
  `,
    )
    .join("");
  const dots = document.getElementById("testimonialDots");
  if (dots) {
    dots.innerHTML = testimonialsData
      .map(
        (_, i) =>
          `<span class="dot ${i === 0 ? "active" : ""}" onclick="goToTestimonial(${i})"></span>`,
      )
      .join("");
  }
  updateTestimonial();
}

function updateTestimonial() {
  const track = document.getElementById("testimonialsTrack");
  if (track)
    track.style.transform = `translateX(-${currentTestimonial * 100}%)`;
  document.querySelectorAll(".testimonial-dots .dot").forEach((d, i) => {
    d.classList.toggle("active", i === currentTestimonial);
  });
}

function nextTestimonial() {
  currentTestimonial = (currentTestimonial + 1) % testimonialsData.length;
  updateTestimonial();
}
function prevTestimonial() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonialsData.length) %
    testimonialsData.length;
  updateTestimonial();
}
function goToTestimonial(i) {
  currentTestimonial = i;
  updateTestimonial();
}

// ===== GALLERY (home) =====
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  const dishes = allMenuItems;
  grid.innerHTML = items
    .map(
      (item) => `
    <div class="gallery-item" onclick="openLightbox(${item.id})">
      <div class="placeholder-img"><i class="fas fa-image"></i></div>
      <div class="gallery-overlay">${item.label}</div>
    </div>
  `,
    )
    .join("");
}

// ===== LIGHTBOX =====
function openLightbox(id) {
  const all = galleryData;
  lightboxImages = all;
  lightboxIndex = all.findIndex((i) => i.id === id);
  if (lightboxIndex === -1) lightboxIndex = 0;
  showLightbox();
}
function showLightbox() {
  const overlay = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  const item = lightboxImages[lightboxIndex];
  img.innerHTML = `<div style="padding:60px 40px;text-align:center;color:var(--color-text);">
    <i class="fas fa-image" style="font-size:4rem;opacity:0.2;display:block;margin-bottom:16px;"></i>
    <span style="font-size:1.2rem;">${item ? item.label : "Image"}</span>
  </div>`;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
function lightboxNav(dir) {
  lightboxIndex =
    (lightboxIndex + dir + lightboxImages.length) % lightboxImages.length;
  showLightbox();
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
  if (
    e.key === "ArrowLeft" &&
    document.getElementById("lightbox").classList.contains("open")
  )
    lightboxNav(-1);
  if (
    e.key === "ArrowRight" &&
    document.getElementById("lightbox").classList.contains("open")
  )
    lightboxNav(1);
});

// ===== SEARCH =====
function toggleSearch() {
  const overlay = document.getElementById("searchOverlay");
  overlay.classList.toggle("open");
  if (overlay.classList.contains("open"))
    document.getElementById("searchInput").focus();
}
function performSearch() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const results = document.getElementById("searchResults");
  if (!q) {
    results.innerHTML = "";
    return;
  }
  const matches = allMenuItems.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.desc.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q),
  );
  if (!matches.length) {
    results.innerHTML = '<div class="result-item">No results found</div>';
    return;
  }
  results.innerHTML = matches
    .map(
      (d) =>
        `<div class="result-item" onclick="addToCart(${d.id}); toggleSearch();"><div class="result-title">${d.name}</div><div class="result-sub">₹${d.price} · ${d.category}</div></div>`,
    )
    .join("");
}

// ===== NEWSLETTER =====
function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail");
  if (email && email.value) {
    showToast("success", "Subscribed!");
    email.value = "";
  } else showToast("error", "Enter an email address");
}

// ===== SIGNATURE CARDS (home) =====
function renderSignatureCards() {
  const grid = document.getElementById("signatureGrid");
  if (!grid) return;
  grid.innerHTML = signatureData
    .map(
      (item, i) => `
    <div class="signature-card" style="animation:fadeUp 0.6s ease forwards ${0.1 + i * 0.1}s;opacity:0;">
      <div class="icon"><i class="fas ${item.icon}"></i></div>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <button class="btn btn-sm btn-outline" onclick="showToast('success','Explore ${item.title}')">Explore</button>
    </div>
  `,
    )
    .join("");
}

// ===== DISHES (home) =====
function renderDishes() {
  const grid = document.getElementById("dishesGrid");
  if (!grid) return;
  const dishes = allMenuItems;
  grid.innerHTML = dishes
    .map(
      (d) => `
    <div class="dish-card">
      <div class="dish-img"><div class="placeholder-img"><i class="fas fa-utensils"></i></div></div>
      <div class="dish-body">
        <div class="dish-header"><h4>${d.name}</h4><span class="price">₹${d.price}</span></div>
        <p class="dish-desc">${d.desc}</p>
        <div class="dish-meta">
          ${d.veg ? '<span class="tag veg"><i class="fas fa-leaf"></i> Veg</span>' : ""}
          ${d.spicy ? '<span class="tag spicy"><i class="fas fa-pepper-hot"></i> Spicy</span>' : ""}
          <span class="tag">${d.category}</span>
        </div>
        <div class="dish-actions">
          <button class="add-btn" onclick="addToCart(${d.id})"><i class="fas fa-plus"></i> Add</button>
          <button class="fav-btn ${favorites.includes(d.id) ? "active" : ""}" onclick="toggleFavorite(${d.id})">
            <i class="fas fa-heart"></i>
          </button>
        </div>
      </div>
    </div>
  `,
    )
    .join("");
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  updateCartBadge();
  setupNavScroll();
  document.querySelectorAll(".mobile-nav a").forEach((a) => {
    a.addEventListener("click", () => {
      document.getElementById("mobileNav").classList.remove("open");
      document.getElementById("hamburger").classList.remove("active");
    });
  });
});
