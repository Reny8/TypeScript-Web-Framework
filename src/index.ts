import User from "./models/User";

const newUser = new User({ name: "Reny", age: 24 });
newUser.on("change", () => {
  console.log("Change Event 1 was triggered");
});
newUser.on("change", () => {
  console.log("Change Event 2 was triggered");
});
newUser.on("click", () => {
  console.log("Click Event 1 was triggered");
});
console.log(newUser);
newUser.trigger("change");
