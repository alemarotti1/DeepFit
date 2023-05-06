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
const TreinadorRouter = express.Router();
TreinadorRouter.get('/:email', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.params;
    try {
        // Busca o treinador no banco de dados com o email especificado
        const treinador = yield config_1.default.treinador.findFirst({
            where: {
                email: email,
            },
            include: {
                aluno: true,
                exercicio: true,
            },
        });
        // Se o treinador não for encontrado, retorna um erro 404
        if (!treinador) {
            return res.status(404).send('Treinador não encontrado');
        }
        // Retorna o treinador encontrado
        return res.send(treinador);
    }
    catch (error) {
        // Se ocorrer um erro, retorna um erro 500
        console.error(error);
        return res.status(500).send('Erro ao buscar o treinador');
    }
}));
TreinadorRouter.put('/:usuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { senha, email, CPF, nome, CREF } = req.body;
    const { usuario } = req.params;
    try {
        // Verifica se o registro de treinador existe no banco de dados
        const treinadorExistente = yield config_1.default.treinador.findUnique({
            where: {
                usuario: usuario,
            },
        });
        if (!treinadorExistente) {
            return res.status(404).send('Treinador não encontrado');
        }
        // Atualiza o registro de treinador existente no banco de dados
        const treinadorAtualizado = yield config_1.default.treinador.update({
            where: {
                usuario: usuario,
            },
            data: {
                senha: senha || treinadorExistente.senha,
                email: email || treinadorExistente.email,
                CPF: CPF || treinadorExistente.CPF,
                nome: nome || treinadorExistente.nome,
                CREF: CREF || treinadorExistente.CREF,
            },
        });
        // Retorna o registro de treinador atualizado
        return res.send(treinadorAtualizado);
    }
    catch (error) {
        // Se ocorrer um erro, retorna um erro 500
        console.error(error);
        return res.status(500).send('Erro ao atualizar o treinador');
    }
}));
exports.default = TreinadorRouter;
