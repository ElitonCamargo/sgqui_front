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

//LOGOFF
const logoff = () => {
    destroySession('tk');
    destroySession('us');
    start();
}

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

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        alert('Erro ao tentar carregar os dados');
        console.error('Erro ao tentar fazer fetch:', error);
        // Retorna um objeto com status e mensagem de erro
        return {
            status: null, // Aqui você pode definir um valor padrão para status de erro
            message: 'Ocorreu um erro ao tentar carregar os dados. Por favor, tente novamente mais tarde.',
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

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        alert('Erro ao tentar carregar os dados');
        console.error('Erro ao tentar fazer fetch:', error);
        // Retorna um objeto com status e mensagem de erro
        return {
            status: null, // Aqui você pode definir um valor padrão para status de erro
            message: 'Ocorreu um erro ao tentar carregar os dados. Por favor, tente novamente mais tarde.',
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

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        alert('Erro ao tentar carregar os dados');
        console.error('Erro ao tentar fazer fetch:', error);
        // Retorna um objeto com status e mensagem de erro
        return {
            status: null, // Aqui você pode definir um valor padrão para status de erro
            message: 'Ocorreu um erro ao tentar carregar os dados. Por favor, tente novamente mais tarde.',
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

        if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch');
        }
        return await response.json();
    } catch (error) {
        alert('Erro ao tentar carregar os dados');
        console.error('Erro ao tentar fazer fetch:', error);
        // Retorna um objeto com status e mensagem de erro
        return {
            status: null, // Aqui você pode definir um valor padrão para status de erro
            message: 'Ocorreu um erro ao tentar carregar os dados. Por favor, tente novamente mais tarde.',
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
    if (!dataString) return ''; // Retorna vazio se dataString for falsy

    const data = new Date(dataString);

    // Verifica se o horário é diferente de zero
    const temHorario = dataString.includes('T') || dataString.includes(' ');

    let dia = ('0' + data.getDate()).slice(-2); // obtém o dia com dois dígitos
    let mes = ('0' + (data.getMonth() + 1)).slice(-2); // obtém o mês com dois dígitos
    const ano = data.getFullYear(); // obtém o ano com quatro dígitos

    // Verifica se o formato é "2024-07-02 16:12:38.000000"
    if (temHorario) {
        const hora = ('0' + data.getHours()).slice(-2);
        const minuto = ('0' + data.getMinutes()).slice(-2);
        const segundo = ('0' + data.getSeconds()).slice(-2);
        return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    } else {
        return `${dia}/${mes}/${ano}`;
    }
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


async function start() {
    // console.log("Start function called");
    if (!getSessionData('tk')) {
        document.getElementById('nav').innerHTML = '';
        document.getElementById('footer').innerHTML = '';
        await fetch('/page/login.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('root').innerHTML = data;
                console.log("Login page loaded");
            })
            .catch(error => console.error('Erro01:', error));
    } else {
        await carregaMenu();
        await carregaHome();
        await carregaRodape();
        await carregaCardsHome();
        await inserirNomeLogado();
    }
}

async function carregaMenu() {
    try {
        await fetch('/page/nav.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('nav').innerHTML = data;
                // console.log("Nav loaded");
            })
            .catch(error => console.error('Erro02:', error));
    } catch (error) {
        console.error('Erro ao carregar a navegação:', error);
    }
}

async function carregaHome() {
    try {
        const hasNoDirectories = window.location.pathname.split('/').filter(segment => segment.trim() !== '').length === 0;
        if (hasNoDirectories) {
            await fetch('/page/home.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('root').innerHTML = data;
                    console.log("Home page loaded");
                })
                .catch(error => console.error('Erro03:', error));
        }
    } catch (error) {
        console.error('Erro ao carregar a página home:', error);
    }
}

async function carregaRodape() {
    try {
        await fetch('/page/footer.html')
            .then(response => response.text())
            .then(data => {
                document.getElementById('footer').innerHTML = data;
                // console.log("Footer loaded");
            })
            .catch(error => console.error('Erro04:', error));
    } catch (error) {
        console.error('Erro ao carregar o footer:', error);
    }
}

async function carregaCardsHome() {
    try {
        // Carrega o conteúdo do menu e dos cards do nav.json
        const response = await fetch('/page/nav.json'); // Atualize o caminho para nav.json
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        const data = await response.json();

        // Verifica se 'data.menu' existe antes de usá-lo
        if (!data.menu) {
            throw new Error('Menu não encontrado no arquivo JSON.');
        }

        // Adiciona o conteúdo do menu à página
        const menu = data.menu;
        const navbarMenu = document.getElementById('navbar-menu');

        // Verifica se o navbarMenu foi carregado
        if (!navbarMenu) {
            console.error('Elemento #navbar-menu não encontrado.');
            return;
        }

        // Adiciona itens de menu e cards
        menu.forEach(item => {
            if (item.dropdown) {
                // Cria um item de dropdown
                const dropdown = document.createElement('li');
                dropdown.className = 'nav-item dropdown';
                dropdown.innerHTML = `
                    <a class="nav-link dropdown-toggle" href="#" id="${item.title.replace(/\s+/g, '')}" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="fa-solid ${item.icon} me-2"></i>${item.title}
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="${item.title.replace(/\s+/g, '')}">
                        ${item.dropdown.map(subItem => `<li><a class="dropdown-item" href="${subItem.url}">${subItem.title}</a></li>`).join('')}
                    </ul>
                `;
                navbarMenu.appendChild(dropdown);
            } else {
                // Cria um item de menu normal
                const navItem = document.createElement('li');
                navItem.className = 'nav-item';
                navItem.innerHTML = `
                    <a class="nav-link" href="${item.url}" id="${item.id || ''}">
                        <i class="fa-solid ${item.icon} me-2"></i>${item.title}
                    </a>
                `;
                navbarMenu.appendChild(navItem);
            }
        });

        // Função para criar os cards
        function criarCards() {
            const cardsContainer = document.getElementById('cards-home');
            if (cardsContainer) {
                menu.forEach(item => {
                    const cardElement = document.createElement('div');
                    cardElement.className = 'col-md-4 mb-3';
                    cardElement.innerHTML = `
                    <div class="card shadow">
                        <a class="card-body text-center" href="${getCardUrl(item)}" style="
                        text-decoration:none;
                        line-height: 3.5em;
                        ">
                            <i class="fa-solid fa-2xl ${item.icon}"></i>
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.text}</p>
                        </a>
                    </div>
            `;
                    cardsContainer.appendChild(cardElement);
                });
            }
        }
        if (document.getElementById('cards-home')) {
            criarCards();
        }


        // Adiciona o listener para o botão de logoff, se estiver presente
        const logoffButton = document.getElementById('btnLogoff');
        if (logoffButton) {
            logoffButton.addEventListener('click', () => {
                // Adicione a lógica de logoff aqui
                alert('Você foi desconectado.');
            });
        }

    } catch (error) {
        console.error('Erro ao carregar o menu e os dados dos cards:', error);
    }

    function getCardUrl(item) {
        if (item.url) {
            return item.url; // Se o item tiver uma URL definida, usa ela diretamente
        } else if (item.dropdown) {
            const listarItem = item.dropdown.find(subItem => subItem.title === 'Listar');
            if (listarItem) {
                return listarItem.url; // Retorna a URL de "Listar" se existir no submenu
            }
        }
        return '#'; // Caso contrário, retorna uma URL padrão ou "#" (página atual)
    }
}

async function inserirNomeLogado() {
    try {
        // Assume que getSessionData é uma função assíncrona
        let sessionUs = await getSessionData('us');

        // Verifique se o nome do usuário existe e não está vazio
        if (sessionUs && sessionUs.usuario && sessionUs.usuario.nome.length > 0) {
            document.getElementById('nomeLogado').innerText = sessionUs.usuario.nome + ' logado';
        } else {
            console.log('Nome de usuário não encontrado ou está vazio.');
        }
    } catch (error) {
        console.error('Erro ao obter os dados da sessão:', error);
    }
}

// Chama a função assíncrona para inserir o nome do usuário
inserirNomeLogado();

