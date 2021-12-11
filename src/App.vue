<template>
  <main>
    <px-header :links="links" />
    <!-- router-view lo que hace es reemplazar el contenido de esta manera solo cambia el contenido -->
    <router-view class="container ox-5 sm:px-20 py-20 flex justify-center" />
  </main>
</template>

<script>
// importar el componente con el @ es un truco por si luego lo cambien de posicion seguira encontrandolo
import PxHeader from "@/components/PxHeader";

// para poder utilzarlo debemos declararlo en "components" y para utilizarlo dentro de "template"
// su nombre cambia de PascalCase --> kebab-case
export default {
  name: "App",
  components: {
    PxHeader,
  },
  data() {
    return {
      links: [
        {
          title: "BTC",
          to: { name: "coin-detail", params: { id: "bitcoin" } },
        },
        {
          title: "ETH",
          to: { name: "coin-detail", params: { id: "ethereum" } },
        },
        {
          title: "BCH",
          to: { name: "coin-detail", params: { id: "bitcoin-cash" } },
        },
        // {
        //   title: "XRP",
        //   to: { name: "coin-detail", params: { id: "ripple" } },
        // },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
