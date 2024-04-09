interface Person {
  name: string;
  age: number;
}

// let name = "Aislan"
const listPersons: Person[] = [
  { name: "Aislan", age: 38 },
  { name: "Augusto", age: 2 },
];

listPersons.forEach((person) => console.log(person));
