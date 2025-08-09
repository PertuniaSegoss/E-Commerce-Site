// Instagram & Telegram links
function goToInstagram() {
  window.location.href =
    "https://www.instagram.com/redbillionforex__/profilecard/?igsh=MXFxYmk0YzFnNHQ0OQ==";
}
function goToWhatsapp() {
  window.location.href = "https://wa.me/qr/FBEPAOOALXZJJ1 ";
}
document.getElementById("sendEmail").addEventListener("click", function () {
  const email = "Lesegondhlovu05@gmail.com";
  const subject = "Segoss Hair Inquiry";
  const body = "Hello, I would like to know more about your products.";
  window.location.href = `mailto:${email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
});

// Product list with prices & images
const products = [
  { id: 1, name: "Pink Bob", price: 800, img: "InShot_20240423_022643173.jpg" },
  { id: 2, name: "Closure", price: 1200, img: "InShot_20240423_014400710.jpg" },
  {
    id: 3,
    name: "Jet Black Full Frontal",
    price: 1500,
    img: "InShot_20240423_014400710.jpg",
  },
  {
    id: 4,
    name: "Vietnamese",
    price: 1800,
    img: "WhatsApp Video 2025-06-01 at 07.00.58_08aa6be6.mp4",
  },
  {
    id: 5,
    name: "Jerry Curls",
    price: 1000,
    img: "InShot_20240423_022643173.jpg",
  },
  {
    id: 6,
    name: "Water Weave",
    price: 1100,
    img: "InShot_20240423_022450924.jpg",
  },
  { id: 7, name: "Burgundy", price: 900, img: "InShot_20240423_022530477.jpg" },
  { id: 8, name: "Piano", price: 950, img: "InShot_20240423_022612173.jpg" },
  {
    id: 9,
    name: "T-Part Jerry Curls",
    price: 1150,
    img: "InShot_20240423_022643173.jpg",
  },
];

// Load cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let appliedCoupon = null;

// Add event listeners to all "Add to cart" buttons
document.querySelectorAll(".cart button").forEach((button, index) => {
  button.addEventListener("click", () => {
    addToCart(products[index]);
  });
});

// Add to cart
function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
}

// Save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart display
function renderCart() {
  const cartContainer = document.getElementById("cart-display");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${
      item.name
    }" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
      <div style="flex:1;margin-left:10px;">
        <strong>${item.name}</strong><br>
        Price: R${item.price}
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <div style="margin-left:15px;">R${(item.price * item.quantity).toFixed(
        2
      )}</div>
      <button onclick="removeFromCart(${
        item.id
      })" style="margin-left:10px;color:red;">X</button>
    `;

    total += item.price * item.quantity;
    cartContainer.appendChild(itemDiv);
  });

  // Apply coupon discount
  if (appliedCoupon === "SEGOSS10") {
    total *= 0.9;
  } else if (appliedCoupon === "SEGOSS20") {
    total *= 0.8;
  }

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: R${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);
}

// Change quantity
function changeQuantity(id, change) {
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.quantity += change;
  if (item.quantity <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
    renderCart();
  }
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveCart();
  renderCart();
}

// Apply coupon
document.getElementById("apply-coupon").addEventListener("click", () => {
  const code = document
    .getElementById("coupon-code")
    .value.trim()
    .toUpperCase();
  if (["SEGOSS10", "SEGOSS20"].includes(code)) {
    appliedCoupon = code;
    alert(`Coupon applied: ${code}`);
  } else {
    appliedCoupon = null;
    alert("Invalid coupon code");
  }
  renderCart();
});

// Search filter
document.querySelector(".topnav input").addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  document.querySelectorAll(".container h4").forEach((h4) => {
    const productName = h4.textContent.toLowerCase();
    const container = h4.closest("button");
    if (productName.includes(searchTerm)) {
      container.style.display = "block";
    } else {
      container.style.display = "none";
    }
  });
});

// Render cart on page load
document.addEventListener("DOMContentLoaded", renderCart);

// --- Existing functions above remain the same ---

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-count").textContent = count;
}

// Modify saveCart to also update count
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

// Modify renderCart to also update count
function renderCart() {
  const cartContainer = document.getElementById("cart-display");
  cartContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${
      item.name
    }" style="width:80px;height:80px;object-fit:cover;border-radius:8px;">
      <div style="flex:1;margin-left:10px;">
        <strong>${item.name}</strong><br>
        Price: R${item.price}
      </div>
      <div>
        <button onclick="changeQuantity(${item.id}, -1)">-</button>
        <span>${item.quantity}</span>
        <button onclick="changeQuantity(${item.id}, 1)">+</button>
      </div>
      <div style="margin-left:15px;">R${(item.price * item.quantity).toFixed(
        2
      )}</div>
      <button onclick="removeFromCart(${
        item.id
      })" style="margin-left:10px;color:red;">X</button>
    `;

    total += item.price * item.quantity;
    cartContainer.appendChild(itemDiv);
  });

  // Apply coupon discount
  if (appliedCoupon === "SEGOSS10") {
    total *= 0.9;
  } else if (appliedCoupon === "SEGOSS20") {
    total *= 0.8;
  }

  const totalDiv = document.createElement("div");
  totalDiv.innerHTML = `<h3>Total: R${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);

  // Update cart count in navbar
  updateCartCount();
}

// Navbar cart icon click scrolls to cart section
document.getElementById("cart-icon").addEventListener("click", () => {
  document
    .getElementById("cart-display")
    .scrollIntoView({ behavior: "smooth" });
});

// --- Existing code continues ---

// Render cart on page load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});

// Show "Item added to cart" popup
function showCartNotification() {
  const notif = document.getElementById("cart-notification");
  notif.classList.add("show");
  setTimeout(() => notif.classList.remove("show"), 2000); // Hide after 2 seconds
}

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  renderCart();
  showCartNotification(product); // Pass product info
}

// Show "Item added to cart" popup with image & name
function showCartNotification(product) {
  const notif = document.getElementById("cart-notification");
  const notifImg = document.getElementById("notif-img");
  const notifText = document.getElementById("notif-text");

  notifImg.src = product.img;
  notifText.textContent = `${product.name} added to cart ✅`;

  notif.classList.add("show");
  setTimeout(() => notif.classList.remove("show"), 2000);
}

// Display cart items in checkout summary
function displayCheckoutItems() {
  const container = document.getElementById("checkout-cart-items");
  container.innerHTML = "";

  if (cart.length === 0) {
    container.textContent = "Your cart is empty.";
    return;
  }

  cart.forEach((item) => {
    const p = document.createElement("p");
    p.textContent = `${item.name} x ${item.quantity} - R${(
      item.price * item.quantity
    ).toFixed(2)}`;
    container.appendChild(p);
  });

  // Show total with coupon applied
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  if (appliedCoupon === "SEGOSS10") {
    total *= 0.9;
  } else if (appliedCoupon === "SEGOSS20") {
    total *= 0.8;
  }

  const totalP = document.createElement("p");
  totalP.innerHTML = `<strong>Total: R${total.toFixed(2)}</strong>`;
  container.appendChild(totalP);
}

// Handle checkout form submission
document
  .getElementById("checkout-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !email || !address) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate order placement
    document.getElementById(
      "order-message"
    ).textContent = `Thank you for your order, ${name}! We will contact you shortly at ${email}.`;

    // Clear cart and form
    cart = [];
    appliedCoupon = null;
    saveCart();
    renderCart();
    displayCheckoutItems();
    this.reset();
  });

// Call this on page load as well
document.addEventListener("DOMContentLoaded", () => {
  displayCheckoutItems();
});
