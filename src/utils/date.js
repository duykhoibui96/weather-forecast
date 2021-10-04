import moment from 'moment'
import { DAYS_OF_WEEK } from '../constants'

const FORMAT_DATE_STRING = 'DD/MM'

export function parseDate(dateString) {
    const timeObj = moment(dateString)

    return {
        date: timeObj.format(FORMAT_DATE_STRING),
        dayOfWeek: Object.keys(DAYS_OF_WEEK)[timeObj.day()]
    }
}