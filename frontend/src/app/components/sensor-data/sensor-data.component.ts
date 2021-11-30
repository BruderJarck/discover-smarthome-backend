import { Component } from '@angular/core';
import { sensor } from '../../sensor';

@Component({
  selector: 'app-sensor-data',
  templateUrl: './sensor-data.component.html',
  styleUrls: ['./sensor-data.component.scss'],
})
export class SensorDataComponent {
  panelOpenState: boolean = false;
  data: any;
  options: any;
  sensors: sensor[] = [];

  constructor() {
    this.generateData();
    var sensor1: sensor = {
      id: 1,
      name: 'sensor1',
      data: this.data,
      location: 'Kitchen',
    };
    this.generateData();
    var sensor2: sensor = {
      id: 2,
      name: 'sensor2',
      data: this.data,
      location: 'Bathroom',
    };
    this.generateData();
    var sensor3: sensor = {
      id: 3,
      name: 'sensor3',
      data: this.data,
      location: 'Diningroom',
    };
    this.generateData();
    var sensor4: sensor = {
      id: 4,
      name: 'sensor4',
      data: this.data,
      location: 'Workshop',
    };

    this.sensors = [sensor1, sensor2, sensor3, sensor4];
  }

  generateRandomData(lenth: any) {
    let data: any[] = [];
    for (let i = 0; i < lenth; i++) {
      data.push(Math.floor(Math.random() * (50 + 1)));
    }
    return data;
  }

  generateData() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: this.generateRandomData(10),
          backgroundColor: '#FFA726',
          borderColor: '#FFA726',
          borderWidth: 3,
          tension: 0.4,
        },
        {
          label: 'Second Dataset',
          data: this.generateRandomData(10),
          backgroundColor: '#42A5F5',
          borderColor: '#42A5F5',
          borderWidth: 3,
          tension: 0.4,
        },
      ],
    };
  }
}
