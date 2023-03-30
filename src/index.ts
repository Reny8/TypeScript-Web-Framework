import User from "./models/User";

const user = User.buildUser({ id: 2 });
user.fetch();
console.log(user.isAdminUser());
