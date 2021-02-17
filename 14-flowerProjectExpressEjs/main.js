'use strict';

const Datastorage = require('./dataStorageLayer');

const db=new Datastorage();

const menuText=`
Choose:

1. Get All
2. Get One
3. Insert
4. Update
5. Remove
6. exit

Your choise (1,2,3,4,5 or 6): `;

menu();

async function menu(){
    let exited=false;

    do{
        const selectedValue=await prompt(menuText);

        switch(selectedValue){
            case '1':
                try{
                    const result= await db.getAll();
                    for(let flower of result){
                        printFlower(flower);
                    }
                }
                catch(err){
                    console.log(err);
                }
                break;
            case '2':   
                try{
                    const id = await prompt('Input flower id: ');
                    const result = await db.get(+id);
                    if(result.message){
                        console.log(result.message);
                    }
                    else {
                        printFlower(result);
                    }
                }
                catch(err){
                    console.log(err);
                }
                break;
            case '3':
                try{
                    const result = await db.insert(await readFlowerData());
                    console.log(result);
                }
                catch(err){
                    console.log(err);
                }
                break;
            case '4':
                try {
                    const result = await db.update(await readFlowerData());
                    console.log(result);
                }
                catch (err) {
                    console.log(err);
                }
                break;
            case '5':
                try {
                    const id = await prompt('Input flower id: ');
                    const result = await db.remove(+id);
                    console.log(result);
                }
                catch (err) {
                    console.log(err);
                }
                break;
            case '6': exited=true;
                break;
            default:
                console.log('Only 1,2,3,4,5 or 6 are valid');
        }
    }while(!exited);
}

function prompt(promptText){
    process.stdout.write(promptText);
    return new Promise(resolve=>{
        const input=process.stdin;
        input.resume();
        input.once('data', data=>{
            input.pause();
            resolve(data.toString().trim());
        });
    });
}

function printFlower(flower) {
    let message=`${flower.flowerId}: ${flower.name},`+
    `needs ${flower.site}, price ${flower.unitPrice}, `+
    `Amount in stock ${flower.stock}`;

    console.log(message);
}

async function readFlowerData(){
    const flowerId = +await prompt('Input flowerId: ');
    const name=await prompt('Input name: ');
    const site = await prompt('Input site: ');
    const unitPrice = +await prompt('Input unitPrice: ');
    const stock = +await prompt('Input stock: ');

    return {
        flowerId,
        name,
        site,
        unitPrice,
        stock
    }
} 