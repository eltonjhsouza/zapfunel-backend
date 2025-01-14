-- AddForeignKey
ALTER TABLE `platform_events` ADD CONSTRAINT `platform_events_platform_id_fkey` FOREIGN KEY (`platform_id`) REFERENCES `integration_platforms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
