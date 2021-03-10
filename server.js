const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const history = require('connect-history-api-fallback');
const connectDB = require('./config/db.config');
const errorHandler = require('./middlewares/error');

// Import route files
const authRoute = require('./routes/auth.route');
const usersRoute = require('./routes/user.route');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const app = express();

// Serve static assets
app.use(express.static('public'));

// Body parser to read request body
app.use(express.json());
// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());
// Set security headers
app.use(helmet());
// Prevent XSS attacks
app.use(xss());
// Rate limiting
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
  })
);
// Prevent HTTP param pollution
app.use(hpp());
// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Mount routers
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', usersRoute);

app.use(errorHandler);
app.use(history());

// Listen to requests from client
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${NODE_ENV} mode on port ${PORT}...`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
