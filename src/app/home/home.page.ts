import { Component } from '@angular/core';
import * as bluetoothSerial from 'cordova-plugin-bluetooth-serial'
import { PopoverController } from '@ionic/angular';
import { BlepopoverComponent } from '../blepopover/blepopover.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

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
    this.connect();
    SpeechRecognition.requestPermission()
      .then(
        () => console.log('Granted'),
        () => console.log('Denied')
      )

  }

  startListening() {
    SpeechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => this.interpretCommand(matches[0]),
        (onerror) => console.log('error:', onerror)
      )
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

  interpretCommand(command: string) {
    if (command.includes('blue') && command.includes('off')) {
      this.sendData('0');
    } else if (command.includes('blue') && command.includes('on')) {
      this.sendData('1');
    } else if (command.includes('yellow') && command.includes('off')) {
      this.sendData('2');
    } else if (command.includes('yellow') && command.includes('on')){
      this.sendData('3');
    } else if (command.includes('red') && command.includes('off')){
      this.sendData('4');
    } else if (command.includes('red') && command.includes('on')){
      this.sendData('5');
    } else if (command.includes('green') && command.includes('off')){
      this.sendData('6');
    } else if (command.includes('green') && command.includes('on')){
      this.sendData('7');
    } else if (command.includes('white') && command.includes('off')){
      this.sendData('8');
    } else if (command.includes('white') && command.includes('on')){
      this.sendData('9');
    }
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
