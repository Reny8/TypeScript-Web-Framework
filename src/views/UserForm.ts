import User from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {
    this.bindModel();
  }
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.update-name": this.onSetNameClick,
    };
  }
  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };
  onSetNameClick = (): void => {
    const input = this.parent.querySelector("input") as HTMLInputElement;

    const name = input.value;
    this.model.set({ name });
  };
  template(): string {
    return `
        <div>
        <h1>User Form</h1>
        <div>User Name: ${this.model.get("name")}</div>
        <div>User Age: ${this.model.get("age")}</div>
        <input id="input-box" value=""/>
        <button class="update-name">Update Name</button>
        <button class="set-age">Set Random Age</button>
        <button class="save">Save</button>
        </div>
        `;
  }
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (let key in eventsMap) {
      const [eventName, selector] = key.split(":");
      //   THIS RETURNS AN ARRAY OF ELEMENTS THAT MATCH THE SELECTOR
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[key]);
      });
    }
  }
  render(): void {
    this.parent.innerHTML = "";
    // TEMPLATE ELEMENT IS A TYPE OF HTML ELEMENT. THIS IS USED BELOW TO TRANSFORM THE TEMPLATE STRING TO HTML
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
