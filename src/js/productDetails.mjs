import {findProductById} from  "./productData.mjs";

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
}

function addProductToCart(product) {
  setLocalStorage("so-cart", product);
  
}

function productDetailsTemplate(product) {
  console.log(product)
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
