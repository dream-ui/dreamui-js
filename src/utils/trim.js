
const trim = (str) => {
  return (str || '').replace(/^[\s\uFEFF]|[\s\uFEFF]$/g, '')
}

export default trim
