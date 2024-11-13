import toastr from 'toastr'

export const parseErrors = (response) => {
  const errorFields = Object.keys(response)
  errorFields.forEach((fieldName) => {
    toastr.error(`${underscoreToCamel(fieldName)}: ${response[fieldName].toString()}`)
  })
}

export const isObjEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0
}
