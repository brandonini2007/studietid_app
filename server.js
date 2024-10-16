const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const db = new sqlite3.Database('./studietid.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database.');
});

app.get('/studietider', (req, res) => {
    db.all('SELECT * FROM studietid', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/registrer', (req, res) => {
    const { bruker_id, fag_id, rom_id } = req.body;
    const registreringsdato = new Date().toISOString();
    const status = 'venter på godkjenning';

    db.run(`INSERT INTO studietid (bruker_id, fag_id, rom_id, registreringsdato, status) VALUES (?, ?, ?, ?, ?)`, 
    [bruker_id, fag_id, rom_id, registreringsdato, status], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000`);
});