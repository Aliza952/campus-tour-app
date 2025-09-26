const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./userRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes); // Base path for user routes

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
