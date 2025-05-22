import bcrypt from 'bcrypt'
import { createUsuario, getAllUsuarios } from '../model/registerModel'

const getAllUsuariosController = async(_req, res) =>{
    const usuarios = await getAllUsuarios()
    return res.status(200).json(usuarios)
}

 const createUserController = async (req, res : any) => {
    try {
        const { nomeCompleto, email, senha, tipoUsuario } = req.body;

        if (!nomeCompleto || !email || !senha || !tipoUsuario) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);
        const novoUsuario = await createUsuario({ nomeCompleto, email, senha: senhaCriptografada, tipoUsuario });


        res.status(201).json(
            {
                message: 'Usuário criado com sucesso!',
                id: novoUsuario.insertId,
                nomeCompleto,
                email,
                tipoUsuario
            }
        );
    } catch (error) {
        console.error('Error ao tentar criar usuário:', error);
        res.status(500).json({ error: ' E-mail já cadastrado.' });
    }
}

export default{
    createUserController,
    getAllUsuariosController
}