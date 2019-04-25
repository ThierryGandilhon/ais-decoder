import * as readline from "readline";
import * as stream   from 'stream';

import { NMEAObjectFactory } from './NMEAObjectFactory';
import { NMEAObject }        from './NMEAObject';
import { RawObject }         from './RawObject';

export class NMEADecoder {
    stream: stream.Readable;
    nmeaObjectFactory: NMEAObjectFactory;
    lineReader: readline.Interface;

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
    
    processLine(line: string): void {  
        console.log(`NMEA Sentence received: ${line}`);

        let nmeaObject: NMEAObject = this.nmeaObjectFactory.process(new RawObject(line));

        if ( nmeaObject !== null ) {
            console.log(nmeaObject);
        }
    }   
}