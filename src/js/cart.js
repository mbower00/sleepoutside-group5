import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let cartItems = getLocalStorage("so-cart") || [];
  
  if (cartItems.length === 0) {
    setLocalStorage("so-cart", cartItems);
    document.querySelector(".cart-footer").classList.add("hide");
  } else {
    document.querySelector(".cart-footer").classList.remove("hide");
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  if (cartItems.length > 0) {
    const total = cartItems.reduce(
      (growingTotal, item) => growingTotal + item.FinalPrice,
      0
    ).toFixed(2);
    document.querySelector(".cart-total").innerHTML = `Total: $${total}`;
  } else {
    document.querySelector(".cart-total").innerHTML = "Total: $0.00";
  }

  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  document.querySelectorAll(".cart-card-remove").forEach((element) => {
    element.addEventListener("click", removeFromCartHandler);
  });
}

function cartItemTemplate(item) {
  const hasDiscount = item.SuggestedRetailPrice > item.FinalPrice;
  const discountPercentage = hasDiscount
    ? Math.round(((item.SuggestedRetailPrice - item.FinalPrice) / item.SuggestedRetailPrice) * 100)
    : 0;

  return `<li class="cart-card divider">
    <span class="cart-card-remove" data-id="${item.Id}">X</span>
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    ${hasDiscount
      ? `<p class="cart-card__price">
          <span class="original-price" style="text-decoration: line-through; color: gray;">$${item.SuggestedRetailPrice.toFixed(2)}</span>
          <span class="discount-price" style="color: green;">$${item.FinalPrice.toFixed(2)}</span>
          <span class="discount-badge" style="color: red; font-weight: bold;">(${discountPercentage}% OFF)</span>
        </p>`
      : `<p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>`
    }
  </li>`;
}

function removeFromCart(id) {
  let cart = getLocalStorage("so-cart") || [];
  let removed = false;
  cart = cart.filter((item) => {
    if (item.Id === id && !removed) {
      removed = true;
      return false;
    }
    return true;
  });

  setLocalStorage("so-cart", cart);
  renderCartContents();
}

function removeFromCartHandler(event) {
  const id = event.target.dataset.id;
  removeFromCart(id);
}

renderCartContents();
