// Header Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 0);
});
// Products Array
const products = [
  {
    id: 1,
    title: "Realme 12 PRO",
    price: 264.9,
    image:
      "https://rukminim2.flixcart.com/image/312/312/xif0q/mobile/m/p/y/12-pro-5g-rmx3842-realme-original-imagxgnhafyjz8rb.jpeg?width=1426",
  },
  {
    id: 2,
    title: "Iphone 15",
    price: 295,
    image:
      "https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/k/l/l/-original-imagtc5fz9spysyk.jpeg?q=70&sw=1250",
  },
  {
    id: 3,
    title: "Power Bank 10K mAh",
    price: 74.9,
    image:
      "https://www.portronics.com/cdn/shop/products/1_31c209f8-654e-4350-9830-c7faf187125a_473x@2x.progressive.jpg?&width=1426",
  },
  {
    id: 4,
    title: "Laptop Cooling Pad",
    price: 80,
    image:
      "https://www.portronics.com/cdn/shop/files/Image1_eb9e744c-787f-4740-a726-0adab1cf365f_473x@2x.progressive.png?v=1707820340",
  },
  {
    id: 5,
    title: "Power Plate 7",
    price: 48.99,
    image:
      "https://www.portronics.com/cdn/shop/products/6_990bc570-39d4-4791-b971-201f08bd6082_580x.jpg?v=1682141602?imwidth=1800",
  },
  {
    id: 6,
    title: "HP Gaming Laptop",
    price: 395,
    image:
      "https://s.hdnux.com/photos/01/16/53/27/20624878/5/rawImage.jpg?width=1426",
  },
  {
    id: 7,
    title: "Stone Bar",
    price: 48.99,
    image:
      "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Stone_Spinx_Pro.jpg?width=1800",
  },
  {
    id: 8,
    title: "Bang Pro",
    price: 79.99,
    image:
      "https://www.portronics.com/cdn/shop/products/1200x1200-1_e1812086-6117-482b-aec7-3c2dc753b55d_580x.jpg?width=1800",
  },
];

// Get the products list and elements
const productList = document.getElementById("productList");
const cartItemsElement = document.getElementById("cartItems");
const cartTotalElement = document.getElementById("cartTotal");

// Store Cart Items In Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render Products On Page
function renderProducts() {
  productList.innerHTML = products
    .map(
      (product) => `
    <div class="product">
    <img src="${product.image}" alt="${product.title}" class="product-img" />
    <div class="product-info">
      <h2 class="product-title">${product.title}</h2>
      <p class="product-price">$${product.price.toFixed(2)}</p>
      <a class="add-to-cart" data-id="${product.id}">Add to cart</a>
    </div>
  </div>
    `
    )
    .join("");
  // Add to cart
  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButtons.length; i++) {
    const addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCart);
  }
}

// Add to cart
function addToCart(event) {
  const productID = parseInt(event.target.dataset.id);
  const product = products.find((product) => product.id === productID);

  if (product) {
    // If product already in cart
    const exixtingItem = cart.find((item) => item.id === productID);

    if (exixtingItem) {
      exixtingItem.quantity++;
    } else {
      const cartItem = {
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      };
      cart.push(cartItem);
    }
    // Change Add to cart text to added
    event.target.textContent = "Added";
    updateCartIcon();
    saveToLocalStorage();
    renderCartItems();
    calculateCartTotlal();
  }
}

// Remove from cart
function removeFromCart(event) {
  const productID = parseInt(event.target.dataset.id);
  cart = cart.filter((item) => item.id !== productID);
  saveToLocalStorage();
  renderCartItems();
  calculateCartTotlal();
  updateCartIcon();
}
// Quantity Change
function changeQuantity(event) {
  const productID = parseInt(event.target.dataset.id);
  const quantity = parseInt(event.target.value);

  if (quantity > 0) {
    const cartItem = cart.find((item) => item.id === productID);
    if (cartItem) {
      cartItem.quantity = quantity;
      saveToLocalStorage();
      calculateCartTotlal();
      updateCartIcon();
    }
  }
}
// SaveToLocalStorage
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Render Prodcuts On Cart Page
function renderCartItems() {
  cartItemsElement.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item">
    <img src="${item.image}" alt="${item.title}" />
    <div class="cart-item-info">
      <h2 class="cart-item-title">${item.title}</h2>
      <input
        class="cart-item-quantity"
        type="number"
        name=""
        min="1"
        value="${item.quantity}"
        data-id="${item.id}"
      />
    </div>
    <h2 class="cart-item-price">$${item.price}</h2>
    <button class="remove-from-cart" data-id="${item.id}">Remove</button>
  </div>
    `
    )
    .join("");
  // Remove From Cart
  const removeButtons = document.getElementsByClassName("remove-from-cart");
  for (let i = 0; i < removeButtons.length; i++) {
    const removeButton = removeButtons[i];
    removeButton.addEventListener("click", removeFromCart);
  }
  // Quantity Change
  const quantityInputs = document.querySelectorAll(".cart-item-quantity");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", changeQuantity);
  });
}

// Claculate Total
function calculateCartTotlal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Check If On Cart Page
if (window.location.pathname.includes("cart.html")) {
  renderCartItems();
  calculateCartTotlal();
} else if (window.location.pathname.includes("success.html")) {
  clearCart();
} else {
  renderProducts();
}
// Empty Cart on successfull payment
function clearCart() {
  cart = [];
  saveToLocalStorage();
  updateCartIcon;
}
// Cart Icon Quantity
const cartIcon = document.getElementById("cart-icon");

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + iyem.quantity, 0);
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

updateCartIcon();

function updateCartIconOnCartChange() {
  updateCartIcon();
}

window.addEventListener("storage", updateCartIconOnCartChange);

function updateCartIcon() {
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.setAttribute("data-quantity", totalQuantity);
}

renderProducts();
renderCartItems();
calculateCartTotlal();
