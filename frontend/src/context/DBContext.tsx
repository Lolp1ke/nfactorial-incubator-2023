import { createContext, ReactNode, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { IDatabase } from "@shared/types/DBTypes";

interface IDBDefault {
	dbName: string;
}

interface DBContextProps {
	deleteDB: ({ dbName }: IDBDefault) => Promise<void>;
	getOne: ({ dbName }: IDBDefault) => Promise<void | IDatabase>;
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

	const values: DBContextProps = { deleteDB, getOne };

	return <DBContext.Provider value={values}>{children}</DBContext.Provider>;
}
