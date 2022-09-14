import { RouterModule, Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  { path: 'organization-registration', loadChildren: () => import('../../partial/master/organization-registration/organization-registration.module').then(m => m.OrganizationRegistrationModule), data: { title: 'Organization Registration' } },
  { path: 'company-registration', loadChildren: () => import('../../partial/master/company-registration/company-registration.module').then(m => m.CompanyRegistrationModule), data: { title: 'Company Registration' } },
  { path: 'department-registration', loadChildren: () => import('../../partial/master/department-registration/department-registration.module').then(m => m.DepartmentRegistrationModule), data: { title: 'Department Registration' } },
  { path: 'designation-registration', loadChildren: () => import('../../partial/master/designation-registration/designation-registration.module').then(m => m.DesignationRegistrationModule), data: { title: 'Designation Registration' } },
  { path: 'holiday-master', loadChildren: () => import('../../partial/master/holiday-master/holiday-master.module').then(m => m.HolidayMasterModule), data: { title: 'Holiday Master' } },
  { path: 'leave-type-registration', loadChildren: () => import('../../partial/master/leave-type-registration/leave-type-registration.module').then(m => m.LeaveTypeRegistrationModule), data: { title: 'Leave Type Registration' } },
  { path: 'salary-type-registration', loadChildren: () => import('../../partial/master/salary-type-registration/salary-type-registration.module').then(m => m.SalaryTypeRegistrationModule), data: { title: 'Salary Type Registration' } },
  { path: 'bank-registration', loadChildren: () => import('../../partial/master/bank-registration/bank-registration.module').then(m => m.BankRegistrationModule), data: { title: 'Bank Registration' } },
  { path: 'bank-branch-registration', loadChildren: () => import('../../partial/master/bank-branch-registration/bank-branch-registration.module').then(m => m.BankBranchRegistrationModule), data: { title: 'Bank Branch Registration' } },
  { path: 'company-bank-registration', loadChildren: () => import('../../partial/master/company-bank-registration/company-bank-registration.module').then(m => m.CompanyBankRegistrationModule), data: { title: 'Company Bank Account Registration' } },
  { path: 'document-type-registration', loadChildren: () => import('../../partial/master/document-type-registration/document-type-registration.module').then(m => m.DocumentTypeRegistrationModule), data: { title: 'Document Type Registration' } },
  
];
