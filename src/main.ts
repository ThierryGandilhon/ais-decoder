import * as fs     from 'fs';
import * as stream from 'stream';
import * as net    from 'net';

import { NMEADecoder }       from './NMEADecoder';

try {
    // create a socket to aishub and connect it....
    let aisHubServerOptions = {
        host: 'data.aishub.net', 
        port: 4774
    }
    let nmeaLiveSocket: net.Socket  = net.createConnection(aisHubServerOptions);
    let nmeaLiveStream: stream.Readable = new stream.Readable(nmeaLiveSocket);

    // Create a file reader to simulate AISHUB stream from a recorded file
    let nmeaFileStream: stream.Readable = fs.createReadStream('./samples/NMEAStream.sample.txt');

    let nmeaDecoder: NMEADecoder = new NMEADecoder(nmeaLiveStream);
    nmeaDecoder.process();
} catch(e) {
    console.log(e)
}
