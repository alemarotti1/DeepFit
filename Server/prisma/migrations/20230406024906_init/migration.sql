-- CreateTable
CREATE TABLE `aluno` (
    `token_acesso` INTEGER NOT NULL,
    `nome` VARCHAR(45) NULL,
    `nascimento` DATE NULL,
    `objetivo` VARCHAR(255) NULL,
    `Treinador_usuario` VARCHAR(255) NULL,

    INDEX `fk_Aluno_Treinador1`(`Treinador_usuario`),
    PRIMARY KEY (`token_acesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conjunto_serie` (
    `id_exercicio` INTEGER NOT NULL,
    `id_treino` INTEGER NOT NULL,
    `qtd_series` INTEGER NULL,
    `tempo_descanso` INTEGER NULL,
    `qtd_repeticoes` INTEGER NULL,

    INDEX `fk_Exercicio_has_Treino_Treino1`(`id_treino`),
    PRIMARY KEY (`id_exercicio`, `id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dado_sono` (
    `id_dado_relogio` INTEGER NOT NULL,
    `token_acesso` INTEGER NOT NULL,
    `tipo` VARCHAR(45) NULL,
    `valor` VARCHAR(45) NULL,
    `data_coleta` TIMESTAMP(0) NULL,

    INDEX `fk_dado_relogio_Aluno1`(`token_acesso`),
    PRIMARY KEY (`id_dado_relogio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dados_corporais_aluno` (
    `data_medicao` DATE NOT NULL,
    `token_acesso` INTEGER NOT NULL,
    `(outros dados corporais aqui)` VARCHAR(45) NULL,

    INDEX `fk_Dados_corporais_Aluno_Aluno1`(`token_acesso`),
    PRIMARY KEY (`data_medicao`, `token_acesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercicio` (
    `id_exercicio` INTEGER NOT NULL,
    `nome` VARCHAR(255) NULL,
    `tipo` VARCHAR(255) NULL,
    `grupo_muscular` VARCHAR(45) NULL,
    `Treinador_usuario` VARCHAR(255) NOT NULL,

    INDEX `fk_Exercicio_Treinador1`(`Treinador_usuario`),
    PRIMARY KEY (`id_exercicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `performance_treino_serie` (
    `id_treino` INTEGER NOT NULL,
    `dia_execucao` DATE NOT NULL,
    `id_exercicio` INTEGER NOT NULL,
    `Serie_id_treino` INTEGER NOT NULL,
    `n_execucao` INTEGER NOT NULL,

    INDEX `fk_Performance_Treino_Serie_Conjunto_Serie1`(`id_exercicio`, `Serie_id_treino`),
    PRIMARY KEY (`id_treino`, `dia_execucao`, `id_exercicio`, `Serie_id_treino`, `n_execucao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rotina` (
    `nome_rotina` INTEGER NOT NULL,
    `token_acesso` INTEGER NOT NULL,

    INDEX `fk_Rotina_Aluno1`(`token_acesso`),
    PRIMARY KEY (`nome_rotina`, `token_acesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `secao_treino` (
    `id_treino` INTEGER NOT NULL,
    `dia_execucao` DATE NOT NULL,

    PRIMARY KEY (`id_treino`, `dia_execucao`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treinador` (
    `usuario` VARCHAR(255) NOT NULL,
    `senha` VARCHAR(64) NULL,
    `email` VARCHAR(45) NULL,
    `(informacoes extras sobre o treinador)` VARCHAR(45) NULL,

    PRIMARY KEY (`usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treino` (
    `id_treino` INTEGER NOT NULL,
    `nome_rotina` INTEGER NOT NULL,
    `token_acesso` INTEGER NOT NULL,
    `treinador_usuario` VARCHAR(255) NOT NULL,
    `dias_atribuidos` VARCHAR(255) NULL,

    INDEX `fk_Treino_Rotina1`(`nome_rotina`, `token_acesso`),
    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
