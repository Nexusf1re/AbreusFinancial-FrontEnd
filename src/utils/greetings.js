// Função para obter o horário local
function getHoraLocal() {
  const dataAtual = new Date();
  const horas = dataAtual.getHours();

  return { horas };
}

// Função para saudação com base no horário
function saudacao() {
  const { horas } = getHoraLocal();

  if (horas >= 12 && horas < 18) {
    return "Boa Tarde";
  } else if (horas >= 18) {
    return "Boa Noite";
  } else {
    return "Bom Dia";
  }
}

// Função para obter o nome do mês atual
function getMesAtual() {
  const meses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const mesAtual = new Date().getMonth();
  return meses[mesAtual];
}


export { saudacao, getMesAtual };
