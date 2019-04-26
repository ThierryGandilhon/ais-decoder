import { RawObject } from "./RawObject";

//
//
//
export class NMEAObject {
    mmsi: number;
    navigationStatus: string;
    speedOverGround: number;
    courseOverGround: number;
    latitude: number;
    longitude: number;
    date: number;
    isoDate: string;
}
