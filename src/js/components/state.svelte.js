import { getCartNumber } from "../utils.mjs";

export const cartState = $state({count: getCartNumber()})