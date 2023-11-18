type AllowedWords = 'compliance' | 'rso' | 'rso-retail'

const fn = <T extends { foo: number | string }, U extends { foo: number | string }>(x: T, y: U): T["foo"] => y["foo"]
const val = fn({ foo: 123, some: '' }, { foo: "string" })
console.log(typeof val)

interface UserName {
  username: string;
  email: string;
  age: number
}

  
function validate<UserName>(input: UserName): UserName {
  return input
}

validate("") //Username is generic type, should use T extends UserName to constrain it
