export const openFileExplorer = () => {
  const photo = document.getElementById('file')
  photo?.click()
}

export const getImgName = (element: any, target: any, defaultPhoto: any) => {
  const output: any | null = element
  const file: File = target?.files[0]
  if (file !== undefined) {
    output.src = URL.createObjectURL(file)
    output.onload = function () {
      URL.revokeObjectURL(output?.src)
      return file.name
    }
  } else {
    output.src = defaultPhoto
    return null
  }
}

export const getFileProperties = (target: any) => {
  const file: File = target?.files[0]
  if (file === undefined) return null
  return file
}
