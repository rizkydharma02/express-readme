require('dotenv').config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');

const usersRoutes = require('./routes/users');
const bukuRoutes = require('./routes/buku');
const pinjamRoutes = require('./routes/pinjam');

const middlewareLogRequest = require('./middleware/logs');
const upload = require('./middleware/multer');

const app = express();

app.use(cors());
app.use(middlewareLogRequest);
app.use(express.json());
app.use('/assets', express.static('public/images'));

app.use('/users', usersRoutes);
app.use('/buku', bukuRoutes);
app.use('/pinjam', pinjamRoutes);
app.post('/upload', upload.single('photo'), (req, res) => {
  res.json({
    message: 'Upload berhasil',
  });
});

app.use((err, req, res, next) => {
  res.json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server berhasil di running di port ${PORT}`);
});
