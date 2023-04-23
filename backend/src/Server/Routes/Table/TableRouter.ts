import { Router } from "express";

import TableLogic from "@controllers/Table/TableLogic";

class TableRouter {
	router: Router = Router();
	private logic: typeof TableLogic = TableLogic;

	constructor() {
		this.router.post("/add", this.logic.add);
		this.router.post("/delete", this.logic.delete);
	}
}

export default new TableRouter();
