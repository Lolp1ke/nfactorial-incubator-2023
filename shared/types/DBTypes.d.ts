export interface IDatabaseList {
	name: string;
	size: number;
	createdAt: Date;
}

export type FieldTypes = "string" | "float" | "int" | "boolean" | "image";

export interface IFieldStructure {
	[fieldName: string]: {
		type: FieldTypes;
		required: boolean;
		unique: boolean;
	};
}

export interface IStructures {
	[tableName: string]: IFieldStructure[];
}

export interface IFields {
	[fieldName: string]: {
		value: string;
		createdAt: number;
		alteredAt: number;
	}[];
}

export interface ITables {
	[tableName: string]: IFields[];
}

export interface IDatabase {
	tables: ITables[];
	structures: IStructures[];
}

// export type IDatabase = {
// 	tables: { [tableName in keyof IStructure & keyof ITables]: ITables[tableName][] }[];
// 	structures: { [tableName in keyof ITables & keyof IStructure]: IStructure[tableName][] }[];
// };
