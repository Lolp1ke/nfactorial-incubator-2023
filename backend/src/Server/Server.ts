import express, { Express, json } from "express";
import cors from "cors";

import DBRouter from "@routes/DB/DBRouter";
import TableRouter from "@routes/Table/TableRouter";
import RecordRouter from "@routes/Record/RecordRouter";
import FieldRouter from "@routes/Field/FieldRouter";

class Server {
	server: Express = express();

	DBRouter: typeof DBRouter = DBRouter;
	TableRouter: typeof TableRouter = TableRouter;
	RecordRouter: typeof RecordRouter = RecordRouter;
	FieldRouter: typeof FieldRouter = FieldRouter;

	constructor() {
		this.server.use(cors());
		this.server.use(json());

		this.server.use("/api/db", this.DBRouter.router);
		this.server.use("/api/table", this.TableRouter.router);
		this.server.use("/api/record", this.RecordRouter.router);
		this.server.use("/api/field", this.FieldRouter.router);
	}

	public startServer(PORT: number) {
		this.server.listen(PORT, () => {
			console.log("Server is listening on port:", PORT);
		});
	}
}

export default new Server();
