import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AuthGuardService } from '../services/auth-guard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [{
      path: 'dashboard',
      children: [
        
        {
          path: 'super-admin-dashboard/:userid', loadChildren: () => import('../pages/dashboard/super-admin-dashboard/super-admin-dashboard.module').then(m => m.SuperAdminDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'superadmin' }
        },
        {
          path: 'corporate-dashboard/:userid', loadChildren: () => import('../pages/dashboard/corporate-dashboard/corporate-dashboard.module').then(m => m.CorporateDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'corporate' }
        },
        {
          path: 'admin-dashboard/:userid', loadChildren: () => import('../pages/dashboard/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'centeradmin' }
        },
        {
          path: 'mc-dashboard/:userid', loadChildren: () => import('../pages/dashboard/mc-dashboard/mc-dashboard.module').then(m => m.McDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'membercoordinator' }
        },
        {
          path: 'member-dashboard/:userid', loadChildren: () => import('../pages/dashboard/member-dashboard/member-dashboard.module').then(m => m.MemberDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'member' }
        },
        {
          path: 'trainer-dashboard/:userid', loadChildren: () => import('../pages/dashboard/trainer-dashboard/trainer-dashboard.module').then(m => m.TrainerDashboardPageModule),
          canActivate: [AuthGuardService], data: { role: 'trainer' }
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
        
      ]
    },
    {
      path: 'settings',
      children: [
        { path: '', loadChildren: () => import('../pages/user/settings/settings.module').then(m => m.SettingsPageModule) },

        // corporates
        {
          path: 'list-corporates', loadChildren: () => import('../pages/setup/corporates/list-corporates/list-corporates.module').then(m => m.ListCorporatesPageModule),
          canActivate: [AuthGuardService], data: { role: 'superadmin' }
        },

        {
          path: 'add-corporates', loadChildren: () => import('../pages/setup/corporates/add-corporates/add-corporates.module').then(m => m.AddCorporatesPageModule),
          canActivate: [AuthGuardService], data: { role: 'superadmin' }
        },

        {
          path: 'edit-corporates', loadChildren: () => import('../pages/setup/corporates/edit-corporates/edit-corporates.module').then(m => m.EditCorporatesPageModule),
          canActivate: [AuthGuardService], data: { role: 'superadmin' }
        },

        // centers
        {
          path: 'list-centers', loadChildren: () => import('../pages/setup/centers/list-centers/list-centers.module').then(m => m.ListCentersPageModule),
          canActivate: [AuthGuardService], data: { role: 'corporate' }
        },

        {
          path: 'add-centers', loadChildren: () => import('../pages/setup/centers/add-centers/add-centers.module').then(m => m.AddCentersPageModule),
          canActivate: [AuthGuardService], data: { role: 'corporate' }
        },

        {
          path: 'edit-centers', loadChildren: () => import('../pages/setup/centers/edit-centers/edit-centers.module').then(m => m.EditCentersPageModule),
          canActivate: [AuthGuardService], data: { role: 'corporate' }
        },

        // members
        { path: 'list-members/:centerid', loadChildren: () => import('../pages/setup/members/list-members/list-members.module').then(m => m.ListMembersPageModule) },
        { path: 'add-members', loadChildren: () => import('../pages/setup/members/add-members/add-members.module').then(m => m.AddMembersPageModule) },
        { path: 'edit-members', loadChildren: () => import('../pages/setup/members/edit-members/edit-members.module').then(m => m.EditMembersPageModule) },

        // trainers
        { path: 'list-trainers/:centerid', loadChildren: () => import('../pages/setup/trainers/list-trainers/list-trainers.module').then(m => m.ListTrainersPageModule) },
        { path: 'add-trainers', loadChildren: () => import('../pages/setup/trainers/add-trainers/add-trainers.module').then(m => m.AddTrainersPageModule) },
        { path: 'edit-trainers', loadChildren: () => import('../pages/setup/trainers/edit-trainers/edit-trainers.module').then(m => m.EditTrainersPageModule) },

        // mc
        { path: 'list-mc/:centerid', loadChildren: () => import('../pages/setup/mc/list-mc/list-mc.module').then(m => m.ListMcPageModule) },
        { path: 'add-mc', loadChildren: () => import('../pages/setup/mc/add-mc/add-mc.module').then(m => m.AddMcPageModule) },
        { path: 'edit-mc', loadChildren: () => import('../pages/setup/mc/edit-mc/edit-mc.module').then(m => m.EditMcPageModule), },

        // ca
        { path: 'list-ca/:centerid', loadChildren: () => import('../pages/setup/ca/list-ca/list-ca.module').then(m => m.ListCaPageModule) },
        { path: 'add-ca', loadChildren: () => import('../pages/setup/ca/add-ca/add-ca.module').then(m => m.AddCaPageModule) },
        { path: 'edit-ca', loadChildren: () => import('../pages/setup/ca/edit-ca/edit-ca.module').then(m => m.EditCaPageModule), },

        // service 
        { path: 'list-service/:centerid', loadChildren: () => import('../pages/setup/service/list-service/list-service.module').then(m => m.ListServicePageModule) },
        { path: 'add-service', loadChildren: () => import('../pages/setup/service/add-service/add-service.module').then(m => m.AddServicePageModule) },
        { path: 'edit-service', loadChildren: () => import('../pages/setup/service/edit-service/edit-service.module').then(m => m.EditServicePageModule) },


        // service category
        { path: 'list-servicecategory/:centerid', loadChildren: () => import('../pages/setup/servicecategory/list-servicecategory/list-servicecategory.module').then(m => m.ListServiceCategoryPageModule) },
        { path: 'add-servicecategory', loadChildren: () => import('../pages/setup/servicecategory/add-servicecategory/add-servicecategory.module').then(m => m.AddServiceCategoryPageModule) },
        { path: 'edit-servicecategory', loadChildren: () => import('../pages/setup/servicecategory/edit-servicecategory/edit-servicecategory.module').then(m => m.EditServiceCategoryPageModule) },

        // sscategory
        { path: 'list-sscategory/:centerid', loadChildren: () => import('../pages/setup/sscategory/list-sscategory/list-sscategory.module').then(m => m.ListSscategoryPageModule) },
        { path: 'add-sscategory', loadChildren: () => import('../pages/setup/sscategory/add-sscategory/add-sscategory.module').then(m => m.AddSscategoryPageModule) },
        { path: 'edit-sscategory', loadChildren: () => import('../pages/setup/sscategory/edit-sscategory/edit-sscategory.module').then(m => m.EditSscategoryPageModule) },

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

