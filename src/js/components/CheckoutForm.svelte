<script>
  import { getLocalStorage } from "../utils.mjs";
  import {checkout} from "../externalServices.mjs"
  let { cartKey } = $props();

  let fname = $state(""); 
  let lname = $state(""); 
  let street = $state("");
  let city = $state("");
  let state = $state("");
  let zip = $state("");
  let cardNumber = $state("1234123412341234");
  let expiration = $state("6/52");
  
  let code = $state("123"); 
  let cart = $state([]);
  let count = $state(0);
  let subtotal = $state(0);
  let shipping = $state(0);
  let tax = $state(0);
  let orderTotal = $state(0);

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
    shipping = 10 + (2 * (count - 1))
    // calculate tax
    tax = `${(subtotal * 0.06).toFixed(2)}`;
    // calculate total
    orderTotal = `${Number(subtotal) + Number(shipping) + Number(tax)}`
  }

  function packageItems() {
    return { 
      orderDate: new Date().toISOString(),
      fname,
      lname,
      street,
      city,
      state,
      zip,
      cardNumber,
      expiration,
      code,
      items: cart.map((item) => {
        return {
          id: item.Id,
          name: item.Name,
          price: item.FinalPrice,
          quantity: item.Qty
        }
      }),
      orderTotal,
      shipping,
      tax,
    }
  }

  function handleSubmit(e) {
    event.preventDefault();
    const payload = packageItems()
    checkout(payload)

    // reset
    subtotal = 0;
    shipping = 0;
    tax = 0;
    orderTotal = 0;
    event.target.reset();
  }


  function init() {
    cart = getLocalStorage(cartKey);
    count = cart.reduce((sum, item) => sum + 1 * (item.Qty || 1), 0);
    subtotal = calculateItemSummary();
  }

  init();
</script>

<form onsubmit={handleSubmit}>
  <!-- person info -->
  <fieldset>
    <legend>Shipping</legend>
    <label for="fname"> First Name </label>
    <input
      type="text"
      id="fname"
      name="fname"
      bind:value={fname}
    />

    <label for="lname"> Last Name </label>
    <input type="text" required id="lname" name="lname" bind:value={lname} />

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

    <label for="code"> Security Code </label>
    <input
      type="text"
      id="code"
      name="code"
      bind:value={code}
    />
  </fieldset>

  <!-- summary -->
  <fieldset>
    <legend>Order Summary</legend>
    <p>
      Item Subtotal({count}) <span class="summary-number">${subtotal}</span>
    </p>
    <p>Shipping Estimate <span class="summary-number">${shipping}</span></p>
    <p>Tax <span class="summary-number">${tax}</span></p>
    <strong>
      <p>Order Total <span class="summary-number">${orderTotal}</span></p>
    </strong>
  </fieldset>
  <button type="submit" id="submit-button">Submit</button>
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

  #submit-button {
    margin-top: 20px;
  }
</style>
