import { Component } from '@angular/core';
import * as bluetoothSerial from 'cordova-plugin-bluetooth-serial'
import { PopoverController } from '@ionic/angular';
import { BlepopoverComponent } from '../blepopover/blepopover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  bleData: string[] = [];
  letStates = [];
  constructor(public popoverController: PopoverController) { }
  ngOnInit() {
    setInterval(() => {
      this.readData();
    }, 5000);

    setInterval(() => {
      this.sendData("0,2,4,6,8");
    }, 1000);
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: BlepopoverComponent,
      cssClass: 'popover-class',
      event: ev,
      translucent: true,
    });
    popover.onDidDismiss().then((data) => {
      if (data.data == 'connect') {
        this.connect();
      } else if (data.data == 'disconnect') {
        this.disconnect();
      }
      console.log(data)
    });
    return await popover.present();
  }


  connect() {
    bluetoothSerial.connect('00:21:13:00:A3:32');
  }
  disconnect() {
    bluetoothSerial.disconnect();
  }

  readData() {
    bluetoothSerial.isConnected(() =>
      bluetoothSerial.read((data) => {
        console.log(data);
        if (this.bleData.find(d => d != data))
          this.bleData.push(data);
      })
    );
  }

  sendData(data: string) {
    bluetoothSerial.write(data, () => console.log('success'), () => console.log('failure'));
  }
}
