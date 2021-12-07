<template>
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

      <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
        <button
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Cambiar
        </button>

        <div class="flex flex-row my-5">
          <label class="w-full" for="convertValue">
            <input
              id="convertValue"
              type="number"
              class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
            />
          </label>
        </div>

        <span class="text-xl"></span>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import { percentFormatter, dollarFormatter } from "@/formatter";

export default {
  name: "CoinDetail",
  data() {
    return {
      asset: [],
      history: [],
    };
  },
  computed: {
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
  methods: {
    getCoin() {
      const id = this.$route.params.id;
      //Promises.all -- nos permite ejecutar varias promesialas en un ary
      Promise.all([api.getDetail(id), api.getHistory(id)]).then(
        ([asset, history]) => {
          this.asset = asset.data;
          this.history = history;
        }
      );

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
