const url = "https://api.coincap.io/v2/assets?limit=20";

function getAssets() {
  return new Promise((resolve, reject) => {
    fetch(`${url}`, {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        reject(
          "No hemos podido recuperar ese json. El código de respuesta del servidor es: " +
          response.status
        );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}
export default {
  getAssets,
};
