import UserProps from "./UserProps";
import axios, { AxiosResponse } from "axios";
export default class User {
  constructor(private data: UserProps) {}
  get(propName: string): string | number {
    return this.data[propName];
  }
  set(update: UserProps): void {
    Object.assign(this.data, update);
  }

  async fetch(): Promise<void> {
    try {
      let result = await axios
        .get(`http://localhost:3000/users/${this.get("id")}`)
        .then((response: AxiosResponse): void => {
          this.set(response.data);
          console.log(response.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async save(): Promise<void> {
    const id = this.get("id");
    try {
      if (id) {
        let result = await axios.put(
          `http://localhost:3000/users/${id}`,
          this.data
        );
      } else {
        let result = await axios.post(
          "http://localhost:3000/users/",
          this.data
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
}
