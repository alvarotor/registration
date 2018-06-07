import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";
import { getString, setString } from "application-settings";
import { Model } from "./model";
import { DatePicker } from "ui/date-picker";
import { EventData } from "data/observable";
// import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  selector: "form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.css"],
})
export class FormComponent {
  model: Model;
  nameHotel: string;
  code: string;
  genders: Array<string>;
  numOfPeople: Array<string>;

  constructor(
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    this.route.queryParams.subscribe(params => {
      this.nameHotel = params.nameHotel;
      this.code = params.code;
    });

    this.genders = [];
    this.genders.push("Male");
    this.genders.push("Female");

    this.numOfPeople = [];
    for (var i = 1; i <= 10; i++) {
      this.numOfPeople.push(i.toString());
    }

    const modelStr: Model = getString("model") === undefined ? {
      "nameHotel": this.nameHotel,
      "code": this.code,
      "email": "",
      "name": "",
      "address1": "",
      "address2": "",
      "dateBirth": "",
      "sex": "",
      "nationality": "",
      "numberOfPeople": "0"
    } : JSON.parse(getString("model"));
    this.model = {
      "nameHotel": this.nameHotel,
      "code": this.code,
      "name": modelStr.name,
      "email": modelStr.email,
      "address1": modelStr.address1,
      "address2": modelStr.address2,
      "dateBirth": modelStr.dateBirth,
      "sex": modelStr.sex,
      "nationality": modelStr.nationality,
      "numberOfPeople": modelStr.numberOfPeople
    };
  }

  save() {
    setString("model", JSON.stringify(this.model));
    this.routerExtensions.navigate(["/camera"]);
  }

  back() {
    this.routerExtensions.navigate(["/menu"]);
  }

  onPickerLoaded(args) {
    let datePicker = <DatePicker>args.object;
    const dateBirth = new Date(Date.parse(this.model.dateBirth));

    datePicker.year = dateBirth.getFullYear();
    datePicker.month = dateBirth.getMonth() + 1;
    datePicker.day = dateBirth.getDate();
    datePicker.minDate = new Date(1980, 0, 1);
    datePicker.maxDate = new Date();
  }
}
