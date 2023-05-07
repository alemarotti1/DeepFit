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
const ExercicioRouter = express.Router();
ExercicioRouter.post('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Extrair as informações do corpo da solicitação
    const { nome, tipo, grupo_muscular, user } = req.body;
    try {
        // Criar o novo exercício usando o Prisma
        const exercicio = yield config_1.default.exercicio.create({
            data: {
                nome: nome,
                tipo: tipo,
                grupo_muscular: grupo_muscular,
                Treinador_usuario: user,
            },
        });
        // Enviar o exercício criado como resposta à solicitação
        res.status(201).json(exercicio);
    }
    catch (error) {
        // Se houver um erro ao criar o exercício, envie uma resposta de erro com código 500
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
    }
}));
ExercicioRouter.get('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    //todos os exercicios daquele treinador
    const trainer_id = req.body.user;
    console.log("trainerid: " + trainer_id);
    const exercicios = yield config_1.default.exercicio.findMany({
        where: {
            Treinador_usuario: trainer_id
        }
    });
    config_1.default.$disconnect();
    res.send(exercicios);
}));
ExercicioRouter.get('/:idExercicio', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    //todos os exercicios daquele treinador
    const trainer_id = req.body.user;
    console.log("trainerid: " + trainer_id);
    try {
        const exercicios = yield config_1.default.exercicio.findFirst({
            where: {
                Treinador_usuario: trainer_id,
                id_exercicio: parseInt(req.params.idExercicio)
            }
        });
        res.send(exercicios);
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
    }
    config_1.default.$disconnect();
}));
ExercicioRouter.put('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        config_1.default.$connect();
        if (req.body.nome) {
            let exercicio = config_1.default.exercicio.findFirst({
                where: {
                    nome: req.body.nome
                    //nome do exercicio for o mesmo do pedido
                }
            });
            if (!exercicio)
                res.status(400).send("Exercicio não encontrado");
            else {
                let id_exercicio = req.body.id_exercicio;
                let exercicio = yield config_1.default.exercicio.update({
                    where: {
                        id_exercicio: id_exercicio
                    },
                    data: {
                        nome: req.body.nome,
                        tipo: req.body.tipo,
                        grupo_muscular: req.body.grupo_muscular,
                        treinador: req.body.treinador,
                    }
                });
                res.send(exercicio);
            }
        }
    }
    catch (err) {
        res.status(500).send('Internal Server Error');
        console.log(err);
        config_1.default.$disconnect();
    }
}));
exports.default = ExercicioRouter;
