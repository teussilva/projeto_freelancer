import jwt from 'jsonwebtoken';

const JWT_SECRET = 'swudeydgdeyggqey772332523@@@3323132312;;;;;'; 

 const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.usuario_id = decoded.id;
    console.log('ID do usuário autenticado:', decoded.id); 
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}

export default{
  authMiddleware
}
