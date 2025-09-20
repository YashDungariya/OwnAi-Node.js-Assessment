const AppDataSource = require('../data-source');

exports.listUsers = async (req, res) => {
  const { search, country } = req.query;
  try {
    const userRepo = AppDataSource.getRepository('User');
    let qb = userRepo.createQueryBuilder('user');

    if (search) {
      qb = qb.where('user.name LIKE :s OR user.email LIKE :s', { s: `%${search}%` });
    }

    if (country) {
      if (search) qb = qb.andWhere('user.country = :country', { country });
      else qb = qb.where('user.country = :country', { country });
    }

    // select fields excluding password
    const users = await qb.select([
      'user.id', 'user.name', 'user.email', 'user.role', 'user.phone', 'user.city', 'user.country', 'user.createdAt'
    ]).getMany();

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserDetails = async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ message: 'Invalid user id' });

  try {
    const userRepo = AppDataSource.getRepository('User');
    const user = await userRepo.findOneBy({ id });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Role based access
    if (req.user.role !== 'Admin' && req.user.id !== user.id) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const { password, ...safe } = user;
    res.json(safe);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
