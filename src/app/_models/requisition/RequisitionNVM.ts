import { ProductStockDetails } from "./productStockDetails";
import { RequisitionDetailsNVM } from "./RequisitionDetailNVM";

export interface RequisitionNVM {
    requisitionId: string;
    rDT: string;
    employeeId: string;
    approvedBy: string;
    branchId: number;
    branchName: string;
    employeeName: string;
    deptName: string;
    requisitionDetailsProduct: RequisitionDetailsNVM[];
    productStockDetails : ProductStockDetails[];

    
}