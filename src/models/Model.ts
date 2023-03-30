import { AxiosPromise, AxiosResponse } from "axios";
import { Callback } from "../types/Callback";
interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAllAttributes(): T;
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: Callback): void;
  trigger(eventName: string): void;
}

interface HasId {
  id?: number;
}
export class Model<T extends HasId> {
  constructor(
    private events: Events,
    private sync: Sync<T>,
    private attributes: ModelAttributes<T>
  ) {}

  get = this.attributes.get;
  trigger = this.events.trigger;
  on = this.events.on;

  set(update: T): void {
    this.attributes.set(update);
    this.on("change", () => {
      console.log(this);
    });
    this.trigger("change");
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
