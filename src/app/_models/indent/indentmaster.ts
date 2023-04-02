import { IndentDetail } from './indentDetail';
export class Indentmaster {
    indentId:string;
    date:Date;
    employeeId:string;
    departmentId:string;
    sectionId:string;
    branchId:string;
    rptType:string;
    status:string;
    indentDetails:IndentDetail[];
}