export interface ProductStockDetails {
    batchId: number;
    batchNo: string;
    productId: string;
    productCode: string;
    batchDate: string | null;
    productStockOpening: number;
    deliveryQty: number;
    deliveryDate: string | null;
    purchaseId: string;
    isDone: boolean;
    isProcess: boolean;
    branchId: number;
    cPU: number;
    createdDate: string | null;
    updatedDate: string | null;
    psdTotal:number;
}