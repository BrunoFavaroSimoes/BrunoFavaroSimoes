/* =========================================================
   mAInframe: CONFIGURAÇÃO DO SITE
   Edite este arquivo para trocar contatos e projetos.
   Não é preciso mexer no HTML.
   ========================================================= */

window.MAINFRAME_CONFIG = {
  instagram: "mainframe.ia",                  // @ sem o arroba
  email: "contato@mainframe.ia",              // TODO: trocar pelo e-mail real
  whatsapp: "",                               // TODO: ex. "5511999999999". Preenchido, o formulário envia pelo WhatsApp
  linkedinFundador: "https://www.linkedin.com/in/brunofavarosimoes/",
};

/* ---------------------------------------------------------
   PORTFÓLIO: cada projeto vira um "job" na impressão.
   category: "agentes" | "automacao" | "dados" | "visao"
   status:   "Em produção" | "Piloto" | "Concluído" (texto livre)
   link:     URL do case ("" = sem link)
   placeholder: true = projeto de exemplo (remova quando trocar)
   --------------------------------------------------------- */
window.MAINFRAME_PROJECTS = [
  {
    title: "Atendente de IA para e-commerce",
    category: "agentes",
    status: "Em produção",
    problem: "O time respondia as mesmas perguntas o dia inteiro no WhatsApp e demorava a atender quem queria comprar.",
    solution: "Agente que responde dúvidas, consulta pedidos e passa a conversa para uma pessoa quando precisa.",
    result: "62% menos tempo de resposta",
    stack: ["LLM", "RAG", "WhatsApp API", "Python"],
    link: "",
    placeholder: true,
  },
  {
    title: "Conciliação financeira automática",
    category: "automacao",
    status: "Em produção",
    problem: "Conferir notas e extratos tomava dias do financeiro todo fim de mês.",
    solution: "Robô que lê notas e extratos, cruza os lançamentos e lista só as divergências.",
    result: "40 horas por mês devolvidas ao time",
    stack: ["Python", "OCR", "SQL"],
    link: "",
    placeholder: true,
  },
  {
    title: "Painel comercial unificado",
    category: "dados",
    status: "Concluído",
    problem: "Vendas, CRM e planilhas contavam histórias diferentes e ninguém confiava nos números.",
    solution: "Pipeline que junta as fontes num só banco e alimenta um painel atualizado todo dia.",
    result: "5 fontes de dados em 1 painel",
    stack: ["SQL", "Airflow", "dbt", "Power BI"],
    link: "",
    placeholder: true,
  },
  {
    title: "Busca em contratos e manuais",
    category: "agentes",
    status: "Piloto",
    problem: "Achar uma cláusula ou procedimento exigia abrir dezenas de PDFs.",
    solution: "Assistente interno que responde perguntas sobre os documentos e mostra de onde tirou a resposta.",
    result: "Respostas em segundos, com a fonte",
    stack: ["Embeddings", "Banco vetorial", "LLM"],
    link: "",
    placeholder: true,
  },
  {
    title: "Inspeção visual de produtos",
    category: "visao",
    status: "Piloto",
    problem: "Defeitos passavam pela linha de produção porque a inspeção era manual e cansativa.",
    solution: "Modelo de visão computacional que aponta peças com defeito a partir de fotos.",
    result: "94% de acerto no piloto",
    stack: ["Visão computacional", "PyTorch"],
    link: "",
    placeholder: true,
  },
  {
    title: "Previsão de demanda por loja",
    category: "dados",
    status: "Concluído",
    problem: "Faltava produto em umas lojas e sobrava em outras.",
    solution: "Modelo que prevê vendas por loja e produto para orientar as compras.",
    result: "18% menos ruptura de estoque",
    stack: ["Python", "Machine learning", "SQL"],
    link: "",
    placeholder: true,
  },
];
