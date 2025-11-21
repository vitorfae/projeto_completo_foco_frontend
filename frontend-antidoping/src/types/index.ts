export interface Atleta {
  id?: number; // Opcional pois na criação não existe ainda
  nome: string;
  idade: number;
  altura: number;
  esporte: string;
  peso: number;
}

export interface TesteAntidoping {
  id?: number;
  data_exame: string;
  resultado_positivo: boolean;
  substancia_detectada: string;
  atleta_id: number;
}