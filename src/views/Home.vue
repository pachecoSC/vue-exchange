<template>
  <div>
    <px-loader v-if="isLoading"></px-loader>
    <px-assets-table v-else :assets="assets" />
  </div>
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";
import PxLoader from "@/components/PxLoader";

import api from "@/api";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
    PxLoader,
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
