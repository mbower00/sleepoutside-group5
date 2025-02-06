import { mount } from "svelte";
import MainHeader from "./components/MainHeader.svelte"
import MainFooter from "./components/MainFooter.svelte"

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
  let cart = getLocalStorage("so-cart")
  if (cart === null) {
    cart = []
  }
  document.querySelector(".cart-number").innerHTML = cart.length
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