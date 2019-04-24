import * as net from 'net';
import * as fs  from 'fs';
import  { NMEADecoder}  from "./NMEADecoder";

// create a socket to aishub and connecting it....
//let nmeaLiveStream: net.Socket  = new net.Socket().connect(4774, 'data.aishub.net');

// Create a file reader to simulate AISHUB stream
let nmeaFileStream: fs.ReadStream = fs.createReadStream('./samples/NMEAStream.sample.txt');


let nmeaDecoder: NMEADecoder = new NMEADecoder(nmeaFileStream);
nmeaDecoder.process();
