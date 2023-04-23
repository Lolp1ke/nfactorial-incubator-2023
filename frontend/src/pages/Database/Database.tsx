import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { urlParams } from "../../App.tsx";
import { FieldTypes, IDatabase } from "@shared/types/DBTypes";

import "./styles/database.scss";

import FieldValues from "@pages/Database/components/Field/FieldValues.tsx";

import { useDB } from "../../context/DBContext.tsx";
import { useTable } from "../../context/TableContext.tsx";
import { useRecord } from "../../context/RecordContext.tsx";

export default function Database() {
	const [database, setDatabase] = useState<IDatabase>({
		tables: [
			{
				table1: [
					{
						name: [
							{
								value: "sad",
								createdAt: 0,
								alteredAt: 0,
							},
						],
					},
				],
			},
		],
		structures: [
			{
				table1: [
					{
						name: {
							type: "string",
							required: true,
							unique: false,
						},
					},
				],
			},
		],
	});

	const dbName = useParams<urlParams>().dbname!;
	const tableNameRef = useRef<HTMLInputElement>(null);
	const fieldRef = useRef<HTMLInputElement>(null);
	const typeChooseRef = useRef<HTMLSelectElement>(null);
	const requiredRef = useRef<HTMLInputElement>(null);
	const uniqueRef = useRef<HTMLInputElement>(null);
	const recordNameRef = useRef<HTMLInputElement>(null);

	const redirectTo = useNavigate();

	const { deleteDB, getOne } = useDB();
	const { addTable, deleteTable } = useTable();
	const { addRecord } = useRecord();
	async function handleAddRecord({
		tableName,
		recordName,
		type,
		required,
		unique,
	}: {
		tableName: string;
		recordName: string;
		type: string;
		required: boolean;
		unique: boolean;
	}) {
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
	async function handleAddField({
		tableName,
		recordName,
		value,
	}: {
		tableName: string;
		recordName: string;
		value: string;
	}) {
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

	useEffect(() => {
		Promise.all([getOne({ dbName: dbName })]).then((data) => {
			if (!data[0]) return redirectTo("/");

			setDatabase(data[0]);
		});
	}, []);

	return (
		<section className="database">
			<div className="database__container">
				<div className="database__info">
					<h3 className="database__title">{dbName}</h3>
					<div className="database__actions">
						<form
							className="database__action"
							onSubmit={(e) => {
								e.preventDefault();

								deleteDB({ dbName: dbName }).then();
							}}
						>
							<button className="database__button delete" type={"submit"}>
								Delete database
							</button>
						</form>
						<form
							className="database__action"
							onSubmit={(e) => {
								e.preventDefault();
								if (!tableNameRef.current) return;

								addTable({
									database: database,
									dbName: dbName,
									tableName: tableNameRef.current.value,
								}).then();
							}}
						>
							<input
								type="text"
								className="database__input-field"
								required={true}
								placeholder={"Table name..."}
								ref={tableNameRef}
							/>
							<button className="database__button create" type={"submit"}>
								Create table
							</button>
						</form>
					</div>
				</div>
				<div className="database__tables">
					{database.tables.map((table, currentTableIndex) => {
						const currentTable = Object.keys(table)[0]!;

						return (
							<div className="database__table" key={currentTableIndex}>
								<div className="database__table-info">
									<h3 className="database__table-name">{currentTable}</h3>

									<form
										className="database__actions"
										onSubmit={(e) => {
											e.preventDefault();

											if (!recordNameRef.current) return;
											if (!typeChooseRef.current) return;
											if (!requiredRef.current) return;
											if (!uniqueRef.current) return;

											addRecord({
												database: database,
												dbName: dbName,
												tableName: currentTable,
												recordName: recordNameRef.current.value,
												type: typeChooseRef.current.value as FieldTypes,
												required: requiredRef.current.checked,
												unique: uniqueRef.current.checked,
											}).then();

											// handleAddRecord({
											// 	tableName: currentTable,
											// 	recordName: recordNameRef.current.value,
											// 	type: typeChooseRef.current.value,
											// 	required: requiredRef.current.checked,
											// 	unique: uniqueRef.current.checked,
											// }).then();
										}}
									>
										<div className="database__action">
											<input
												type="text"
												className="database__input-field"
												placeholder={"RecordName"}
												required={true}
												ref={recordNameRef}
											/>
											<select name="type" id="type" required={true} ref={typeChooseRef}>
												<option value="string">String</option>
												<option value="float">Float</option>
												<option value="int">Integer</option>
												<option value="image">Image</option>
												<option value="boolean">Boolean</option>
											</select>
											<p>required</p>
											<input type="checkbox" ref={requiredRef} />
											<p>unique</p>
											<input type="checkbox" ref={uniqueRef} />
											<button type={"submit"} className="database__button create">
												Add
											</button>
										</div>
									</form>
									<button
										className="database__table-delete"
										type="button"
										onClick={() => {
											deleteTable({
												database: database,
												dbName: dbName,
												tableName: currentTable,
											}).then();
										}}
									>
										Delete table
									</button>
								</div>
								{table[currentTable].map((records, currentFieldIndex) => {
									const currentRecord = Object.keys(records)[0]!;

									const currentStructure =
										database.structures[currentTableIndex][currentTable][currentFieldIndex][
											currentRecord
										];

									return (
										<div className="database__field" key={currentFieldIndex}>
											<div className="database__actions">
												<h3 className="database__field-title">{currentRecord}</h3>
												<form
													className="database__field-add"
													onSubmit={(e) => {
														e.preventDefault();

														console.log(fieldRef);
														if (!fieldRef.current) return;

														handleAddField({
															tableName: currentTable,
															recordName: currentRecord,
															value: fieldRef.current.value,
														}).then();
													}}
												>
													{currentStructure.type === "image" ? (
														<button
															className="database__button create"
															type={"button"}
															onClick={() => {
																if (!fieldRef.current) return;

																fieldRef.current.click();
															}}
														>
															<input type="file" hidden={true} ref={fieldRef} />
															Upload image
														</button>
													) : (
														<>
															<input type="text" required={true} ref={fieldRef} />
															<button className="database__button create" type={"submit"}>
																Insert
															</button>
														</>
													)}
												</form>
											</div>
											<div className="database__field-info">
												<p className="database__field-text">Value</p>
												<p className="database__field-text">Created At</p>
												<p className="database__field-text">Altered At</p>
												<p className="database__field-text">Type</p>
												<p className="database__field-text">Required</p>
												<p className="database__field-text">Unique</p>
											</div>
											{records[currentRecord].map((field, currentFieldIndex) => {
												return (
													<FieldValues
														value={field.value}
														createdAt={field.createdAt}
														alteredAt={field.alteredAt}
														type={currentStructure.type}
														required={currentStructure.required}
														unique={currentStructure.unique}
														key={currentFieldIndex}
													/>
												);
											})}
										</div>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
