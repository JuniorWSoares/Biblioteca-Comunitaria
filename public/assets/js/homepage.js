import { 
    backButton, bookDetailsContainer, bookListContainer, bookstoreView, 
    isDonatePageView, isLoginRegisterView, searchButton, searchInput 
} from "./elements.js"
import { hideAllViews, showBookDetailsView, showBookstoreView, showModal } from "./modal.js"

// LIVRARIA/DETALHES (homepage.ejs)

let books = []

const booksEl = document.getElementById("books")
if(booksEl) {
    const booksData = booksEl.textContent 
    books = JSON.parse(booksData)
}

let selectedBook = null

if (!isLoginRegisterView && !isDonatePageView) {
    
    if (backButton) backButton.addEventListener('click', showBookstoreView)

    // Lógica de Pesquisa
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value;
            renderBooks(searchTerm)
        })
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value
                renderBooks(searchTerm)
            }
        })
    }

    // Inicialização
    window.addEventListener('load', () => {
        hideAllViews()
        if (bookstoreView) bookstoreView.style.display = 'block'
        renderBooks()
    })
}

// Renderização dos Livros
export function renderBooks(filter = '') {
    if (!bookListContainer) return 
    
    bookListContainer.innerHTML = ''
    const filteredBooks = books.filter(book =>
        book.titulo.toLowerCase().includes(filter.toLowerCase()) ||
        book.autor.toLowerCase().includes(filter.toLowerCase())
    )

    if (filteredBooks.length === 0) {
        bookListContainer.innerHTML = `<p style="text-align:center; width:100%;">Nenhum livro encontrado.</p>`
        return
    }

    filteredBooks.forEach(book => {
        const card = document.createElement('div')
        card.classList.add('book-card')
        card.innerHTML = `
            <img src="${book.foto_capa}" alt="Capa de ${book.titulo}" height="999" onerror="this.onerror=null; this.src='https://placehold.co/200x280/2f2841/00ff88?text=Sem+Capa';">
            <h3>${book.titulo}</h3>
            <p>por ${book.autor}</p>
        `
        card.addEventListener('click', () => {
            selectedBook = book
            renderBookDetails()
            showBookDetailsView()
        })
        bookListContainer.appendChild(card)
    })
}

// Renderização dos Detalhes do Livro
function renderBookDetails() {
    if (!selectedBook || !bookDetailsContainer) {
        bookDetailsContainer.innerHTML = "<p>Livro não encontrado.</p>"
        return
    }

    bookDetailsContainer.innerHTML = `
        <img class="book-cover-details" src="${selectedBook.foto_capa}" alt="Capa de ${selectedBook.titulo}" onerror="this.onerror=null; this.src='https://placehold.co/200x280/2f2841/00ff88?text=Sem+Capa';">
        <h1>${selectedBook.titulo}</h1>
        <p class="genre">Gênero: ${selectedBook.genero}</p>
        <p class="author">por ${selectedBook.autor}</p>
        <p class="description">${selectedBook.sinopse}</p>
        <form action="/pick-up" method="post" class="details-buttons">
            <input type="number" name="bookId" value="${selectedBook.id}" hidden>
            <button id="alugar-btn" type="submit">Resgatar</button>
        </form>
    `
}
// Seleciona o elemento principal
const wrapper = document.querySelector('.custom-select-wrapper')

// --- CORREÇÃO AQUI: Só executa se o wrapper existir na tela ---
if (wrapper) {
    const trigger = wrapper.querySelector('.custom-select-trigger span') // Ajustei para pegar de dentro do wrapper
    const hiddenInput = document.getElementById('search-type-input')
    const options = wrapper.querySelectorAll('.custom-option') // Ajustei para pegar de dentro do wrapper

    // 1. Abrir/Fechar ao clicar
    wrapper.addEventListener('click', function() {
        this.classList.toggle('open')
    });

    // 2. Ao clicar em uma opção
    for (const option of options) {
        option.addEventListener('click', function(e) {
            // Impede que o clique na opção feche o menu imediatamente (opcional, mas bom pra evitar bugs)
            e.stopPropagation()
            
            if (!this.classList.contains('selected')) {
                options.forEach(opt => opt.classList.remove('selected'))
                this.classList.add('selected')
                
                trigger.textContent = this.textContent
                hiddenInput.value = this.dataset.value
                
                // Fecha o menu após selecionar
                wrapper.classList.remove('open')
            }
        })
    }

    // 3. Fechar se clicar fora
    window.addEventListener('click', function(e) {
        if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open')
        }
    })
}