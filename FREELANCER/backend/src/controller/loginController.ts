import loginModel from '../model/loginModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const JWT_SECRET = 'swudeydgdeyggqey772332523@@@3323132312;;;;;'; //
const login = async (req, res) =>{
   try {
      const { email, senha } = req.body
      if(!email || !senha){
         return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
      }
      const login_usuario = await loginModel.login({ email })
      if(!login_usuario){
         return res.status(404).json({ message: 'Usuário não encontrado' })
      }

      const senhaSecreta = await bcrypt.compare(senha, login_usuario.senha_usuario)
      if(!senhaSecreta){
         return res.status(401).json({ message: 'E-mail ou Senha invalídos (s)' });
      }
       const token = jwt.sign(
         { id: login_usuario.id, email: login_usuario.email_usuario },
         JWT_SECRET,
         { expiresIn: '1h' }
      ) 

      return res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            usuario: {
                id: login_usuario.id_usuario,
                nome: login_usuario.nome_usuario,
                email: login_usuario.email_usuario
            }
        });

   } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor', detalhes: error })
   }
}

export default { 
   login 
}

