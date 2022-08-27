<template>
  <div class="map-wrapper">
    <u-map-app></u-map-app>
  </div>
</template>

<script>
import UMapApp from "./mapApp.vue";
export default {
  components: { UMapApp },
  mixins: [],
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeDestroy() {},
};
</script>

<style scoped lang="scss">
.map-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
