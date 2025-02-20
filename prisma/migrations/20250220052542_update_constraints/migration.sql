/*
  Warnings:

  - A unique constraint covering the columns `[empId,feedbackMonth]` on the table `monthlyfeedback` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `rtsubmission` ADD COLUMN `isEligibleForSubmission` BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX `monthlyfeedback_empId_feedbackMonth_key` ON `monthlyfeedback`(`empId`, `feedbackMonth`);
