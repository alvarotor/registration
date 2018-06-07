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
import { Label } from "ui/label";
import { Model } from "./model";
const firebase = require("nativescript-plugin-firebase");

@Component({
  selector: "cameraDoc",
  template: `
  <StackLayout>
    <ActionBar title="Passport" class="action-bar"></ActionBar>
    <ScrollView>
      <StackLayout>
        <Image width="300" height="300" id="passportPic"></Image>
        <Button text="Take your passport pic" (tap)="capture()" class="btn btn-primary"></Button>
        <Button text="Send" (tap)="send()" class="btn btn-primary" id="sendButton" [isEnabled]="!sending"></Button>
        <Button text="Menu" (tap)="menu()" class="btn btn-default"></Button>
        <Button text="Back" (tap)="back()" class="btn btn-default"></Button>
      </StackLayout>
    </ScrollView>
  </StackLayout>
  `
})
export class CameraDocComponent implements OnInit {
  pictureDefault = "~/images/apple.jpg";
  image: Image;
  sendButton: Label;
  sending = false;

  constructor(
    private routerExtensions: RouterExtensions,
    private page: Page
  ) { }

  ngOnInit(): void {
    cameraModule.requestPermissions();
    this.image = <Image>view.getViewById(this.page, "passportPic");
    this.sendButton = <Label>view.getViewById(this.page, "sendButton");
    const img = getString("passport");
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
        setString("passport", imageAsset.android);
      }).catch((err) => {
        console.error("Error taking pic -> " + err.message);
      });
  }

  back() {
    this.routerExtensions.backToPreviousPage();
  }

  menu() {
    this.routerExtensions.navigate(["/menu"]);
  }

  send() {
    var that = this;
    that.sendButton.text = "Sending...";
    that.sending = true;

    const modelStr: Model = JSON.parse(getString("model"));

    // var appPath = fs.knownFolders.currentApp().path; 
    // var logoPath = appPath + "/images/apple.jpg";

    // console.log(getString("passport"));
    // console.log(`${modelStr.code}/selfie.jpg`);
    // console.log(fs.File.fromPath(getString("passport")));
    // console.log(fs.File.fromPath(logoPath));

    firebase.uploadFile({
      // the full path of the file in your Firebase storage (folders will be created)
      remoteFullPath: `${modelStr.code}/selfie.jpg`,
      // option 1: a file-system module File object
      localFile: fs.File.fromPath(getString("selfie")),
      // get notified of file upload progress
      onProgress: function (status) {
        console.log("Uploaded fraction: " + status.fractionCompleted);
        console.log("Percentage complete: " + status.percentageCompleted);
      }
    }).then(
      function (uploadedFile) {
        alert("Selfie its been uploaded. Now we gonna upload the passport...");
        console.log("File selfie uploaded: " + JSON.stringify(uploadedFile));

        firebase.uploadFile({
          // the full path of the file in your Firebase storage (folders will be created)
          remoteFullPath: `${modelStr.code}/passport.jpg`,
          // option 1: a file-system module File object
          localFile: fs.File.fromPath(getString("passport")),
          // get notified of file upload progress
          onProgress: function (status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
          }
        }).then(
          function (uploadedFile) {
            alert("Passport its been uploaded.");
            console.log("File passport uploaded: " + JSON.stringify(uploadedFile));

            firebase.push(
              '/checkins',
              {
                "nameHotel": modelStr.nameHotel,
                "code": modelStr.code,
                "name": modelStr.name,
                "email": modelStr.email,
                "address1": modelStr.address1,
                "address2": modelStr.address2,
                "dateBirth": modelStr.dateBirth,
                "sex": modelStr.sex,
                "nationality": modelStr.nationality,
                "numberOfPeople": modelStr.numberOfPeople
              }).then(
                function (result) {
                  alert("Thanks for checking in.");
                  that.sendButton.text = "Send";
                  that.sending = false;
                  console.log("Saved with key: " + result.key);
                }
              );

          },
          function (error) {
            console.log("File passport upload error: " + error);
            alert("File passport upload error: " + error);
          }
        );

      },
      function (error) {
        console.log("File selfie upload error: " + error);
        alert("File selfie upload error: " + error);
      }
    );
  }
}
