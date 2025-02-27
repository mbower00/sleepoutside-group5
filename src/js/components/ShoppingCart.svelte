<script>
  import {
    getLocalStorage,
    setLocalStorage,
    updateCartNumber,
  } from "../utils.mjs";
  import { onMount } from "svelte";

  let cartItems = [];

  function loadCart() {
    cartItems = getLocalStorage("so-cart") || [];
  }

  function removeFromCart(id, colorIndex) {
    let cart = getLocalStorage("so-cart") || [];
    let removed = false;
    cart = cart.filter((item) => {
      if (
        item.Id === id &&
        item.SelectedColorIndex === colorIndex &&
        !removed
      ) {
        removed = true;
        return false;
      }
      return true;
    });

    setLocalStorage("so-cart", cart);
    cartItems = cart;
    updateCartNumber();
  }

  function changeQty(itemIndex, changeBy) {
    let cart = getLocalStorage("so-cart") || [];
    cart[itemIndex].Qty += changeBy;
    setLocalStorage("so-cart", cart);
    cartItems = cart;
  }

  $: total = cartItems
    .reduce((sum, item) => sum + item.FinalPrice * (item.Qty || 1), 0)
    .toFixed(2);

  onMount(loadCart);
</script>

<div class="cart-container">
  {#if cartItems.length === 0}
    <p class="empty-cart">Your cart is empty.</p>
  {:else}
    <ul class="product-list">
      {#each cartItems as item, index}
        <li class="cart-card divider">
          <span
            class="cart-card-remove"
            onclick={() => removeFromCart(item.Id, item.SelectedColorIndex)}
            >X</span
          >
          <a
            href="/product_pages/index.html?product={item.Id}&colorIndex={item.SelectedColorIndex}"
            class="cart-card__image"
          >
            <img
              src={item.Colors[item.SelectedColorIndex].ColorPreviewImageSrc}
              alt={item.Name}
            />
          </a>
          <a
            href="/product_pages/index.html?product={item.Id}&colorIndex={item.SelectedColorIndex}"
          >
            <h2 class="card__name">{item.Name}</h2>
          </a>
          <p class="cart-card__color">
            {item.Colors[item.SelectedColorIndex].ColorName}
          </p>

          <p class="cart-card__quantity">
            qty: {item.Qty}
            <span class="cart-card-quantity-buttons-container">
              {#if item.Qty > 1}
                <button
                  class="cart-card-quantity-button"
                  onclick={() => {
                    changeQty(index, -1);
                  }}>-</button
                >
              {/if}
              <button
                class="cart-card-quantity-button"
                onclick={() => {
                  changeQty(index, 1);
                }}>+</button
              >
            </span>
          </p>

          {#if item.SuggestedRetailPrice > item.FinalPrice}
            <p class="cart-card__price">
              <span
                class="original-price"
                style="text-decoration: line-through; color: gray;"
              >
                ${item.SuggestedRetailPrice.toFixed(2)}
              </span>
              <span class="discount-price" style="color: green;">
                ${item.FinalPrice.toFixed(2)}
              </span>
              <span
                class="discount-badge"
                style="color: red; font-weight: bold;"
              >
                ({Math.round(
                  ((item.SuggestedRetailPrice - item.FinalPrice) /
                    item.SuggestedRetailPrice) *
                    100,
                )}% OFF)
              </span>
            </p>
          {:else}
            <p class="cart-card__price">${item.FinalPrice.toFixed(2)}</p>
          {/if}
        </li>
      {/each}
    </ul>
    <div class="cart-footer">
      <p class="cart-total">Total: ${total}</p>
      <a href="../checkout/index.html">
        <button>Checkout</button>
      </a>
    </div>
  {/if}
</div>

<style>
  .empty-cart {
    text-align: center;
    font-size: 1.2em;
    color: gray;
  }
  .cart-card-quantity-buttons-container {
    display: flex;
    margin-top: 5px;
    gap: 5px;
  }
  .cart-card-quantity-button {
    padding: 5px;
    margin: 0;
    line-height: 13px;
    font-family: monospace;
  }
</style>
