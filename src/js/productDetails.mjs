import {findProductById} from  "./productData.mjs";
import { getLocalStorage, setLocalStorage, updateCartNumber } from "./utils.mjs";

export default async function productDetails(productId, selector) {
  // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  let productData = await findProductById(productId);
  // once we have the product details we can render out the HTML
  document.querySelector(".product-detail").innerHTML = productDetailsTemplate(productData)
  // add a listener to Add to Cart button
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
  updateCartNumber()
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
    boxShadow: "#333 2px 2px 5px"
  }
  document.querySelector(".cart").animate([
    {
      ...baseConfig,
      transform: "rotate(0deg)",
    },
    {
      ...baseConfig,
      transform: "rotate(30deg)"
    },
    {
      ...baseConfig,
      transform: "rotate(0deg)"
    }
  ], 350)
}

function addProductToCart(product) {
  let cartList = getLocalStorage("so-cart")
  if (cartList === null){
    cartList = []
  } else if (!Array.isArray(cartList)){
    cartList = []
  }
  cartList.push(product)
  setLocalStorage("so-cart", cartList);
}

function productDetailsTemplate(product) {
  return `
    <h3>${product.Brand.Name}</h3>

    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />

    <p class="product-card__price">${product.FinalPrice}</p>

    <p class="product__color">${product.Colors[0].ColorName}</p>

    <p class="product__description">${product.DescriptionHtmlSimple}</p>

    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  `;
}
