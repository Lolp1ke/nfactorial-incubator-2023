interface FieldValuesProps {
	value: string;
	createdAt: number;
	alteredAt: number;
	type: string;
	required: boolean;
	unique: boolean;
}
export default function FieldValues({ value, createdAt, alteredAt, type, required, unique }: FieldValuesProps) {
	return (
		<div className="database__table-item">
			<p className="database__field-data">{value}</p>
			<p className="database__field-data">{createdAt}</p>
			<p className="database__field-data">{alteredAt}</p>
			<p className="database__field-data">{type}</p>
			<p className="database__field-data">{`${required}`}</p>
			<p className="database__field-data">{`${unique}`}</p>
		</div>
	);
}
