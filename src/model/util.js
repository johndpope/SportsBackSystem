export const createError = (code, msg) => {
  // const err = new Error(msg)
  let err = {}
  err.msg = msg
  err.code = code
  return err
}
