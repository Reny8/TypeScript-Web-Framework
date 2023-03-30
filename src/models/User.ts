import { Model } from "./Model";
import UserProps from "./UserProps";
import { Attributes } from "./Attributes";
import { Eventing } from "./Eventing";
import { ApiSync } from "./ApiSync";
import { Collection } from "./Collection";

const rootUrl = "http://localhost:3000/users";

export default class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Eventing(),
      new ApiSync<UserProps>(rootUrl),
      new Attributes<UserProps>(attrs)
    );
  }
  static userCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }
  isAdminUser(): boolean {
    return this.get("id") === 1;
  }
  setRandomAge(): void {
    const age = Math.round(Math.random() * 100);
    this.set({ age: age });
  }
}
