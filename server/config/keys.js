process.env.NODE_ENV ?
module.exports = require('./prodkeys.js') :
module.exports = require('./devkeys.js')
