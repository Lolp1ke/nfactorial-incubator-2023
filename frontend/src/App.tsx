import { Route, Routes } from "react-router-dom";

import "@assets/styles/default.scss";

import Home from "./pages/Home/Home";
import Database from "./pages/Database/Database";
import { DBProvider } from "./context/DBContext.tsx";
import { TableProvider } from "./context/TableContext.tsx";
import { RecordProvider } from "./context/RecordContext.tsx";

export type urlParams = {
	dbname: string;
};

export default function App() {
	return (
		<DBProvider>
			<TableProvider>
				<RecordProvider>
					<Routes>
						<Route path={"/"}>
							<Route path={""} element={<Home />} />
							<Route path={"home"} element={<Home />} />
						</Route>

						<Route path={"/db"}>
							<Route path={":dbname"} element={<Database />} />
						</Route>
					</Routes>
				</RecordProvider>
			</TableProvider>
		</DBProvider>
	);
}
