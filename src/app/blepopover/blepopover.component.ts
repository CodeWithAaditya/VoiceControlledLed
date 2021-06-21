import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-blepopover',
  templateUrl: './blepopover.component.html',
  styleUrls: ['./blepopover.component.scss'],
})
export class BlepopoverComponent implements OnInit {

  constructor(private popover: PopoverController) { }

  ngOnInit() { }

  dismissPopover() {
    this.popover.dismiss('dismiss');
  }

  connectDismiss() {
    this.popover.dismiss('connect');
  }

  disconnectDismiss() {
    this.popover.dismiss('disconnect');
  }

}
