



export const isMultiploDe025Custom = (arrayObjIteracion: any, arryayObjGetBykeyValue: any, tag: string) => {
  for (var key in arrayObjIteracion) {
    //no eso multiplo 
    //console.log("key get ", key)
    if (Number(arryayObjGetBykeyValue[`${key}${tag}`]) % 0.25 != 0) {
      //  console.log("no multplo ", arryayObjGetBykeyValue[`${key}${tag}`])
      return false
    }
  }
  return true
}
export const isMultiploDeNumberCustom = (arrayObjIteracion: any, arryayObjGetBykeyValue: any, tag: string, arrayValidation:any) => {
  for (var key in arrayObjIteracion) {
    //no eso multiplo 
    //console.log("key get ", key)
    if (Number(arryayObjGetBykeyValue[`${key}${tag}`]) % Number(arrayValidation[key]) != 0) {
      //  console.log("no multplo ", arryayObjGetBykeyValue[`${key}${tag}`])
      return false
    }
  }
  return true
}