'use strict';

const http = require('http');
const path = require('path');

const express = require('express');
const app = express();

const Datastorage = require('./dataStorageLayer');
const storage=new Datastorage();

const {port,host} = require('./config.json');

const server = http.createServer(app);

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'pageviews'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res)=>res.render('menu'));

app.get('/all', (req,res)=> storage.getAll()
    .then(result=>res.render('allpage',{data:result}))
    .catch(error=>res.render('statuspage',{status:error})));


app.get('/getone',(req,res)=>
    res.render('sendidpage',{
        title:'Get one', 
        header:'Get',
        action:'/getone'}
));

app.post('/getone',(req,res)=>{
    const flowerId = req.body.flowerId;
    storage.get(flowerId)
    .then(result=>res.render('flowerpage',{data:result}))
    .catch(error=>res.render('statuspage',{status:error}));
});

app.get('/insert', (req,res)=>{
    res.render('form', {
        title:'Insert',
        header:'Add new flower',
        action:'/insert',
        flowerId:{value:'', readonly:''},
        name: { value: '', readonly: '' },
        site: { value: '', readonly: '' },
        unitPrice: { value: '', readonly: '' },
        stock: { value: '', readonly: '' }
    });
});

app.post('/insert', (req,res)=>
    storage.insert(req.body)
        .then(result => res.render('statuspage',{status:result}))
        .catch(error => res.render('statuspage',{status:error})));

app.get('/updateform', (req,res)=>
    res.render('form',{
        title: 'Update',
        header: 'Update flower data',
        action: '/updatedata',
        flowerId: { value: '', readonly: '' },
        name: { value: '', readonly: 'readonly' },
        site: { value: '', readonly: 'readonly' },
        unitPrice: { value: '', readonly: 'readonly' },
        stock: { value: '', readonly: 'readonly' }
    }
));

app.post('/updatedata', async (req,res)=>{
    try{
        const flowerId = req.body.flowerId;
        const result = await storage.get(flowerId);
        if(result.message){
            res.render('statuspage',{status:result});
        }
        else{
            res.render('form',{
                title: 'Update',
                header: 'Update flower data',
                action: '/update',
                flowerId: { value: result.flowerId, readonly: 'readonly' },
                name: { value: result.name, readonly: '' },
                site: { value: result.site, readonly: '' },
                unitPrice: { value: result.unitPrice, readonly: '' },
                stock: { value: result.stock, readonly: '' }
            });
        }
    }
    catch(error){
        res.render('statuspage', { status: error });
    }  
});

app.post('/update', (req, res) =>
    storage.update(req.body)
        .then(result => res.render('statuspage', { status: result }))
        .catch(error => res.render('statuspage', { status: error })));

app.get('/remove', (req, res) =>
    res.render('sendidpage', {
        title: 'Remove',
        header: 'remove',
        action: '/remove'
    }
    ));

app.post('/remove', (req, res) => {
    const flowerId = req.body.flowerId;
    storage.remove(flowerId)
        .then(result => res.render('flowerpage', { data: result }))
        .catch(error => res.render('statuspage', { status: error }));
});

server.listen(port,host,
    ()=>console.log(`Server ${host}:${port} is ready`));


