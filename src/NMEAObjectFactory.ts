//
//  Decode an AIS message:
//  http://catb.org/gpsd/AIVDM.html#_types_1_2_and_3_position_report_class_a      
//
import { RawObject }  from './RawObject';
import { NMEAObject } from './NMEAObject';

export class NMEAObjectFactory {
  
  decode(rawObject: RawObject): NMEAObject {
    if ( ! rawObject.prolog.startsWith("!AIVDM") )
      return null;

    if (    rawObject.countOfFragments == 1 
         && rawObject.fragmentNumber   == 1 ) {
      // Message made of one fragment only
      return this.decodePayload(rawObject);      
    } else if ( rawObject.countOfFragments > 1) {
      // Message made of multiple fragments : store parts and rebuild full message
      //TODO 
      return null;
    } else {
      throw new Error(`NMEA unexpected count of fragments ${rawObject.countOfFragments}`);
    }
  }

  private decodePayload(rawObject: RawObject): NMEAObject {
      var target:NMEAObject = new NMEAObject();

      var bitField = Array.from(rawObject.dataPayload)
                          .map((c: string):string => { 
                              var d:number = c.charCodeAt(0); 
                              return (( (d -= 48) > 40 ) ? d -= 8 : d).toString(2).padStart(6, '0'); 
                          })
                          .join('');

      target.mmsi = parseInt(bitField.substring(8, 38), 2);
      //navstatus, 38-41
      target.navigationStatus = this.navigationStatus[parseInt(bitField.substring(38, 42), 2)];
      //Speed over ground, 50-59
      target.speedOverGround = (parseInt(bitField.substring(50, 60), 2)) / 10;
      //Longitude, 61-88
      target.longitude = this.uintToInt((parseInt(bitField.substring(61, 89), 2)),28) / 600000.0;
      //Latitude, 89-115
      target.latitude = this.uintToInt((parseInt(bitField.substring(89, 116), 2)),27) / 600000.0;
      //Course over Ground, 116-127
      target.courseOverGround = (parseInt(bitField.substring(116, 128), 2)) / 10;
  
      target.date = Date.now();
      target.isoDate = new Date(target.date).toISOString();
    
      return target;
  }

  private uintToInt(uint:number, nbit:number):number {
    nbit = +nbit || 32;
    if (nbit > 32) throw new RangeError('Only ints up to 32 bits');
    uint <<= 32 - nbit;
    uint >>= 32 - nbit;
    return uint;
  }

  private navigationStatus:Array<string> = [
    'Under way using engine',
    'At anchor',
    'Not under command',
    'Restricted manoeuverability',
    'Constrained by her draught',
    'Moored',
    'Aground',
    'Engaged in Fishing',
    'Under way sailing',
    'Reserved for future amendment of Navigational Status for HSC',
    'Reserved for future amendment of Navigational Status for WIG',
    'Reserved for future use',
    'Reserved for future use',
    'Reserved for future use',
    'AIS-SART is active',
    'Not defined (default)'
];

}
