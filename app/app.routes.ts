import { CameraComponent } from "./camera.component";
import { MenuComponent } from "./menu.component";
import { FormComponent } from "./form.component";
import { CameraDocComponent } from "~/cameraDoc.component";

export const routes = [
  { path: "", redirectTo: "/menu", pathMatch: "full" },
  { path: "menu", component: MenuComponent },
  { path: "form", component: FormComponent },
  { path: "camera", component: CameraComponent },
  { path: "passport", component: CameraDocComponent }
];