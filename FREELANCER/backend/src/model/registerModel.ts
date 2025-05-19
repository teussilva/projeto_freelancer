import { db } from "./database"
import { ResultSetHeader } from 'mysql2'
export const createUsuario = async (user) => {
    const { nomeCompleto, email, senha } = user
    const [rows] = await db.execute<any[]>('SELECT id FROM usuarios WHERE email_usuario = ?', [email])

    if (rows.length > 0) {
        throw new Error('E-mail já cadastrado.')
    }

    const query = 'INSERT INTO usuarios(nome_completo_usuario, email_usuario, senha_usuario) VALUES (?,?,?)'
    const [result] = await db.execute<ResultSetHeader>(query, [nomeCompleto, email, senha])
    return { insertId: result.insertId }
}


