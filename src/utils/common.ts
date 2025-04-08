const append = (params: Record<string, string | number | boolean>) => {
  let objParams = {}
  for (const key of Object.keys(params)) {
    const element = params[key]
    if (
      (!element && typeof element !== 'number') ||
      (typeof element === 'number' && element < 0)
    ) {
      continue
    }
    if (typeof element === 'boolean' && !element) {
      continue
    }
    if (typeof element === 'string' && element.trim() === 'all') {
      continue
    }
    objParams = { ...objParams, [key]: element }
  }
  return objParams
}

export const createQueryParams = (
  params: Record<string, string | number | boolean>
) => {
  const appendParams = append(params)
  const urlParams = new URLSearchParams(
    Object.entries(appendParams) as string[][]
  ).toString()
  return `${urlParams ? '?' + urlParams : ''}`
}

export const downloadExcelFile = (data: any, fileName: string) => {
  // Create a Blob object with the data and the correct MIME type
  const blob = new Blob([data], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  // Create a URL for the Blob object
  const url = window.URL.createObjectURL(blob)

  // Create an anchor element
  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  window.URL.revokeObjectURL(url)
  document.body.removeChild(a)
}

export const downloadImageFromLink = async (link: string, fileName: string) => {
  try {
    const response = await fetch(link)
    const blob = await response.blob()
    const imageUrl = window.URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = imageUrl
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(imageUrl)
    document.body.removeChild(a)
  } catch (error) {
    console.error('Error downloading the image:', error)
  }
}

export const sliceArray = (arr: any[], size: number): any[][] => {
  const result = []
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size))
  }
  return result
}

export const updateSpanBackgrounds = (htmlContent: string) => {
  if (!htmlContent) {
    return htmlContent
  }
  const themeBackgroundColor = '#F2F1ED'
  // Regex to match span tags with white background
  const spanRegex =
    /<span([^>]*style=["'][^"']*background-color:\s*(#ffffff|white|rgb\(255,\s*255,\s*255\))[^"']*["'][^>]*)>/gi
  let hasChanges = false

  const updatedContent = htmlContent.replace(spanRegex, (match) => {
    hasChanges = true
    // Replace the white background with theme background
    return match.replace(
      /background-color:\s*(#ffffff|white|rgb\(255,\s*255,\s*255\))/i,
      `background-color: ${themeBackgroundColor}`
    )
  })

  return hasChanges ? updatedContent : htmlContent
}
