export function removeStorage (key: string) {
  try {
    localStorage.setItem(key, '')
    localStorage.setItem(key + '_expiresIn', '')
  } catch (e) {
    console.log(
      'removeStorage: Error removing key [' +
        key +
        '] from localStorage: ' +
        JSON.stringify(e)
    )
    return false
  }
  return true
}

export function getStorage (key: string) {
  const now = Date.now() // epoch time, lets deal only with integer
  // set expiration for storage
  let expiresIn: any = localStorage.getItem(key + '_expiresIn')
  if (expiresIn === undefined || expiresIn === null) {
    expiresIn = 0
  }

  expiresIn = Math.abs(expiresIn)
  if (expiresIn < now) {
    // Expired
    removeStorage(key)
    return null
  } else {
    try {
      const value = localStorage.getItem(key)
      console.log(value)
      return value
    } catch (e) {
      console.log(
        'getStorage: Error reading key [' +
          key +
          '] from localStorage: ' +
          JSON.stringify(e)
      )
      return null
    }
  }
}
export function setStorage (
  key: string,
  value: string,
  expires: number,
  { corelec, password }: { corelec: string; password: string } = {
    corelec: '',
    password: ''
  }
) {
  if (expires === undefined || expires === null) {
    expires = 24 * 60 * 60 // default: seconds for 1 day
  }

  const now = Date.now() // millisecs since epoch time, lets deal only with integer
  const schedule = now + expires * 1000
  try {
    localStorage.setItem(key, value)
    localStorage.setItem(key + '_expiresIn', schedule.toString())
  } catch (e) {
    console.log(
      'setStorage: Error setting key [' +
        key +
        '] in localStorage: ' +
        JSON.stringify(e)
    )
    return false
  }
  return true
}
