require('express-async-errors');
const express = require('express');

const cors = require('cors');
const rescue = require('express-rescue');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes/index');
const errorHandler = require('./middleware/errorMiddleware');

// ...

const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(cors());

app.use('/user', rescue(router.usersRouter));
app.use('/login', rescue(router.loginRouter));
app.use('/categories', rescue(router.categoryRouter));
app.use('/post', rescue(router.postRouter));
app.use(errorHandler);
// ...

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
