// Formulário da lista (Tally) com a ORIGEM de cada inscrição.
// Cada vídeo tem o seu link: .../?v=003_sono. O "v" vira o campo escondido "origem" no Tally, e o Tally grava no
// Notion. Sem "v" (link da bio), a origem é "bio". Os utm_* também passam, se existirem.
(function () {
  var params = new URLSearchParams(window.location.search);
  var origem = (params.get("v") || "bio").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 60) || "bio";
  var repassar = new URLSearchParams({ origem: origem });
  ["utm_source", "utm_medium", "utm_campaign"].forEach(function (k) {
    var valor = params.get(k);
    if (valor) repassar.set(k, valor.slice(0, 60));
  });

  var caixa = document.getElementById("formulario");
  var id = (window.BLUE_ROSE || {}).tallyFormId;
  if (!caixa) return;
  if (!id) {
    caixa.innerHTML = '<p class="form-pendente">O formulário abre em breve. Volte por este mesmo link.</p>';
    caixa.setAttribute("data-origem", origem);
    return;
  }
  var iframe = document.createElement("iframe");
  // fundo transparente: o formulário usa o tema da marca no Tally (texto claro, botão azul; tally_formulario.py --tema),
  // então ele se apoia no fundo do site (23/10/2026). Sem o tema, o texto do Tally é escuro e some (E043).
  iframe.setAttribute("data-tally-src", "https://tally.so/embed/" + encodeURIComponent(id) +
    "?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1&" + repassar.toString());
  iframe.setAttribute("title", "Formulário da lista de espera da Blue Rose");
  iframe.setAttribute("loading", "lazy");
  iframe.style.width = "100%";
  iframe.style.border = "0";
  iframe.height = "620";
  caixa.appendChild(iframe);
  var s = document.createElement("script");
  s.src = "https://tally.so/widgets/embed.js";
  s.onload = function () { if (window.Tally) window.Tally.loadEmbeds(); };
  document.body.appendChild(s);
})();
