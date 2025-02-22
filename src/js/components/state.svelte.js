import { getCartNumber } from "../utils.mjs";

export const cartState = $state({ count: getCartNumber() });
import { writable } from "svelte/store";

export const wishlistState = writable({ count: 0 });
