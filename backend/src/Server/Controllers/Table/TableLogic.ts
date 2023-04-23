import { Request, Response, NextFunction } from "express";
import fs from "fs";

import { FieldTypes, IDatabase } from "@shared/types/DBTypes";
import path from "path";

interface IAddAndDelete {
	dbRaw: IDatabase;
	tableName: string;
	dbName: string;
}

interface IAdd extends IAddAndDelete {
	type: FieldTypes;
	required: boolean;
	unique: boolean;
}

const DBPath: string = path.resolve(__dirname, "../../..", "./databases");

class TableLogic {
	public async add(req: Request<any, any, IAddAndDelete>, res: Response, next: NextFunction) {
		const { dbRaw, tableName, dbName } = req.body;
		const pathToDb: string = DBPath + "\\" + dbName + ".json";

		const fixedTableName: string = tableName.toLowerCase().trim().replace(/ /g, "-");

		try {
			dbRaw.tables.push({ [fixedTableName]: [] });
			dbRaw.structures.push({ [fixedTableName]: [] });

			await fs.promises
				.writeFile(pathToDb, JSON.stringify(dbRaw), { encoding: "utf-8" })
				.then(() => {
					return res.status(201).json({ message: "Table successfully added" });
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			console.log(error, "Error in Controllers/Table Add");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}
	public async delete(req: Request<any, any, IAddAndDelete>, res: Response, next: NextFunction) {
		const { dbRaw, tableName, dbName } = req.body;
		const pathToDb: string = DBPath + "\\" + dbName + ".json";

		try {
			dbRaw.tables.map((table, key) => {
				if (table[tableName]) {
					dbRaw.tables.splice(key, 1);
				}
			});

			await fs.promises
				.writeFile(pathToDb, JSON.stringify(dbRaw), { encoding: "utf-8" })
				.then(() => {
					return res.status(200).json({ message: "Table successfully deleted" });
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			console.log(error, "Error in Controllers/Table Delete");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}
}

export default new TableLogic();
