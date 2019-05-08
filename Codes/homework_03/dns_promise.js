const util = require('util');
const dns = require('dns');
const resolve4Async = util.promisify(dns.resolve4);

resolve4Async('www.mum.edu')
    .then((addresses) => console.log(`addresses: ${JSON.stringify(addresses)}`))
    .catch((err) => console.log(err));