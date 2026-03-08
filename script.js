const books = [
  { id: 'jardim-da-lua', title: 'O Jardim da Lua', author: 'Helena Prado', category: 'Romance', subcategory: 'Contemporâneo', pages: 312, destaque: true, color: '#fde68a' },
  { id: 'cartas-de-verao', title: 'Cartas de Verão', author: 'Ricardo Tavares', category: 'Romance', subcategory: 'Drama', pages: 288, destaque: true, color: '#fbcfe8' },
  { id: 'coroa-de-brumas', title: 'Coroa de Brumas', author: 'Aline Sampaio', category: 'Fantasia', subcategory: 'Épica', pages: 420, destaque: true, color: '#bfdbfe' },
  { id: 'cronicas-do-vale-azul', title: 'Crônicas do Vale Azul', author: 'Igor Menezes', category: 'Fantasia', subcategory: 'Aventura', pages: 356, destaque: false, color: '#c7d2fe' },
  { id: 'codigo-cidadao', title: 'Código Cidadão', author: 'Marina Luz', category: 'Tecnologia', subcategory: 'Programação', pages: 260, destaque: true, color: '#a7f3d0' },
  { id: 'internet-para-todos', title: 'Internet para Todos', author: 'Paulo Viana', category: 'Tecnologia', subcategory: 'Inovação', pages: 198, destaque: false, color: '#bbf7d0' },
  { id: 'segredos-do-cafe', title: 'Segredos do Café da Esquina', author: 'Bia Rios', category: 'Romance', subcategory: 'Leve', pages: 230, destaque: false, color: '#fed7aa' },
  { id: 'dragao-do-sul', title: 'O Dragão do Sul', author: 'Neto Cardoso', category: 'Fantasia', subcategory: 'Aventura', pages: 390, destaque: false, color: '#ddd6fe' },
  { id: 'guia-da-carreira-digital', title: 'Guia da Carreira Digital', author: 'Lara Freitas', category: 'Tecnologia', subcategory: 'Carreira', pages: 244, destaque: false, color: '#bae6fd' }
];

function renderBooks(containerId, sourceBooks) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!sourceBooks.length) {
    container.innerHTML = '<p>Nenhum livro encontrado para este filtro.</p>';
    return;
  }

  container.innerHTML = sourceBooks
    .map(
      (book) => `
      <article class="book-card">
        <div class="book-cover" style="background:${book.color}">${book.title}</div>
        <h3>${book.title}</h3>
        <p class="meta">${book.author} • ${book.pages} páginas</p>
        <div class="tags">
          <span class="tag">${book.category}</span>
          <span class="tag">${book.subcategory}</span>
          <span class="tag">PDF grátis</span>
        </div>
        <a class="btn btn-primary" href="livros/${book.id}.html">Ver livro</a>
      </article>
    `
    )
    .join('');
}

function setupFilters() {
  const inputBusca = document.getElementById('filtro-busca');
  const selectCategoria = document.getElementById('filtro-categoria');
  const selectSubcategoria = document.getElementById('filtro-subcategoria');
  const containerId = 'catalogo-lista';

  if (!inputBusca || !selectCategoria || !selectSubcategoria) return;

  const update = () => {
    const termo = inputBusca.value.toLowerCase();
    const categoria = selectCategoria.value;
    const subcategoria = selectSubcategoria.value;

    const filtered = books.filter((book) => {
      const matchTermo = [book.title, book.author].join(' ').toLowerCase().includes(termo);
      const matchCategoria = categoria === 'Todas' || book.category === categoria;
      const matchSubcategoria = subcategoria === 'Todas' || book.subcategory === subcategoria;
      return matchTermo && matchCategoria && matchSubcategoria;
    });

    renderBooks(containerId, filtered);
  };

  [inputBusca, selectCategoria, selectSubcategoria].forEach((el) => el.addEventListener('input', update));
  update();
}

function setupMobileMenu() {
  const btn = document.getElementById('menu-btn');
  const menu = document.getElementById('nav-links');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
}

function setupFooterToggle() {
  document.querySelectorAll('.footer-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      target?.classList.toggle('open');
    });
  });
}

function setupBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function setupNewsletter() {
  const form = document.getElementById('newsletter-form');
  const msg = document.getElementById('newsletter-msg');
  if (!form || !msg) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = 'Cadastro realizado! Você receberá novidades semanais por e-mail.';
    form.reset();
  });
}

function bootHome() {
  const destaque = books.filter((book) => book.destaque);
  renderBooks('destaques-lista', destaque);
}

document.addEventListener('DOMContentLoaded', () => {
  setupMobileMenu();
  setupFooterToggle();
  setupBackToTop();
  setupNewsletter();
  setupFilters();
  bootHome();
});
