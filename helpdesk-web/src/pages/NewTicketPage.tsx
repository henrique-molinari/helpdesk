import { useState, type FormEvent } from "react"
import type { TicketPriority } from "../types/Ticket"
import { useNavigate } from "react-router"
import { ticketService } from "../services/ticketService"

export function NewTicketPage(){

    const navigate = useNavigate()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [priority, setPriority] = useState<TicketPriority>("Baixa")
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)

    return (
        <div>

            <h1 className="text-3xl font-bold text-slate-900">
                Novo chamado
            </h1>

            <p className="mt-2 text-slate-600">
                Cadastro de um novo chamado.
            </p>

            <div className="mt-8 rounded-lg bg-white p-6 shadow">
                <form 
                    onSubmit={handleSubmit}
                    className="max-w-2xl rounded-lg bg-white p-6 shadow"
                >
                    <div className="mb-5">
                        <label htmlFor="title"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Titulo
                        </label>
                        <input id="title" type="text" value={title}
                            onChange={(event)=>setTitle(event.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2
                            outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="description"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Descrição
                        </label>
                        <textarea id="description" rows={5} 
                            value={description}
                            onChange={(event)=>setDescription(event.target.value)}
                            className="w-full rounded-lg border border-slate-300
                            px-3 py-2 outline-none focus:border-blue-500"
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="priority"
                            className="mb-2 block font-medium text-slate-700"
                        >
                            Prioridade
                        </label>
                        <select id="priority" value={priority}
                            onChange={(event) => 
                                setPriority(event.target.value as TicketPriority)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={saving}
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white
                        hover:bg-blue-700 disabled:cursor-not-allowed 
                        disabled:opacity-50"
                    >
                        {saving
                            ? "Salvando..."
                            : "Criar chamado"
                        }
                    </button>

                </form>
            </div>

        </div>
    )

    async function handleSubmit(event:FormEvent<HTMLFormElement>){

        event.preventDefault()

        if(!title.trim()){
            setError("Informe o titulo do chamado")
            return
        }

        if(!description.trim()){
            setError("Informe a descricao do chamado")
            return
        }

        try{
            setSaving(true)
            setError(null)

            await ticketService.create(title, description, priority)

            navigate("/chamados")

        } catch {

            setError("Não foi possível criar o chamado")

        } finally {

            setSaving(false)

        }
    }

}

