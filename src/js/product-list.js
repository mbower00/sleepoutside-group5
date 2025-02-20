import ProductList from "./components/ProductList.svelte";
import { mount } from "svelte";
import { renderHeaderFooter, getParam } from "./utils.mjs";

renderHeaderFooter();
const category = getParam("category");
const productList = mount(ProductList, {
  target: document.querySelector(".products"),
  props: {
    category,
  },
});
