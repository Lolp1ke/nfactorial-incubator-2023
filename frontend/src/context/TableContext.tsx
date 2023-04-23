import { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { IDatabase } from "@shared/types/DBTypes";

interface ITableDefault {
	database: IDatabase;
	dbName: string;
	tableName: string;
}
interface TableContextProps {
	addTable: ({ database, dbName, tableName }: ITableDefault) => Promise<void>;
	deleteTable: ({ database, dbName, tableName }: ITableDefault) => Promise<void>;
}

const TableContext = createContext({} as TableContextProps);

export function useTable(): TableContextProps {
	return useContext(TableContext);
}

export function TableProvider({ children }: { children: ReactNode }) {
	async function addTable({
		database,
		dbName,
		tableName,
	}: {
		database: IDatabase;
		dbName: string;
		tableName: string;
	}) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/table/add`,
			data: {
				dbRaw: database,
				dbName: dbName,
				tableName: tableName,
			},
		}).then(() => {
			window.location.reload();
		});
	}
	async function deleteTable({ database, tableName, dbName }: ITableDefault) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/table/delete`,
			data: {
				dbRaw: database,
				dbName: dbName,
				tableName: tableName,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	const values: TableContextProps = { addTable, deleteTable };

	return <TableContext.Provider value={values}>{children}</TableContext.Provider>;
}
