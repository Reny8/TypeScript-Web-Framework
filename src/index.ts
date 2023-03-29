import User from "./models/User";

const user = new User({ id: 1 });
user.set({ name: "Changed Name", age: 20 });
user.save();
const newUser = new User({ name: "New User", age: 0 });
newUser.save();
