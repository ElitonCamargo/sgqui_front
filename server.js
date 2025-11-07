import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Emular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware opcional para redirecionar HTTPS para HTTP
app.use((req, res, next) => {
    if (req.secure) {
        return res.redirect(301, `http://${req.headers.host}${req.url}`);
    }
    next();
});

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Roteamento SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar o servidor
const PORT = 8080; // Use a porta definida por padrão

app.listen(PORT, () => {
    console.log(`WEB: Rodando - PORT: ${PORT}`);
});
