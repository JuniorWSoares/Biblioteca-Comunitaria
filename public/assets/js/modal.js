import { 
    bookDetailsView, bookstoreView, closeModalButton, loginRegisterView, 
    messageModal, modalMessage, modalTitle 
} from "./elements.js"
import { renderBooks } from "./homepage.js"

// --- Funções de Modal ---

export function showModal(title, message) {
    if(messageModal) {
        modalTitle.textContent = title
        modalMessage.textContent = message
        messageModal.style.display = 'flex'
    } else {
        alert(`${title}: ${message}`)
    }
}

export function hideModal() {
    if(messageModal) {
        messageModal.style.display = 'none'
    }
}

if (closeModalButton) {
    closeModalButton.addEventListener('click', hideModal)
}

// --- Funções de Controle de Visualização ---

export function hideAllViews() {
    if (loginRegisterView) loginRegisterView.style.display = 'none'
    if (bookstoreView) bookstoreView.style.display = 'none'
    if (bookDetailsView) bookDetailsView.style.display = 'none'
}

export function showBookstoreView() {
    hideAllViews()
    if (bookstoreView) bookstoreView.style.display = 'block'
    renderBooks()
}

export function showBookDetailsView() {
    hideAllViews()
    if (bookDetailsView) bookDetailsView.style.display = 'block'
}