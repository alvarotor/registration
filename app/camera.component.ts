import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { getString, setString } from "application-settings";
const cameraModule = require("nativescript-camera");
const fs = require('file-system');
const imageSourceModule = require("tns-core-modules/image-source");
const fileSystemModule = require("tns-core-modules/file-system");
import { EventData, Observable } from "data/observable";
import { Page } from "ui/page";
var view = require("ui/core/view");
import { Image } from "ui/image";

@Component({
  selector: "camera",
  template: `
  <StackLayout>
    <ActionBar title="Selfie" class="action-bar"></ActionBar>
    <ScrollView>
      <StackLayout>
        <Image width="300" height="300" id="selfieImage"></Image>
        <Button text="Take a selfie" (tap)="capture()" class="btn btn-primary"></Button>
        <Button text="Passport" (tap)="passport()" class="btn btn-primary"></Button>
        <Button text="Back" (tap)="back()" class="btn btn-default"></Button>
      </StackLayout>
    </ScrollView>
  </StackLayout>
  `
})
export class CameraComponent implements OnInit {
  pictureDefault = "~/images/apple.jpg";
  image: Image;

  constructor(
    private routerExtensions: RouterExtensions,
    private page: Page
  ) { }

  ngOnInit(): void {
    cameraModule.requestPermissions();
    this.image = <Image>view.getViewById(this.page, "selfieImage");
    const img = getString("selfie");
    if (img)
      this.image.src = img;
    else
      this.image.src = this.pictureDefault;
  }

  capture() {
    var that = this;
    if (!cameraModule.isAvailable())
      alert("There is no camera in this device.");
    else
      cameraModule.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false
      }).then(function (imageAsset) {
        // console.log(imageAsset.android)
        that.image.src = imageAsset.android;
        setString("selfie", imageAsset.android);
      }).catch((err) => {
        console.error("Error taking pic -> " + err.message);
      });
  }

  back() {
    this.routerExtensions.backToPreviousPage();
  }

  passport() {
    this.routerExtensions.navigate(["/passport"]);
  }
}
