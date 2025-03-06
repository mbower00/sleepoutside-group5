<script>
  import { findProductById } from "../externalServices.mjs";
  import {
    getLocalStorage,
    setLocalStorage,
    updateCartNumber,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } from "../utils.mjs";
  import ImageCarousel from "./ImageCarousel.svelte";

  let { productId, colorIndex } = $props();

  let discount = $state(0);
  let selectedColorIndex = $state(Number(colorIndex || 0));
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
      zIndex: "10",
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
    const itemIndex = cartList.findIndex(
      (item) =>
        item.Id === product.Id &&
        item.SelectedColorIndex === selectedColorIndex,
    );
    if (itemIndex >= 0) {
      // item found in cart
      cartList[itemIndex].Qty += 1;
    } else {
      // new item
      product.Qty = 1;
      product.SelectedColorIndex = selectedColorIndex;
      cartList.push(product);
    }
    setLocalStorage("so-cart", cartList);
  }

  function colorSelectedHandler(colorIndex) {
    selectedColorIndex = colorIndex;
  }
</script>

{#await productPromise}
  <p>Loading...</p>
{:then product}
  <h3>{product.Brand.Name}</h3>
  <h2 class="divider">{product.NameWithoutBrand}</h2>

  <section class="divider">
    <!-- using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing -->
    {#if (product.Images.ExtraImages?.length ?? 0) > 0}
      <ImageCarousel
        images={[
          { Title: "Main View", Src: product.Images.PrimaryExtraLarge },
          ...product.Images.ExtraImages,
        ]}
      />
    {:else}
      <img src={product.Images.PrimaryLarge} alt={product.NameWithoutBrand} />
    {/if}
  </section>

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

  {#if product.Colors.length > 1}
    <p class="product__color-preview">
      <img
        src={product.Colors[selectedColorIndex].ColorPreviewImageSrc}
        alt="Item in {product.Colors[selectedColorIndex].ColorName}"
      />
    </p>

    <p class="product__colors">
      {#each product.Colors as color, colorIndex}
        <!-- using code from https://svelte.dev/playground/ca01d7704d2e411bbe9a9911de6ea8bb?version=5.20.4 -->
        <!-- comments generated via vscode -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <span
          class="product__color {colorIndex === selectedColorIndex
            ? 'selected'
            : ''}"
          onclick={() => {
            colorSelectedHandler(colorIndex);
          }}
        >
          <img width="40" src={color.ColorChipImageSrc} alt={color.ColorName} />
          <span>
            {color.ColorName}
          </span>
        </span>
      {/each}
    </p>
  {:else}
    <p>
      {product.Colors[0].ColorName}
    </p>
  {/if}

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
  .product__colors {
    display: flex;
    gap: 1px;
    justify-content: space-around;
  }
  .product__colors img {
    width: 40px;
    box-shadow: #444 0px 0px 2px;
  }
  .product__color {
    padding: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    font-size: smaller;
    cursor: pointer;
    border: 2px white solid;
  }
  .selected {
    border: 2px var(--secondary-color) solid;
    box-shadow: #444 0px 0px 2px;
  }
  .product__color-preview {
    display: flex;
    justify-content: space-around;
  }
  .product__color-preview img {
    width: 160px;
    /* border: 2px var(--primary-color) solid;
    box-shadow: #444 0px 0px 2px; */
    /* padding: 5px; */
  }
</style>
