// Todo o texto da página fica aqui. Edite sem mexer nos componentes.
// Dados de produto e preços vêm de brindou.com (out/2026). Itens marcados com TODO são exemplos.

export const links = {
  signup: "https://brindou.com/login?mode=signup&next=/start",
  example: "https://brindou.com/exemplo-casamento",
  waitlist: "https://brindou.com/login?mode=signup&next=/start", // TODO: link real da lista de espera dos planos pagos
  help: "https://brindou.com/ajuda",
};

export const announcement = "Planos Plus e Brenda IA abrem em breve. O Essencial já está liberado, grátis e sem cartão.";

export const hero = {
  eyebrow: "Planeje menos. Brinde mais.",
  // Teste A/B: troque headlineA por headlineB.
  headlineA: ["Do", "convite", "ao", "grande", "dia,"],
  headlineAccent: "tudo num lugar só.",
  headlineB: "Seu casamento organizado antes do primeiro brinde.",
  sub: "Site do casamento, convites com confirmação de presença, orçamento, fornecedores e tarefas. Vocês planejam juntos, e os convidados respondem pelo celular, sem app e sem senha.",
  cta: "Criar nosso casamento grátis",
  secondary: "Ver um site de exemplo",
  note: "Grátis e sem cartão • Pronto em poucos minutos",
};

export const features = [
  "Site do casamento",
  "Convites com RSVP",
  "Lista de convidados",
  "Restrições alimentares",
  "Orçamento por categoria",
  "Funil de fornecedores",
  "Tarefas e lembretes",
  "Exporta lista para o buffet",
  "Importa sua planilha",
  "Contagem regressiva",
];

export const chaos = {
  eyebrow: "O jeito de sempre",
  title: "Planilha no Drive, convite no WhatsApp, orçamento no caderno.",
  sub: "E a pergunta que não para: “quem já confirmou?”",
  scraps: [
    { label: "convidados_FINAL_v3.xlsx", kind: "Planilha" },
    { label: "Tia Lúcia vem com +2?", kind: "WhatsApp" },
    { label: "Sinal do buffet: pago??", kind: "Caderno" },
    { label: "Orçamento foto (3 propostas)", kind: "E-mail" },
    { label: "Quem é vegetariano mesmo?", kind: "Post-it" },
    { label: "Mandar convite pra família do noivo", kind: "Lembrete" },
  ],
  resolved: "Com o Brindou, tudo vira uma tela só.",
};

export const demoTabs = [
  {
    id: "proximos",
    title: "Próximos passos",
    benefit: "O painel mostra o que vence hoje e o que está atrasado. Vocês nunca mais perguntam “e agora?”.",
    image: "/img/painel2-proximos-passos.webp",
    alt: "Painel do Brindou com próximos passos: sinal do buffet, cardápio e foto e vídeo",
  },
  {
    id: "convidados",
    title: "Convidados e RSVP",
    benefit: "Cada família recebe um link. As respostas atualizam a lista sozinhas, com acompanhantes e restrições.",
    image: "/img/painel2-convidados.webp",
    alt: "Lista de convidados do Brindou com status de confirmação",
  },
  {
    id: "orcamento",
    title: "Orçamento",
    benefit: "Planejado, contratado e pago por categoria. Vocês sabem exatamente quanto falta.",
    image: "/img/painel2-orcamento.webp",
    alt: "Orçamento do casamento por categoria no Brindou",
  },
  {
    id: "fornecedores",
    title: "Fornecedores",
    benefit: "Da pesquisa ao contrato: propostas, contatos e status de cada fornecedor no mesmo lugar.",
    image: "/img/painel2-fornecedores.webp",
    alt: "Funil de fornecedores do Brindou",
  },
];

export const templates = [
  { name: "Cinema", image: "/img/site3-cinema.webp" },
  { name: "Editorial", image: "/img/site3-editorial.webp" },
  { name: "Jardim", image: "/img/site3-garden.webp" },
  { name: "Solar", image: "/img/site3-solar.webp" },
];

export const steps = [
  { n: "01", title: "Criem o casamento", text: "Data, local e estilo. Importem a planilha de convidados se já tiverem uma." },
  { n: "02", title: "Mandem os convites", text: "Um link por família. Ninguém baixa app nem cria senha." },
  { n: "03", title: "Acompanhem tudo", text: "Confirmações, pagamentos e tarefas no painel. Chamem quem ajuda e escolham o que cada um vê." },
];

// TODO: substituir por depoimentos reais (com autorização). Estes são ilustrativos.
export const testimonials = [
  { quote: "Paramos de perguntar no grupo quem já tinha confirmado. A lista se atualizava sozinha.", name: "Carla & Diego", detail: "Casamento em Belo Horizonte" },
  { quote: "Mandei a lista com restrições direto para o buffet. Ninguém ficou sem prato.", name: "Ana & Pedro", detail: "Casamento em Recife" },
  { quote: "Minha mãe ajudava nos convidados e eu cuidava dos pagamentos. Cada um na sua parte.", name: "Júlia & Rafa", detail: "Casamento em Campinas" },
];

export const pricing = {
  title: "Um preço por casamento. Sem assinatura.",
  sub: "Planos pagos valem por 12 meses. Valores de referência; o total final aparece no checkout do Mercado Pago.",
  plans: [
    {
      id: "essencial",
      name: "Essencial",
      tagline: "Tudo para organizar e convidar.",
      total: 0,
      installment: 0,
      status: "Disponível agora",
      features: ["Site do casamento com 4 modelos", "Convites e RSVP por família", "Lista de convidados e exportação", "Orçamento, fornecedores e tarefas", "Ajudantes com permissões"],
      cta: "Criar nosso casamento grátis",
      href: links.signup,
      primary: true,
    },
    {
      id: "plus",
      name: "Plus",
      tagline: "Contratos e prazos sob controle.",
      total: 478.8,
      installment: 39.9,
      status: "Em breve",
      features: ["Tudo do Essencial", "Contratos em PDF com parcelas", "Leitura automática de datas e valores", "Central de Atenção com lembretes", "Brenda: 50 perguntas de planejamento"],
      cta: "Quero o Plus quando abrir",
      href: links.waitlist,
      primary: false,
    },
    {
      id: "brenda",
      name: "Brenda IA",
      tagline: "Uma assistente que conhece o seu casamento.",
      total: 718.8,
      installment: 59.9,
      status: "Em breve",
      features: ["Tudo do Plus", "Brenda analisa convidados, orçamento e contratos", "Prepara tarefas e lembretes para aprovação", "500 respostas (até 30 por dia)", "Nada muda sem o OK de vocês"],
      cta: "Quero a Brenda quando abrir",
      href: links.waitlist,
      primary: false,
    },
  ],
};

export const guarantees = [
  { title: "Grátis e sem cartão", text: "O Essencial não pede cartão de crédito." },
  { title: "Sem assinatura", text: "Planos pagos são por casamento, não mensalidade." },
  { title: "Vocês no controle", text: "A Brenda nunca move dinheiro nem fala com convidados sem revisão." },
  { title: "Convidados sem atrito", text: "Abre no navegador do celular. Sem app, sem senha." },
];

export const faq = [
  { q: "É grátis mesmo?", a: "Sim. O plano Essencial é gratuito e não pede cartão. Com ele vocês criam o site, mandam convites, recebem confirmações e controlam orçamento, fornecedores e tarefas." },
  { q: "Meus convidados precisam baixar algum aplicativo?", a: "Não. Cada família recebe um link que abre no navegador do celular, sem login e sem senha." },
  { q: "Já tenho uma planilha de convidados. Perco o trabalho?", a: "Não. Vocês podem importar a planilha existente e continuar de onde pararam." },
  { q: "O Brindou movimenta dinheiro ou paga fornecedores?", a: "Não. Vocês registram os pagamentos que fizerem, e o Brindou mostra o que foi planejado, contratado e pago." },
  { q: "Outras pessoas podem ajudar?", a: "Sim. Convidem quem ajuda (mães, padrinhos, cerimonialista) e escolham o que cada pessoa pode ver ou editar." },
  { q: "Como funcionam os planos pagos?", a: "São compras únicas por casamento, válidas por 12 meses, sem assinatura. Plus e Brenda IA abrem em breve." },
];

export const finalCta = {
  title: "Planejem menos.",
  accent: "Brindem mais.",
  sub: "Criem o casamento de vocês agora. Leva poucos minutos e é grátis.",
};

export const exitOffer = {
  title: "Antes de ir: quer ver como fica?",
  text: "Abram um site de casamento de exemplo, com convite e confirmação de presença funcionando.",
  cta: "Ver o site de exemplo",
};
