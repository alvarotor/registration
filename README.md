# Registration system for business, hotels, etc

This project is a test MVP in which im playing a bit with nativescript, android and firebase. The iOS platform it has not been created yet.

FUNCTIONALITY: Basically the user fills some registration info of himself plus takes a pic of a personal id document and a selfie that will be send to firebase, where the realtime database updates the data in a website, that is shown to the business or hotel to confirm his identity.

Inside the folder `RegistrationWeb` you can find the code for the website to read the data. You must create a web firebase project and update the keys inside the pages to be able to read the info from your project.

Done with [NativeScript](https://github.com/nativescript/docs), and using the [firebase plugin](https://github.com/EddyVerbruggen/nativescript-plugin-firebase), that you must follow the steps in the plugin docs on how to access the server database with your own project data keys.

To run it install [NativeScript](https://docs.nativescript.org/angular/start/quick-setup), a [emulator](https://docs.nativescript.org/tooling/android-virtual-devices), and run the project with `tns run android`

For problems check, [troubleshooting](https://docs.nativescript.org/start/troubleshooting)
