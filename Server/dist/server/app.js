"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const auth_1 = __importDefault(require("./routes/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const treinador_1 = __importDefault(require("./routes/treinador"));
const insights_1 = __importDefault(require("./routes/insights"));
const aluno_1 = __importDefault(require("./routes/aluno"));
const exercicio_1 = __importDefault(require("./routes/exercicio"));
const rotina_1 = __importDefault(require("./routes/rotina"));
const treino_1 = __importDefault(require("./routes/treino"));
const serie_1 = __importDefault(require("./routes/serie"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
//defining the standard routes
app.use('/', routes_1.default);
app.use('/auth', auth_1.default);
app.use('/insights', insights_1.default);
app.use('/treinador', treinador_1.default);
app.use('/aluno', aluno_1.default);
app.use('/exercicio', exercicio_1.default);
app.use('/rotina', rotina_1.default);
app.use('/treino', treino_1.default);
app.use('/serie', serie_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
module.exports = app;
exports.default = app;
