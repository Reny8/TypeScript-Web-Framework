import User from "../models/User";
import UserProps from "../models/UserProps";
import { View } from "./View";

export class UserForm extends View<User, UserProps> {
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.update-name": this.onSetNameClick,
      "click:.save-model": this.onSaveClick,
    };
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input") as HTMLInputElement;
    const name = input.value;
    this.model.set({ name });
  };
  onSaveClick = (): void => {
    this.model.save();
  };
  template(): string {
    return `
        <div>
        <h1>User Form</h1>
        <div>User Name: ${this.model.get("name")}</div>
        <div>User Age: ${this.model.get("age")}</div>
        <input id="input-box" value="${this.model.get("name")}"/>
        <button class="update-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save-model">Save</button>
        </div>
        `;
  }
}
