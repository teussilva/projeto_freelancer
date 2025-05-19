import { db } from "./database";
import { ResultSetHeader } from 'mysql2'

 export const createProjeto = async(projeto) =>{
    const { titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao } = projeto
    const query ='INSERT INTO projetos (titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao) VALUES(?,?,?,?,?,?,?)'
    const [result] = await db.execute<ResultSetHeader>(query, [titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao])
    return { insertId: result.insertId }
}
