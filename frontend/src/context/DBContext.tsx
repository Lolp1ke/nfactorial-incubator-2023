import { createContext, ReactNode, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { IDatabase, IDatabaseList } from "@shared/types/DBTypes";

interface IDBDefault {
	dbName: string;
}

interface DBContextProps {
	deleteDB: ({ dbName }: IDBDefault) => Promise<void>;
	getOne: ({ dbName }: IDBDefault) => Promise<void | IDatabase>;
	getAll: () => Promise<IDatabaseList[]>;
	createDB: ({ dbName }: IDBDefault) => Promise<void>;
}

const DBContext = createContext({} as DBContextProps);

export function useDB(): DBContextProps {
	return useContext(DBContext);
}

export function DBProvider({ children }: { children: ReactNode }) {
	async function deleteDB({ dbName }: IDBDefault) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/delete`,
			data: {
				name: dbName,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	async function getOne({ dbName }: IDBDefault) {
		return await axios({
			method: "GET",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/get-one`,
			params: {
				name: dbName,
			},
		})
			.then((data: AxiosResponse<IDatabase>) => {
				return data.data;
			})
			.catch(() => {});
	}
	async function getAll() {
		return await axios({
			method: "GET",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/get-all`,
		}).then((data: AxiosResponse<IDatabaseList[]>) => {
			return data.data;
		});
	}
	async function createDB({ dbName }: IDBDefault) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/create`,
			data: { name: dbName },
		}).then(() => {
			window.location.reload();
		});
	}

	const values: DBContextProps = { deleteDB, getOne, getAll, createDB };

	return <DBContext.Provider value={values}>{children}</DBContext.Provider>;
}
