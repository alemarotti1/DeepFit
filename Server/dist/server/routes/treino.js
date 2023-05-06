"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const config_1 = __importDefault(require("../config"));
const TreinadorController_1 = require("../features/base/TreinadorController");
const TreinoRouter = express.Router();
TreinoRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome_rotina, tokenAcesso, diasAtribuidos } = req.body;
    try {
        // Criar o novo exercício usando o Prisma
        const treino = yield config_1.default.treino.create({
            data: {
                nome_rotina: nome_rotina,
                token_acesso: tokenAcesso,
                dias_atribuidos: diasAtribuidos,
            },
        });
        // Enviar o exercício criado como resposta à solicitação
        res.status(201).json(treino);
    }
    catch (error) {
        // Se houver um erro ao criar o exercício, envie uma resposta de erro com código 500
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
    }
}));
TreinoRouter.get('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const aluno_id = req.body.user;
    const dias_atribuidos = req.body.days;
    console.log("aluno_id: " + aluno_id);
    const alunos = yield config_1.default.treino.findMany({
        where: {
            dias_atribuidos: dias_atribuidos,
            aluno: {
                token_acesso: aluno_id
            }
        }
    });
    config_1.default.$disconnect();
    res.send(alunos);
}));
exports.default = TreinoRouter;
