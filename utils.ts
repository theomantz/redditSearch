import axios, { AxiosResponse } from "axios";

export function fetch(url: string, config?: any) {
  return axios.get(url, config);
}

export const config = {
  transformResponse: function transform(response: AxiosResponse) {
    return response.data.data.children;
  },
};
