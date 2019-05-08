const dns = require('dns');
dns.resolve4('www.mum.edu', (err, addresses) => {
    if (err) console.log(err);
    console.log(`addresses: ${JSON.stringify(addresses)}`);
});