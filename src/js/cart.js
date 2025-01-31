import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart");
  if (cartItems === null) {
    cartItems = [];
    setLocalStorage("so-cart", cartItems);
  }
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  if (cartItems.length > 0) {
    document.querySelector(".cart-footer").classList.remove("hide");
    // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    const total = cartItems.reduce(
      (growingTotal, item) => growingTotal + item.FinalPrice,
      0
    );
    const html = `Total: $${total}`;
    document.querySelector(".cart-total").innerHTML = html;
  } else {
    document.querySelector(".cart-footer").classList.add("hide")
  }

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelectorAll(".cart-card-remove").forEach((element) => {
    element.addEventListener("click", removeFromCartHandler)
  })
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <span class="cart-card-remove" data-id="${item.Id}">X</span>
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function removeFromCart(id) {
  let cart = getLocalStorage("so-cart")
  if (cart === null) {
    cart = []
  }
  let removed = false
  cart = cart.filter((item) => {
    if (item.Id === id && !removed){
      removed = true
      return false
    } else {
      return true
    }
  })
  setLocalStorage("so-cart", cart)
  renderCartContents()
}

function removeFromCartHandler(event) {
  // using code from:
  // - https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
  // - https://developer.mozilla.org/en-US/docs/Web/API/Event
  const id = event.target.dataset.id
  removeFromCart(id)
}

renderCartContents();