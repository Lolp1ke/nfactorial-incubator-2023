import { Request, Response, NextFunction } from "express";
import { FieldTypes, IDatabase } from "@shared/types/DBTypes";
import fs from "fs";
import path from "path";

interface IAdd {
	db: IDatabase;
	dbName: string;
	tableName: string;
	recordName: string;
	type: FieldTypes;
	required: boolean;
	unique: boolean;
}

const DBPath: string = path.resolve(__dirname, "../../..", "./databases");
class RecordLogic {
	public async add(req: Request<any, any, IAdd>, res: Response, next: NextFunction) {
		const { db, dbName, tableName, recordName, type, required, unique } = req.body;
		const pathToDb: string = DBPath + "\\" + dbName + ".json";

		const fixedRecordName: string = recordName.trim().toLowerCase().replace(/ /g, "-");

		console.log(fixedRecordName);

		try {
			db.tables.forEach((table, tableIndex) => {
				const currentTable = Object.keys(table)[0]!;
				if (currentTable !== tableName) return;

				table[currentTable].push({ [fixedRecordName]: [] });

				db.structures[tableIndex][currentTable].push({
					[fixedRecordName]: {
						type: type,
						required: required,
						unique: unique,
					},
				});
			});

			await fs.promises
				.writeFile(pathToDb, JSON.stringify(db), { encoding: "utf-8" })
				.then(() => {
					return res.status(201).json({ message: "Record successfully created" });
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			console.log(error, "Error in Controllers/Record add");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}

	public async delete(req: Request<any, any, IAdd>, res: Response, next: NextFunction) {
		const { db, tableName, recordName, type, required, unique } = req.body;

		try {
		} catch (error) {
			console.log(error, "Error in Controllers/Record delete");
			return res.status(500).json({ message: "Something went completely wrong" });
		}
	}
}

export default new RecordLogic();
