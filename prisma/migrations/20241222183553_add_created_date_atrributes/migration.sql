/*
  Warnings:

  - Added the required column `updatedAt` to the `Contacts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `InstanceIntegration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Instances` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Contacts_instanceId_fkey` ON `contacts`;

-- DropIndex
DROP INDEX `ExecutionLog_executionPhaseId_fkey` ON `executionlog`;

-- DropIndex
DROP INDEX `ExecutionPhase_userId_fkey` ON `executionphase`;

-- DropIndex
DROP INDEX `Instances_integrationId_fkey` ON `instances`;

-- DropIndex
DROP INDEX `Instances_userId_fkey` ON `instances`;

-- DropIndex
DROP INDEX `messages_contactId_fkey` ON `messages`;

-- DropIndex
DROP INDEX `messages_instanceId_fkey` ON `messages`;

-- DropIndex
DROP INDEX `platform_events_platform_id_fkey` ON `platform_events`;

-- DropIndex
DROP INDEX `Tags_userId_fkey` ON `tags`;

-- DropIndex
DROP INDEX `webhooks_platform_event_id_fkey` ON `webhooks`;

-- DropIndex
DROP INDEX `webhooks_userId_fkey` ON `webhooks`;

-- DropIndex
DROP INDEX `WorkflowExecution_workflowId_fkey` ON `workflowexecution`;

-- AlterTable
ALTER TABLE `contacts` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `instanceintegration` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `instances` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `tags` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `platform_events` ADD CONSTRAINT `platform_events_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `integration_platforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `webhooks` ADD CONSTRAINT `webhooks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `webhooks` ADD CONSTRAINT `webhooks_platform_event_id_fkey` FOREIGN KEY (`platform_event_id`) REFERENCES `platform_events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_instanceId_fkey` FOREIGN KEY (`instanceId`) REFERENCES `Instances`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_contactId_fkey` FOREIGN KEY (`contactId`) REFERENCES `Contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkFlow` ADD CONSTRAINT `WorkFlow_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WorkflowExecution` ADD CONSTRAINT `WorkflowExecution_workflowId_fkey` FOREIGN KEY (`workflowId`) REFERENCES `WorkFlow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExecutionPhase` ADD CONSTRAINT `ExecutionPhase_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExecutionLog` ADD CONSTRAINT `ExecutionLog_executionPhaseId_fkey` FOREIGN KEY (`executionPhaseId`) REFERENCES `ExecutionPhase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instances` ADD CONSTRAINT `Instances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Instances` ADD CONSTRAINT `Instances_integrationId_fkey` FOREIGN KEY (`integrationId`) REFERENCES `InstanceIntegration`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contacts` ADD CONSTRAINT `Contacts_instanceId_fkey` FOREIGN KEY (`instanceId`) REFERENCES `Instances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tags` ADD CONSTRAINT `Tags_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
