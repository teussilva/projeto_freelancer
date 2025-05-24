import { db } from "./database";
import { ResultSetHeader } from 'mysql2'

export const getAllProjetos = async () =>{
    const query = 'SELECT * FROM projetos'
    const [rows] = await db.execute(query)
    return rows
}

 export const createProjeto = async(projeto) =>{
    const { titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao } = projeto
    const query ='INSERT INTO projetos (titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao) VALUES(?,?,?,?,?,?,?)'
    const [result] = await db.execute<ResultSetHeader>(query, [titulo, categoria, descricao, orcamento, usuario_id, habilidades, dataPublicacao])
    return { insertId: result.insertId }
}

export const deletarProjeto = async (id) =>{
    const query = 'DELETE FROM projetos WHERE id = ?'
    await db.execute(query, [id])
}
export const editarProjeto = async (id: number, projeto: any) => {
    // Sanitiza os parâmetros, convertendo undefined para null
    const sanitizedProjeto = {
        titulo: projeto.titulo ?? null,
        categoria: projeto.categoria ?? null,
        descricao: projeto.descricao ?? null,
        orcamento: projeto.orcamento ?? null,
        habilidades: projeto.habilidades ?? null
    };

    const query = `
        UPDATE projetos 
        SET 
            titulo = ?,
            categoria = ?,
            descricao = ?,
            orcamento = ?,
            habilidades = ?
        WHERE id = ?
    `;
    
    await db.execute<ResultSetHeader>(query, [
        sanitizedProjeto.titulo,
        sanitizedProjeto.categoria,
        sanitizedProjeto.descricao,
        sanitizedProjeto.orcamento,
        sanitizedProjeto.habilidades,
        id
    ]);
}
