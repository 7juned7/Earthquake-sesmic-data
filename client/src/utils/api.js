import axios from "axios";

export async function getEarthquakes() {
  const url =
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  const response = await axios.get(url);
  return response.data.features;
}
