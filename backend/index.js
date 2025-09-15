const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/auth');

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

mongoose.connect(mongoURI, {
     useNewUrlParser: true, 
     useUnifiedTopology: true 
    })
    .then(() => {console.log('MongoDB connected')
        app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    //routes
    app.use('/api/auth',require('./routes/auth'));

app.get('/', (req, res) => {
    res.send('Server is running and connected to MongoDB');
});

