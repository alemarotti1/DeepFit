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
const SerieRouter = express.Router();
SerieRouter.put('/:tokenAcessoAluno/:nomeRotina/:id_treino', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_exercicio, qtd_series, qtd_repeticoes, carga, tempo_descanso } = req.body;
    if (!(id_exercicio && qtd_series && qtd_repeticoes && carga && tempo_descanso)) {
        res.status(400).send("Bad Request");
        return;
    }
    try {
        const conjunto_serie = yield config_1.default.conjunto_serie.create({
            data: {
                treino: {
                    connect: {
                        id_treino: parseInt(req.params.id_treino),
                    },
                },
                exercicio: {
                    connect: {
                        id_exercicio: id_exercicio,
                    },
                },
                qtd_series: qtd_series,
                qtd_repeticoes: qtd_repeticoes,
                carga: carga,
                tempo_descanso: tempo_descanso,
            },
        });
        res.status(201).json(conjunto_serie);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
        console.log(error);
    }
}));
SerieRouter.get('/:tokenAcessoAluno/:nomeRotina/:nomeTreino', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const treinador = req.body.user;
    try {
        const series = yield config_1.default.conjunto_serie.findMany({
            where: {
                treino: {
                    aluno: {
                        professor_usuario: {
                            usuario: treinador
                        },
                        token_acesso: req.params.tokenAcessoAluno
                    },
                    rotina: {
                        nome_rotina: req.params.nomeRotina
                    },
                }
            }
        });
        res.status(200).json(series);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o exercício' });
        console.log(error);
    }
    config_1.default.$disconnect();
}));
SerieRouter.patch('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    config_1.default.$connect();
    const id_exercicio = req.body.id_exercicio ? req.body.id_exercicio : null;
    const id_treino = req.body.id_treino ? req.body.id_treino : null;
    const qtd_series = req.body.qtd_series ? req.body.qtd_series : 0;
    const qtd_repeticoes = req.body.qtd_repeticoes ? req.body.qtd_repeticoes : null;
    const carga = req.body.carga ? req.body.carga : null;
    const tempo_descanso = req.body.tempo_descanso ? req.body.tempo_descanso : null;
    if (!(id_exercicio && id_treino)) {
        res.status(400).send("Bad Request");
        return;
    }
    let conjunto_serie = null;
    try {
        conjunto_serie = yield config_1.default.conjunto_serie.findFirst({
            where: {
                id_exercicio: id_exercicio,
                id_treino: id_treino
            }
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o exercício' });
        console.log(error);
    }
    if (!conjunto_serie) {
        res.status(404).json({ error: 'Não foi possível localizar o exercício' });
        return;
    }
    try {
        conjunto_serie = yield config_1.default.conjunto_serie.update({
            where: {
                id_exercicio_id_treino: {
                    id_exercicio: id_exercicio,
                    id_treino: id_treino
                }
            },
            data: {
                qtd_series: qtd_series ? qtd_series : conjunto_serie.qtd_series,
                qtd_repeticoes: qtd_repeticoes ? qtd_repeticoes : conjunto_serie.qtd_repeticoes,
                carga: carga ? carga : conjunto_serie.carga,
                tempo_descanso: tempo_descanso ? tempo_descanso : conjunto_serie.tempo_descanso,
            }
        });
        res.status(200).json(conjunto_serie);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível atualizar o exercício' });
        console.log(error);
    }
    config_1.default.$disconnect();
}));
SerieRouter.delete('/', TreinadorController_1.validateJWT, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id_exercicio = req.body.id_exercicio ? req.body.id_exercicio : null;
    const id_treino = req.body.id_treino ? req.body.id_treino : null;
    config_1.default.$connect();
    if (!(id_exercicio && id_treino)) {
        res.status(400).send("Bad Request");
        return;
    }
    try {
        const conjunto_serie = yield config_1.default.conjunto_serie.delete({
            where: {
                id_exercicio_id_treino: {
                    id_exercicio: id_exercicio,
                    id_treino: id_treino
                }
            }
        });
        res.status(200).json(conjunto_serie);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível deletar o exercício' });
        console.log(error);
    }
    config_1.default.$disconnect();
}));
exports.default = SerieRouter;
