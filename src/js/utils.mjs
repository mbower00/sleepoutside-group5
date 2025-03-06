import { mount } from "svelte";
import MainHeader from "./components/MainHeader.svelte"
import MainFooter from "./components/MainFooter.svelte"
import { cartState } from "./components/state.svelte";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// get the given parameter from t
export function getParam(param = "product") {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const value = urlParams.get(param);
  return value
}
export function updateCartNumber(){
  cartState.count = getCartNumber()
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement("div");
  alert.setAttribute("role", "alert");
  alert.textContent = message;
  alert.style.backgroundColor = "red";
  alert.style.color = "white";
  alert.style.padding = "10px";
  alert.style.margin = "10px 0";
  alert.style.textAlign = "center";

  // Insert alert before the main element
  const main = document.querySelector("main");
  main.parentNode.insertBefore(alert, main);

  // Scroll to the top if needed
  if (scroll) window.scrollTo(0, 0);

  // Remove alert after 3 seconds
  setTimeout(() => {
      alert.remove();
  }, 3000);
}



export function renderHeaderFooter(){

  // Render Header
  const mainHeader = mount(MainHeader, {
    target: document.querySelector("#main-header"),
    props: {
      cartCount: getCartNumber()
    }
  });
 
 // Render Footer 
  const mainFooter = mount(MainFooter, {
    target: document.querySelector("#main-footer")
  });
}

export function getCartNumber(){
  const cart = getLocalStorage("so-cart")
  return cart?.length || 0
}

// Get wishlist from localStorage
export function getWishlist() {
  return JSON.parse(localStorage.getItem("so-wishlist")) || [];
}

// Save wishlist to localStorage
export function setWishlist(wishlist) {
  localStorage.setItem("so-wishlist", JSON.stringify(wishlist));
}

// Add product to wishlist
export function addToWishlist(product) {
  const wishlist = getWishlist();
  if (!wishlist.some((item) => item.Id === product.Id)) {
    wishlist.push(product);
    setWishlist(wishlist);
  }
}

// Remove product from wishlist
export function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter((item) => item.Id !== productId);
  setWishlist(wishlist);
}

// Check if product is in wishlist
export function isInWishlist(productId) {
  return getWishlist().some((item) => item.Id === productId);
}

// Get wishlist count
export function getWishlistCount() {
  return getWishlist().length;
}