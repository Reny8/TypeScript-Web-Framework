import { Model } from "../models/Model";

interface WithId {
  id?: number;
}
export abstract class View<T extends Model<K>, K extends WithId> {
  regions: { [key: string]: Element } = {};
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }
  abstract template(): string;
  regionsMap(): { [key: string]: string } {
    return {};
  }
  eventsMap(): { [key: string]: () => void } {
    return {};
  }
  bindModel(): void {
    this.model.on("change", () => {
      this.render();
    });
  }
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      this.regions[key] = fragment.querySelector(selector) as Element;
    }
  }
  onRender(): void {}
  render(): void {
    this.parent.innerHTML = "";
    // TEMPLATE ELEMENT IS A TYPE OF HTML ELEMENT. THIS IS USED BELOW TO TRANSFORM THE TEMPLATE STRING TO HTML
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.mapRegions(templateElement.content);
    this.onRender();
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
