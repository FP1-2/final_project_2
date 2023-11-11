import {
  format,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds
} from 'date-fns'
import { getTimezoneOffset, toDate } from 'date-fns-tz'

function formatPostDate (dateString) {
  if (!dateString) return
  const now = new Date()
  const postDate = toDate(dateString)
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const offset = getTimezoneOffset(userTimeZone, postDate)
  const offsetInMinutes = offset / (60 * 1000)
  const postDateCorrected = postDate.setMinutes(
    postDate.getMinutes() + offsetInMinutes
  )
  const postDateInUserTimeZone = toDate(postDateCorrected)
  const hoursDiff = differenceInHours(now, postDateInUserTimeZone)
  const minutesDiff = differenceInMinutes(now, postDateInUserTimeZone)
  const secondsDiff = differenceInSeconds(now, postDateInUserTimeZone)
  const formatedPostDate = format(postDateInUserTimeZone, 'dd MMM. yyyy')

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
