import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from '../services/auth-guard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'dashboard',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/super-admin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'superadmin' }
          }
        ]
      },
      {
        path: 'super-admin-dashboard/:userid',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/super-admin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'superadmin' }
          }
        ]
      },
      {
        path: 'corporate-dashboard/:userid',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/corporate-dashboard/corporate-dashboard.module').then(m => m.CorporateDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'corporate' }
          }
        ]
      },
      {
        path: 'admin-dashboard/:userid',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'centeradmin' }
          }
        ]
      },

      {
        path: 'member-dashboard/:userid',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/member-dashboard/member-dashboard.module').then(m => m.MemberDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'member' }
          }
        ]
      },

      {
        path: 'trainer-dashboard/:userid',
        children: [
          {
            path: '', loadChildren: () => import('../pages/dashboard/trainer-dashboard/trainer-dashboard.module').then(m => m.TrainerDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'trainer' }
          }
        ]
      },

      {
        path: 'list-corporates',
        children: [
          {
            path: '', loadChildren: () => import('../pages/setup/corporates/list-corporates/list-corporates.module').then(m => m.ListCorporatesPageModule),
            //    path: '', loadChildren: () => import('../pages/dashboard/trainer-dashboard/trainer-dashboard.module').then(m => m.TrainerDashboardPageModule),
            canActivate: [AuthGuardService], data: { role: 'superadmin' }
          }
        ]
      },
      {
        path: 'add-corporates',
        children: [
          {
            path: '', loadChildren: () => import('../pages/setup/corporates/add-corporates/add-corporates.module').then(m => m.AddCorporatesPageModule),
            canActivate: [AuthGuardService], data: { role: 'superadmin' }
          }
        ]
      },
      {
        path: 'edit-corporates',
        children: [
          {
            path: '', loadChildren: () => import('../pages/setup/corporates/edit-corporates/edit-corporates.module').then(m => m.EditCorporatesPageModule),
            canActivate: [AuthGuardService], data: { role: 'superadmin' }
          }
        ]
      },

      {
        path: 'user',
        children: [
          { path: '', loadChildren: () => import('../pages/user/profile/user-profile.module').then(m => m.UserProfilePageModule) },
          { path: 'friends', loadChildren: () => import('../pages/user/friends/user-friends.module').then(m => m.UserFriendsPageModule) },
        ]
      },
      {
        path: 'notifications',
        children: [
          { path: '', loadChildren: () => import('../pages/notifications/notifications.module').then(m => m.NotificationsPageModule) },
          {
            path: '',
            loadChildren: '../notifications/notifications.module#NotificationsPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          { path: '', loadChildren: () => import('../pages/user/settings/settings.module').then(m => m.SettingsPageModule) },
          {
            path: '',
            loadChildren: '../user/settings/settings.module#SettingsPageModule'
          }
        ]
      },

    ]
  },
  // /app/ redirect
  {
    path: '',
    redirectTo: 'app/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), HttpClientModule],
  exports: [RouterModule],
  providers: []
})
export class TabsPageRoutingModule { }
