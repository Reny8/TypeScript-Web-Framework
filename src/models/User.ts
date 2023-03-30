import UserProps from "./UserProps";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { AxiosResponse } from "axios";

export default class User {
  public events: Eventing = new Eventing();
  public sync: Sync<UserProps> = new Sync<UserProps>(
    "http://localhost:3000/users"
  );
  public attributes: Attributes<UserProps>;
  constructor(attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs);
  }
  get get() {
    return this.attributes.get;
  }

  set(update: UserProps): void {
    this.attributes.set(update);
    this.on("change", () => {
      console.log("User was changed");
    });
    this.trigger("change");
  }

  get trigger() {
    return this.events.trigger;
  }
  get on() {
    return this.events.on;
  }
  fetch(): void {
    const id = this.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot Fetch Without an ID");
    }
    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  }
  save(): void {
    this.sync
      .save(this.attributes.getAllAttributes())
      .then((response: AxiosResponse): void => {
        this.on("saved", () => {
          console.log(this);
        });
        this.trigger("saved");
      })
      .catch(() => {
        this.trigger("error");
      });
  }
}
