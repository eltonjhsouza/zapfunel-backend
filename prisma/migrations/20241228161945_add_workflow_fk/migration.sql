-- AddForeignKey
ALTER TABLE `executionphase` ADD CONSTRAINT `executionphase_workflowExecutionId_fkey` FOREIGN KEY (`workflowExecutionId`) REFERENCES `workflowexecution`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
