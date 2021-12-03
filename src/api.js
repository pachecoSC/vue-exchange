const url = "https://api.coincap.io/v2/assets?limit=20";

let request = new Request(url, {
  mode: "cors",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
});

function getAssets() {
  return fetch(request)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("api: ", data);
      return data; // es necesario devolverla por que si no devuelve una promesa pendiente.
    })
    .catch(function (error) {
      console.log(error);
    });
  //forma de usar las promesas.
  // return new Promise((resolve, reject) => {
  //   fetch(`${url}`, {
  //     mode: "cors",
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       reject(
  //         "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
  //           response.status
  //       );
  //     })
  //     .then((json) => resolve(json))
  //     .catch((err) => reject(err));
  // });
}
export default {
  getAssets,
};
