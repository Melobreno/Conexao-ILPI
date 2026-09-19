import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'doacoes',
    loadComponent: () =>
      import('./pages/donations/donations.component').then(
        (m) => m.DonationsComponent
      ),
  },
  {
    path: 'voluntariado',
    loadComponent: () =>
      import('./pages/volunteer/volunteer-form.component').then(
        (m) => m.VolunteerFormComponent
      ),
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
