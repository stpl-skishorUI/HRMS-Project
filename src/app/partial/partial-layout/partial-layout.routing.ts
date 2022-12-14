import { RouterModule, Routes } from '@angular/router';

export const PartialLayoutRoutes: Routes = [
  { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule), data: { title: 'Dashboard' } },
  
  // Master menu
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
  

  // Register Menu
  { path: 'employee-registration', loadChildren: () => import('../../partial/register/employee-registration/employee-registration.module').then(m => m.EmployeeRegistrationModule), data: { title: 'Employee Registration' } },
  { path: 'employee-salary-details', loadChildren: () => import('../../partial/register/employee-salary-details/employee-salary-details.module').then(m => m.EmployeeSalaryDetailsModule), data: { title: 'Employee Salary Details' } },
  { path: 'assign-reporting-person', loadChildren: () => import('../../partial/register/assign-reporting-person/assign-reporting-person.module').then(m => m.AssignReportingPersonModule), data: { title: 'Assign Reporting Person' } },
  { path: 'leave-assignment', loadChildren: () => import('../../partial/register/leave-assignment/leave-assignment.module').then(m => m.LeaveAssignmentModule) , data: { title: 'Leave Assignment' }},

  // HR - Admin Menu
  { path: 'absent-compensate', loadChildren: () => import('../../partial/hr-admin/absent-compensate/absent-compensate.module').then(m => m.AbsentCompensateModule), data: { title: 'Absent/Compensate' } },
  { path: 'leave-details', loadChildren: () => import('../../partial/hr-admin/leave-details/leave-details.module').then(m => m.LeaveDetailsModule), data: { title: 'Leave Details' } },
  { path: 'attendance-verification', loadChildren: () => import('../../partial/hr-admin/attendance-verification/attendance-verification.module').then(m => m.AttendanceVerificationModule), data: { title: 'Attendance verification' } },
  { path: 'offer-letter', loadChildren: () => import('../../partial/hr-admin/offer-letter/offer-letter.module').then(m => m.OfferLetterModule), data: { title: 'Offer Letter' } },
  { path: 'exit-form', loadChildren: () => import('../../partial/hr-admin/exit-form/exit-form.module').then(m => m.ExitFormModule), data: { title: 'Exit Form' } },

  // accountant Menu
  { path: 'advance-payment', loadChildren: () => import('../../partial/accountant/advance-payment/advance-payment.module').then(m => m.AdvancePaymentModule), data: { title: 'Advance Payment' } },
  { path: 'salary-deduction', loadChildren: () => import('../../partial/accountant/salary-deduction/salary-deduction.module').then(m => m.SalaryDeductionModule), data: { title: 'Salary Deduction' } },
  { path: 'salary-processing', loadChildren: () => import('../../partial/accountant/salary-processing/salary-processing.module').then(m => m.SalaryProcessingModule), data: { title: 'Salary Processing' } },
  { path: 'salary-transfer', loadChildren: () => import('../../partial/accountant/salary-transfer/salary-transfer.module').then(m => m.SalaryTransferModule), data: { title: 'Salary Transfer' } },
  
  // Report menu
  { path: 'employee-salary-report', loadChildren: () => import('../../partial/reports/employee-salary-report/employee-salary-report.module').then(m => m.EmployeeSalaryReportModule), data: { title: 'Employee Salary Report' } },
  { path: 'salary-slip', loadChildren: () => import('../../partial/reports/salary-slip/salary-slip.module').then(m => m.SalarySlipModule), data: { title: 'Salary Slip' } },
  { path: 'task-details-report', loadChildren: () => import('../../partial/reports/task-details-report/task-details-report.module').then(m => m.TaskDetailsReportModule), data: { title: 'Task Details Report' } },
  { path: 'leave-report', loadChildren: () => import('../../partial/reports/leave-report/leave-report.module').then(m => m.LeaveReportModule), data: { title: 'Leave Report' } },
  { path: 'project-cost', loadChildren: () => import('../../partial/reports/project-cost/project-cost.module').then(m => m.ProjectCostModule), data: { title: 'Project Cost' } },
];
