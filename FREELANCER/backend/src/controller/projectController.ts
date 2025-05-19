import { createProjeto } from '../model/projectModel'

const createProjetoController = async(req, res: any) =>{
    try {
        const { titulo, categoria, descricao, orcamento, habilidades } = req.body
        const usuario_id = req.usuario_id
        const dataPublicacao = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
        res.status(201).json({ mensagem: 'Projeto criado com sucesso', id: result.insertId })
    } catch (error) {
         console.error('Erro ao criar projeto:', error);
         res.status(500).json({ mensagem: 'Erro interno ao criar o projeto' });
    }
}

export default{
    createProjetoController
}