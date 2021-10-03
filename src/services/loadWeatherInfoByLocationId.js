import { DAYS_IN_WEEK } from "../constants"
import MetaWeatherRestClient from "./MetaWeatherRestClient"

export default async (woeid) => {
    const data = await MetaWeatherRestClient.get(`location/${woeid}`)

    return data
}
