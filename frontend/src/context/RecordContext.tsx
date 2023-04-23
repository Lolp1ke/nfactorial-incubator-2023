import { createContext, ReactNode, useContext } from "react";
import axios from "axios";
import { FieldTypes, IDatabase } from "@shared/types/DBTypes";

interface IRecordDefault {
	database: IDatabase;
	dbName: string;
	tableName: string;
	recordName: string;
}
interface IAddRecord extends IRecordDefault {
	type: FieldTypes;
	required: boolean;
	unique: boolean;
}
interface RecordContextProps {
	addRecord: ({ database, dbName, tableName, recordName, type, required, unique }: IAddRecord) => Promise<void>;
}

const RecordContext = createContext({} as RecordContextProps);

export function useRecord(): RecordContextProps {
	return useContext(RecordContext);
}

export function RecordProvider({ children }: { children: ReactNode }) {
	async function addRecord({ database, dbName, tableName, recordName, type, required, unique }: IAddRecord) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/record/add`,
			data: {
				db: database,
				dbName: dbName,
				tableName: tableName,
				recordName: recordName,
				type: type,
				required: required,
				unique: unique,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	const values: RecordContextProps = { addRecord };

	return <RecordContext.Provider value={values}>{children}</RecordContext.Provider>;
}
