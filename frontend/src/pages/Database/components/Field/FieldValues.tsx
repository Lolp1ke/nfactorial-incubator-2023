import { FieldTypes } from "@shared/types/DBTypes";

interface FieldValuesProps {
	value: string;
	createdAt: number;
	alteredAt: number;
	type: FieldTypes;
	required: boolean;
	unique: boolean;
}
export default function FieldValues({ value, createdAt, alteredAt, type, required, unique }: FieldValuesProps) {
	return (
		<div className="database__table-item">
			{type === "image" ? (
				<img src={value} alt={"image"} className={"database__field-image"} draggable={false} />
			) : (
				<p className="database__field-data">{value}</p>
			)}
			<p className="database__field-data">{createdAt}</p>
			<p className="database__field-data">{alteredAt}</p>
			<p className="database__field-data">{type}</p>
			<p className="database__field-data">{`${required}`}</p>
			<p className="database__field-data">{`${unique}`}</p>
		</div>
	);
}
