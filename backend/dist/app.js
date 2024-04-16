import express from 'express';
import apiRoutes from './routes/index.js';
import 'dotenv/config';
const port = process.env.PORT || 5000;
const app = express();
app.use('/api/v1', apiRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
