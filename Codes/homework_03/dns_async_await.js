const util = require('util');
const dns = require('dns');
const resolve4Async = util.promisify(dns.resolve4);

(async () => {
  try {
    const addresses = await resolve4Async('www.mum.edu');
    console.log(addresses);
  } catch (err) {
    console.log(err);
  }
})();

c