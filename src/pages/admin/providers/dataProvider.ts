import axios from "axios";

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
export type CategoryForm = {
  name: string
}

type getListParams = {
  resource: string;
};
type getOneParams = {
  resource: string;
  id?: number | string;
};

type createParams = {
  resource: string;
  values: ProductForm;
};

type updateParams = {
  resource: string;
  values: ProductForm;
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
  create: async ({ resource, values }: createParams) => {
    const { data } = await axios.post(`${resource}`, values);
    return data;
  },
  update: async ({ resource, values, id }: updateParams) => {
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
