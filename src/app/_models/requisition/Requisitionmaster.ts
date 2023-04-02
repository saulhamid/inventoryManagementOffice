import { employeeVM } from "../employeeVM";
import { RequisitionDetail } from "./RequisitionDetail";

export class Requisitionmaster {
    requisitionId:string;
    rDT:Date;
    employeeId:string;
    departmentId:string;
    sectionId:string;
    branchId:string;
    rptType:string;
    status:string;
    requisitionDetails:RequisitionDetail[];
    employees: employeeVM[];
    assignOne: string;
    approvedBy: string;
    approvedByTwo:any;
    //remarks:string;
}