<template>
  <px-assets-table :assets="assets" />
</template>

<script>
import PxAssetsTable from "@/components/PxAssetsTable";

import api from "@/api";

export default {
  name: "Home",
  components: {
    PxAssetsTable,
  },
  data() {
    return {
      datae: "",
      assets: [],
    };
  },

  created() {
    api.getAssets().then((res) => {
      this.assets = res.data;
      console.log("esta son los assets", this.assets);
    });
  },
};
</script>
