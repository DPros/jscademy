import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path: "auth", component: LoginComponent},
  {path: "", redirectTo: "/study", pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // {enableTracing: true}
    )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
