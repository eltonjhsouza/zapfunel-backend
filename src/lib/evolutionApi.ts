import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const evolutionApiClient = axios.create({
  baseURL: process.env.EVOLUTION_API_URL || 'https://api2.zapime.com.br',
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.EVOLUTION_API_KEY
  },
});

export default evolutionApiClient;