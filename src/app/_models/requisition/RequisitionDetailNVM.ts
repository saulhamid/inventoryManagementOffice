// import { RequisitionDetailsWisePurchaseNVM } from "./requisitionDetailsWisePurchaseNVM";
 import { ProductStockDetails } from "./productStockDetails";

export interface RequisitionDetailsNVM {
    requisitionDetailId: number;
    productId: string;
    rQty: number;
    isProcess: boolean;
    isDone: boolean;
    productCode: string;
    productCpu: number;
    productStockWithOutPur: number;
    productStock: number;
    productName: string;
    categoryID: number;
    categoryName: string;
    subCategoryId: number;
    subCategoryName: string;
    batchDate: string;
    issueQty: number;
    // requistionWisePurchase: RequisitionDetailsWisePurchaseNVM[];
     requisionWiseProduct: ProductStockDetails[];
     //
}