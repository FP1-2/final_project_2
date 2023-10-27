import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from 'date-fns'
import parseISO from 'date-fns/parseISO'

function formatPostDate(dateString) {
    if (!dateString) return
  const now = new Date()
  const postDate = parseISO(dateString)
  const hoursDiff = differenceInHours(now, postDate)
  const minutesDiff = differenceInMinutes(now, postDate)
  const secondsDiff = differenceInSeconds(now, postDate)
  const formatedPostDate = format(postDate, 'dd MMM. yyyy')
    
    switch (true) {
        case minutesDiff > 1440:
            return formatedPostDate
        case minutesDiff > 60:
            return `${hoursDiff} hours ago`
        case minutesDiff >= 1:
            return `${minutesDiff} minutes ago`
        default:
            return `${secondsDiff} seconds ago`
    }
}

export default formatPostDate