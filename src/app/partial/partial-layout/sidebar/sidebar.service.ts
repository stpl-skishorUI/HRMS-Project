import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'general',
      type: 'header'
    },
    {
      title: 'Masters',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Organization Registration',
          url:'organization-registration'
        },
        {
          title: 'Company Registration',
          url:'company-registration'
        },
        {
          title: 'Department Registration',
          url:'department-registration'
        },
        {
          title: 'Designation Registration',
          url:'designation-registration'
        },
        {
          title: 'Holiday Master',
          url:'holiday-master'
        },
        {
          title: 'Leave Type Registration',
          url:'leave-type-registration'
        },
        {
          title: 'Salary Type Registration',
          url:'salary-type-registration'
        },
        {
          title: 'Bank Registration',
          url:'bank-registration'
        },
        {
          title: 'Bank Branch Registration',
          url:'bank-branch-registration'
        },
        {
          title: 'Company Bank Account Registration',
          url:'company-bank-registration'
        },
        {
          title: 'Document Type Registration',
          url:'document-type-registration'
        }
      ]
    },
    {
      title: 'Register',
      icon: 'fa fa-shopping-cart',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Employee Registration',
          url:'employee-registration'
        },
        {
          title: 'Employee Salary Details',
          url:'employee-salary-details'
        },
        {
          title: 'Assign Reporting Person',
          url:'assign-reporting-person'
        },
        {
          title: 'Leave Assignment',
          url:'leave-assignment'
        }
      ]
    },
    {
      title: 'HR/Admin',
      icon: 'fa-solid fa-user',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Absent/Compensate',
          url:'absent-compensate'
        },
        {
          title: 'Leave Details',
          url:'leave-details'
        },
        {
          title: 'Attendance Verification',
          url:'attendance-verification'
        },
        {
          title: 'Offer Letter',
          url:'offer-letter'
        },
        {
          title: 'Exit Form',
          url:'exit-form'
        }
      ]
    },
    {
      title: 'Accountant',
      icon: 'fa-solid fa-file-invoice',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Advance Payment',
          url:'advance-payment'
        },
        {
          title: 'Salary Deduction',
          url:'salary-deduction'
        },
        {
          title: 'Salary Processing',
          url:'salary-processing'
        },
        {
          title: 'Salary Transfer',
          url:'salary-transfer'
        }
      ]
    },
    {
      title: 'Report',
      icon: 'fa-solid fa-file-lines',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Employee Salary Report',
          url:'employee-salary-report'
        },
        {
          title: 'Salary Slip',
          url:'salary-slip'
        },
        {
          title: 'Task Details Report',
          url:'task-details-report'
        },
        {
          title: 'Leave Report',
          url:'leave-report'
        },
        {
          title: 'Project Cost',
          url:'project-cost'
        }
      ]
    },
    {
      title: 'Extra',
      type: 'header'
    },
    {
      title: 'Documentation',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
      badge: {
        text: 'Beta',
        class: 'badge-primary'
      },
    },
    {
      title: 'Calendar',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
    {
      title: 'Examples',
      icon: 'fa fa-folder',
      active: false,
      type: 'simple'
    }
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
