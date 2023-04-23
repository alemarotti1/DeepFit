-- CreateTable
CREATE TABLE `aluno` (
    `token_acesso` INTEGER NOT NULL,
    `nome` VARCHAR(45) NULL,
    `nascimento` DATE NULL,
    `objetivo` VARCHAR(255) NULL,
    `treinador_usuario` VARCHAR(255) NULL,

    PRIMARY KEY (`token_acesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `conjunto_serie` (
    `id_exercicio` INTEGER NOT NULL,
    `id_treino` INTEGER NOT NULL,
    `qtd_series` INTEGER NULL,
    `tempo_descanso` INTEGER NULL,
    `qtd_repeticoes` INTEGER NULL,

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
    `(outros dados corporais aqui)` VARCHAR(45) NULL,
    `token_acesso` INTEGER NOT NULL,

    INDEX `fk_Dados_corporais_Aluno_Aluno1`(`token_acesso`),
    PRIMARY KEY (`data_medicao`, `token_acesso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exercicio` (
    `id_exercicio` INTEGER NOT NULL AUTO_INCREMENT,
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
    `senha` VARCHAR(64) NOT NULL,
    `email` VARCHAR(45) NULL,
    `CPF` VARCHAR(11) NULL,
    `nome` VARCHAR(255) NULL,
    `CREF` VARCHAR(255) NULL,

    PRIMARY KEY (`usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `treino` (
    `id_treino` INTEGER NOT NULL AUTO_INCREMENT,
    `nome_rotina` VARCHAR(255) NOT NULL,
    `token_acesso` INTEGER NOT NULL,
    `dias_atribuidos` VARCHAR(255) NULL,

    INDEX `fk_Treino_Rotina1`(`nome_rotina`, `token_acesso`),
    PRIMARY KEY (`id_treino`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `aluno` ADD CONSTRAINT `aluno_treinador_usuario_fkey` FOREIGN KEY (`treinador_usuario`) REFERENCES `treinador`(`usuario`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `conjunto_serie` ADD CONSTRAINT `conjunto_serie_id_exercicio_fkey` FOREIGN KEY (`id_exercicio`) REFERENCES `exercicio`(`id_exercicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dado_sono` ADD CONSTRAINT `dado_sono_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dados_corporais_aluno` ADD CONSTRAINT `dados_corporais_aluno_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exercicio` ADD CONSTRAINT `exercicio_Treinador_usuario_fkey` FOREIGN KEY (`Treinador_usuario`) REFERENCES `treinador`(`usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rotina` ADD CONSTRAINT `rotina_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `secao_treino` ADD CONSTRAINT `secao_treino_id_treino_fkey` FOREIGN KEY (`id_treino`) REFERENCES `treino`(`id_treino`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `treino` ADD CONSTRAINT `treino_token_acesso_fkey` FOREIGN KEY (`token_acesso`) REFERENCES `aluno`(`token_acesso`) ON DELETE RESTRICT ON UPDATE CASCADE;
