import { Component, OnInit } from '@angular/core';
import { GasListResponse } from '../../models/gas-app.interface';
import { GasAppService } from '../../services/gas-app.service';

@Component({
  selector: 'app-list-gas',
  templateUrl: './list-gas.component.html',
  styleUrl: './list-gas.component.css'
})
export class ListGasComponent implements OnInit {

  gasList: GasListResponse[] = [];

  constructor(private gasAppService: GasAppService) { }

  ngOnInit(): void {
    this.gasAppService.getGasList().subscribe(response => {
      const normalizedJson = JSON.stringify(response.ListaEESSPrecio, this.normalizeKeysReplacer);
      this.gasList = JSON.parse(normalizedJson);
    });
  }

  normalizeKeysReplacer(key: string, value: any): any {
    const nuevo: { [key: string]: string } = {
      "C.P.": "codigoPostal",
      "Dirección": "direccion",
      "Horario": "horario",
      "Latitud": "latitud",
      "Localidad": "localidad",
      "Longitud (WGS84)": "longitud",
      "Margen": "margen",
      "Municipio": "municipio",
      "Precio Biodiesel": "precioBiodiesel",
      "Precio Bioetanol": "precioBioetanol",
      "Precio Gas Natural Comprimido": "precioGasNaturalComprimido",
      "Precio Gas Natural Licuado": "precioGasNaturalLicuado",
      "Precio Gases licuados del petróleo": "precioGasesLicuadosPetroleo",
      "Precio Gasoleo A": "precioGasoleoA",
      "Precio Gasoleo B": "precioGasoleoB",
      "Precio Gasoleo Premium": "precioGasoleoPremium",
      "Precio Gasolina 95 E10": "precioGasolina95E10",
      "Precio Gasolina 95 E5": "precioGasolina95E5",
      "Precio Gasolina 95 E5 Premium": "precioGasolina95E5Premium",
      "Precio Gasolina 98 E10": "precioGasolina98E10",
      "Precio Gasolina 98 E5": "precioGasolina98E5",
      "Precio Hidrogeno": "precioHidrogeno",
      "Provincia": "provincia",
      "Remisión": "remision",
      "Rótulo": "rotulo",
      "Tipo Venta": "tipoVenta",
      "% BioEtanol": "porcentajeBioetanol",
      "% Éster metílico": "porcentajeEsterMetilico",
      "IDEESS": "ideess",
      "IDMunicipio": "idMunicipio",
      "IDProvincia": "idProvincia",
      "IDCCAA": "idCcaa"
    };

    return nuevo[key] || key; // Cambia el nombre si está en keyMap, si no, deja el nombre igual
  }



}
