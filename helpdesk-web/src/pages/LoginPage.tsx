import { useState, type FormEvent } from "react"
import { Navigate, useLocation, useNavigate } from "react-router"
import { Header } from "../components/Header"
import { authService } from "../services/authService"

export function LoginPage(){

    const navigate = useNavigate()
    const location = useLocation()

    const from = location.state?.from?.pathname ?? "/"

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [admin, setAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if(authService.isAuthenticated()){
        return <Navigate to="/" replace />
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>){

        event.preventDefault()

        if(!email.trim()){
            setError("Informe o e-mail")
            return
        }

        if(!password){
            setError("Informe a senha")
            return
        }

        try{
            setLoading(true)
            setError(null)

            await authService.login({ email: email.trim(), password, admin })

            navigate(from, { replace: true })

        } catch(error) {

            setError(
                error instanceof Error
                ? error.message
                : "Não foi possível entrar"
            )

        } finally {
            setLoading(false)
        }

    }

    return (
        <div className="min-h-screen bg-slate-100">

            <Header
                title="HelpDesk Lite"
                subtitle="Sistema de gerenciamento de chamados"
            />

            <main className="mx-auto max-w-6xl p-6">

                <h1 className="text-3xl font-bold text-slate-900">
                    Entrar
                </h1>

                <p className="mt-2 text-slate-600">
                    Informe suas credenciais para acessar o sistema.
                </p>

                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-md rounded-lg bg-white p-6 shadow"
                    >
                        <div className="mb-5">
                            <label htmlFor="email"
                                className="mb-2 block font-medium text-slate-700"
                            >
                                E-mail
                            </label>
                            <input id="email" type="email" value={email}
                                autoComplete="username"
                                onChange={(event)=>setEmail(event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2
                                outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5">
                            <label htmlFor="password"
                                className="mb-2 block font-medium text-slate-700"
                            >
                                Senha
                            </label>
                            <input id="password" type="password" value={password}
                                autoComplete="current-password"
                                onChange={(event)=>setPassword(event.target.value)}
                                className="w-full rounded-lg border border-slate-300 px-3 py-2
                                outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-5 flex items-center gap-2">
                            <input id="admin" type="checkbox" checked={admin}
                                onChange={(event)=>setAdmin(event.target.checked)}
                                className="h-4 w-4"
                            />
                            <label htmlFor="admin" className="text-slate-700">
                                Entrar como administrador
                            </label>
                        </div>

                        {error && (
                            <div className="mb-5 rounded-lg bg-red-50 p-3 text-red-700">
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading}
                            className="rounded-lg bg-blue-600 px-5 py-2 text-white
                            hover:bg-blue-700 disabled:cursor-not-allowed
                            disabled:opacity-50"
                        >
                            {loading
                                ? "Entrando..."
                                : "Entrar"
                            }
                        </button>

                    </form>
                </div>

            </main>

        </div>
    )

}
