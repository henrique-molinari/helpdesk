export type AuthUser = {
    id: number
    name: string
    email: string
    role: "usuario" | "admin"
}

export type LoginInput = {
    email: string
    password: string
    admin: boolean
}
