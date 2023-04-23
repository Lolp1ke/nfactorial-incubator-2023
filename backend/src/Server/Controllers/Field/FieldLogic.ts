import { Request, Response, NextFunction } from "express";
import path from "path";
import { FieldTypes, IDatabase } from "@shared/types/DBTypes";
import fs from "fs";

interface IRecordEdit {
	db: IDatabase;
	tableName: string;
	fieldName: string;
	newValue: string;
}

interface IRecordDelete {
	db: IDatabase;
	tableName: string;
	fieldName: string;
}
interface IAdd {
	db: IDatabase;
	dbName: string;
	tableName: string;
	recordName: string;
	value: string;
}

const DBPath: string = path.resolve(__dirname, "../../..", "./databases");
class FieldLogic {
	public async add(req: Request<any, any, IAdd>, res: Response, next: NextFunction) {
		const { db, dbName, tableName, recordName, value } = req.body;
		const pathToDb = DBPath + "\\" + dbName + ".json";

		try {
			db.tables.forEach((table, tableIndex) => {
				table[tableName].forEach((record) => {
					record[recordName].push({
						value: value,
						createdAt: new Date().getTime(),
						alteredAt: new Date().getTime(),
					});
				});
			});

			await fs.promises
				.writeFile(pathToDb, JSON.stringify(db), { encoding: "utf-8" })
				.then(() => {
					return res.status(201).json({ message: "Field successfully added" });
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			console.log(error, "Error in Controllers/Field add");
			res.status(500).json({ message: "Something went completely wrong" });
		}
	}
	public async edit(req: Request<any, any, IRecordEdit>, res: Response, next: NextFunction) {
		const { db, tableName, fieldName, newValue } = req.body;

		try {
			db.tables.map((table, tableIndex) => {
				const currentTableName = Object.keys(table)[0]!;
				const availableFields = Object.keys(table[currentTableName])!;

				console.log(availableFields);

				if (!table[tableName]) return;

				availableFields.map((currentTableField) => {
					// if (table[tableName][currentTableField].value === newValue) {
					// 	table[tableName][currentTableField].unique
					// 		? (table[tableName][fieldName].value = newValue)
					// 		: res.status(409).json({ message: "This value already exist" });
					// }
				});

				// if (table[currentTableName][fieldName].value === newValue) console.log(1);
			});
		} catch (error) {
			console.log(error, "Error in Controllers/Field edit");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}
	public async delete(req: Request<any, any, IRecordDelete>, res: Response, next: NextFunction) {
		const { db, tableName, fieldName } = req.body;

		try {
		} catch (error) {
			console.log(error, "Error in Controllers/Field delete");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}
}

export default new FieldLogic();
