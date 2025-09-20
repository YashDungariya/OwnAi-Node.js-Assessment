require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const AppDataSource = require('./data-source');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Basic root route
app.get('/', (req, res) => res.json({ message: 'Node TypeORM Assessment API' }));

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source initialized');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
    process.exit(1);
  });
