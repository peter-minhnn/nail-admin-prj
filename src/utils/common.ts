export const append = (params: Record<string, string | number | boolean>) => {
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
  params: Record<string, string | number | boolean>,
) => {
  const appendParams = append(params)
  const urlParams = new URLSearchParams(
    Object.entries(appendParams) as string[][],
  ).toString()
  return `${urlParams ? '?' + urlParams : ''}`
}