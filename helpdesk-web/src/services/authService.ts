import type { AuthUser, LoginInput } from "../types/Auth"

const API_URL = import.meta.env.VITE_API_URL

const TOKEN_KEY = "access_token"
const USER_KEY = "auth_user"

export function getToken(){
    return localStorage.getItem(TOKEN_KEY)
}

export function getUser() : AuthUser | null {
    const raw = localStorage.getItem(USER_KEY)

    if(!raw){
        return null
    }

    try{
        return JSON.parse(raw) as AuthUser
    } catch {
        return null
    }
}

export function isAuthenticated(){
    return getToken() !== null
}

export async function login(input: LoginInput) : Promise<AuthUser>{

    const response = await fetch(
        `${API_URL}/auth`,
        {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify(
                input.admin
                ? { email: input.email, password: input.password, admin: true }
                : { email: input.email, password: input.password }
            )
        }
    )

    if(!response.ok){
        throw new Error("E-mail ou senha inválidos")
    }

    const data = await response.json()
    const token: string | undefined = data.access_token

    if(!token){
        throw new Error("Resposta de autenticação inválida")
    }

    const meResponse = await fetch(
        `${API_URL}/me`,
        {
            headers: { "Authorization" : `Bearer ${token}` }
        }
    )

    if(!meResponse.ok){
        throw new Error("Não foi possível carregar o perfil do usuário")
    }

    const me = await meResponse.json()

    const user: AuthUser = {
        id: me.id,
        name: me.name,
        email: me.email,
        role: input.admin ? "admin" : "usuario"
    }

    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))

    return user
}

export function logout(){
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
}

export const authService = {
    getToken,
    getUser,
    isAuthenticated,
    login,
    logout
}
