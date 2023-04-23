import { Route, Routes } from "react-router-dom";

import "@assets/styles/default.scss";

import Home from "./pages/Home/Home";
import Database from "./pages/Database/Database";
import { DBProvider } from "./context/DBContext.tsx";
import { TableProvider } from "./context/TableContext.tsx";
import { RecordProvider } from "./context/RecordContext.tsx";
import { FieldProvider } from "./context/FieldContext.tsx";

export type urlParams = {
	dbname: string;
};

export default function App() {
	return (
		<DBProvider>
			<TableProvider>
				<RecordProvider>
					<FieldProvider>
						<Routes>
							<Route path={"/"}>
								<Route path={""} element={<Home />} />
								<Route path={"home"} element={<Home />} />
							</Route>

							<Route path={"/db"}>
								<Route path={":dbname"} element={<Database />} />
							</Route>
						</Routes>
					</FieldProvider>
				</RecordProvider>
			</TableProvider>
		</DBProvider>
	);
}
