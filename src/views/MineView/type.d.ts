
export interface SelectTheApplicationScenarioItemType {
  iconComponent: string,
  iconColor: string,
  title: string,
  subTitle: string,
  description: string,
  tabs: SelectTheApplicationScenarioItemTabType[],
}
export interface SelectTheApplicationScenarioItemTabType {
  title: string
  list:SelectTheApplicationScenarioItemTabItemType[]
}
export interface SelectTheApplicationScenarioItemTabItemType {
  title:string;
  count:number
}
