-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `bandLevel` VARCHAR(191) NOT NULL,
    `managerId` INTEGER NULL,

    UNIQUE INDEX `Employee_email_key`(`email`),
    INDEX `Employee_managerId_fkey`(`managerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedbackparameter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `paramName` VARCHAR(191) NOT NULL,
    `bandLevel` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `feedbackscore` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `feedbackId` INTEGER NOT NULL,
    `paramId` INTEGER NOT NULL,
    `score` DOUBLE NOT NULL,
    `comments` VARCHAR(191) NULL,

    INDEX `FeedbackScore_feedbackId_fkey`(`feedbackId`),
    INDEX `FeedbackScore_paramId_fkey`(`paramId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `monthlyfeedback` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empId` INTEGER NOT NULL,
    `feedbackMonth` VARCHAR(191) NOT NULL,
    `attachmentUrl` VARCHAR(191) NULL,
    `submissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isSubmitted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `MonthlyFeedback_empId_fkey`(`empId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rtapproval` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rtSubmissionId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,
    `approvalStatus` ENUM('APPROVED', 'REJECTED', 'PENDING') NOT NULL DEFAULT 'PENDING',
    `comments` VARCHAR(191) NULL,
    `approvedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RTApproval_adminId_fkey`(`adminId`),
    INDEX `RTApproval_rtSubmissionId_fkey`(`rtSubmissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rtcycle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'COMPLETED') NOT NULL DEFAULT 'ACTIVE',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rtsubmission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cycleId` INTEGER NOT NULL,
    `empId` INTEGER NOT NULL,
    `additionalComments` VARCHAR(191) NULL,
    `calculatedScore` DOUBLE NOT NULL,
    `finalGrade` VARCHAR(191) NULL,
    `adminOverrideScore` DOUBLE NULL,
    `adminComments` VARCHAR(191) NULL,
    `isApproved` BOOLEAN NOT NULL DEFAULT false,
    `submissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RTSubmission_cycleId_fkey`(`cycleId`),
    INDEX `RTSubmission_empId_fkey`(`empId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `employee` ADD CONSTRAINT `Employee_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `employee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedbackscore` ADD CONSTRAINT `FeedbackScore_feedbackId_fkey` FOREIGN KEY (`feedbackId`) REFERENCES `monthlyfeedback`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feedbackscore` ADD CONSTRAINT `FeedbackScore_paramId_fkey` FOREIGN KEY (`paramId`) REFERENCES `feedbackparameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `monthlyfeedback` ADD CONSTRAINT `MonthlyFeedback_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rtapproval` ADD CONSTRAINT `RTApproval_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rtapproval` ADD CONSTRAINT `RTApproval_rtSubmissionId_fkey` FOREIGN KEY (`rtSubmissionId`) REFERENCES `rtsubmission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rtsubmission` ADD CONSTRAINT `RTSubmission_cycleId_fkey` FOREIGN KEY (`cycleId`) REFERENCES `rtcycle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rtsubmission` ADD CONSTRAINT `RTSubmission_empId_fkey` FOREIGN KEY (`empId`) REFERENCES `employee`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
