import multer from "multer";
import path from "node:path";
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configura o armazenamento dos arquivos utilizando o diskStorage do multer.
const storage = multer.diskStorage({
    // Define o diretório de destino onde os arquivos serão armazenados.
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/uploads"))
    },
    // Define o nome do arquivo armazenado.
    filename: (req, file, cb) => {
        // O nome do arquivo será composto pelo timestamp atual e a extensão original do arquivo.
        const ext = path.extname(file.originalname);
        const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${unique}${ext}`)
    }
})

// Exporta o middleware de upload configurado com o armazenamento definido.
export const upload = multer({ storage: storage })