import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { Panel } from "../components/Panel"
import { TicketCard } from "../components/TicketCard"
import type { Ticket, TicketFilter } from "../types/Ticket"
import { ticketService } from "../services/ticketService"

export function TicketPage(){

  const [tickets, setTickets] = useState<Ticket[]>([])

  const [filter, setFilter] = useState<TicketFilter>("Todos")

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState<string | null>(null)

  const filteredTickets = tickets.filter(
    (ticket) => {
      if(filter === "Todos"){
        return true
      }

      return ticket.status === filter
    }
  )

  useEffect(() => {
    async function loadTickets(){

      try{

        setLoading(true)
        setError(null)

        const data = await ticketService.getAll()

        setTickets(data)

      } catch(error) {

        setError("Não foi possível carregar os chamados")

      } finally {
        setLoading(false)
      }

    }

    loadTickets()
  }, [])

  if(loading) {
    return (
      <p className="text-slate-500">
        Carregando chamados...
      </p>
    )
  }

  if(error){
    <div className="rounded-lg bg-red-50 p-4 text-red-700">
      {error}
    </div>
  }

  return (
    <>
      <div className="min-h-screen bg-slate-100">
        
        <Header
          title = "HelpDesk Lite"
          subtitle = "Gerenciamento de chamados"
        />
        
        <main className="mx-auto max-w-6xl p-6">

          <Panel title="Chamados recentes">

          <div className="mb-6 flex flex-wrap gap-2">
            <button
              onClick={() => setFilter("Todos")} 
              className={
                filter === "Todos"
                ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
                : "rounded-lg bg-white px-4 py-2 text-slate-700"
              }>
              Todos
            </button>

            <button
              onClick={() => setFilter("Aberto")} 
              className={
                filter === "Aberto"
                ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
                : "rounded-lg bg-white px-4 py-2 text-slate-700"
              }>
              Abertos
            </button>

            <button
              onClick={() => setFilter("Em andamento")} 
              className={
                filter === "Em andamento"
                ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
                : "rounded-lg bg-white px-4 py-2 text-slate-700"
              }>
              Em andamento
            </button>

            <button
              onClick={() => setFilter("Concluido")} 
              className={
                filter === "Concluido"
                ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
                : "rounded-lg bg-white px-4 py-2 text-slate-700"
              }>
              Concluidos
            </button>

          </div>

          <div className="grid gap-4 md:grid-cols-2">
            
            {filteredTickets.map((ticket)=>(

              <TicketCard
                key = {ticket.id}
                id = {ticket.id}
                title = {ticket.title}
                description = {ticket.description}
                status = {ticket.status}
                priority = {ticket.priority}
              />

            ))}



          </div>

          </Panel>

        </main>

      </div>
    </>
  )


}