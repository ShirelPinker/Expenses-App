export interface ExpenseItem {
  id:number,
  amount: number,
  year: number,
  month: string,//enum
  categoryName: string,
  description: string | null
}
