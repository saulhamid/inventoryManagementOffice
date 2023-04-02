import { Purchaseorderdetail } from './purchaseorderdetail';

export class Purchaseorder {
    branchId: string;
  departmentId: string;
  sectionId: string;
  employeeId: string;
  date: Date;
  rptType: string;
    constructor() {
        this.purchaseOrderDetails=[];
     }
    pONo:string;
    pODate:Date;
    supId:string;
    supplierName:string;
    empId:string;
    employeeName:string;
    isApproved:boolean;
    approvedDate:string;
    ApprovedBy:string;
    isQC:boolean;
    qCDT:string;
    qCBy:string;
    invoice:string;
    startDate:string;
    endDate:string; 
    status:string;
    purchaseOrderDetails:Purchaseorderdetail[];
    productName:string;
    productId:string;
}