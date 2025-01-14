import kiwifyHandler from './platformHandlers/kiwifyHandler';
import hotmartHandler from './platformHandlers/hotmartHandler'

const platformHandlers: { [key: string]: Function } = {
  kiwify: kiwifyHandler,
  hotmart: hotmartHandler,
};

export const handlePlatformEvent = async (platform: string, workflowid: string, data: any) => {
  const handler = platformHandlers[platform];
  if (!handler) {
    throw new Error(`Handler não encontrado para a plataforma: ${platform}`);
  }
  await handler(workflowid, data);
};