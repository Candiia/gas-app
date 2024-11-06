import { Component, OnInit } from '@angular/core';
import { GasAppService } from '../../services/gas-app.service';
import { Gasolinera } from '../../models/gas-app.dto';

@Component({
  selector: 'app-list-gas',
  templateUrl: './list-gas.component.html',
  styleUrl: './list-gas.component.css'
})
export class ListGasComponent implements OnInit {

  listadoGasolineras: Gasolinera[] = [];

  constructor(private gasService: GasAppService) { }

  ngOnInit() {
    this.gasService.getGasList().subscribe((respuesta) => {
      // Transformo la respuesta del API en String (JSON)
      const respuestaEnString = JSON.stringify(respuesta);
      let parsedData;
      try {
        // Transformo el String en un objeto JSON
        parsedData = JSON.parse(respuestaEnString);
        let arrayGasolineras = parsedData['ListaEESSPrecio'];
        this.listadoGasolineras = this.cleanProperties(arrayGasolineras);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    });
  }

  private cleanProperties(arrayGasolineras: any) {
    let newArray: Gasolinera[] = [];
    arrayGasolineras.forEach((gasolineraChusquera: any) => {
      const gasolineraConNombresGuenos: any = {};

      let gasolinera = new Gasolinera(
        gasolineraChusquera['IDEESS'],
        gasolineraChusquera['Rótulo'],
        gasolineraChusquera['Precio Gasolina 95 E5'],
        gasolineraChusquera['Precio Gasoleo A'],
        gasolineraChusquera['C.P.'],
        gasolineraChusquera['Municipio'],
        gasolineraChusquera['Dirección'],
        gasolineraChusquera['Localidad'],
        gasolineraChusquera['Provincia'],
        gasolineraChusquera['Latitud'],
        gasolineraChusquera['Longitud'],
        gasolineraChusquera['Horario'],
        gasolineraChusquera['Remisión'],
        gasolineraChusquera['Precio Biodiesel'],
        gasolineraChusquera['Precio Gasolina 98 E5'],
        gasolineraChusquera['Precio Hidrogeno'],
        gasolineraChusquera['Precio Gasoleo B']
      );

      newArray.push(gasolinera);
    });
    return newArray;
  }


}
