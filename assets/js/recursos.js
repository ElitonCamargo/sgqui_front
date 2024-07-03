$(function () {
    // LOGAR
    $(document).on('click', '#logar', function () {
        let email = $('#email').val();
        let password = $('#password').val();

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "senha": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(opt.urlLogar, requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.success) {

                    if (!getSessionData('tk')) {
                        setSessionData('tk', response.data[0].token);
                        setSessionData('us', response.data[2]);
                        window.location.href = "/";
                    }
                } else {
                    $('#loginErro').text(response.erro); // Define o texto da div de erro
                    $('#loginErro').show(); // Mostra a div de erro
                }
            })
    });
    // FIM LOGAR

})

const req_GET = async (url = "") => {

    // Mostra o preload antes de fazer a requisição
    showPreload();
    try {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getSessionData('tk')
            },
            redirect: "follow",
        });

        // Remove o preload após completar a requisição
        hidePreload();
        return response.json();
    } catch (error) {
        let result = await response.json();
        return {
            status: result.status,
            message: result.erro,
            data: null
        };
    }
}

const req_UPDATE = async (url = "", data = {}) => {
    // Mostra o preload antes de fazer a requisição
    showPreload();
    try {
        const response = await fetch(url, {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getSessionData('tk')
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        // Remove o preload após completar a requisição
        hidePreload();
        return response.json();
    } catch (error) {
        let result = await response.json();
        return {
            status: result.status,
            message: result.erro,
            data: null
        };
    }
}



const req_INSERT = async (url = "", data = {}) => {
    // Mostra o preload antes de fazer a requisição
    showPreload();
    try {

        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getSessionData('tk')
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
        });

        // Remove o preload após completar a requisição
        hidePreload();
        return response.json();
    } catch (error) {
        let result = await response.json();
        return {
            status: result.status,
            message: result.erro,
            data: null
        };
    }
}

const req_DELETE = async (url = '') => {
    // Mostra o preload antes de fazer a requisição
    showPreload();
    try {
        const response = await fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "omit",
            headers: {
                "Content-Type": "application/json",
                "Authorization": getSessionData('tk')
            },
            redirect: "follow",
            referrerPolicy: "no-referrer"
        });

        // Remove o preload após completar a requisição
        hidePreload();
        return response.json();
    } catch (error) {
        let result = await response.json();
        return {
            status: result.status,
            message: result.erro,
            data: null
        };
    }
}

// Função para mostrar o preload (pode ser uma spinner, mensagem, etc.)
const showPreload = () => {
    // Exemplo simples: mostrando uma mensagem de "Carregando..."
    const preloadElement = document.getElementById('preload');
    if (preloadElement) {
        preloadElement.classList.remove('d-none'); // Remove a classe d-none para mostrar o elemento
        preloadElement.classList.add('d-block'); // Adiciona a classe d-block para garantir que o elemento seja exibido
    }
};

// Função para esconder o preload após a requisição
const hidePreload = () => {
    const preloadElement = document.getElementById('preload');
    if (preloadElement) {
        preloadElement.classList.remove('d-block'); // Remove a classe d-block para esconder o elemento
        preloadElement.classList.add('d-none'); // Adiciona a classe d-none para garantir que o elemento seja ocultado
    }
};


//Função para criar uma sessão com dados
const setSessionData = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
}

// Função para obter dados da sessão
const getSessionData = (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

// Função para destruir uma sessão
const destroySession = (key) => {
    sessionStorage.removeItem(key);
}


//Função para transformar dados de um form em json
const serializadoParaJSON = (serializado) => {
    let partes = serializado.split('&');
    let objeto = {};
    partes.forEach(function (parte) {
        let chaveValor = parte.split('=');
        let chave = decodeURIComponent(chaveValor[0]);
        let valor = decodeURIComponent(chaveValor[1]);
        objeto[chave] = valor;
    });
    return objeto;
}

//Função para formatar data para pt-BR
const formatarDataPtBr = (dataString) => {
    const data = new Date(dataString);
    const dia = ('0' + data.getDate()).slice(-2); // obtém o dia com dois dígitos
    const mes = ('0' + (data.getMonth() + 1)).slice(-2); // obtém o mês com dois dígitos
    const ano = data.getFullYear(); // obtém o ano com quatro dígitos

    return `${dia}/${mes}/${ano}`;
}

//Função para formatar data para Mysql
const formatarDataMysql = (data) => {
    // Dividir a string da data em dia, mês e ano
    const partes = data.split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = partes[2];

    // Formatar a data no formato yyyy-mm-dd
    const dataFormatada = `${ano}-${mes}-${dia}`;

    return dataFormatada;
}

//função para pegar paramentros da url, retorna array
const getAllUrlParams = () => {
    var queryString = window.location.search.slice(1);
    var params = {};

    if (queryString) {
        var pairs = queryString.split('&');

        pairs.forEach(function (pair) {
            var keyValue = pair.split('=');
            var key = decodeURIComponent(keyValue[0]);
            var value = decodeURIComponent(keyValue[1] || '');

            // Se a chave já existir, converte o valor para um array
            if (params[key]) {
                if (!Array.isArray(params[key])) {
                    params[key] = [params[key]];
                }
                params[key].push(value);
            } else {
                params[key] = value;
            }
        });
    }

    return params;
}

const showError = (codErro, codStatus) => {

    alert(`Erro ${codErro}: ${erro[codErro]}`);

    if (codStatus === 498) {
        destroySession('tk');
        destroySession('us');
        window.location.reload(true);
    }
}

// inicia paginas
async function start() {
    if (!getSessionData('tk')) {
        document.getElementById('nav').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        await fetch('/page/login.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('root').innerHTML = data;
            })
            .catch(error => console.error('Erro01:', error));
    } else {
        await fetch('/page/nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav').innerHTML = data;
            })
            .catch(error => console.error('Erro02:', error));

        // Verificar se a URL não tem diretórios
        const hasNoDirectories = window.location.pathname.split('/').filter(segment => segment.trim() !== '').length === 0;

        // Se a URL não tem diretórios, realizar a busca
        if (hasNoDirectories) {
            await fetch('/page/home.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('root').innerHTML = data;
                })
                .catch(error => console.error('Erro03:', error));
        }

        await fetch('/page/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
            })
            .catch(error => console.error('Erro04:', error));
    }
}