import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'attendance-marking',
    pathMatch: 'full'
  },
  {
    path: 'attendance-marking',
    loadChildren: () => import('./pages/attendance-marking/attendance-marking.module').then( m => m.AttendanceMarkingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
