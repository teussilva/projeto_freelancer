import { db } from "./database";

export const login = async(user) => {
    const { email } = user;
    const query = 'SELECT * FROM usuarios WHERE email_usuario = ?';
    const [login_usuario] = await db.execute(query, [email]);
    return login_usuario[0] || null;
};

export default { 
    login 
}
