export class RawObject {
    prolog              : string;
    countOfFragments    : number;
    fragmentNumber      : number;
    sequentialMessageId : number;
    radioChannelCode    : string;
    dataPayload         : string;
    fillBits            : number;
    integrityChecksum   : string;

    constructor(line: string) {
        let parts: Array<string> = line.split(',');
        let subParts: Array<string> = parts[6].split('*');
                     
        this.prolog              = parts[0];
        this.countOfFragments    = parseInt(parts[1], 10);
        this.fragmentNumber      = parseInt(parts[2], 10);
        this.sequentialMessageId = parseInt(parts[3], 10);
        this.radioChannelCode    = parts[4];
        this.dataPayload         = parts[5];
        this.fillBits            = parseInt(subParts[0], 10);
        this.integrityChecksum   = subParts[1];
    }   
}