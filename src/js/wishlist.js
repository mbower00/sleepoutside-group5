import { getLocalStorage } from "./utils.mjs";
import { mount } from "svelte";
import MainHeader from "./components/MainHeader.svelte";
import MainFooter from "./components/MainFooter.svelte";
import Wishlist from "./components/Wishlist.svelte";

// Render header and footer
mount(MainHeader, { target: document.getElementById("main-header") });
mount(MainFooter, { target: document.getElementById("main-footer") });

// Render wishlist
const wishlist = getLocalStorage("so-wishlist") || [];
const wishlistContainer = document.getElementById("wishlist-container");

if (wishlist.length === 0) {
  wishlistContainer.innerHTML = "<p>Your wishlist is empty.</p>";
} else {
  mount(Wishlist, {
    target: wishlistContainer,
    props: { items: wishlist },
  });
}
