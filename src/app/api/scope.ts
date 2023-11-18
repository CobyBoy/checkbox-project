export interface UserScopePreference {
  id: number;
  teamName: string;
  selected: boolean;
  customScopeGroupPreferences:CustomScopeGroupPreferences[]

}

export interface CustomScopeGroupPreferences {
  id: number,
  name: string,
  selected: boolean;
  customScopePreference: CustomScopePreference[];
  children: CustomScopeGroupPreferences[],

}

export interface CustomScopePreference {
  id: number,
  name: string;
  selected: boolean;
}