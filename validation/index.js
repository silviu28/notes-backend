const isRecent = val => {
  if (parseInt(val) < 1991) {
    throw new Error('This blog is too old.')
  } else if (parseInt(val) > new Date().getFullYear()) {
    throw new Error('This blog is from the future.')
  }
}

module.exports = { isRecent }