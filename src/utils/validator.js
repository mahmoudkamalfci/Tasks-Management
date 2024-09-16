import { isEmptyArray, isNullOrUndefined } from '.'

// 👉 Required Validator
export const requiredValidator = value => {
  if (isNullOrUndefined(value) || isEmptyArray(value) || value === false) { return 'This field is required' }

  return !!String(value).trim().length || 'This field is required'
}
