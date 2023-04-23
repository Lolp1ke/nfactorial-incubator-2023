import { Router } from "express";

import DBLogic from "@controllers/DB/DBLogic";

class DBRouter {
	router: Router = Router();
	logic: typeof DBLogic = DBLogic;

	constructor() {
		this.router.post("/create", this.logic.create);
		this.router.post("/delete", this.logic.delete);
		this.router.get("/get-all", this.logic.getAll);
		this.router.get("/get-one", this.logic.getOne);
	}
}

export default new DBRouter();
