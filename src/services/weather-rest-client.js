import { PROXY_URL, METAWEATHER_API_URL } from "../config";
import RestClient from "../utils/rest-client";

class MetaWeatherRestClient extends RestClient {
  constructor() {
    super({
      baseUrl: `${PROXY_URL}/${METAWEATHER_API_URL}`,
    });
  }

  searchLocation(query) {
    return this.get("/location/search", {
      qs: { query },
    });
  }

  searchWeatherInformation(woeid) {
    return this.get(`/location/${woeid}`);
  }
}

export default new MetaWeatherRestClient();
