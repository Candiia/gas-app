export class Gasolinera {
  constructor(
    public id: number,
    public rotulo: string,
    public price95: number,
    public priceGasoleoA: number,
    public postalCode: string,
    public municipio: string,
    public direccion: string,
    public localidad: string,
    public provincia: string,
    public latitude: number,
    public longitude: number,
    public horario: string,
    public remision: string,
    public priceBiodiesel: number,
    public priceGasolina98: number,
    public priceHidrogeno: number,
    public priceGasoleoB: number
  ) { }
}

