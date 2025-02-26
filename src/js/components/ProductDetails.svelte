<script>
  import { findProductById } from "../productData.mjs";
  import {
    getLocalStorage,
    setLocalStorage,
    updateCartNumber,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } from "../utils.mjs";

  let { productId } = $props();

  let discount = $state(0);
  let productPromise = findProductById(productId).then((productData) => {
    discount = calculateDiscount(productData);
    return productData;
  });

  function calculateDiscount(product) {
    return product.SuggestedRetailPrice > product.FinalPrice
      ? Math.round(
          ((product.SuggestedRetailPrice - product.FinalPrice) /
            product.SuggestedRetailPrice) *
            100,
        )
      : null;
  }

  function addToWishlistHandler(product) {
    const wishlistButton = document.querySelector("#wishlistButton");
    if (isInWishlist(product.Id)) {
      removeFromWishlist(product.Id);
      wishlistButton.textContent = "Add to Wishlist";
    } else {
      addToWishlist(product);
      wishlistButton.textContent = "Remove from Wishlist";
    }
  }

  // add to cart button event handler
  function addToCartHandler(product) {
    addProductToCart(product);
    updateCartNumber();

    // using code from:
    // - https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
    // - https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
    const baseConfig = {
      position: "fixed",
      right: "47.5%",
      backgroundColor: "white",
      padding: "10px 12px 8px 12px",
      marginTop: "15px",
      borderRadius: "100%",
      boxShadow: "#333 2px 2px 5px",
    };

    document.querySelector(".cart").animate(
      [
        { ...baseConfig, transform: "rotate(0deg)" },
        { ...baseConfig, transform: "rotate(30deg)" },
        { ...baseConfig, transform: "rotate(0deg)" },
      ],
      350,
    );
  }

  function addProductToCart(product) {
    let cartList = getLocalStorage("so-cart");
    if (cartList === null || !Array.isArray(cartList)) {
      cartList = [];
    }
    // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    const itemIndex = cartList.findIndex((item) => item.Id === product.Id);
    if (itemIndex >= 0) {
      // item found in cart
      cartList[itemIndex].Qty += 1;
    } else {
      // new item
      product.Qty = 1;
      cartList.push(product);
    }
    setLocalStorage("so-cart", cartList);
  }
</script>

{#await productPromise}
  <p>Loading...</p>
{:then product}
  <h3>{product.Brand.Name}</h3>
  <h2 class="divider">{product.NameWithoutBrand}</h2>
  <img
    class="divider"
    src={product.Images.PrimaryLarge}
    alt={product.NameWithoutBrand}
  />

  <p class="product-card__price">
    {#if discount}
      <span style="color: red; font-weight: bold;">-{discount}%</span>
    {/if}
    <span style="font-weight: bold; color: green;">${product.FinalPrice}</span>
    {#if discount}
      <span
        style="text-decoration: line-through; color: gray; margin-left: 10px;"
        >${product.SuggestedRetailPrice}</span
      >
    {/if}
  </p>

  <p class="product__color">{product.Colors[0].ColorName}</p>
  <!-- using code from https://svelte.dev/tutorial/svelte/html-tags -->
  <p class="product__description">{@html product.DescriptionHtmlSimple}</p>

  <div class="product-detail__add">
    <button id="addToCart" onclick={() => addToCartHandler(product)}
      >Add to Cart</button
    >
    <!-- 🆕 Wishlist Button -->
    <button
      id="wishlistButton"
      onclick={() => {
        addToWishlistHandler(product);
      }}
    >
      {#if isInWishlist(product.Id)}
        Remove from Wishlist
      {:else}
        Add to Wishlist
      {/if}
    </button>
  </div>
{/await}

<style>
  #wishlistButton {
    margin-top: 10px;
  }
</style>
