// Função responsável por format um número para o padrão Real Brasileiro
export const formatCurrency = (value: number) => {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}