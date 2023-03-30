export class UserForm {
  constructor(public parent: HTMLElement) {}
  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
    };
  }
  onButtonClick(): void {
    console.log("Hi There");
  }
  template(): string {
    return `
        <div>
        <h1>User Form</h1>
        <input/>
        <button>Click Me</button>
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
    // TEMPLATE ELEMENT IS A TYPE OF HTML ELEMENT. THIS IS USED BELOW TO TRANSFORM THE TEMPLATE STRING TO HTML
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
