const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());  // Aktivera CORS
app.use(bodyParser.json());  // Använd body-parser för JSON

// En enkel route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Starta servern
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
