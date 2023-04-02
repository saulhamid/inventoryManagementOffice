import { PurchaseReturndetail } from './purchaseReturndetail';

export class PurchaseReturn {
    branchId: string;
  date: Date;
  rptType: string;
    constructor() {
        this.purchaseReturnDetails=[];
     }
     PRId:string;
     PRDT:Date;
     SupId:string;
    supplierName:string;
    EmpId:string;
    employeeName:string;
    isApproved:boolean;
    approvedDate:string;
    ApprovedBy:string;
    invoice:string;
    status:string;
    purchaseReturnDetails:PurchaseReturndetail[];
    productName:string;
    productId:string;
}