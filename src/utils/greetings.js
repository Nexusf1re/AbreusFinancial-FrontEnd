function getHoraLocal() {
    const dataAtual = new Date();
    const horas = dataAtual.getHours();
    
    return { horas };
}

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

console.log(saudacao()); // Exibe "Bom Dia", "Boa Tarde" ou "Boa Noite" conforme a hora atual

export default saudacao;