import { btnDonateSubmit, isDonatePageView } from "./elements.js"
import { showModal } from "./modal.js"

// DOAÇÃO (donation.ejs)

if (isDonatePageView) {
    if (btnDonateSubmit) {
        btnDonateSubmit.addEventListener('submit', (e) => {
            e.preventDefault()
            const title = document.getElementById('donate-title').value
            const author = document.getElementById('donate-author').value
            const description = document.getElementById('donate-description').value
            const bookCover = document.getElementById("donate-cover-url").value
            
            if (title && author && description && bookCover) {
                showModal('Doação Recebida', 'Sua doação foi realizada com sucesso. Agradecemos imensamente sua generosidade e apoio.')

                // Limpa o formulário
                document.getElementById('donate-title').value = ''
                document.getElementById('donate-author').value = ''
                document.getElementById('donate-description').value = ''
            }
        })
    }
}