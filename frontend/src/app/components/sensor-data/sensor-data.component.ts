import { Component } from '@angular/core';
import { SensorService } from 'src/app/shared/sensor.service';
import { SensorModel } from '../../sensor';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.scss'],
})
export class SensorDataComponent {
  panelOpenState: boolean = false;
  datamodel: any;
  options: any;
  res: any;
  sensors: SensorModel[] = [];

  constructor(private sensorService: SensorService) {
    
    this.sensorService.getSensors().subscribe(
      (response) => {
        
        for(let value in response){
          var sensor: SensorModel = {
            id: response[value].specs[0],
            name: response[value].specs[3],
            data: this.generateSensorTableDataModel(response[value]),
            location: response[value].specs[2],
            ip_address: response[value].specs[4]
          };
          this.sensors.push(sensor)
        }
      },
      err=> console.log(err),
      )
  }

  generateSensorTableDataModel(res: any) {
    var datamodel = {
      labels: res.dt,
      datasets: [
        {
          label: 'temp',
          data: res.temp,
          backgroundColor: '#FFA726',
          borderColor: '#FFA726',
          yAxisID: "y",
          borderWidth: 3,
          tension: 0.4,
        },
        {
          label: 'hum',
          data: res.hum,
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          yAxisID: "y1",
          borderWidth: 3,
          tension: 0.4,
        },
        {
          label: 'pres',
          data: res.pres,
          borderColor: '#66BB6A',
          backgroundColor: '#66BB6A',
          yAxisID: "y2",
          borderWidth: 3,
          tension: 0.4,
        },
      ],
    };
    return datamodel
  }
}
