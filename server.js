require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const apiRoutes = require('./routes/api-routes')
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use('/api', apiRoutes)

app.listen(PORT, () => {
    console.log(`running at http://localhost:${PORT}`);
})