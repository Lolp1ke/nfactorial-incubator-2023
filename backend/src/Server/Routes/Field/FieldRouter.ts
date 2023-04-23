import { Router } from "express";
import FieldLogic from "@controllers/Field/FieldLogic";

class FieldRouter {
	router: Router = Router();
	private logic: typeof FieldLogic = FieldLogic;

	constructor() {
		this.router.post("/add", this.logic.add);
		this.router.post("/edit", this.logic.edit);
		this.router.post("/delete", this.logic.delete);
	}
}

export default new FieldRouter();
