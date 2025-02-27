<script>
  let { images } = $props();
  let currentIndex = $state(0);
  // using code from:
  // - https://stackoverflow.com/questions/71847892/computed-value-with-argument-in-svelte
  // - https://stackoverflow.com/questions/59231590/svelte-what-does-mean
  // - https://svelte.dev/docs/svelte/$derived
  let nextIndex = $derived(
    currentIndex + 1 < images.length ? currentIndex + 1 : null,
  );
  let prevIndex = $derived(currentIndex - 1 >= 0 ? currentIndex - 1 : null);

  function changeView(modifier) {
    currentIndex += modifier;
  }
</script>

<div class="carousel">
  {#if prevIndex !== null}
    <div
      class="navigator prev-view"
      onclick={() => {
        changeView(-1);
      }}
    >
      <img src={images[prevIndex].Src} alt={images[prevIndex].Title} />
    </div>
  {/if}

  <img src={images[currentIndex].Src} alt={images[currentIndex].Title} />

  {#if nextIndex !== null}
    <div
      class="navigator next-view"
      onclick={() => {
        changeView(1);
      }}
    >
      <img src={images[nextIndex].Src} alt={images[nextIndex].Title} />
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
  }
  .navigator {
    position: absolute;
    z-index: 2;
    bottom: 10px;
    box-shadow: #444 0px 0px 2px;
    padding: 5px;
    cursor: pointer;
    background-color: white;
  }
  .navigator img {
    width: 40px;
  }
  .prev-view {
    left: 0;
  }
  .next-view {
    right: 0;
  }
</style>
