import { db } from "./database"
import { ResultSetHeader } from 'mysql2'

export const getAllUsuarios = async () => {
   const query = 'SELECT * FROM usuarios'
   const [rows] = await db.execute(query)
   return rows
}

 export const createUsuario = async (user) => {
    const { nomeCompleto, email, senha, tipoUsuario } = user
    const [rows] = await db.execute<any[]>('SELECT id FROM usuarios WHERE email_usuario = ?', [email])

    if (rows.length > 0) {
        throw new Error('E-mail já cadastrado.')
    }

    const query = 'INSERT INTO usuarios(nome_completo_usuario, email_usuario, senha_usuario, tipo_usuario) VALUES (?,?,?,?)'
    const [result] = await db.execute<ResultSetHeader>(query, [nomeCompleto, email, senha, tipoUsuario])
    return { insertId: result.insertId }
}

export const deletarProjeto = async (id) =>{
    const query = 'DELETE FROM projetos WHERE id = ?'
    await db.execute(query, [id])
}