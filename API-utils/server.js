const express = require('express');

const app = express();

app.use(express.json());

/*
=====================================
UTILITÁRIO DE TEXTO
POST
=====================================
*/

app.post('/text/:action', (req, res) => {

    const action = req.params.action;
    const input = req.body.input;

    if (!input) {
        return res.status(400).json({
            error: 'Texto não informado'
        });
    }

    let result;

    if (action === 'lowercase') {
        result = input.toLowerCase();
    }
    else if (action === 'uppercase') {
        result = input.toUpperCase();
    }
    else {
        return res.status(400).json({
            error: 'Ação inválida'
        });
    }

    res.json({
        result: result
    });

});

/*
=====================================
UTILITÁRIO DE NÚMERO
GET
=====================================
*/

app.get('/number/:action', (req, res) => {

    const action = req.params.action;

    const values = req.query.values;

    if (!values) {
        return res.status(400).json({
            error: 'Valores não informados'
        });
    }

    const numbers = values
        .split(',')
        .map(n => Number(n.trim()));

    let result;

    if (action === 'minimum') {
        result = Math.min(...numbers);
    }
    else if (action === 'maximum') {
        result = Math.max(...numbers);
    }
    else {
        return res.status(400).json({
            error: 'Ação inválida'
        });
    }

    res.json({
        result: result
    });

});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});