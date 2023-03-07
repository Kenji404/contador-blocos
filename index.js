const fs = require('fs');

// ler arquivo rede.txt
fs.readFile('rede.txt', 'utf8', (err, data) => {
    if (err) throw err;

    // separa os dados em linhas e remove linhas em branco
    const lines = data.trim().split('\n').filter(line => line.trim() !== '');

    // objeto para armazenar as conexões
    const connections = {};

    // armazena as conexões no objeto connections
    for (let line of lines) {
        const [type, id, ...args] = line.split(';');
        if (type === 'Ligacao') {
            const [id1, id2] = args.map(arg => parseInt(arg));
            if (!connections[id1]) connections[id1] = [];
            if (!connections[id2]) connections[id2] = [];
            connections[id1].push(id2);
            connections[id2].push(id1);
        }
    }

    // contagem de número de blocos
    const visited = {};
    let blockCount = 0;
    for (let id in connections) {
        if (!visited[id]) {
            blockCount++;
            visitBlock(id, connections, visited);
        }
    }

    console.log(`Total de blocos de rede: ${blockCount}`);
});

// função para visitar um bloco de conexões
function visitBlock(id, connections, visited) {
    visited[id] = true;
    for (let connectionId of connections[id]) {
        if (!visited[connectionId]) {
            visitBlock(connectionId, connections, visited);
        }
    }
}