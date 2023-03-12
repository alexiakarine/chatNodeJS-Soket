//ejs - template padrão | express - framework do node| socket.io - comunicação entre front e back
//npm add ejs express socket.io

const express = require('express'); //tratativa de um arquivo estático(pra rota)
const { request } = require('http');
const path = require('path');
const { Socket } = require('socket.io');

//definindo os protocolos
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//onde ficará os aprquivos publicos acessdo pela aplicação
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html');
});

let messages = [];

//conexão do usuário
io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages);
    

    socket.on('sendMessage', data => {
        
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
        
    });
});


server.listen(8083);