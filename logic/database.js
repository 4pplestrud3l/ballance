import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ballance.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS levels (id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT, name VARCHAR NOT NULL);',


                // init a table for the level mapping, with the following columns:
                // id: integer, primary key, not null
                // wallx: integer, default null
                // wally: integer, default null
                // width: integer, default null
                // height: integer, default null

                'CREATE TABLE IF NOT EXISTS levelmapping (id INTEGER PRIMARY KEY NOT NULL, wallx INTEGER DEFAULT NULL, wally INTEGER DEFAULT NULL, width INTEGER DEFAULT NULL, height INTEGER DEFAULT NULL);',

                
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

export const createLevel = (name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO levels (name) VALUES (?);',
                [name],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

// get levels
export const getLevels = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM levels;',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}


export const insertLevelMapping = (wallx, wally, width, height) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO levelmapping (wallx, wally, width, height) VALUES (?, ?, ?, ?);',
                [wallx, wally, width, height],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}


export const fetchName = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM levels;',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}

/*export const updateName = (name) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE settings SET ballSize = ? WHERE id = 1;',
                [name],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
}*/