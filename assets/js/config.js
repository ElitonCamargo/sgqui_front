// opções

// const urlApi = "https://sgqui.vercel.app";
const urlApi = "http://100.26.59.163:8080";

const opt = {
  "urlApi": urlApi,
  "urlLogar": `${urlApi}/usuario/login`,
  "urlElemento": `${urlApi}/elemento`,
  "urlNutriente": `${urlApi}/nutriente`,
  "urlMateriaPrima": `${urlApi}/materia_prima`,
  "urlGarantia": `${urlApi}/garantia`,
  "urlGarantiaMateriaPrima": `${urlApi}/garantia/materia_prima`,
  "urlProjeto": `${urlApi}/projeto`,
} 


const erro = {
  1: 'falha ao logar',
  2: 'falha ao carregar page/nav',
  3: 'falha ao carregar page/home',
  4: 'falha ao carregar page/footer',
  5: 'falha api carregar tabela elementos',
  6: 'falha api carregar tabela nutrientes',
  7: 'falha api editar nutrientes',
  8: 'falha api carregar tabela materia prima',
  9: 'falha api editar nutrientes',
  10: 'falha api cadastrar garantia',
  11: 'falha api deletar garantia',
  12: 'Erro autocomplete cadastrar garantia',
  13: 'Erro ao selecionar valor da garantia',
  14: 'Erro ao buscar no autocomplete',
  15: 'Falha ao carregar API Projetos',
}

const statusProjeto = [
  "Não Iniciado",
  'Inicializando',
  "Em Andamento",
  "Finalizado"
]

