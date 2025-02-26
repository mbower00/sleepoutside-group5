import { renderHeaderFooter } from "./utils.mjs";
import CheckoutForm from "./components/CheckoutForm.svelte";
import { mount } from "svelte";

renderHeaderFooter();
const checkoutForm = mount(CheckoutForm, {
  target: document.querySelector(".products"),
  props: {
    cartKey: "so-cart",
  },
});
