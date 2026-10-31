import type { Ticket } from "../types/Ticket"

export const initialTickets: Ticket[] = [

    {
        id: 1,
        title: "Problema no login",
        description: "Usuário não consegue acessar o sistema",
        status: "Aberto",
        priority: "Alta"
    },
    {
        id: 2,
        title: "Atualização de cadastro",
        description: "Cliente solicitou alteração do endereço",
        status: "Em andamento",
        priority: "Media"
    },
    {
        id: 3,
        title: "Troca de senha",
        description: "Senha do usuário foi redefinida",
        status: "Concluido",
        priority: "Baixa"
    },
    {
        id: 4,
        title: "Erro ao gerar relatório",
        description: "O relatório financeiro não está sendo gerado",
        status: "Aberto",
        priority: "Alta"
    },
    {
        id: 5,
        title: "Atualização de informações",
        description: "Solicitação de atualização dos dados cadastrais",
        status: "Em andamento",
        priority: "Baixa"
    }

]