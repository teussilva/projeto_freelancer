import bcrypt from 'bcrypt'
import { createUsuario } from '../model/registerModel'

 const createUserController = async (req, res : any) => {
    try {
        const { nomeCompleto, email, senha } = req.body;

        if (!nomeCompleto || !email || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await createUsuario({ nomeCompleto, email, senha: senhaCriptografada });

        res.status(201).json(
            {
                message: 'Usuário criado com sucesso!',
                id: novoUsuario.insertId
            }
        );
    } catch (error) {
        console.error('Error ao tentar criar usuário:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
}

export default{
    createUserController
}