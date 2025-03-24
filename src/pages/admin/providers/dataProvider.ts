import axios from "axios"

export type ProductForm = {
    name: string,
    price: number,
    category: string,
    imageUrl: string,
    inStock: boolean,
}

type getListParams = {
    resource: string
}
type getOneParams = {
    resource: string,
    id?: number | string;
}
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
    }
}

export const { getList, getOne } = dataProvider;