require('dotenv').config();
require('./config/database');

const express = require('express');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo').default;
const morgan = require('morgan');
const methodOverride = require('method-override');

const passUserToView = require('./middleware/pass-user-to-view');
const isSignedIn = require('./middleware/is-signed-in');

const authController = require('./controllers/auth');
const talentsController = require('./controllers/talents');
const requestsController = require('./controllers/requests');
const matchesController = require('./controllers/matches');
const transactionsController = require('./controllers/transactions');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  cookie: { httpOnly: true, sameSite: 'lax' }
}));

// View engine
app.set('view engine', 'ejs');

// Custom middleware
app.use(passUserToView);

// Routes
app.get('/', (req, res) => res.render('index'));

app.use('/auth', authController);
app.use('/talents', isSignedIn, talentsController);
app.use('/requests', isSignedIn, requestsController);
app.use('/matches', isSignedIn, matchesController);
app.use('/transactions', isSignedIn, transactionsController);
app.get('/dashboard', isSignedIn, (req, res) => res.render('dashboard'));

// Start server
app.listen(port, () => console.log(`EduTrade running at http://localhost:${port}`));
