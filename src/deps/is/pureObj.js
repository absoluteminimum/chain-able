const isObjLoose = require('./objLoose')

// @TODO: !Array.isArray?
// https://github.com/sindresorhus/is-obj/blob/master/index.js
module.exports = x => x !== null && isObjLoose(x)
