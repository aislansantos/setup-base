import Person from ".";

it("shold sum", () => {
  const person = new Person();
  expect(person.sayMyName()).toBe("Aislan");
});
