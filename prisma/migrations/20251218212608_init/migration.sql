-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `balance` DECIMAL(10, 2) NOT NULL DEFAULT 1000.00,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `markets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `question` VARCHAR(255) NOT NULL,
    `creator_id` INTEGER NOT NULL,
    `yes_shares` INTEGER NOT NULL DEFAULT 100,
    `no_shares` INTEGER NOT NULL DEFAULT 100,
    `resolved` BOOLEAN NOT NULL DEFAULT false,
    `outcome` BOOLEAN NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `market_id` INTEGER NOT NULL,
    `side` VARCHAR(3) NOT NULL,
    `shares` INTEGER NOT NULL,
    `price` DECIMAL(5, 4) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `markets` ADD CONSTRAINT `markets_creator_id_fkey` FOREIGN KEY (`creator_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bets` ADD CONSTRAINT `bets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bets` ADD CONSTRAINT `bets_market_id_fkey` FOREIGN KEY (`market_id`) REFERENCES `markets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
