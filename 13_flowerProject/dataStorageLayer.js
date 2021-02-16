'use strict';

const Database = require('./database');

const options=require('./databaseOptions.json');

const sql=require('./sqlStatements.json');

const {toArray} = require('./parameters');

const getAllSql = sql.getAll.join(' ');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');

module.exports = class Datastorage{

    constructor(){
        this.db=new Database(options);
    }

    getAll() {
        return new Promise(async (resolve,reject)=>{
            try{
                const result=await this.db.doQuery(getAllSql);
                resolve(result.queryResult);
            }
            catch(err) {
                reject(err);
            }
        });
    }

    get(id) {
        return new Promise(async (resolve,reject)=>{
            try{
                const result = await this.db.doQuery(getSql,[+id]);
                if(result.queryResult.length>0){
                    resolve(result.queryResult[0]);
                }
                else {
                    resolve({status:`id ${id} not found`});
                }
            }
            catch(err){
                reject(err);
            }
        });
    }//end if get

    insert(resource){
        return new Promise(async (resolve,reject)=>{
            try{
                const status=
                    await this.db.doQuery(insertSql,toArray(resource));
                resolve({status:'insert OK'});
            }
            catch(err){
                reject(err);
            }
        });
    } //end of insert

    update(resource) {
        return new Promise(async (resolve, reject) => {
            try {
                const status =
                    await this.db.doQuery(updateSql, toArray(resource));
                resolve({ status: 'update OK' });
            }
            catch (err) {
                reject(err);
            }
        });
    } //end of update

    remove(id) {
        return new Promise(async (resolve,reject)=>{
            try{
                const result=await this.db.doQuery(removeSql,[+id]);
                if(result.queryResult.rowsChanged===1){
                    resolve({status:'Remove OK'});
                }
                else {
                    resolve({status:`resource ${id} not removed`});
                }
            }
            catch(err){
                reject(err);
            }
        });
    }// end of remove

} //class end

