function getHoraLocal() {
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    const minutos = dataAtual.getMinutes();
    
    return { horas, minutos };
}

function saudacao() {
    const { horas, minutos } = getHoraLocal();

    if (horas >= 12 && horas < 18) {
        return "Boa Tarde";
    } else if (horas >= 18) {
        return "Boa Noite";
    } else {
        return "Bom Dia";
    }
}

console.log(saudacao()); // Exibe "Bom Dia", "Boa Tarde" ou "Boa Noite" conforme a hora atual

export default saudacao;
