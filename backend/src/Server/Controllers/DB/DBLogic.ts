import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";

import { IDatabaseList } from "@shared/types/DBTypes";

interface IDatabase {
	name: string;
}

const DBPath: string = path.resolve(__dirname, "../../..", "./databases");

const defaultDB = {
	tables: [],
	structures: [],
};
class DBLogic {
	public async create(req: Request<any, any, IDatabase>, res: Response, next: NextFunction) {
		const { name } = req.body;
		const fixedDbName: string = name.trim().toLowerCase().replace(/ /g, "");

		const pathToDb = DBPath + "\\" + fixedDbName + ".json";

		try {
			const exist = fs.existsSync(pathToDb);
			if (exist) return res.status(409).json({ message: "This database already exist" });

			await fs.promises.writeFile(pathToDb, JSON.stringify(defaultDB), { encoding: "utf-8" });
			return res.status(201).json({ message: "DB created" });
		} catch (error) {
			console.log(error, "Error in Controllers/DB Create");
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
	public async delete(req: Request<any, any, IDatabase>, res: Response, next: NextFunction) {
		const { name } = req.body;
		const pathToDb = DBPath + "\\" + name + ".json";

		try {
			const exist = fs.existsSync(pathToDb);
			if (!exist) return res.status(404).json({ message: "Database not found" });

			await fs.promises.rm(pathToDb);
			return res.status(200).json({ message: "Successfully deleted" });
		} catch (error) {
			console.log(error, "Error in Controllers/DB Delete");
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
	public async getOne(req: Request<any, any, any, IDatabase>, res: Response, next: NextFunction) {
		const { name } = req.query;
		const pathToDb = DBPath + "\\" + name + ".json";

		try {
			const exist = fs.existsSync(pathToDb);
			if (!exist) return res.status(404).json({ message: "Database not found" });

			const db = JSON.parse(await fs.promises.readFile(pathToDb, { encoding: "utf-8" }));

			return res.status(200).send(db);
		} catch (error) {
			console.log(error, "Error in Controllers/DB get");
			return res.status(500).json({ message: "Something went wrong" });
		}
	}

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			fs.readdir(DBPath, { encoding: "utf-8" }, (err, files) => {
				if (err) throw err;

				const FilesPromise = files.map((fileName, key) => {
					const filePath = DBPath + "\\" + fileName;

					return fs.promises.stat(filePath).then((data) => {
						return {
							name: fileName.replace(".json", ""),
							size: data.size,
							createdAt: data.birthtime,
						} as IDatabaseList;
					});
				});

				Promise.all(FilesPromise).then((data: IDatabaseList[]) => {
					return res.status(200).send(data);
				});
			});
		} catch (error) {
			console.log(error, "Error in Controllers/DB getAll");
			return res.status(500).json({ message: "Something went wrong" });
		}
	}
}

export default new DBLogic();
