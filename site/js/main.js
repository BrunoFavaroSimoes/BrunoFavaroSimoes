/* mAInframe — comportamento do site */
(function () {
  "use strict";

  var cfg = window.MAINFRAME_CONFIG || {};
  var projects = window.MAINFRAME_PROJECTS || [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Links e textos vindos do config ---------- */
  var handle = (cfg.instagram || "mainframe.ia").replace(/^@/, "");
  var links = {
    instagram: "https://www.instagram.com/" + handle + "/",
    linkedin: cfg.linkedinFundador || "#",
    email: cfg.email ? "mailto:" + cfg.email : "#",
    whatsapp: cfg.whatsapp ? "https://wa.me/" + cfg.whatsapp.replace(/\D/g, "") : "",
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
  if (links.whatsapp) {
    document.querySelectorAll('[data-show="whatsapp"]').forEach(function (el) { el.hidden = false; });
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Nav ---------- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.getElementById("menu");

  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
  window.addEventListener("scroll", function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  /* ---------- Terminal do hero ---------- */
  var term = document.getElementById("terminal");
  var script = [
    { t: '<span class="t-prompt">$</span> ./boot mainframe --mode=ia', type: true },
    { t: '<span class="t-muted">[init]</span> carregando núcleo........ <span class="t-ok">OK</span>' },
    { t: '<span class="t-muted">[init]</span> conectando dados......... <span class="t-ok">OK</span>' },
    { t: '<span class="t-muted">[init]</span> agentes de IA........... <span class="t-ok">ONLINE</span>' },
    { t: "" },
    { t: '<span class="t-prompt">$</span> mainframe diagnosticar --empresa=sua', type: true },
    { t: '<span class="t-amber">→</span> tarefas repetitivas encontradas: <span class="t-amber">37</span>' },
    { t: '<span class="t-amber">→</span> atendimentos automatizáveis:    <span class="t-amber">68%</span>' },
    { t: '<span class="t-amber">→</span> fontes de dados desconectadas:  <span class="t-amber">5</span>' },
    { t: "" },
    { t: '<span class="t-ok">✔ plano de IA pronto.</span> próximo passo: falar com a gente' },
  ];

  function stripTags(html) {
    var d = document.createElement("div");
    d.innerHTML = html;
    return d.textContent;
  }

  function renderStatic() {
    term.innerHTML = script.map(function (l) { return l.t; }).join("\n") + '\n<span class="t-prompt">$</span> <span class="cursor"></span>';
  }

  function runTerminal() {
    var out = "";
    var i = 0;

    function nextLine() {
      if (i >= script.length) {
        term.innerHTML = out + '<span class="t-prompt">$</span> <span class="cursor"></span>';
        return;
      }
      var line = script[i++];
      if (line.type) {
        // digita só o comando, mantendo o "$ " colorido
        var plain = stripTags(line.t).replace(/^\$ /, "");
        var prefix = '<span class="t-prompt">$</span> ';
        var c = 0;
        (function typeChar() {
          c++;
          term.innerHTML = out + prefix + plain.slice(0, c) + '<span class="cursor"></span>';
          if (c < plain.length) {
            setTimeout(typeChar, 28 + Math.random() * 40);
          } else {
            out += prefix + plain + "\n";
            setTimeout(nextLine, 380);
          }
        })();
      } else {
        out += line.t + "\n";
        term.innerHTML = out + '<span class="cursor"></span>';
        setTimeout(nextLine, line.t ? 260 : 140);
      }
    }
    nextLine();
  }

  if (reduceMotion) renderStatic();
  else setTimeout(runTerminal, 500);

  /* ---------- Portfólio ---------- */
  var grid = document.getElementById("projects-grid");
  var catLabel = { agentes: "Agentes", automacao: "Automação", dados: "Dados", visao: "Visão computacional" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function statusClass(status) {
    var s = (status || "").toLowerCase();
    if (s.indexOf("piloto") > -1) return " project__status--piloto";
    if (s.indexOf("case") > -1) return " project__status--case";
    return "";
  }

  grid.innerHTML = projects.map(function (p) {
    return (
      '<article class="card project reveal" data-category="' + esc(p.category) + '">' +
        '<div class="project__top">' +
          "<span>" + esc(p.id) + " · " + esc(catLabel[p.category] || p.category) + "</span>" +
          '<span class="project__status' + statusClass(p.status) + '">' + esc(p.status) + "</span>" +
        "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        '<p class="project__desc">' + esc(p.description) + "</p>" +
        (p.metric ? '<div class="project__metric">' + esc(p.metric) + "</div>" : "") +
        '<ul class="project__stack">' + (p.stack || []).map(function (s) { return "<li>" + esc(s) + "</li>"; }).join("") + "</ul>" +
        (p.link ? '<a class="project__link" href="' + esc(p.link) + '" target="_blank" rel="noopener">ver projeto ↗</a>' : "") +
      "</article>"
    );
  }).join("");

  if (projects.some(function (p) { return p.placeholder; })) {
    document.getElementById("projects-note").hidden = false;
  }
  var counter = document.querySelector("[data-count]");
  if (counter) counter.setAttribute("data-count", projects.length);

  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var f = btn.getAttribute("data-filter");
      document.querySelectorAll(".filter").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      grid.querySelectorAll(".project").forEach(function (card) {
        card.classList.toggle("is-hidden", f !== "all" && card.getAttribute("data-category") !== f);
      });
    });
  });

  /* ---------- Contador ---------- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / 900, 1);
      el.textContent = Math.round(target * p);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if (counter) countUp(counter);

  /* ---------- Reveal ao rolar ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el, idx) {
      el.style.transitionDelay = (idx % 4) * 70 + "ms";
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Formulário (abre o e-mail com a mensagem pronta) ---------- */
  var form = document.getElementById("contact-form");
  var statusEl = form.querySelector(".form__status");

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var ok = true;
    form.querySelectorAll("[required]").forEach(function (f) {
      var valid = f.value.trim() !== "" && (f.type !== "email" || /.+@.+\..+/.test(f.value));
      f.classList.toggle("is-invalid", !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      statusEl.textContent = "> erro: preencha nome, e-mail válido e o desafio.";
      statusEl.classList.add("is-error");
      return;
    }
    statusEl.classList.remove("is-error");

    var d = new FormData(form);
    var subject = "Novo projeto — " + (d.get("empresa") || d.get("nome"));
    var body =
      "Nome: " + d.get("nome") + "\n" +
      "E-mail: " + d.get("email") + "\n" +
      "Empresa: " + (d.get("empresa") || "-") + "\n\n" +
      d.get("mensagem");

    window.location.href =
      "mailto:" + (cfg.email || "") +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    statusEl.textContent = "> abrindo seu e-mail com a mensagem pronta…";
  });
})();
