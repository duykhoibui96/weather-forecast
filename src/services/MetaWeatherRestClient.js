import { METAWEATHER_URL } from "../constants";
import RestClient from "../utils/RestClient";

const metaWeatherRestClient = new RestClient({
    baseUrl: METAWEATHER_URL
})

export default metaWeatherRestClient