<script>
    export let items = [];
  </script>
  
  {#if items.length === 0}
    <p>No items in your wishlist.</p>
  {:else}
    <ul>
      {#each items as item}
        <li class="wishlist-item">
          <img src="{item.Images.PrimarySmall}" alt="{item.NameWithoutBrand}" />
          <div>
            <h3>{item.NameWithoutBrand}</h3>
            <p>Price: ${item.FinalPrice}</p>
          </div>
        </li>
      {/each}
    </ul>
  {/if}
  
  <style>
    .wishlist-item {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
    }
  
    .wishlist-item img {
      width: 60px;
      height: auto;
      margin-right: 1rem;
    }
  </style>
  