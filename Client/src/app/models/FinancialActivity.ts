import {FinancialActivitiesTypes} from "./FinancialActivitiesTypesEnum";

export interface FinancialActivity {
  year: number,
  month: string,
  amount: number,
  type: FinancialActivitiesTypes,
}
