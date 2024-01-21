import * as utils from './localStorageHelpers'

const localStorageLastLocationKey = 'lottup-lastLocation'

function acceptLocation (lastLocation : any) {
  if (
    lastLocation &&
    lastLocation.pathname &&
    lastLocation.pathname !== '/' &&
    lastLocation.pathname.indexOf('auth') === -1 &&
    lastLocation.pathname !== '/logout'
  ) {
    return true
  }

  return false
}
export function saveLastLocation (lastLocation : any) {
  if (acceptLocation(lastLocation)) {
    utils.setStorage(
      localStorageLastLocationKey,
      JSON.stringify(lastLocation),
      120
    )
  }
}
export function forgotLastLocation () {
  utils.removeStorage(localStorageLastLocationKey)
}
export function getLastLocation () {
  const defaultLocation = { pathname: '/', title: 'Dashboard' }
  const localStorateLocations = utils.getStorage(localStorageLastLocationKey)
  if (!localStorateLocations) {
    return { pathname: '/', title: 'Dashboard' }
  }

  try {
    const result = JSON.parse(localStorateLocations)
    return result
  } catch (error) {
    console.error(error)
    return defaultLocation
  }
}

export function getCurrentUrl (location:any) {
  return location.pathname.split(/[?#]/)[0]
}

export function checkIsActive (location:string, url:string) {
  const current = getCurrentUrl(location)
  if (!current || !url) {
    return false
  }
  if (current === url) {
    return true
  }
  return false
}
export function checkIsActiveSub (location:string, url:string) {
  const current = getCurrentUrl(location)
  if (!current || !url) {
    return false
  }

  if (current.indexOf(url) > -1) {
    return true
  }
  return false
}
export function checkIsActiveAdmin (location:string, url:string) {
  const current = getCurrentUrl(location)

  if (!current || !url) {
    return false
  }
  if (current === url) {
    return true
  }
  return false
}
