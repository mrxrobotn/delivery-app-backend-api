import jwt from 'jsonwebtoken';

// Middleware to verify JWT token
export default function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).json({ message: 'Authorization header is required' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token is missing' });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
}
