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

  /* ---------- Tela do CRT (o único movimento automático da página) ---------- */
  var crt = document.getElementById("crt");
  var lines = [
    { t: '<span class="inv">MAINFRAME/IA</span>  <span class="dim">TERMINAL 01</span>' },
    { t: "" },
    { t: "> analisar contas a pagar", type: true },
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
  ];
  var cursor = '<span class="crt__cursor"></span>';
  function show(html) { crt.innerHTML = html; crt.scrollTop = crt.scrollHeight; }

  function plain(html) { var d = document.createElement("div"); d.innerHTML = html; return d.textContent; }

  if (reduceMotion) {
    show(lines.map(function (l) { return l.t; }).join("\n") + "\n\n> " + cursor);
  } else {
    var out = "", i = 0;
    var next = function () {
      if (i >= lines.length) { show(out + "\n> " + cursor); return; }
      var l = lines[i++];
      if (l.type) {
        var txt = plain(l.t).slice(2), c = 0;
        var tick = function () {
          c++;
          show(out + "> " + txt.slice(0, c) + cursor);
          if (c < txt.length) setTimeout(tick, 45 + Math.random() * 55);
          else { out += "> " + txt + "\n"; setTimeout(next, 450); }
        };
        show(out + "> " + cursor);
        setTimeout(tick, 500);
      } else {
        out += l.t + "\n";
        show(out + cursor);
        setTimeout(next, l.t ? 300 : 120);
      }
    };
    setTimeout(next, 400);
  }

  /* ---------- Dores marcadas ---------- */
  var painInputs = document.querySelectorAll(".pain input");
  var painsCount = document.getElementById("pains-count");
  var picked = document.getElementById("form-picked");

  function selectedPains() {
    return Array.prototype.filter.call(painInputs, function (i) { return i.checked; })
      .map(function (i) { return i.value; });
  }
  function updatePains() {
    var sel = selectedPains();
    painsCount.textContent = sel.length
      ? sel.length + (sel.length === 1 ? " ponto marcado." : " pontos marcados.") + " Eles vão junto no seu pedido."
      : "";
    if (sel.length) {
      picked.hidden = false;
      picked.innerHTML = "<b>Você marcou:</b> " + sel.map(esc).join("; ") + ".";
    } else {
      picked.hidden = true;
    }
  }
  painInputs.forEach(function (i) { i.addEventListener("change", updatePains); });

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
      "\n" + data.get("mensagem");

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
