import "module-alias/register";
import Server from "./Server/Server";
import * as process from "process";
import "dotenv/config";

class index {
	private _PORT: number = parseInt(process.env.BACKEND_PORT!);

	constructor() {
		Server.startServer(this._PORT);
	}
}

new index();
