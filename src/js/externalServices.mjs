const baseURL = import.meta.env.VITE_SERVER_URL

async function convertToJson(res) {
  const body = await res.json();
  if (res.ok) {
    return body 
  } else {
    throw {name: "servicesError", message: body};
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(`${baseURL}products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(`${baseURL}product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const url = baseURL + "checkout"
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
  const response = await fetch(url, options)
  const data = convertToJson(response)
  console.log()
  return data
}