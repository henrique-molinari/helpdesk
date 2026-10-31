import type { CreateTicketInput, Ticket, TicketPriority } from "../types/Ticket";

const API_URL = import.meta.env.VITE_API_URL

function getToken(){
    return localStorage.getItem("access_token")
}

function getHeaders(){
    const token = getToken()

    return {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
    }
}

export async function getAll() : Promise<Ticket[]>{

    const response = await fetch(
            `${API_URL}/tickets`,
            {
                headers: getHeaders()
            }
        )

    if(!response.ok){
            throw new Error(
                `Erro ao buscar chamados: ${response.status}`
            )
        }

    const data: Ticket[] = await response.json()

    return data

}

export async function create(
    title:string, description: string, 
    priority: TicketPriority
) : Promise<Ticket>{
    
    const input: CreateTicketInput = {
        title,
        description,
        status: "Aberto",
        priority
    }

    const response = await fetch(
        `${API_URL}/tickets`,
        {
            method: "POST",
            headers: getHeaders(),
            body: JSON.stringify(input)
        }
    )

    if(!response.ok){
        throw new Error(
            `Erro ao criar chamado: ${response.status}`
        )
    }

    const data: Ticket = await response.json()

    return data

}

export const ticketService = {
    getAll,
    create
}