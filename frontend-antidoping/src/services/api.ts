import axios from 'axios';

const api = axios.create({
  // Substitua pela URL onde seu backend Node.js está rodando
  baseURL: 'https://sistema-antidoping-api.vercel.app/', 
});

export default api;