export enum Role {
    ADMIN0 = "admin0",
    ADMIN1 = "admin1",
    USER = "user"
}
export type UserAuth = { 
    id: number,
    username: string,
    email: string,
    phone: string,
    address: string,
    role: Role,
    status: boolean
}
