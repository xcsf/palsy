<template>
  <div id="map"></div>
</template>

<script>
import * as MapBoxApp from "./mapBoxApp";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async init() {
      MapBoxApp.init();
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
