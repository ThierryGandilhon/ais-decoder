//
//
//
var stream = require('stream');
var net = require('net');
var readline = require('readline');

// create a socket to aishub and connect it....
aisHubServerOptions = {
    host: 'data.aishub.net', 
    port: 4774
}
nmeaLiveSocket  = net.createConnection(aisHubServerOptions);
nmeaLiveStream= new stream.Readable(nmeaLiveSocket);

nmeaLiveSocket.on('data', (data) => { console.log(data)});

lineReader = readline.createInterface({
    input: nmeaLiveStream
});  

lineReader.on('line',  (line) => { console.log(line); });

