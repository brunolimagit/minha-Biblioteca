const form = document.getElementById("form");
const nome = document.getElementById("inNome");
const autor = document.getElementById("inAutor");
const anoPublicacao = document.getElementById("inAnoPublicacao");
const genero = document.getElementById("inGenero");

const cardLivros = document.getElementById("card-livros");
const nenhumLivroMsg = document.getElementById("nenhum-livro");

const modalEditar = document.getElementById("modal-editar");
const modalFormEditar = document.getElementById("modal-form-editar");
const editarNome = document.getElementById("editarNome");
const editarAutor = document.getElementById("editarAutor");
const editarAno = document.getElementById("editarAno");
const editarGenero = document.getElementById("editarGenero");
const salvarEdicaoBtn = document.getElementById("salvar-edicao");
const btnFecharModalEditar = document.getElementById("btnFecharModalEditar");

const modalExcluir = document.getElementById("modal-excluir");
const btnConfirmarExcluir = document.getElementById("confirmar-excluir");
const btnCancelarExcluir = document.getElementById("cancelar-excluir");

let livros = JSON.parse(localStorage.getItem("livros")) || [];
let livroEditandoId = null;
let livroExcluindoId = null;

function salvarLocalStorage() {
  localStorage.setItem("livros", JSON.stringify(livros));
}

function renderizarLivros() {
  cardLivros.innerHTML = "";

  if (livros.length === 0) {
    nenhumLivroMsg.style.display = "flex";
    return;
  }

  nenhumLivroMsg.style.display = "none";

  livros.forEach((livro, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <p><strong>Nome:</strong> ${livro.nome}</p>
      <p><strong>Autor:</strong> ${livro.autor}</p>
      <p><strong>Ano:</strong> ${livro.ano}</p>
      <p><strong>Gênero:</strong> ${livro.genero}</p>
      <div class="btn-cards-excluir-editar">
        <button type="button" class="btn-editar" data-index="${index}">Editar</button>
        <button type="button" class="btn-excluir" data-index="${index}">Excluir</button>
      </div>
    `;

    cardLivros.appendChild(card);
  });

  // Adiciona eventos de editar e excluir nos botões (depois de criar os cards)
  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      abrirModalEditar(idx);
    });
  });

  document.querySelectorAll(".btn-excluir").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);
      abrirModalExcluir(idx);
    });
  });
}

function limparFormulario() {
  nome.value = "";
  autor.value = "";
  anoPublicacao.value = "";
  genero.value = "";
}

// Adicionar novo livro
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const novoLivro = {
    nome: nome.value.trim(),
    autor: autor.value.trim(),
    ano: anoPublicacao.value.trim(),
    genero: genero.value.trim()
  };

  if (!novoLivro.nome || !novoLivro.autor || !novoLivro.ano || !novoLivro.genero) {
    alert("Preencha todos os campos.");
    return;
  }

  livros.push(novoLivro);
  salvarLocalStorage();
  renderizarLivros();
  limparFormulario();
});

// Abrir modal de editar
function abrirModalEditar(index) {
  livroEditandoId = index;
  const livro = livros[index];

  editarNome.value = livro.nome;
  editarAutor.value = livro.autor;
  editarAno.value = livro.ano;
  editarGenero.value = livro.genero;

  modalEditar.style.display = "flex";
}

// Fechar modal de editar
btnFecharModalEditar.addEventListener("click", () => {
  modalEditar.style.display = "none";
  livroEditandoId = null;
});

// Salvar edição
modalFormEditar.addEventListener("submit", (e) => {
  e.preventDefault();

  if (livroEditandoId === null) return;

  const nomeEdit = editarNome.value.trim();
  const autorEdit = editarAutor.value.trim();
  const anoEdit = editarAno.value.trim();
  const generoEdit = editarGenero.value.trim();

  if (!nomeEdit || !autorEdit || !anoEdit || !generoEdit) {
    alert("Preencha todos os campos.");
    return;
  }

  livros[livroEditandoId] = {
    nome: nomeEdit,
    autor: autorEdit,
    ano: anoEdit,
    genero: generoEdit,
  };

  salvarLocalStorage();
  renderizarLivros();
  modalEditar.style.display = "none";
  livroEditandoId = null;
});

// Abrir modal de exclusão
function abrirModalExcluir(index) {
  livroExcluindoId = index;
  modalExcluir.style.display = "flex";
}

// Confirmar exclusão
btnConfirmarExcluir.addEventListener("click", () => {
  if (livroExcluindoId === null) return;

  livros.splice(livroExcluindoId, 1);
  salvarLocalStorage();
  renderizarLivros();

  modalExcluir.style.display = "none";
  livroExcluindoId = null;
});

// Cancelar exclusão
btnCancelarExcluir.addEventListener("click", () => {
  modalExcluir.style.display = "none";
  livroExcluindoId = null;
});

// Inicializar lista ao carregar a página
renderizarLivros();
