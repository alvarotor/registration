import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { routes } from "./app.routes";
import { MinLengthDirective, IsEmailDirective } from "./input.directive";
import { DropDownModule } from "nativescript-drop-down/angular";

import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu.component";
import { FormComponent } from "./form.component";
import { CameraComponent } from "./camera.component";
import { CameraDocComponent } from "./cameraDoc.component";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FormComponent,
    CameraComponent,
    CameraDocComponent,
    MinLengthDirective,
    IsEmailDirective
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptRouterModule.forRoot(routes),
    NativeScriptFormsModule,
    DropDownModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule { }
