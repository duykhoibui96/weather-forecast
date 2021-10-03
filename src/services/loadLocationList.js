import MetaWeatherRestClient from "./MetaWeatherRestClient"

export default async (query = '') => {
    const data = await MetaWeatherRestClient.get('location/search', {
        queryOpts: {query}
    })

    return data
}
