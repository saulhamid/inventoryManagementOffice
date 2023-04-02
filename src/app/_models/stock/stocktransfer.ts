import { StockTransferDetails } from "./stocktransferdetail";

export class Stocktransfer {
    StockTransferId:number;
    ChallanNo: string;
    branchId: string;
    EmployeeId: string;
    TransferBy: string;
    TransferDate: Date;
    FromBranchId: number;
    ToBranchId: number;
    IsReceive: boolean;
    ReceiveDate: string;
    ReceiveBy: string;
    CreatedBy: string;
    CreatedDate: string;
   FromCompanyId: number;
   ToCompanyId: number;
   FromBranchName: string;
   FromCompanyName: string;
   ToBranchName: string;
   ToCompanyName: string;
   stocktransferdetails:StockTransferDetails[];
  }
  