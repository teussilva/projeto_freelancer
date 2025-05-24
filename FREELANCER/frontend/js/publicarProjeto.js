// Variáveis globais
let projetoEmEdicao = null;
const token = localStorage.getItem('token');
const usuario = JSON.parse(localStorage.getItem('registreUser')) || {};


const formPublicacao = document.getElementById('formPublicacao')
const message = document.getElementById('message');
const sectionPublicacoes = document.querySelector('.publicacoes-lista')

let btn_sair = document.getElementById('li-sair')

btn_sair.addEventListener('click', function(){
   localStorage.removeItem('registreUser')
   localStorage.removeItem('token')
   window.location.href = 'Home.html'
})


window.addEventListener('DOMContentLoaded', function() {
    if (!token) {
        alert('Faça login para acessar esta página')
        window.location.href = 'login.html';
        return;
    }

    document.getElementById('nome-usuario').innerText = usuario.nomeCompleto || usuario.email;
    carregarProjetos()
});

const carregarProjetos = async function() {
    try {
        sectionPublicacoes.innerHTML = '<div class="loading">Carregando projetos...</div>';
        
        const response = await fetch('http://localhost:8080/api/projetos', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Erro ao carregar projetos');
        
        const projetos = await response.json();
        renderizarProjetos(Array.isArray(projetos) ? projetos : [projetos]);
    } catch (error) {
        console.error('Erro:', error);
        sectionPublicacoes.innerHTML = '<p class="error">Erro ao carregar projetos</p>';
    }
};

const renderizarProjetos = function(projetos) {
    sectionPublicacoes.innerHTML = '<h2>Meus Projetos</h2>';
    
    if (projetos.length === 0) {
        sectionPublicacoes.innerHTML += '<p>Nenhum projeto encontrado</p>';
        return;
    }

    projetos.forEach(projeto => {
        const divPublicacao = document.createElement('div');
        divPublicacao.className = 'publicacao';
        
        divPublicacao.innerHTML = `
            <h3>${projeto.titulo}</h3>
            <div class="publicacao-meta">
                <span>Publicado em: ${formatarData(projeto.dataPublicacao)}</span>
                <span>Por: ${usuario.email}</span>
                <span class="publicacao-categoria">${projeto.categoria}</span>
            </div>
            <div class="publicacao-descricao">
                <p>${projeto.descricao}</p>
                <p><strong>Habilidades requeridas:</strong> ${projeto.habilidades || 'Não especificadas'}</p>
                <h4><strong>Orçamento:</strong> ${projeto.orcamento ? 'R$ ' + projeto.orcamento : 'A combinar'}</h4>
            </div>
            <div class="publicacao-acoes">
                <button class="btn-outline btn-editar" data-id="${projeto.id}">Editar</button>
                <button class="btn-outline btn-deletar" data-id="${projeto.id}">Deletar</button>
            </div>
        `;
        
        sectionPublicacoes.appendChild(divPublicacao);
    });

    // Adiciona eventos aos botões
    document.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', editarProjeto);
    });

    document.querySelectorAll('.btn-deletar').forEach(btn => {
        btn.addEventListener('click', deletarProjeto);
    });
};

const enviarFormulario = async function(e) {
    e.preventDefault();
    
    const dadosForm = {
        titulo: document.getElementById('titulo').value.trim(),
        categoria: document.getElementById('categoria').value,
        descricao: document.getElementById('descricao').value.trim(),
        habilidades: document.getElementById('habilidades').value.trim(),
        orcamento: formatarOrcamento(document.getElementById('valor').value.trim())
    };

    try {
        if (projetoEmEdicao) {
            await atualizarProjeto(projetoEmEdicao, dadosForm);
            mostrarMensagem('Projeto atualizado com sucesso!');
        } else {
            await criarProjeto(dadosForm);
            mostrarMensagem('Projeto criado com sucesso!');
        }
        
        resetarFormulario();
        await carregarProjetos();
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem(error.message || 'Erro ao processar solicitação', 'error');
    }
};

const criarProjeto = async function(projeto) {
    const response = await fetch('http://localhost:8080/api/criar-projeto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projeto)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao criar projeto');
    }
}

const editarProjeto = async function(e) {
    const id = e.target.getAttribute('data-id');
    
    try {
        const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 404) {
         alert('Projeto não encontrado. Pode ter sido removido.', 'error');
          return;
       }

        if (!response.ok) throw new Error('Erro ao carregar projeto');
        
        const projeto = await response.json();
        preencherFormulario(projeto);
        projetoEmEdicao = id;
        document.querySelector('#formPublicacao button[type="submit"]').textContent = 'Salvar Edição';
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao carregar projeto para edição', 'error');
    }
}

const atualizarProjeto = async function(id, projeto) {
    const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projeto)
    })

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Erro ao atualizar projeto');
    }
}

const deletarProjeto = async function(e) {
    if (!confirm('Tem certeza que deseja deletar este projeto?')) return;
    
    const id = e.target.getAttribute('data-id');
    try {
        const response = await fetch(`http://localhost:8080/api/projetos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Erro ao deletar projeto');
        
        mostrarMensagem('Projeto deletado com sucesso!');
        await carregarProjetos();
    } catch (error) {
        console.error('Erro:', error);
        mostrarMensagem('Erro ao deletar projeto', 'error');
    }
}

const preencherFormulario = function(projeto) {
    document.getElementById('titulo').value = projeto.titulo || '';
    document.getElementById('categoria').value = projeto.categoria || '';
    document.getElementById('descricao').value = projeto.descricao || '';
    document.getElementById('habilidades').value = projeto.habilidades || '';
    document.getElementById('valor').value = projeto.orcamento ? `R$ ${projeto.orcamento}` : ''
}

const resetarFormulario = function() {
    formPublicacao.reset();
    projetoEmEdicao = null;
    document.querySelector('#formPublicacao button[type="submit"]').textContent = 'Publicar';
}

const mostrarMensagem = function(msg, tipo = 'success') {
    message.textContent = msg;
    message.className = `message ${tipo}`;
    message.style.display = 'block';
    
    setTimeout(() => {
        message.style.display = 'none';
    }, 5000);
};

const formatarData = function(dataString) {
    if (!dataString) return '';
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dataString).toLocaleDateString('pt-BR', options);
};

const formatarOrcamento = function(valor) {
    if (!valor || valor.toLowerCase().includes('combinar')) return null;
    const numero = parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
    return isNaN(numero) ? null : numero;
};

formPublicacao.addEventListener('submit', enviarFormulario);

if (token) {
    carregarProjetos();
}
