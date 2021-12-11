<template>
  <div>
    <!-- <px-loader v-if="isLoading"></px-loader> -->
    <ring-loader :loading="isLoading" :color="'#501c94'"></ring-loader>
    <px-assets-table v-if="!isLoading" :assets="assets" />
    <!-- cuando va px-loader se usa v-else -->
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";
// import PxLoader from "@/components/PxLoader";
import RingLoader from "vue-spinner/src/RingLoader.vue";

import api from "@/api";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
    // PxLoader,
    RingLoader,
  },
  data() {
    return {
      isLoading: false,
      assets: [],
    };
  },

  created() {
    this.isLoading = true;
    console.log(this.isLoading);
    api
      .getAssets()
      .then((res) => {
        this.assets = res.data;
        // console.log("esta son los assets", this.assets);
      })
      .finally(() => (this.isLoading = false));
  },
};
</script>
