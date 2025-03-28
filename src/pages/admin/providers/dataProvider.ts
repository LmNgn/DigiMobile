import axios from "axios";
import { Role } from "../../../types/Admin";

export type ProductForm = {
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  inStock: boolean;
  screen: {
    size: number,
    resolution: string,
    rate: number
  },
  ram: number,
  memory: number,
  os: string,
  battery: number

};
export type CustomerForm = {
  status: boolean,
}
export type CategoryForm = {
  name: string
}
export type AdminForm = {
  email: string,
  password?: string,
  status: boolean,
  role: Role
}

type getListParams = {
  resource: string;
};
type getOneParams = {
  resource: string;
  id?: number | string;
};

type createParams<T> = {
  resource: string;
  values: T;
};

type updateParams<T> = {
  resource: string;
  values: T;
  id?: string | number;
};

type deleteParams = {
  resource: string;
  id?: string | number;
};

axios.defaults.baseURL = "http://localhost:3000/";
//mọi request sử dụng axios sẽ mặc định gửi đến http://localhost:3000/

const dataProvider = {
  getList: async ({ resource }: getListParams) => {
    const { data } = await axios.get(resource);
    return data;
  },
  getOne: async ({ resource, id }: getOneParams) => {
    const { data } = await axios.get(`${resource}/${id}`);
    return data;
  },
  create: async <T>({ resource, values }: createParams<T>) => {
    const { data } = await axios.post(`${resource}`, values);
    return data;
  },
  update: async <T>({ resource, values, id }: updateParams<T>) => {
    if (!id) return;
    const { data } = await axios.put(`${resource}/${id}`, values);
    return data;
  },
  deleteOne: async ({ resource, id }: deleteParams) => {
    if (!id) return;
    const { data } = await axios.delete(`${resource}/${id}`);
    return data;
  },
};

export const { getList, getOne, update, create, deleteOne } = dataProvider;
