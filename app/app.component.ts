import { Component, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "my-app",
  template: `<page-router-outlet></page-router-outlet>`
})
export class AppComponent implements OnInit {
  ngOnInit() {
    firebase.init({
      persist: false,
      storageBucket: 'gs://Registration-dcebd.appspot.com'
    }).then(
      instance => {
        console.log("firebase.init done");
      },
      error => {
        console.log(`firebase.init error: ${error}`);
      }
    );
  }
}