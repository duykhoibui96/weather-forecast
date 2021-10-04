import { METAWEATHER_STATIC_RESOURCE_URL } from "../config";

class MetaWeatherStaticResourceClient {
  getWeatherStateImagePath(weatherAbbr) {
    return `${METAWEATHER_STATIC_RESOURCE_URL}/img/weather/${weatherAbbr}.svg`;
  }
}

export default new MetaWeatherStaticResourceClient();
