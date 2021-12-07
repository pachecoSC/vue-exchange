const url = "https://api.coincap.io/v2/assets?limit=20";

function getAssets() {
  return (
    fetch(url) //, {
      // mode: "cors ",
      //   method: "GET",
      //   headers: {
      //     Accept: "application/json",
      //   },
      // })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("api: ", data);
        return data; // es necesario devolverla por que si no devuelve una promesa pendiente.
      })
      .catch(function (error) {
        console.log(error);
      })
  );
  //forma de usar las promesas.
  // return new Promise((resolve, reject) => {
  //   fetch(`${url}`, {
  //     mode: "cors ",
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

function getDetail(coin) {
  return fetch(`https://api.coincap.io/v2/assets/${coin}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log("asset: ", data);
      return data; // es necesario devolverla por que si no devuelve una promesa pendiente.
    })
    .catch(function (error) {
      console.log(error);
    });
}

function getHistory(coin) {
  const now = new Date();
  const end = now.getTime();
  now.setDate(now.getDate() - 1); // seteamos una nueva fecha a la variable now
  const start = now.getTime();
  // console.log("inicio", start);
  // console.log("fin", end);
  return fetch(
    `https://api.coincap.io/v2/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((response) => response.json())
    .then((response) => response.data)
    .catch(function (error) {
      console.log(error);
    });
}

export default {
  getAssets,
  getDetail,
  getHistory,
};
