import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "menu",
  template: `
  <StackLayout>
    <ActionBar title="My Bookings" class="action-bar">
      <ActionItem>
        <Label text="Refresh" class="refreshSpace" (tap)="getBookings()"></Label>
      </ActionItem>
    </ActionBar>
    <ListView [items]="bookings">
      <ng-template let-item="item">
        <StackLayout>
          <Label [text]="item.nameHotel" (tap)="onItemTap(item)" class="espace"></Label>
        </StackLayout>
      </ng-template>
    </ListView>
    <StackLayout class="hr-light"></StackLayout>
  </StackLayout>
  `,
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  bookings: Bookings[] = [];

  constructor(
    private routerExtensions: RouterExtensions
  ) {
    this.getBookings();
  }

  getBookings() {
    firebase.getValue('/bookings')
      .then(result => {
        this.bookings = [];
        for (let i in result.value) {
          this.bookings.push({
            nameHotel: result.value[i].nameHotel,
            code: result.value[i].code
          });
        }
      }).catch(error => console.error("Error: " + error));
  }

  onItemTap(item) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        'nameHotel': item.nameHotel,
        'code': item.code
      }
    };
    this.routerExtensions.navigate(["/form"], navigationExtras);
  }
}

interface Bookings {
  code: string;
  nameHotel: string;
}
