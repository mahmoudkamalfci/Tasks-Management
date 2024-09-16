export function uuid () {
  return Math.random().toString(16).slice(2)
}

// 👉 IsEmpty
export const isEmpty = value => {
  if (value === null || value === undefined || value === '') { return true }

  return !!(Array.isArray(value) && value.length === 0)
}

// 👉 IsNullOrUndefined
export const isNullOrUndefined = value => {
  return value === null || value === undefined
}

// 👉 IsEmptyArray
export const isEmptyArray = arr => {
  return Array.isArray(arr) && arr.length === 0
}

export const formatDate = dateString => {
  const date = new Date(dateString)

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Months are 0-indexed
  const year = date.getFullYear()

  let hours = date.getHours()
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'pm' : 'am'

  hours = hours % 12 || 12 // Convert 24-hour time to 12-hour time
  const formattedHours = String(hours).padStart(2, '0')

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`
}

/**
 * this function trancate str and return
 * only defined character and then ... if string
 * more than max length
 *
 * @param {string} str
 * @param {number} maxLength
 * @returns
 */
export const truncateString = (str, maxLength) => {
  if (str && str.length > maxLength) {
    return str.slice(0, maxLength) + '...'
  } else {
    return str
  }
}

export const isDateNotPassed = dueDate => {
  const currentDate = new Date()
  const dateToCheck = new Date(dueDate)

  // Return true if the date has not passed
  return dateToCheck >= currentDate
}
