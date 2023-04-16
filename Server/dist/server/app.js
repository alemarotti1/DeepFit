"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const treinador_1 = __importDefault(require("./routes/treinador"));
const insights_1 = __importDefault(require("./routes/insights"));
const aluno_1 = __importDefault(require("./routes/aluno"));
const auth_1 = __importDefault(require("./routes/auth"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//defining the standard routes
app.use('/', routes_1.default);
app.use('/auth', auth_1.default);
app.use('/insights', insights_1.default);
app.use('/treinador', treinador_1.default);
app.use('/aluno', aluno_1.default);
module.exports = app;
exports.default = app;
