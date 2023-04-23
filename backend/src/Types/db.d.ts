type RecordTypes = "string" | "float" | "int" | "image";

export interface Table {
	type: RecordTypes;
	required: boolean;
	unique: boolean;
}

export interface Cell {
	id: number;
	key: string;
	type: RecordTypes;
	value: string | number | null;
}
