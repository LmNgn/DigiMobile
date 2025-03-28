export enum Role {
    ADMIN0 = "admin0",
    ADMIN1 = "admin1",
}
export type Admin = {
    id: number,
    email: string,
    role: Role,
    status: boolean,
    password: string
}
