
export interface SelectTheApplicationScenarioItemType {
  id: number,
  iconComponent: string,
  iconColor: string,
  title: string,
  subTitle: string,
  description: string,
}
export interface SelectTheApplicationScenarioItemTabType {
  title: string
  list: SelectTheApplicationScenarioItemTabItemType[]
}
export interface SelectTheApplicationScenarioItemTabItemType {
  title: string;
  count: number
}
