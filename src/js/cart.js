import { renderHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./components/ShoppingCart.svelte";
import { mount } from "svelte";

renderHeaderFooter();

const shoppingCart = mount(ShoppingCart, {
  target: document.querySelector(".product-list"),
});
