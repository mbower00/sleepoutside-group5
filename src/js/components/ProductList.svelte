<script>
  import { getData } from "../productData.mjs";
  import ProductSummary from "./ProductSummary.svelte";

  let { category } = $props();

  const neededTents = ["880RR", "985RF", "985PR", "344YJ"];

  //returns filtered products
  function filterNeeded(products) {
    return products.filter((product) => neededTents.includes(product.Id));
  }

  let promise = getData(category).then((products) => filterNeeded(products));
</script>

<h2>Top Products: {category}</h2>
{#await promise}
  <p>.....Loading</p>
{:then products}
  <ul class="product-list">
    {#each products as product}
      <ProductSummary {product} />
    {/each}
  </ul>
{:catch error}
  <p>There was an error</p>
{/await}
