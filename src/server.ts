import express from "express"
import path from "node:path"
import { fileURLToPath } from "node:url"
import authRouter from "./routes/authRouter.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Rotas da API
app.use("/", authRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`)
})