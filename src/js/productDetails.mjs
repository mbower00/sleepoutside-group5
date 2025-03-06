// IMPORTANT: productDetails is depreciated... see ./components/ProductDetails.svelte


// import { findProductById } from "./getProductsByCategory.mjs";
// import { getLocalStorage, setLocalStorage, updateCartNumber, addToWishlist, removeFromWishlist, isInWishlist } from "./utils.mjs";

// export default async function productDetails(productId, selector) {
//   // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//   let productData = await findProductById(productId);

//   // once we have the product details we can render out the HTML
//   document.querySelector(".product-detail").innerHTML = productDetailsTemplate(productData);

//   // add a listener to Add to Cart button
//   document
//     .getElementById("addToCart")
//     .addEventListener("click", addToCartHandler);

//   // 🆕 Add listener to Wishlist button
//   const wishlistButton = document.getElementById("wishlistButton");
//   wishlistButton.addEventListener("click", () => {
//     if (isInWishlist(productData.Id)) {
//       removeFromWishlist(productData.Id);
//       wishlistButton.textContent = "Add to Wishlist";
//     } else {
//       addToWishlist(productData);
//       wishlistButton.textContent = "Remove from Wishlist";
//     }
//   });

//   // 🆕 Set initial wishlist button text
//   wishlistButton.textContent = isInWishlist(productData.Id) ? "Remove from Wishlist" : "Add to Wishlist";
// }

// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
//   updateCartNumber();

//   // using code from: 
//   // - https://developer.mozilla.org/en-US/docs/Web/API/Element/animate
//   // - https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Keyframe_Formats
//   const baseConfig = {
//     position: "fixed",
//     right: "47.5%",
//     backgroundColor: "white",
//     padding: "10px 12px 8px 12px",
//     marginTop: "15px",
//     borderRadius: "100%",
//     boxShadow: "#333 2px 2px 5px"
//   };
  
//   document.querySelector(".cart").animate([
//     { ...baseConfig, transform: "rotate(0deg)" },
//     { ...baseConfig, transform: "rotate(30deg)" },
//     { ...baseConfig, transform: "rotate(0deg)" }
//   ], 350);
// }

// function addProductToCart(product) {
//   let cartList = getLocalStorage("so-cart");
//   if (cartList === null || !Array.isArray(cartList)) {
//     cartList = [];
//   }
//   // using code from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
//   const itemIndex = cartList.findIndex((item) => item.Id === product.Id)
//   if (itemIndex >= 0) {
//     // item found in cart
//     cartList[itemIndex].Qty += 1
//   } else {
//     // new item
//     product.Qty = 1
//     cartList.push(product);
//   }
//   setLocalStorage("so-cart", cartList);
// }

// function productDetailsTemplate(product) {
//   const discount = product.SuggestedRetailPrice > product.FinalPrice
//     ? Math.round(((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100)
//     : null;

//   return `
//     <h3>${product.Brand.Name}</h3>
//     <h2 class="divider">${product.NameWithoutBrand}</h2>
//     <img class="divider" src="${product.Images.PrimaryLarge}" alt="${product.NameWithoutBrand}" />

//     <p class="product-card__price">
//       ${discount ? `<span style="color: red; font-weight: bold;">-${discount}%</span>` : ""}
//       <span style="font-weight: bold; color: green;">$${product.FinalPrice}</span>
//       ${discount ? `<span style="text-decoration: line-through; color: gray; margin-left: 10px;">$${product.SuggestedRetailPrice}</span>` : ""}
//     </p>

//     <p class="product__color">${product.Colors[0].ColorName}</p>
//     <p class="product__description">${product.DescriptionHtmlSimple}</p>

//     <div class="product-detail__add">
//       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
//       <!-- 🆕 Wishlist Button -->
//       <button id="wishlistButton"></button>
//     </div>
//   `;
// }
