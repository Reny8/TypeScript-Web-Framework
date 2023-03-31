import { Model } from "../models/Model";

interface WithId {
  id?: number;
}
export abstract class View<T extends Model<K>, K extends WithId> {
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;
  abstract eventsMap(): { [key: string]: () => void };
  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  render(): void {
    this.parent.innerHTML = "";
    // TEMPLATE ELEMENT IS A TYPE OF HTML ELEMENT. THIS IS USED BELOW TO TRANSFORM THE TEMPLATE STRING TO HTML
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
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
}
