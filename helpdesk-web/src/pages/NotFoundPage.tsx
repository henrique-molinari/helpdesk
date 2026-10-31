import { Link } from "react-router";

export function NotFoundPage(){

    return(
        <div className="py-20 text-center">

            <p className="text-6xl font-bold text-slate-300">
                404
            </p>

            <h1 className="mt-4 text-2xl font-bold text-slate-900">
                Página não encontrada
            </h1>

            <p className="mt-2 text-slate-600">
                O endereço informado não existe
            </p>

            <Link to="/" className="mt-6 inline-block 
                rounded-lg bg-blue-600 px-4 py-2 text-white">
                Voltar para o início
            </Link>

        </div>
    )

}