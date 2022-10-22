import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import Path from "../../utils/Path.js";
import path from 'path';

const dir = new Path();

export default async function sqliteConnection() {
    const database = await sqlite.open({
        filename: path.resolve(dir.dirname(import.meta.url), "..", "database.db"),
        driver: sqlite3.Database
    })
    return database;
}


