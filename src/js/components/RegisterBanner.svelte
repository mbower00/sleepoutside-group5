<script>
    let shown = $state(true)
</script>

{#if shown}
    <div class="banner">
        <button class="close-banner" onclick={() => {shown = false}}>X</button>
        Welcome! Please register with the site. Those who register recieve a free SleepOutside sticker and drink coaster!
    </div>
{/if}

<style>
.banner {
  background-color: var(--secondary-color);
  color: white;
  position: relative;
  padding: 10px 10px;
  margin: 0;
}
.close-banner {
    position: absolute;
    right: 10px;
    cursor: pointer;
    padding:0;
    background-color: var(--secondary-color);
    color: white;
    font-size: var(--font-base);
}
</style>