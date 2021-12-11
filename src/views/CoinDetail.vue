<template>
  <div>
    <!-- <px-loader v-if="isLoading"></px-loader>-->
    <scale-loader :loading="isLoading" :color="'#501c94'"></scale-loader>
    <div v-if="!isLoading">
      <div class="flex-col">
        <div class="flex flex-col sm:flex-row justify-around items-center">
          <div class="flex flex-col items-center">
            <img
              class="w-20 h-20 mr-5"
              :src="`https://static.coincap.io/assets/icons/${
                asset.symbol && asset.symbol.toLowerCase()
              }@2x.png`"
              :alt="asset.name"
            />
            <h1 class="text-5xl">
              {{ asset.name }}
              <small class="sm:mr-2 text-gray-500">{{ asset.symbol }}</small>
            </h1>
          </div>

          <div class="my-10 flex flex-col">
            <ul>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Ranking</b>
                <span>{{ asset.rank }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
                <span>{{ this.getDollar(asset.priceUsd) }} </span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
                <span>{{ this.getDollar(min) }} </span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
                <span> {{ this.getDollar(max) }} </span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
                <span> {{ this.getDollar(avg) }}</span>
              </li>
              <li class="flex justify-between">
                <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
                <span>{{ this.getPercent(asset.changePercent24Hr) }}</span>
              </li>
            </ul>
          </div>

          <div class="my-10 sm:mt-0 justify-center text-center">
            <button
              @click="this.toggleConverter"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-5 rounded"
            >
              {{
                isFromUsd ? `USD a ${asset.symbol}` : `${asset.symbol} a USD`
              }}
            </button>

            <div class="flex flex-row my-5">
              <label class="w-full" for="convertValue">
                <input
                  v-model="ConvertValue"
                  id="convertValue"
                  type="number"
                  class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 mx-4 appearance-none leading-normal"
                  :placeholder="`Valor en ${isFromUsd ? 'USD': asset.symbol}`"
                />
              </label>
            </div>
            <span class="text-xl"
              >{{ resultConverter }} -
              {{ isFromUsd ? asset.symbol : "USD" }}</span
            >
          </div>
        </div>
      </div>
      <div>
        <line-chart
          class="my-10"
          :colors="['orange']"
          :min="min"
          :max="max"
          :data="
            history.map((h) => [h.date, parseFloat(h.priceUsd).toFixed(2)])
          "
        ></line-chart>
      </div>
      <h3 class="text-xl my-10">Mejores ofertas de cambio</h3>
      <table class="w-full">
        <tr
          v-for="m in markets"
          :key="`${m.exchangeId} - ${m.priceUsd}`"
          class="border-b columns-4"
        >
          <td>
            <b>{{ m.exchangeId }}</b>
          </td>
          <td>{{ this.getDollar(m.priceUsd) }}</td>
          <td>{{ m.baseSymbol }} / {{ m.quoteSymbol }}</td>
          <td>
            <px-button
              :is-loading="m.isLoading || false"
              v-if="!m.url"
              @custom-click="GetUrlSite(m)"
            >
              <slot>Generar Url</slot>
            </px-button>
            <a
              v-else
              href="m.url"
              class="hover:underline text-green-600"
              target="_blanck"
              >{{ m.url }}</a
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { percentFormatter, dollarFormatter } from "@/formatter";
// import PxLoader from "@/components/PxLoader";
import ScaleLoader from "vue-spinner/src/ScaleLoader.vue";

import PxButton from "@/components/PxButton";

export default {
  name: "CoinDetail",
  components: {
    ScaleLoader,
    // PxLoader,
    PxButton,
  },
  data() {
    return {
      isLoading: false,
      asset: [],
      history: [],
      markets: [],
      isFromUsd: true,
      ConvertValue: null,
    };
  },
  computed: {
    resultConverter() {
      if (!this.ConvertValue) {
        return 0;
      }
      const result = this.isFromUsd
        ? this.ConvertValue / this.asset.priceUsd
        : this.ConvertValue * this.asset.priceUsd;

      return result.toFixed(2);
    },
    min() {
      return Math.min(
        ...this.history.map((x) => parseFloat(x.priceUsd).toFixed(2))
      );
    },
    max() {
      return Math.max(
        ...this.history.map((x) => parseFloat(x.priceUsd).toFixed(2))
      );
    },
    avg() {
      return (
        this.history.reduce((a, b) => a + parseFloat(b.priceUsd), 0) /
        this.history.length
      );
    },
  },
  created() {
    this.getCoin();
  },
  watch: {
    $route() {
      this.ConvertValue = null;
      this.getCoin();
    },
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log("to", to);
  //   console.log("from", from);
  //   next();
  //   this.getCoin(); //ejecuta antes de hacer de hacer refresh
  // },
  methods: {
    toggleConverter() {
      return (this.isFromUsd = !this.isFromUsd);
    },
    GetUrlSite(exchange) {
      exchange.isLoading = true;
      return api
        .getExchanges(exchange.exchangeId)
        .then((res) => {
          exchange.url = res.exchangeUrl;
        })
        .finally(() => {
          exchange.isLoading = false;
        });
    },

    getCoin() {
      this.isLoading = true;
      // console.log(this.isLoading);
      const id = this.$route.params.id;
      console.log(id);
      //Promises.all -- nos permite ejecutar varias promesialas en un ary
      Promise.all([api.getDetail(id), api.getHistory(id), api.getMarkets(id)])
        .then(([asset, history, markets]) => {
          this.asset = asset.data;
          this.history = history;
          this.markets = markets;
        })
        .finally(() => (this.isLoading = false));

      // api.getDetail(id).then((res) => {
      //   // console.log(res);
      //   this.asset = res.data;
      // });
      // api.getHistory(id).then((res) => {
      //   console.log(res);
      //   this.history = res.data;
      // });
    },
    getDollar(value) {
      return dollarFormatter(value);
    },
    getPercent(value) {
      return percentFormatter(value);
    },
  },
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>