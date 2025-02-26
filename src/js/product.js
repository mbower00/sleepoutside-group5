import { getParam, renderHeaderFooter } from "./utils.mjs";
import { mount } from "svelte";
import ProductDetails from "./components/ProductDetails.svelte";

renderHeaderFooter();
const productDetails = mount(ProductDetails, {
  target: document.querySelector(".product-detail"),
  props: {
    productId: getParam("product"),
  },
});
