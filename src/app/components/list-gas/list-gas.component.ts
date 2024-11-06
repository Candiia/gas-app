import { Component, Input, OnInit } from '@angular/core';
import { GasAppService } from '../../services/gas-app.service';
import { Gasolinera } from '../../models/gas-app.dto';
import { filter } from 'rxjs';

@Component({
  selector: 'app-list-gas',
  templateUrl: './list-gas.component.html',
  styleUrl: './list-gas.component.css'
})
export class ListGasComponent implements OnInit {

  provincias: string[] = [
    "Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona",
    "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba",
    "Cuenca", "Gerona", "Granada", "Guadalajara", "Gipuzkoa", "Huelva", "Huesca", "Jaén",
    "La Coruña", "La Rioja", "Las Palmas", "León", "Lleida", "Lugo", "Madrid", "Málaga",
    "Murcia", "Navarra", "Ourense", "Palencia", "Pontevedra", "Salamanca", "Segovia",
    "Sevilla", "Soria", "Tarragona", "Santa Cruz de Tenerife", "Teruel", "Toledo", "Valencia",
    "Valladolid", "Vizcaya", "Zamora", "Zaragoza"
  ];
  listadoGasolineras: Gasolinera[] = [];
  listadoGasolinerasOriginal: Gasolinera[] = [];
  @Input() precioMinimo = 0;
  @Input() precioMax = 0;

  constructor(private gasService: GasAppService) { }

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras).slice(0, 40);
        this.listadoGasolinerasOriginal = [...this.listadoGasolineras];
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Precio Gasolina 95 E5'].replace(',', '.'),
        gasolineraChusquera['Precio Gasoleo A'].replace(',', '.'),
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Municipio'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Localidad'],
        gasolineraChusquera['Provincia'],
        gasolineraChusquera['Latitud'],
        gasolineraChusquera['Longitud'],
        gasolineraChusquera['Horario'],
        gasolineraChusquera['Remisión'],
        gasolineraChusquera['Precio Biodiesel'].replace(',', '.'),
        gasolineraChusquera['Precio Gasolina 98 E5'].replace(',', '.'),
        gasolineraChusquera['Precio Hidrogeno'].replace(',', '.'),
        gasolineraChusquera['Precio Gasoleo B'].replace(',', '.')
      );
      newArray.push(gasolinera);
    });
    return newArray;
  }

  aplicarFiltroPrecio() {
    const min = this.precioMinimo || 0;
    const max = this.precioMax || Number.MAX_VALUE;

    // Filtra a partir de la lista original y asigna el resultado a listadoGasolineras
    this.listadoGasolineras = this.listadoGasolinerasOriginal.filter((gasolinera) => {
      const preciosCombustibles = [
        parseFloat(gasolinera.price95) || 0,
        parseFloat(gasolinera.priceGasoleoA) || 0,
        parseFloat(gasolinera.priceGasoleoB) || 0,
        parseFloat(gasolinera.priceGasolina98) || 0,
        parseFloat(gasolinera.priceHidrogeno) || 0,
        parseFloat(gasolinera.priceBiodiesel) || 0,
      ];

      return preciosCombustibles.some((precio) => precio >= min && precio <= max);
    });
  }
}
