export interface IPlace {
  id: number;
  name: string;
  regionId: number;
  regionName: string;
  locationAddress: string;
  lat: number;
  lng: number;
  startDate: string;
  endDate: string;
  type: number;
  amount: number;
  enableStickerList: ISticker[];
  distinctStickerList: ISticker[];
  qrImage:string,
  posterImage: string;
  code: string,
}

export interface ISticker {
  stickerId: number;
  tokenId: number;
  tokenName: string;
  tokenURL: string;
}

export interface ICoordinate {
  err?: number;
  time?: string;
  latitude?: number;
  longitude?: number;
  location?: string;
}
