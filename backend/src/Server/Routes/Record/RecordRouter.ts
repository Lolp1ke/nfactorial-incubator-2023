import { Router } from "express";
import RecordLogic from "@controllers/Record/RecordLogic";

class RecordRouter {
	router: Router = Router();
	private logic: typeof RecordLogic = RecordLogic;
	constructor() {
		this.router.post("/add", this.logic.add);
		this.router.post("/delete", this.logic.delete);
	}
}

export default new RecordRouter();
