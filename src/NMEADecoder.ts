import * as readline from "readline";
import * as stream   from 'stream';

import { RawObject }         from './RawObject';
import { NMEAObject }        from './NMEAObject';
import { NMEAObjectFactory } from './NMEAObjectFactory';

 export class NMEADecoder {
    private stream: stream.Readable;
    private nmeaObjectFactory: NMEAObjectFactory;
    private lineReader: readline.Interface;

    constructor(stream: stream.Readable) {
        this.stream = stream;
        this.nmeaObjectFactory = new NMEAObjectFactory();
        this.lineReader = readline.createInterface({
            input: this.stream
          });  
    }

    process(): void {
        this.lineReader.on('line',  (line:string) => { this.processLine(line); });
        this.lineReader.resume();
    }
    
    private processLine(line: string): void {  
        // console.log(`NMEA Sentence received: ${line}`);

        let nmeaObject: NMEAObject = this.nmeaObjectFactory.process(new RawObject(line));

        if ( nmeaObject !== null ) {
            console.log(nmeaObject);
        }
    }   
}
