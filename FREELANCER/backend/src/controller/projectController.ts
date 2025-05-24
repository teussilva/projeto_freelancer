import { createProjeto, deletarProjeto, editarProjeto, getAllProjetos  } from '../model/projectModel'

const getAllProjetosController = async(_req, res : any) =>{
    try {
        const projetos = await getAllProjetos()
        console.log(projetos)
        res.status(200).json(projetos)
    } catch (error) {
          console.error('Erro ao exibir projetos:', error)
          res.status(500).json({ mensagem: 'Erro interno ao tentar exibir projetos' })
    }
}

const createProjetoController = async(req, res: any) =>{
    try {
        const { titulo, categoria, descricao, orcamento, habilidades } = req.body
        const usuario_id = req.usuario_id
        const dataPublicacao = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const projeto = {
            titulo,
            categoria,
            descricao,
            orcamento,
            usuario_id,
            habilidades,
            dataPublicacao
        }
        const result = await createProjeto(projeto)
        res.status(201).json({
            message: 'Projeto criado com sucesso!',
            projeto: {
                id: result.insertId,
                titulo,
                categoria,
                descricao,
                orcamento,
                usuario_id,
                habilidades,
                dataPublicacao
            }
        })
    } catch (error) {
         console.error('Erro ao criar projeto:', error);
         res.status(500).json({ mensagem: 'Erro interno ao criar o projeto' })
    }
}

const deletarProjetoController = async (req, res : any) =>{
    const { id } = req.params
    try {
        await deletarProjeto(id)
        res.status(200).json({ mensagem: 'Projeto excluído com sucesso!' })
    } catch (error) {
        console.error('Erro ao excluir projeto:', error)
        res.status(500).json({ mensagem: 'Erro interno ao excluir o projeto' })
    }
}

const editarProjetoController = async (req, res: any) => {
    const { id } = req.params;
    const { titulo, categoria, descricao, orcamento, habilidades } = req.body;

    // Validação básica
    if (!id) {
        return res.status(400).json({ mensagem: 'ID do projeto é obrigatório' });
    }

    try {
        await editarProjeto(Number(id), {
            titulo,
            categoria,
            descricao,
            orcamento,
            habilidades
        });
        res.status(200).json({ mensagem: 'Projeto atualizado com sucesso!' });
    } catch (error) {
        console.error('Erro ao editar projeto', error);
        res.status(500).json({ mensagem: 'Erro interno ao editar o projeto' });
    }
}

export default{
    getAllProjetosController,
    createProjetoController,
    deletarProjetoController,
    editarProjetoController
}