<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { createPromise } from "@/utils";
export default {
  components: {},
  mixins: [],
  props: {},
  data() {
    let { myPromise, myResolve } = createPromise();
    return { myPromise, myResolve };
  },
  computed: {},
  watch: {},
  methods: {
    async init() {
      let accessToken =
        "pk.eyJ1IjoieGNzZiIsImEiOiJjbDdiNWRyZWYwMng1M291amJxYnJsbzU3In0.4qyK59y_qbhgh7rb2Jq93A";
      const AIR_PORTS =
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson";
      const map = new mapboxgl.Map({
        container: "map",
        accessToken,
        style:
          //   "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json",
          "mapbox://styles/mapbox/outdoors-v11",
        center: [114.0, 22.6],
        zoom: 11,
        bearing: 0,
        pitch: 0,
        // projection: 'globe'
      });
      map.on("load", () => {
        this.myResolve();
      });
      await this.myPromise;
      window.MapBoxApp = map;
      console.log("All necessary resources have been downloaded.");
    },
  },
  created() {},
  mounted() {
    this.init();
  },
  beforeDestroy() {
    window.MapBoxApp = undefined;
  },
};
</script>

<style scoped lang="scss">
#map {
  width: 100%;
  height: 100%;
}
</style>
