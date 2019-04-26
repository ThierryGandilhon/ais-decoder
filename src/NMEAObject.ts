import { RawObject } from "./RawObject";

//
//
//
export class NMEAObject {
    mmsi: number;
    navigationStatus: string;
    rateOfTurn: number;
    speedOverGround: number;
    courseOverGround: number;
    trueHeading: number;
    latitude: number;
    longitude: number;
    timeStampSeconds: number;
    date: number;
    isoDate: string;
}
