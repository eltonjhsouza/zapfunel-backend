import { Prisma } from "@prisma/client";

export const createWebhook = async (data: Prisma.WebhookCountAggregateInputType) => {
    data.updatedAt = new Date();
    data.workflowId = crypto.randomBytes(16).toString('hex').toUpperCase();
    return await prisma.workflow.create({
      data,
    });
  };
  