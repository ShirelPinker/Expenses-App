import {FinancialActivitiesTypes} from "./FinancialActivitiesTypesEnum";

export interface NewMonthFinancialActivities {
  year: number,
  month: string,
  amount: number,
  type: FinancialActivitiesTypes,
}
