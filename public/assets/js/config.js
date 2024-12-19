const urlApi = "http://100.26.59.163:8080";
// const urlApi = "192.168.15.4:8080";

const opt = {
  "urlApi": urlApi,
  "urlLogar": `${urlApi}/usuario/login`,
  "urlElemento": `${urlApi}/elemento`,
  "urlNutriente": `${urlApi}/nutriente`,
  "urlMateriaPrima": `${urlApi}/materia_prima`,
  "urlGarantia": `${urlApi}/garantia`,
  "urlGarantiaMateriaPrima": `${urlApi}/garantia/materia_prima`,
  "urlProjeto": `${urlApi}/projeto`,
  "urlUsuario": `${urlApi}/usuario`,
  "urlEtapa": `${urlApi}/etapa`,
  "urlEtapaMp": `${urlApi}/etapa_mp`,
  "urlConfig": `${urlApi}/configuracao`,
  "usuario": `${urlApi}/usuario`
}



const selectsProjeto = {
  status: [
    "Não Iniciado",
    'Inicializando',
    "Em Andamento",
    "Finalizado"
  ],
  natureza: [
    "Fluido (Solução)",
    "Fluido (Suspensão)",
    "Susp. Concentrada",
    "Sólido"
  ],
  tipoFertilizante: [
    "Mineral Misto/Simples",
    "Organomineral"
  ],
  modoAplicacao: [
    "Foliar",
    "Fertirrigação",
    "Solo",
    "Hidroponia",
    "Semente"
  ]
};
