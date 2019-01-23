export const attribution =
  "&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a> &copy; <a href=&quot;https://opentopomap.org&quot;>OpenTopoMap</a> &copy; <a href=&quot;http://stamen.com&quot;>StamenDesign</a> &copy; <a href=&quot;http://tileserver.maptiler.com&quot;>NASA</a>";

export const defaultCoordinate = { lat: 64, lng: 27 };

export const defaultLayer = "Mapnik";

export const defaultType = "t";

export const observeDays = 6;

export const observeHours = 24 * observeDays;

// for clicked icon
export const iconUrl = require("../img/icons8-marker-100.png");

export const layerOptions = [
  { name: "Mapnik", url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" },
  {
    name: "BlackAndWhite",
    url: "http://a.tile.stamen.com/toner/{z}/{x}/{y}.png"
  },
  {
    name: "Light",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
  },
  {
    name: "Dark",
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
  },
  {
    name: "TopoMap",
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
  },
  {
    name: "NASA",
    url: "https://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg"
  }
];
