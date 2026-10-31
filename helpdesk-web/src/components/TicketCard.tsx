import { Link } from "react-router"
import type { TicketStatus, TicketPriority } from "../types/Ticket"

type TicketCardProps = {
    id : number
    title :  string
    description : string
    status: TicketStatus
    priority: TicketPriority
}

export function TicketCard({
    id,
    title,
    description,
    status,
    priority
} : TicketCardProps){

    return (
        <article className="rounded-lg bg-white p-5 shadow">

            <h3 className="text-lg font-semibold text-slate-900">
                {title}
            </h3>

            <p className="mt-2 text-slate-600">
                {description}
            </p>

            <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-slate-200 
                    px-3 py-1 text-sm">
                    {status}
                </span>
                
                <span className="rounded-full bg-slate-200
                    px-3 py-1 text-sm">
                    {priority}
                </span>
            </div>
            <Link to={`/chamado/${id}`}
                className = "mt-4 inline-block text-sm font-medium text-blue-600 hover:underline">
                Ver detalhes
            </Link>
        </article>
    )

}