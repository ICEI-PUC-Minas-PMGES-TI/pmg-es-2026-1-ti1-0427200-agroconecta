// Estado global da aplicação
let appState = {
    currentPage: 'search',
    searchResults: [],
    selectedProfessional: null,
    searchQuery: '',
    filters: {
        region: '',
        specialty: '',
        rating: ''
    }
};

// Elementos do DOM
const pages = {
    search: document.getElementById('search-page'),
    results: document.getElementById('results-page'),
    profile: document.getElementById('profile-page'),
    chosen: document.getElementById('chosen-page'),
    confirmation: document.getElementById('confirmation-page')
};

const buttons = {
    search: document.getElementById('search-btn'),
    backToSearch: document.getElementById('back-to-search'),
    backToResults: document.getElementById('back-to-results'),
    backToProfile: document.getElementById('back-to-profile'),
    chooseProfile: document.getElementById('choose-profile-btn'),
    contact: document.getElementById('contact-btn'),
    backToSearchFinal: document.getElementById('back-to-search-final')
};

const inputs = {
    search: document.getElementById('search-input'),
    region: document.getElementById('filter-region'),
    specialty: document.getElementById('filter-specialty'),
    price: document.getElementById('filter-price')
};

// Inicializar event listeners
function initEventListeners() {
    buttons.search.addEventListener('click', handleSearch);
    buttons.backToSearch.addEventListener('click', () => goToPage('search'));
    buttons.backToResults.addEventListener('click', () => goToPage('results'));
    buttons.backToProfile.addEventListener('click', () => goToPage('profile'));
    buttons.chooseProfile.addEventListener('click', () => goToPage('chosen'));
    buttons.contact.addEventListener('click', handleContactSubmit);
    buttons.backToSearchFinal.addEventListener('click', () => goToPage('search'));
    
    // Enter key na busca
    inputs.search.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
}

// Mudar página
function goToPage(pageName) {
    // Esconder todas as páginas
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar página desejada
    pages[pageName]?.classList.add('active');
    appState.currentPage = pageName;
    
    // Scroll para o topo
    window.scrollTo(0, 0);
}

// Buscar profissionais
async function handleSearch() {
    const query = inputs.search.value.trim();
    
    if (!query) {
        alert('Por favor, digite algo para buscar');
        return;
    }

    // Coletar filtros
    appState.filters = {
        region: inputs.region.value,
        specialty: inputs.specialty.value,
        rating: inputs.price.value
    };

    // Chamar API backend
    try {
        const response = await fetch('http://localhost:5000/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: query,
                filters: appState.filters
            })
        });

        if (!response.ok) {
            throw new Error('Erro na busca');
        }

        const data = await response.json();
        appState.searchResults = data.results;
        
        // Mostrar resultados
        displayResults();
        goToPage('results');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao buscar profissionais. Verifique se o servidor está rodando.');
        
        // Para desenvolvimento: usar dados fake
        useFakeResults();
    }
}

// Usar dados fake para desenvolvimento (enquanto não tem backend)
function useFakeResults() {
    appState.searchResults = [
        {
            id: 101,
            name: 'João Silva',
            especialidade: 'Irrigação',
            avaliacao_estrelas: 5.0,
            total_avaliacoes: 24,
            estado: 'MG',
            foto_perfil: 'https://i.pravatar.cc/200?img=1',
            experience: '10 anos de experiência em sistemas de irrigação',
            description: 'Especialista em design e implementação de sistemas de irrigação. Trabalho com agricultores individuais e grandes propriedades rurais.'
        },
        {
            id: 102,
            name: 'Maria Souza',
            especialidade: 'Pecuária',
            avaliacao_estrelas: 4.8,
            total_avaliacoes: 15,
            estado: 'MG',
            foto_perfil: 'https://i.pravatar.cc/200?img=5',
            experience: '8 anos de experiência em gestão pecuária',
            description: 'Técnica especializada em nutrição animal e manejo de rebanhos leiteiros. Consultora de fazendas de médio e grande porte.'
        },
        {
            id: 103,
            name: 'Carlos Almeida',
            especialidade: 'Agrícola',
            avaliacao_estrelas: 4.9,
            total_avaliacoes: 32,
            estado: 'SP',
            foto_perfil: 'https://i.pravatar.cc/200?img=3',
            experience: '12 anos de experiência em culturas de soja e milho',
            description: 'Especialista em manejo de pragas e doenças em culturas de soja e milho. Consultoria em agricultura de precisão e sustentabilidade.'
        }
    ];
    
    displayResults();
    goToPage('results');
}

// Exibir resultados
function displayResults() {
    const resultsList = document.getElementById('results-list');
    const resultsInfo = document.getElementById('results-info');
    
    resultsList.innerHTML = '';
    
    if (appState.searchResults.length === 0) {
        resultsList.innerHTML = '<p style="text-align: center; padding: 40px; color: var(--text-light);">Nenhum profissional encontrado</p>';
        resultsInfo.textContent = 'Nenhum resultado';
        return;
    }

    resultsInfo.textContent = `${appState.searchResults.length} profissional(is) encontrado(s)`;

    appState.searchResults.forEach(professional => {
        const card = createResultCard(professional);
        resultsList.appendChild(card);
    });
}

// Criar card de resultado
function createResultCard(professional) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const stars = '★'.repeat(Math.round(professional.avaliacao_estrelas)) + 
                  '☆'.repeat(5 - Math.round(professional.avaliacao_estrelas));
    
    card.innerHTML = `
        <div class="result-image">
            <img src="${professional.foto_perfil}" alt="${professional.name}">
        </div>
        <div class="result-info">
            <div class="result-name">${professional.name}</div>
            <div class="result-role">${professional.especialidade}</div>
            <div class="result-location">📍 ${professional.estado}</div>
            <div class="result-rating">
                <span class="stars">${stars}</span>
                <span>${professional.avaliacao_estrelas} (${professional.total_avaliacoes})</span>
            </div>
            <button class="result-view-btn">Ver Perfil</button>
        </div>
    `;

    card.addEventListener('click', () => viewProfile(professional));
    return card;
}

// Ver perfil completo
function viewProfile(professional) {
    appState.selectedProfessional = professional;
    
    // Preencher dados do perfil
    document.getElementById('profile-name').textContent = professional.name;
    document.getElementById('profile-role').textContent = professional.especialidade;
    document.getElementById('profile-img').src = professional.foto_perfil;
    document.getElementById('profile-location-text').textContent = professional.estado;
    document.getElementById('profile-description').textContent = professional.description;
    document.getElementById('profile-experience').textContent = professional.experience;
    
    // Estrelas
    const stars = '★'.repeat(Math.round(professional.avaliacao_estrelas)) + 
                  '☆'.repeat(5 - Math.round(professional.avaliacao_estrelas));
    document.getElementById('profile-stars').innerHTML = `<span class="stars">${stars}</span>`;
    document.getElementById('profile-reviews').textContent = `${professional.avaliacao_estrelas} (${professional.total_avaliacoes} avaliações)`;
    
    // Skills (simuladas)
    const skillsContainer = document.getElementById('profile-skills');
    skillsContainer.innerHTML = '';
    const skills = ['Técnica Profissional', 'Consultoria', 'Implementação', 'Suporte'];
    skills.forEach(skill => {
        const skillTag = document.createElement('span');
        skillTag.className = 'profile-skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
    
    goToPage('profile');
}

// Atualizar página de seleção
function updateChosenPage() {
    const prof = appState.selectedProfessional;
    if (!prof) return;

    document.getElementById('chosen-name').textContent = prof.name;
    document.getElementById('chosen-role').textContent = prof.especialidade;
    document.getElementById('chosen-img').src = prof.foto_perfil;
    
    const stars = '★'.repeat(Math.round(prof.avaliacao_estrelas)) + 
                  '☆'.repeat(5 - Math.round(prof.avaliacao_estrelas));
    document.getElementById('chosen-stars').innerHTML = `<span class="stars">${stars}</span>`;
    document.getElementById('chosen-reviews').textContent = `${prof.avaliacao_estrelas} (${prof.total_avaliacoes} avaliações)`;
}

// Monitorar mudanças de página para atualizar dados
const originalGoToPage = goToPage;
function goToPage(pageName) {
    originalGoToPage(pageName);
    
    if (pageName === 'chosen') {
        updateChosenPage();
    }
}

// Enviar contato
async function handleContactSubmit() {
    const prof = appState.selectedProfessional;
    if (!prof) return;

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                professional_id: prof.id,
                professional_name: prof.name,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao enviar mensagem');
        }

        // Mostrar confirmação
        goToPage('confirmation');
    } catch (error) {
        console.error('Erro:', error);
        // Mesmo com erro, mostrar confirmação (para desenvolvimento)
        goToPage('confirmation');
    }
}

// Sobreescrever goToPage depois de definir handleContactSubmit
goToPage = function(pageName) {
    // Esconder todas as páginas
    Object.values(pages).forEach(page => {
        page.classList.remove('active');
    });

    // Mostrar página desejada
    pages[pageName]?.classList.add('active');
    appState.currentPage = pageName;
    
    // Scroll para o topo
    window.scrollTo(0, 0);
    
    // Atualizar dados se necessário
    if (pageName === 'chosen') {
        updateChosenPage();
    }
};

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
});
