import UserProps from "./UserProps";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";

export default class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(
    "http://localhost:3000/users"
  );
  constructor(private data: UserProps) {}
  get(propName: string): string | number {
    return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }
}
