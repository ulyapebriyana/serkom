-- CreateTable
CREATE TABLE `Customer` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `identityNumber` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `roomType` VARCHAR(191) NOT NULL,
    `stayDuration` VARCHAR(191) NOT NULL,
    `discount` VARCHAR(191) NULL,
    `paymentAmount` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
