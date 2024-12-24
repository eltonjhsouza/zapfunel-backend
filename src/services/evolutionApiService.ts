import evolutionApiClient from "../lib/evolutionApi";

export const createEvolutionInstance = async (instanceData: any) => {
    try {
      const response = await evolutionApiClient.post('/instance/create', instanceData);
      return response.data;
    } catch (error) {
      console.error('Error creating Evolution API instance:', error);
      throw error;
    }
  };

export async function getConnectionState(instanceName: string | null, apiKey: string | null) {
  try {
    const response = await evolutionApiClient.get(`/instance/connectionState/${instanceName}`, {
      headers: {
        "apiKey": apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating Evolution API instance:', error);
    throw error;
  }
}
