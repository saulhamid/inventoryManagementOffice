import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'shopping-cart-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'SetUP',
    icon: 'layout-outline',
    children: [
      {
        title: 'Company',
        link: '/pages/setup/company',
      },
      {title: 'Branch',link: '/pages/setup/branch',},
      {title: 'Category',link: '/pages/setup/category',},
      {title: 'SubCategory',link: '/pages/setup/subcategory',},
      {title: 'Section',link: '/pages/setup/section',},
      {title: 'Department',link: '/pages/setup/department',},
      {title: 'UOM',link: '/pages/setup/uom',},
      {title: 'Supplier',link: '/pages/setup/supplier',},
      {title: 'Employee',link: '/pages/setup/employee',},
      {title: 'Terms Condition',link: '/pages/setup/termsconditon',},
    ],
  },
  {
    title: 'Product Management',icon: 'layout-outline',
    children: [
      {title: 'Product ',link: '/pages/setup/product',},
      {title: 'Product Supplier ',link: '/pages/setup/supplierproduct',},
    ],
  },
  {
    title: 'Indent',icon: 'layout-outline',
    children: [
      {title: 'Indentlist',link: '/pages/indent/indentlist',},
      {title: 'Indent Approve',link: '/pages/indent/indentapproved',},
      {title: 'Procument Approve',link: '/pages/indent/indentProcurment',},
      {title: 'Process to PO',link: '/pages/indent/indenttopo',},
    ],
  },
  {
    title: 'Purchase',icon: 'layout-outline',
    children: [
      {title: 'Order',link: '/pages/purchase/purchaseorder',},
      {title: 'Arrived',link: '/pages/purchase/purchasearrived',},
      {title: 'QA',link: '/pages/purchase/purchaseqa',},
      {title: 'Purchase',link: '/pages/purchase/purchaselist',},
      {title: 'Return',link: '/pages/purchase/purchasereturnlist',},
    ],
  },
  {
    title: 'Stock',icon: 'layout-outline',
    children: [
      {title: 'Stock List',link: '/pages/stock/stocklist',},
    ],
  },
  {
    title: 'Report',icon: 'layout-outline',
    children: [
      {title: 'Indent Report',link: '/pages/indent/indentreport',},
      {title: 'Purchase Order Report',link: '/pages/purchase/purchaseorderreport',},
      {title: 'Purchase Report',link: '/pages/purchase/purchasereport',},
      {title: 'Stock Report',link: '/pages/stock/stocklist',}
    ],
  },
  {
    title: 'User Management',
    icon: 'layout-outline',
    children: [
      {
        title: 'Role',
        link: '/pages/account/role',
      },
      {
        title: 'User',
        link: '/pages/account/user',
      },
      {
        title: 'User Menu',
        link: '/pages/account/usermenu',
      },
    ],
  },
];