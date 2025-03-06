<script>
  import { getLocalStorage } from "../utils.mjs";

  const baseURL = import.meta.env.VITE_SERVER_URL


  let { cartKey } = $props();

  let firstName = $state("");
  let lastName = $state("");
  let street = $state("");
  let city = $state("");
  let state = $state("");
  let zip = $state("");
  let cardNumber = $state("");
  let expiration = $state("");
  let securityCode = $state("");

  let cart = $state([]);
  let count = $state(0);
  let subtotal = $state(0);
  let estimate = $state(0);
  let tax = $state(0);
  let total = $state(0);

  function submitForm(event) {
    event.preventDefault();
    event.target.reset();
  }

  function zipCodeInputHandler(e) {
    if (`${zip}`.length === 5) {
      calculateShippingTaxTotal()
    }
  }

  function calculateItemSummary() {
    return cart
      .reduce((sum, item) => sum + item.FinalPrice * (item.Qty || 1), 0)
      .toFixed(2);
  }

  function calculateShippingTaxTotal() {
    // calculate shipping
    estimate = 10 + (2 * (count - 1))
    // calculate tax
    tax = (subtotal * 0.06).toFixed(2);
    // calculate total
    total = Number(subtotal) + Number(estimate) + Number(tax)
  }


  function init() {
    cart = getLocalStorage(cartKey);
    count = cart.reduce((sum, item) => sum + 1 * (item.Qty || 1), 0);
    subtotal = calculateItemSummary();
  }

  init();
</script>

<form onsubmit={submitForm}>
  <!-- person info -->
  <fieldset>
    <legend>Shipping</legend>
    <label for="first-name"> First Name </label>
    <input
      type="text"
      id="first-name"
      name="first-name"
      bind:value={firstName}
    />

    <label for="last-name"> Last Name </label>
    <input type="text" required id="last-name" name="last-name" bind:value={lastName} />

    <label for="street"> Street </label>
    <input type="text" required id="street" name="street" bind:value={street} />

    <label for="city"> City </label>
    <input type="text" required id="city" name="city" bind:value={city} />

    <label for="state"> State </label>
    <input type="text" required id="state" name="state" bind:value={state} />

    <label for="zip"> Zip </label>
    <input type="text" required maxlength="5" id="zip" name="zip" bind:value={zip} onchange={zipCodeInputHandler} />
  </fieldset>

  <!-- card info -->
  <fieldset>
    <legend> Payment </legend>
    <label for="card-number"> Card Number </label>
    <input
      type="text"
      id="card-number"
      name="card-number"
      bind:value={cardNumber}
    />

    <label for="expiration"> Expiration </label>
    <input
      type="text"
      id="expiration"
      name="expiration"
      bind:value={expiration}
    />

    <label for="security-code"> Security Code </label>
    <input
      type="text"
      id="security-code"
      name="security-code"
      bind:value={securityCode}
    />
  </fieldset>

  <!-- summary -->
  <fieldset>
    <legend>Order Summary</legend>
    <p>
      Item Subtotal({count}) <span class="summary-number">${subtotal}</span>
    </p>
    <p>Shipping Estimate <span class="summary-number">${estimate}</span></p>
    <p>Tax <span class="summary-number">${tax}</span></p>
    <strong>
      <p>Order Total <span class="summary-number">${total}</span></p>
    </strong>
  </fieldset>
  <button type="submit">Submit</button>
</form>

<style>
  fieldset {
    display: flex;
    flex-direction: column;
  }

  input {
    max-width: 200px;
  }

  label {
    margin-top: 10px;
  }

  .summary-number {
    float: right;
  }
</style>
