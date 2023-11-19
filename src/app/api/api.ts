import { UserScopePreference } from "./scope";

export const usercopeGroupPreference: UserScopePreference[] = [
  {
    id: 1,
    teamName: 'Custom Group Scope',
    selected: false,
    customScopeGroupPreferences: [
      {
        id: 3434,
        name: 'Scope Group Pref',
        selected: true,
        customScopePreference: [
          {
            id: 3353,
            name: "West",
            selected: true
          },
          {
            id: 4456,
            name: "East",
            selected: false
          }
        ],
        children: [
          {
            id: 997,
            name: 'Children scope group',
            selected: true,
            customScopePreference: [
              {
                id: 35,
                name: "North",
                selected: true
              },
              {
                id: 6767,
                name: "South",
                selected: false
              }
            ],
            children: [
              {
                id: 456565,
                name: 'Children scope group',
                selected: true,
                customScopePreference: [
                  {
                    id: 3466,
                    name: "North",
                    selected: true
                  },
                  {
                    id: 673467,
                    name: "South",
                    selected: false
                  }
                ],
                children: []
              }
            ]
          },
          {
            id: 456,
            name: 'Children scope group',
            selected: false,
            customScopePreference: [
              {
                id: 89,
                name: "North",
                selected: true
              },
              {
                id: 98986,
                name: "South",
                selected: false
              }
            ],
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    teamName: 'Custom Group Scope2',
    selected: true,
    customScopeGroupPreferences: [
      {
        id: 3434,
        name: 'Scope Group Pref2',
        selected: true,
        customScopePreference: [
          {
            id: 3353,
            name: "West2",
            selected: true
          },
          {
            id: 4456,
            name: "East2",
            selected: false
          }
        ],
        children: [
          {
            id: 997,
            name: 'Children scope group2',
            selected: true,
            customScopePreference: [
              {
                id: 858,
                name: "North",
                selected: true
              },
              {
                id: 500,
                name: "South",
                selected: true
              }
            ],
            children: []
          }
        ]
      }
    ]
  }
];