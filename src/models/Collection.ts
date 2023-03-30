import axios, { AxiosResponse } from "axios";
import { Eventing } from "./Eventing";

export class Collection<T, K> {
  models: T[] = [];
  events: Eventing = new Eventing();
  constructor(public url: string, public deserialize: (json: K) => T) {}
  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.url).then((response: AxiosResponse) => {
      response.data.map((item: K) => {
        this.models.push(this.deserialize(item));
      });
      this.trigger("change");
    });
  }
}
