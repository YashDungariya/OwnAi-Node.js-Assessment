const jwt = require('jsonwebtoken');
const AppDataSource = require('../data-source');

exports.authenticate = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
    const userRepo = AppDataSource.getRepository('User');
    const user = await userRepo.findOneBy({ id: decoded.id });
    if (!user) return res.status(401).json({ message: 'Invalid token' });

    req.user = { id: user.id, role: user.role };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

exports.authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') return next();
  return res.status(403).json({ message: 'Access denied: Admins only' });
};
