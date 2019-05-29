import * as readline from 'readline';
import * as stream   from 'stream';
import * as net      from 'net';

import { RawObject }         from './RawObject';
import { NMEAObject }        from './NMEAObject';
import { NMEAObjectFactory } from './NMEAObjectFactory';
import { ClientHttp2Session } from 'http2';

 export class NMEADecoder {
    private stream: stream.Readable;
    private nmeaObjectFactory: NMEAObjectFactory;
    private lineReader: readline.Interface;
    private server: net.Server;
    private clients: net.Socket[];  


    constructor(stream: stream.Readable) {
        this.stream = stream;
        this.nmeaObjectFactory = new NMEAObjectFactory();
        this.lineReader = readline.createInterface({
            input: this.stream
          });  
    }

    process(): void {
        this.server = net.createServer(socket => { 
            this.clients.push(socket);
        })
        .listen(4774);

        this.lineReader.on('line',  (line:string) => { this.processLine(line); });
        this.lineReader.resume();
    }
    
    private processLine(line: string): void {  
        let nmeaObject: NMEAObject = this.nmeaObjectFactory.decode(new RawObject(line));

        if ( nmeaObject !== null ) {
            let nmeaObjectString: string = JSON.stringify(nmeaObject);

            console.log(nmeaObjectString);
            this.clients.forEach(socket => {
                socket.write(nmeaObjectString);
            });
        }
    }   
}
