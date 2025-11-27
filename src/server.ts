import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"
import cookieParser from "cookie-parser"
import authRouter from "./routes/authRouter.js"
import pagesRouter from "./routes/pagesRouter.js"
import addressRouter from "./routes/addressRouter.js"
import { errorHandler } from "./middlewares/errorMiddleware.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Rotas da API
app.use("/auth", authRouter)
app.use("/", pagesRouter)
app.use("/", addressRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})