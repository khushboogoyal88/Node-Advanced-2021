'use strict';

const Database = require('./database');

const options=require('./databaseOptions.json');

const sql=require('./sqlStatements.json');

const {toArray} = require('./parameters');

const {CODES,MESSAGES} = require('./statusCodes');

const getAllSql = sql.getAll.join(' ');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');

module.exports = class Datastorage{

    constructor(){
        this.db=new Database(options);
    }

    get CODES(){
        return CODES;
    }

    getAll() {
        return new Promise(async (resolve,reject)=>{
            try{
                const result=await this.db.doQuery(getAllSql);
                resolve(result.queryResult);
            }
            catch(err) {
                reject(MESSAGES.PROGRAM_ERROR());
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
                    resolve(MESSAGES.NOT_FOUND('flowerId',id));
                }
            }
            catch(err){
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    }//end if get

    insert(resource){
        return new Promise(async (resolve,reject)=>{
            try{
                const status=
                    await this.db.doQuery(insertSql,toArray(resource));
                resolve(MESSAGES.INSERT_OK('flowerId',resource.flowerId));
            }
            catch(err){
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    } //end of insert

    update(resource) {
        return new Promise(async (resolve, reject) => {
            try {
                const result =
                    await this.db.doQuery(updateSql, toArray(resource));
                if(result.queryResult.rowsChanged===0){
                    resolve(MESSAGES.NOT_UPDATED());
                }
                else {
                    resolve(MESSAGES.UPDATE_OK('flowerId',resource.flowerId));
                } 
            }
            catch (err) {
                console.log(err)
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    } //end of update

    remove(id) {
        return new Promise(async (resolve,reject)=>{
            try{
                const result=await this.db.doQuery(removeSql,[+id]);
                if(result.queryResult.rowsChanged===1){
                    resolve(MESSAGES.DELETE_OK('flowerId', id));
                }
                else {
                    resolve(MESSAGES.NOT_DELETED('flowerId',id));
                }
            }
            catch(err){
                reject(MESSAGES.PROGRAM_ERROR());
            }
        });
    }// end of remove

} //class end

