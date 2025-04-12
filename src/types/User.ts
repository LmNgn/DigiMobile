export enum Role {
    ADMIN0 = "admin0",
    ADMIN1 = "admin1",
    CUSTOMER = "customer"
}
export type Customers = {
    id: number,
    username: string,
    email: string,
    phone?: string,
    address: string,
    status: boolean,
    password: string,
    role: Role
}
