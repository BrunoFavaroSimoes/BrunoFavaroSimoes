/* =========================================================
   mAInframe — CONFIGURAÇÃO DO SITE
   Edite este arquivo para trocar contatos e projetos.
   Não é preciso mexer no HTML.
   ========================================================= */

window.MAINFRAME_CONFIG = {
  instagram: "mainframe.ia",                       // @ sem o arroba
  email: "contato@mainframe.ia",                   // TODO: trocar pelo e-mail real
  linkedinFundador: "https://www.linkedin.com/in/brunofavarosimoes/",
  whatsapp: "",                                    // ex.: "5511999999999" (vazio = esconde o botão)
};

/* ---------------------------------------------------------
   PORTFÓLIO
   category: "agentes" | "automacao" | "dados" | "visao"
   status:   texto livre (ex.: "Em produção", "Piloto", "Case")
   link:     URL do projeto/case (ou "" para sem link)
   placeholder: true = projeto de exemplo (remova quando trocar)
   --------------------------------------------------------- */
window.MAINFRAME_PROJECTS = [
  {
    id: "PRJ-001",
    title: "Atendente IA para e-commerce",
    category: "agentes",
    status: "Em produção",
    description:
      "Agente no WhatsApp que responde dúvidas, consulta pedidos e passa para um humano quando precisa.",
    stack: ["LLM", "RAG", "WhatsApp API", "Python"],
    metric: "-62% tempo de resposta",
    link: "",
    placeholder: true,
  },
  {
    id: "PRJ-002",
    title: "Robô de conciliação financeira",
    category: "automacao",
    status: "Em produção",
    description:
      "Automação que lê extratos e notas, cruza lançamentos e aponta divergências para o time financeiro.",
    stack: ["Python", "OCR", "SQL"],
    metric: "40h/mês economizadas",
    link: "",
    placeholder: true,
  },
  {
    id: "PRJ-003",
    title: "Data lake e painel comercial",
    category: "dados",
    status: "Case",
    description:
      "Pipeline que unifica CRM, ERP e planilhas num só lugar, com painel de vendas atualizado todo dia.",
    stack: ["SQL", "Airflow", "dbt", "Power BI"],
    metric: "5 fontes → 1 painel",
    link: "",
    placeholder: true,
  },
  {
    id: "PRJ-004",
    title: "Busca inteligente em documentos",
    category: "agentes",
    status: "Piloto",
    description:
      "Assistente interno que responde perguntas sobre contratos e manuais, sempre citando a fonte.",
    stack: ["Embeddings", "Vector DB", "LLM"],
    metric: "Respostas em segundos",
    link: "",
    placeholder: true,
  },
  {
    id: "PRJ-005",
    title: "Inspeção visual de produtos",
    category: "visao",
    status: "Piloto",
    description:
      "Modelo de visão computacional que identifica defeitos na linha de produção a partir de fotos.",
    stack: ["Visão computacional", "PyTorch", "Edge"],
    metric: "94% de acerto no piloto",
    link: "",
    placeholder: true,
  },
  {
    id: "PRJ-006",
    title: "Previsão de demanda",
    category: "dados",
    status: "Case",
    description:
      "Modelo que prevê vendas por loja e produto para reduzir ruptura e excesso de estoque.",
    stack: ["Python", "Machine Learning", "SQL"],
    metric: "-18% de ruptura",
    link: "",
    placeholder: true,
  },
];
