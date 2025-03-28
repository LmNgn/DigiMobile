
export type Product = {
    id: number,
    name: string,
    price: number,
    imageUrl: string,
    category: string,
    inStock: boolean,
    screen: {
        size: number,
        resolution: string,
        rate: number
    },
    ram: number,
    memory: number,
    OS: string,
    battery: number
}
