/* mAInframe: comportamento do site */
(function () {
  "use strict";

  var cfg = window.MAINFRAME_CONFIG || {};
  var projects = window.MAINFRAME_PROJECTS || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links e textos vindos do config ---------- */
  var handle = (cfg.instagram || "mainframe.ia").replace(/^@/, "");
  var whats = (cfg.whatsapp || "").replace(/\D/g, "");
  var links = {
    instagram: "https://www.instagram.com/" + handle + "/",
    linkedin: cfg.linkedinFundador || "",
    email: cfg.email ? "mailto:" + cfg.email : "",
    whatsapp: whats ? "https://wa.me/" + whats : "",
  };
  var texts = { "instagram-handle": "@" + handle, email: cfg.email || "" };

  document.querySelectorAll("[data-link]").forEach(function (el) {
    var href = links[el.getAttribute("data-link")];
    if (href) el.setAttribute("href", href);
  });
  document.querySelectorAll("[data-text]").forEach(function (el) {
    var t = texts[el.getAttribute("data-text")];
    if (t) el.textContent = t;
  });
  if (whats) {
    document.querySelectorAll('[data-show="whatsapp"]').forEach(function (el) { el.hidden = false; });
  }
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Menu ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  }
  toggle.addEventListener("click", function () { setMenu(!menu.classList.contains("is-open")); });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  /* ---------- Tela do CRT: demonstração por área ---------- */
  var crt = document.getElementById("crt");
  var crtCaption = document.getElementById("crt-caption");
  var HEAD = { t: '<span class="inv">MAINFRAME/IA</span>  <span class="dim">TERMINAL 01</span>' };
  var scenes = {
    financeiro: {
      caption: "Financeiro: a IA confere 1.248 notas contra o extrato e acha 17 divergências em 4 minutos.",
      lines: [
        HEAD, { t: "" },
        { t: "> conferir contas a pagar", type: true },
        { t: '<span class="dim">  lendo 1.248 notas fiscais...</span> ok' },
        { t: '<span class="dim">  cruzando com o extrato...</span>    ok' },
        { t: "  divergências encontradas: 17" },
        { t: "" },
        { t: "> quanto tempo isso levava?", type: true },
        { t: "  cerca de 40 horas por mês, à mão." },
        { t: "" },
        { t: "> e agora?", type: true },
        { t: "  4 minutos. relatório enviado" },
        { t: "  para o financeiro." },
      ],
    },
    atendimento: {
      caption: "Atendimento: o agente responde um cliente no WhatsApp às 23h e passa a venda para o time de manhã.",
      lines: [
        HEAD, { t: "" },
        { t: '<span class="dim">  23:14  nova mensagem no whatsapp</span>' },
        { t: "  cliente: meu pedido 4471 já saiu?" },
        { t: "" },
        { t: '<span class="dim">  consultando pedido 4471...</span>     ok' },
        { t: "  ia: saiu ontem, chega quinta." },
        { t: "      segue o rastreio. posso ajudar" },
        { t: "      em mais alguma coisa?" },
        { t: "" },
        { t: "  cliente: quero mais 3 unidades" },
        { t: '<span class="dim">  pedido criado, vendedor avisado</span> ok' },
        { t: "  tempo de resposta: 6 segundos" },
      ],
    },
    vendas: {
      caption: "Vendas: o gestor pergunta em português e recebe a resposta com os dados de CRM e ERP juntos.",
      lines: [
        HEAD, { t: "" },
        { t: "> quais clientes pararam de comprar?", type: true },
        { t: '<span class="dim">  unindo crm + erp + planilhas...</span> ok' },
        { t: "" },
        { t: "  23 clientes sem pedido há 60 dias" },
        { t: "  faturamento em risco: R$ 184 mil/ano" },
        { t: "" },
        { t: "> priorize para o time comercial", type: true },
        { t: '<span class="dim">  ordenando por valor e chance...</span> ok' },
        { t: "  lista enviada para 4 vendedores" },
      ],
    },
  };
  var cursor = '<span class="crt__cursor"></span>';
  var timer = null;
  function show(html) { crt.innerHTML = html; crt.scrollTop = crt.scrollHeight; }
  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }
  function later(fn, ms) { timer = setTimeout(fn, ms); }

  function play(name) {
    clearTimeout(timer);
    var scene = scenes[name];
    crtCaption.textContent = scene.caption;
    var lines = scene.lines;
    if (reduceMotion) {
      show(lines.map(function (l) { return l.t; }).join("\n") + "\n\n> " + cursor);
      return;
    }
    var out = "", i = 0;
    var next = function () {
      if (i >= lines.length) { show(out + "\n> " + cursor); return; }
      var l = lines[i++];
      if (l.type) {
        var txt = plain(l.t).slice(2), c = 0;
        var tick = function () {
          c++;
          show(out + "> " + txt.slice(0, c) + cursor);
          if (c < txt.length) later(tick, 40 + Math.random() * 50);
          else { out += "> " + txt + "\n"; later(next, 420); }
        };
        show(out + "> " + cursor);
        later(tick, 450);
      } else {
        out += l.t + "\n";
        show(out + cursor);
        later(next, l.t ? 280 : 110);
      }
    };
    show(cursor);
    later(next, 300);
  }

  var keys = document.querySelectorAll(".crt__key");
  keys.forEach(function (k) {
    k.addEventListener("click", function () {
      keys.forEach(function (o) { o.setAttribute("aria-pressed", String(o === k)); });
      play(k.getAttribute("data-scene"));
    });
  });
  play("financeiro");

  /* ---------- Dores marcadas ---------- */
  var painInputs = document.querySelectorAll(".pain input");
  var painsCount = document.getElementById("pains-count");
  var picked = document.getElementById("form-picked");

  function selectedPains() {
    return Array.prototype.filter.call(painInputs, function (i) { return i.checked; })
      .map(function (i) { return i.value; });
  }
  var calcSummary = "";   // preenchido pela calculadora quando o visitante decide levar o número

  function updatePains() {
    var sel = selectedPains();
    painsCount.textContent = sel.length
      ? sel.length + (sel.length === 1 ? " ponto marcado." : " pontos marcados.") + " Eles vão junto no seu pedido."
      : "";
    var parts = [];
    if (sel.length) parts.push("<b>Você marcou:</b> " + sel.map(esc).join("; ") + ".");
    if (calcSummary) parts.push("<b>Calculadora:</b> " + esc(calcSummary) + ".");
    picked.hidden = !parts.length;
    picked.innerHTML = parts.join("<br />");
  }
  painInputs.forEach(function (i) { i.addEventListener("change", updatePains); });


  /* ---------- Calculadora ---------- */
  var brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
  var num = new Intl.NumberFormat("pt-BR");
  var cP = document.getElementById("calc-pessoas");
  var cH = document.getElementById("calc-horas");
  var cC = document.getElementById("calc-custo");
  var WEEKS_PER_MONTH = 52 / 12;

  function calc() {
    var p = +cP.value, h = +cH.value, c = +cC.value;
    var horasMes = Math.round(p * h * WEEKS_PER_MONTH);
    var ano = p * h * 52 * c;
    var mes = ano / 12;
    document.getElementById("out-pessoas").textContent = p;
    document.getElementById("out-horas").textContent = h + " h";
    document.getElementById("out-custo").textContent = brl.format(c);
    document.getElementById("res-horas").textContent = num.format(horasMes);
    document.getElementById("res-mes").textContent = brl.format(mes);
    document.getElementById("res-ano").textContent = brl.format(ano);
    [cP, cH, cC].forEach(function (r) {
      r.style.setProperty("--fill", ((r.value - r.min) / (r.max - r.min)) * 100 + "%");
    });
    return p + " pessoas, " + h + " h/semana cada, " + num.format(horasMes) + " h/mês, cerca de " + brl.format(ano) + " por ano";
  }
  [cP, cH, cC].forEach(function (r) { r.addEventListener("input", calc); });
  calc();

  document.getElementById("calc-use").addEventListener("click", function () {
    calcSummary = calc();
    updatePains();
    document.getElementById("contato").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    setTimeout(function () { document.querySelector('#contact-form [name="nome"]').focus({ preventScroll: true }); }, reduceMotion ? 0 : 600);
  });

  /* ---------- Portfólio impresso ---------- */
  var jobsEl = document.getElementById("jobs");
  var catLabel = { agentes: "Agente de IA", automacao: "Automação", dados: "Dados", visao: "Visão computacional" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function pad(n) { return ("00" + n).slice(-3); }

  jobsEl.innerHTML = projects.map(function (p, idx) {
    var statusCls = /piloto/i.test(p.status || "") ? " job__status--piloto" : "";
    return (
      '<article class="job" data-category="' + esc(p.category) + '">' +
        '<div class="job__title"><h3>JOB ' + pad(idx + 1) + "  " + esc(p.title) + "</h3>" +
        '<span class="job__status' + statusCls + '">' + esc(p.status) + "</span></div>" +
        "<dl>" +
          "<dt>tipo</dt><dd>" + esc(catLabel[p.category] || p.category) + "</dd>" +
          "<dt>problema</dt><dd>" + esc(p.problem) + "</dd>" +
          "<dt>solução</dt><dd>" + esc(p.solution) + "</dd>" +
          '<dt>resultado</dt><dd class="job__result">' + esc(p.result) + "</dd>" +
          "<dt>tecnologia</dt><dd>" + esc((p.stack || []).join(", ")) + "</dd>" +
          (p.link ? '<dt>case</dt><dd><a class="job__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">abrir o case completo</a></dd>' : "") +
        "</dl>" +
        '<div class="job__sep" aria-hidden="true"></div>' +
      "</article>"
    );
  }).join("");

  var d = new Date();
  document.getElementById("print-date").textContent =
    ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();

  var totalEl = document.getElementById("jobs-total");
  function updateTotal(n) { totalEl.textContent = n + (n === 1 ? " PROJETO LISTADO" : " PROJETOS LISTADOS"); }
  updateTotal(projects.length);

  if (projects.some(function (p) { return p.placeholder; })) {
    document.getElementById("projects-note").hidden = false;
  }

  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".filter").forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      var shown = 0;
      jobsEl.querySelectorAll(".job").forEach(function (job) {
        var hide = f !== "all" && job.getAttribute("data-category") !== f;
        job.hidden = hide;
        if (!hide) shown++;
      });
      updateTotal(shown);
    });
  });

  /* ---------- Barra fixa no celular ---------- */
  var mobileCta = document.getElementById("mobile-cta");
  var hero = document.querySelector(".hero");
  var contact = document.getElementById("contato");
  if ("IntersectionObserver" in window) {
    var heroVisible = true, contactVisible = false;
    var sync = function () { mobileCta.classList.toggle("is-visible", !heroVisible && !contactVisible); };
    new IntersectionObserver(function (es) { heroVisible = es[0].isIntersecting; sync(); }).observe(hero);
    new IntersectionObserver(function (es) { contactVisible = es[0].isIntersecting; sync(); }, { threshold: 0.1 }).observe(contact);
  }

  /* ---------- Formulário ---------- */
  var form = document.getElementById("contact-form");
  var submitBtn = document.getElementById("form-submit");
  var statusEl = form.querySelector(".form__status");
  submitBtn.textContent = whats ? "Enviar pedido pelo WhatsApp" : "Enviar pedido por e-mail";

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var firstBad = null;
    form.querySelectorAll("[required]").forEach(function (f) {
      var bad = f.value.trim() === "";
      f.classList.toggle("is-invalid", bad);
      f.setAttribute("aria-invalid", String(bad));
      if (bad && !firstBad) firstBad = f;
    });
    if (firstBad) {
      statusEl.textContent = "Preencha nome, empresa, contato e o que você quer resolver.";
      statusEl.classList.add("is-error");
      firstBad.focus();
      return;
    }
    statusEl.classList.remove("is-error");

    var data = new FormData(form);
    var pains = selectedPains();
    var text =
      "Olá! Quero agendar um diagnóstico com a mAInframe.\n\n" +
      "Nome: " + data.get("nome") + "\n" +
      "Empresa: " + data.get("empresa") + "\n" +
      "Contato: " + data.get("contato") + "\n" +
      "Tamanho: " + (data.get("porte") || "não informado") + "\n" +
      (pains.length ? "Pontos marcados no site: " + pains.join("; ") + "\n" : "") +
      (calcSummary ? "Calculadora: " + calcSummary + "\n" : "") +
      "\n" + data.get("mensagem");

    if (window.MAINFRAME_PREVIEW) {
      statusEl.textContent = "Prévia: no site publicado, este botão abre o " + (whats ? "WhatsApp" : "e-mail") + " com o pedido pronto.";
      return;
    }
    if (whats) {
      window.open("https://wa.me/" + whats + "?text=" + encodeURIComponent(text), "_blank", "noopener");
      statusEl.textContent = "Abrimos o WhatsApp com seu pedido pronto. É só enviar.";
    } else {
      window.location.href = "mailto:" + (cfg.email || "") +
        "?subject=" + encodeURIComponent("Diagnóstico: " + data.get("empresa")) +
        "&body=" + encodeURIComponent(text);
      statusEl.textContent = "Abrimos seu e-mail com o pedido pronto. É só enviar.";
    }
  });
})();
