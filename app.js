const express = require('express');
const path = require('node:path');
const app = express();
const assetsPath = path.join(__dirname, 'public');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(assetsPath));
const messages = [
  {
    text: 'Hi there!',
    user: 'Amando',
    added: new Date(),
  },
  {
    text: 'Hello World!',
    user: 'Charles',
    added: new Date(),
  },
];
app.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});
app.get('/new', (req, res) => {
  res.render('form', { title: 'message Form' });
});
//post
app.post('/new', (req, res) => {
  console.log(req.body);
  messages.push({
    text: req.body.messageText,
    user: req.body.messageAuthor,
    added: new Date(),
  });
  res.redirect('/');
});
app.get('/:messageText?', (req, res) => {
  // compare messageText with messages array
  console.log(req.query);
  res.render('message-detail', {
    messageText: req.params.messageText,
    messageAuthor: req.query.author,
    messageDate: req.query.added,
  });
});
app.listen(3000, () => {
  console.log('    app is listening at port: localhost:3000');
});
