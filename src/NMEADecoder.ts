import * as fs       from "fs";
import * as readline from "readline";
import { NMEAObjectFactory } from './NMEAObjectFactory';
import { NMEAObject } from './NMEAObject';
import { RawObject } from './RawObject';

export class NMEADecoder {
    stream: fs.ReadStream;
    nmeaObjectFactory: NMEAObjectFactory;
    lineReader: readline.Interface;

    constructor(stream: fs.ReadStream) {
        this.stream = stream;
        this.nmeaObjectFactory = new NMEAObjectFactory();
        this.lineReader = readline.createInterface({
            input: this.stream
          });  
    }

    process(): void {
        this.lineReader.on('line',  (line:string) => {
          console.log(`NMEA Sentence received: ${line}`);
          this.processLine(line)
        });
    }

    processLine(line: string): void {  
        let nmeaObject: NMEAObject = this.nmeaObjectFactory.process(new RawObject(line));

        if ( nmeaObject !== null ) {
            console.log(nmeaObject);
        }
    }   
}