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
    cartItems = cart;
    updateCartNumber();
  }

  $: total = cartItems
    .reduce((sum, item) => sum + item.FinalPrice, 0)
    .toFixed(2);

  onMount(loadCart);
</script>

<div class="cart-container">
  {#if cartItems.length === 0}
    <p class="empty-cart">Your cart is empty.</p>
  {:else}
    <ul class="product-list">
      {#each cartItems as item}
        <li class="cart-card divider">
          <span class="cart-card-remove" onclick={() => removeFromCart(item.Id)}
            >X</span
          >
          <a
            href="product_pages/index.html?product={item.Id}"
            class="cart-card__image"
          >
            <img src={item.Image} alt={item.Name} />
          </a>
          <a href="product_pages/index.html?product={item.Id}">
            <h2 class="card__name">{item.Name}</h2>
          </a>
          <p class="cart-card__color">{item.Colors[0].ColorName}</p>
          <p class="cart-card__quantity">qty: 1</p>
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
    </div>
  {/if}
</div>

<style>
  .empty-cart {
    text-align: center;
    font-size: 1.2em;
    color: gray;
  }
</style>
