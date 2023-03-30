import axios, { AxiosPromise } from "axios";

export class Sync<T> {
  constructor(public rootUrl: string) {}
  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootUrl}/${id}`);
  }
  save(data: T, id?: number): AxiosPromise {
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}
