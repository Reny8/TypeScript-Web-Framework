import { Model } from "./Model";
import UserProps from "./UserProps";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
const rootUrl = "http://localhost:3000/users";

export default class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Eventing(),
      new ApiSync<UserProps>(rootUrl),
      new Attributes<UserProps>(attrs)
    );
  }
}
