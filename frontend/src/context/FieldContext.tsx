import { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { IDatabase } from "@shared/types/DBTypes";

interface IFieldDefault {
	database: IDatabase;
	dbName: string;
	tableName: string;
	recordName: string;
}
interface IAddField extends IFieldDefault {
	value: string;
}
interface FieldContextProps {
	addField: ({ database, dbName, tableName, recordName, value }: IAddField) => Promise<void>;
}

const FieldContext = createContext({} as FieldContextProps);

export function useField(): FieldContextProps {
	return useContext(FieldContext);
}

export function FieldProvider({ children }: { children: ReactNode }) {
	async function addField({ database, dbName, tableName, recordName, value }: IAddField) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/field/add`,
			data: {
				db: database,
				dbName: dbName,
				tableName: tableName,
				recordName: recordName,
				value: value,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	const values: FieldContextProps = { addField };

	return <FieldContext.Provider value={values}>{children}</FieldContext.Provider>;
}
