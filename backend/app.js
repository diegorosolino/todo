const express = require('express');
const app = express();
const port = 5000;
const apiRouter = require('./routes/api');

app.use(express.json());
app.use('/api', apiRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
