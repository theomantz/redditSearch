import axios from "axios";

export function fetch(url: string, config?: any) {
  return axios.get(url, config);
}
