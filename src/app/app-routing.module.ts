import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SectionComponent } from "./section/section.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./services/auth.guard";

const routes: Routes = [
  {path: "auth", component: LoginComponent},
  {path: "study/:id", component: SectionComponent, canActivate: [AuthGuard]},
  {path: "**", redirectTo: "auth"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
