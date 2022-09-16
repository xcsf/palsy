import mapboxgl from "mapbox-gl";
import { createPromise } from "@/utils";
import { HexagonLayer } from "@deck.gl/aggregation-layers";
import * as d3 from "d3";
import { ScatterplotLayer, ArcLayer } from "@deck.gl/layers";
import { MapboxLayer, MapboxOverlay } from "@deck.gl/mapbox";
let { myPromise, myResolve } = createPromise();
export async function init() {
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
    // center: [-122.4, 37.79],
    center: [-1.4157, 52.2324],
    // center: [114.0, 22.6],
    zoom: 6,
    bearing: 0,
    pitch: 41,
    // projection: 'globe'
  });
  map.on("load", () => {
    myResolve();
  });
  await myPromise;
  window.MapBoxApp = map;
  console.log("All necessary resources have been downloaded.");

  const firstLabelLayerId = map
    .getStyle()
    .layers.find((layer) => layer.type === "symbol").id;

  map.addLayer(
    {
      id: "3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",

        // use an 'interpolate' expression to add a smooth transition effect to the
        // buildings as the user zooms in
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    firstLabelLayerId
  );
  //   柱状热力
  let data = null;
  d3.csv(
    "https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/3d-heatmap/heatmap-data.csv"
  ).then((response) => {
    data = response.map((d) => [Number(d.lng), Number(d.lat)]);
    map.addLayer(
      new MapboxLayer({
        id: "hexagon-layer",
        type: HexagonLayer,
        data,
        extruded: true,
        radius: 1000,
        upperPercentile: 100,
        coverage: 0.5,
        elevationRange: [0, 1000],
        elevationScale: 250,
        getPosition: (d) => d,
      }),
      firstLabelLayerId
    );
  });

  //   map.addLayer(
  //     new MapboxLayer({
  //       id: "deckgl-circle",
  //       type: ScatterplotLayer,
  //       data: [{ position: [-122.402, 37.79], color: [255, 0, 0], radius: 1000 }],
  //       getPosition: (d) => d.position,
  //       getFillColor: (d) => d.color,
  //       getRadius: (d) => d.radius,
  //       opacity: 0.3,
  //     }),
  //     firstLabelLayerId
  //   );

  //   map.addLayer(
  //     new MapboxLayer({
  //       id: "deckgl-arc",
  //       type: ArcLayer,
  //       data: [
  //         {
  //           source: [-122.3998664, 37.7883697],
  //           target: [-122.400068, 37.7900503],
  //         },
  //       ],
  //       getSourcePosition: (d) => d.source,
  //       getTargetPosition: (d) => d.target,
  //       getSourceColor: [255, 208, 0],
  //       getTargetColor: [0, 128, 255],
  //       getWidth: 8,
  //     })
  //   );
}
