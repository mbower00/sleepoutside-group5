<script>
  import {getLocalStorage} from "../utils.mjs"

  let {cartKey} = $props()

  let firstName = $state("");
  let lastName = $state("");
  let street = $state("");
  let city = $state("");
  let state = $state("");
  let zip = $state("");
  let cardNumber = $state("");
  let expiration = $state("");
  let securityCode = $state("");

  let cart = $state([])
  let count = $state(0)
  let subtotal = $state(0)
  let estimate = $state(0);
  let tax = $state(0);
  let total = $state(0);

  function submitForm(event) {
    event.preventDefault();
    event.target.reset();
  }

  function calculateItemSummary() {
    return cart
    .reduce((sum, item) => sum + (item.FinalPrice * (item.qty || 1)), 0)
    .toFixed(2)
  }
  function calculateShippingTaxTotal() {
    // TODO: write this function and call it when zip is added
    return
  }
  function init() {
    let cart = getLocalStorage(cartKey)
    count = cart.reduce((sum, item) => sum + (1 * (item.qty || 1)), 0)
    subtotal = calculateItemSummary()
  }

  init()
</script>

<form onsubmit={submitForm}>
  <!-- person info -->
  <fieldset>
    <legend>Shipping</legend>
    <label for="first-name"> First Name </label>
    <input type="text" id="first-name" name="first-name" bind:value={firstName} />

    <label for="last-name"> Last Name </label>
    <input type="text" id="last-name" name="last-name" bind:value={lastName} />

    <label for="street"> Street </label>
    <input type="text" id="street" name="street" bind:value={street} />

    <label for="city"> City </label>
    <input type="text" id="city" name="city" bind:value={city} />

    <label for="state"> State </label>
    <input type="text" id="state" name="state" bind:value={state} />

    <label for="zip"> Zip </label>
    <input type="text" id="zip" name="zip" bind:value={zip} />
  </fieldset>

  <!-- card info -->
  <fieldset>
    <legend> Payment </legend>
    <label for="card-number"> Card Number </label>
    <input type="text" id="card-number" name="card-number" bind:value={cardNumber} />

    <label for="expiration"> Expiration </label>
    <input type="text" id="expiration" name="expiration" bind:value={expiration} />

    <label for="security-code"> Security Code </label>
    <input type="text" id="security-code" name="security-code" bind:value={securityCode} />
  </fieldset>

  <!-- summary -->
  <fieldset>
    <legend>Order Summary</legend>
    <p>Item Subtotal({count}) <span class="summary-number">${subtotal}</span></p>
    <p>Shipping Estimate <span class="summary-number">${estimate}</span></p>
    <p>Tax <span class="summary-number">${tax}</span></p>
    <strong>
      <p>Order Total <span class="summary-number">${total}</span></p>
    </strong>
  </fieldset>
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
