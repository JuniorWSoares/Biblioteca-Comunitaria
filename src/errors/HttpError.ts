export class HttpError extends Error {
    // Propriedade que armazena o código de status HTTP do erro.
    status: number

    // Construtor da classe, que recebe o código de status e a mensagem do erro como parâmetros.
    constructor(status: number, message: string) {
        // Chama o construtor da classe base (Error) passando a mensagem do erro.
        super(message)
        // Define o código de status HTTP na instância do erro.
        this.status = status
    }
}