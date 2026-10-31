import { Link, useParams } from "react-router"
import { initialTickets } from "../data/ticket"

export function TicketDetailsPage(){

    const {id} = useParams()

    const ticket = initialTickets.find(
        (ticket) => ticket.id === Number(id)
    )

    if(!ticket) {
        return(
            <div className="rounded-lg bg-white p-6 shadow">
                <h1 className="text-2xl font-bold">
                    Chamado não encontrado
                </h1>

                <Link to="/chamados" className="mt-4 inline-block 
                    text-blue-600 hover:underline">
                    Voltar para chamados
                </Link>
            </div>
        )
    }

    return(

        <div>

            <Link to="/chamados" className="text-blue-600 hover:underline">
                Voltar para chamados
            </Link>

            <div className="mt-6 rounded-lg bg-white p-6 shadow">

                <h1 className="text-3xl font-bold text-slate-900">
                    {ticket.title}
                </h1>

                <p className="mt-4 text-slate-600">
                    {ticket.description}
                </p>

                <div className="mt-6 flex gap-2">
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                        {ticket.status}
                    </span>
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-sm">
                       Prioridade: {ticket.priority}
                    </span>
                </div>

            </div>

        </div>

    )

}