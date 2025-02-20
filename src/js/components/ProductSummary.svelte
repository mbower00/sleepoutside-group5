<script>
  let { product } = $props();

  // Calculate the discount percentage
  function getDiscountPercentage(originalPrice, finalPrice) {
    if (!originalPrice || originalPrice <= finalPrice) return null;
    return Math.round(((originalPrice - finalPrice) / originalPrice) * 100);
  }

  let discount = getDiscountPercentage(product.SuggestedRetailPrice, product.FinalPrice);
</script>

<style>
  .discount-badge {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: red;
    color: white;
    padding: 5px 10px;
    font-size: 0.9rem;
    font-weight: bold;
    border-radius: 5px;
  }

  .product-card {
    position: relative;
  }

  .original-price {
    text-decoration: line-through;
    color: gray;
    margin-left: 10px;
    font-size: 0.9rem;
  }

  .final-price {
    font-weight: bold;
    color: green;
  }
</style>

<li class="product-card">
  {#if discount}
    <div class="discount-badge">-{discount}%</div>
  {/if}
  
  <a href="product_pages/index.html?product={product.Id}">
    <img src={product.Image} alt={product.Name} />
    <h3 class="card__brand">{product.Brand.Name}</h3>
    <h2 class="card__name">{product.NameWithoutBrand}</h2>
    <p class="product-card__price">
      <span class="final-price">${product.FinalPrice}</span>
      {#if discount}
        <span class="original-price">${product.SuggestedRetailPrice}</span>
      {/if}
    </p>
  </a>
</li>
