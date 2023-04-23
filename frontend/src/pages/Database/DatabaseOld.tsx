import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

import "./styles/database.scss";

import { urlParams } from "../../App.tsx";
import { IDatabase } from "@shared/types/DBTypes";

export default function DatabaseOld() {
	const dbname = useParams<urlParams>().dbname!;
	const redirectTo = useNavigate();

	const [database, setDatabase] = useState<IDatabase>({} as IDatabase);

	const tableNameRef = useRef<HTMLInputElement>(null);

	async function getDB() {
		return await axios({
			method: "get",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/get-one`,
			params: { name: dbname },
		})
			.then((data: AxiosResponse<IDatabase>) => {
				return data.data;
			})
			.catch(() => {
				return redirectTo("/");
			});
	}

	async function handleCreateTable() {
		if (!tableNameRef.current) return;

		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/table/add`,
			data: {
				dbRaw: database,
				tableName: tableNameRef.current.value.replace(" ", "-"),
				dbName: dbname,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	async function handleDeleteTable({ tableName }: { tableName: string }) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/table/delete`,
			data: {
				dbRaw: database,
				tableName: tableName,
				dbName: dbname,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	async function deleteDB() {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/db/delete`,
			data: {
				name: dbname,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	async function handleAddRecord({
		tableName,
		fieldName,
		newValue,
		type,
		required,
		unique,
	}: {
		tableName: string;
		fieldName: string;
		newValue: string;
		type: string;
		required: boolean;
		unique: boolean;
	}) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/record/add`,
			data: {
				db: database,
				tableName: tableName,
				fieldName: fieldName,
				newValue: newValue,
				type: type,
				required: required,
				unique: unique,
			},
		}).then(() => {
			window.location.reload();
		});
	}
	async function handleChangeRecord({
		tableName,
		fieldName,
		newValue,
	}: {
		tableName: string;
		fieldName: string;
		newValue: string;
	}) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/record/edit`,
			data: {
				db: database,
				tableName: tableName,
				fieldName: fieldName,
				newValue: newValue,
			},
		}).then(() => {
			window.location.reload();
		});
	}
	async function handleDeleteRecord({ tableName, fieldName }: { tableName: string; fieldName: string }) {
		await axios({
			method: "POST",
			url: `${import.meta.env.VITE_BACKEND_IP}/api/record/delete`,
			data: {
				db: database,
				tableName: tableName,
				fieldName: fieldName,
			},
		}).then(() => {
			window.location.reload();
		});
	}

	useEffect(() => {
		Promise.all([getDB()]).then((data) => {
			if (!data[0]) return redirectTo("/");

			setDatabase(data[0]);
			console.log(data[0]);
		});
	}, []);

	return (
		<section className="database">
			<div className="database__container">
				<div className="database__info">
					<h3 className="database__title">{dbname}</h3>
					<div className="database__actions">
						<form
							className="database__action"
							onSubmit={(e) => {
								e.preventDefault();

								deleteDB().then();
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

								handleCreateTable().then();
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
					<div className="database__tables-info">
						<p>FieldName</p>
						<p>Value</p>
						<p>Created at</p>
						<p>Altered at</p>
						<p>Type</p>
						<p>Action</p>
					</div>
					{database.tables.map((table, tablesKey) => {
						const tableName = Object.keys(table)[0]!;
						const tableFields = Object.keys(table[tableName]);
						console.log(tableName, tableFields);

						return (
							<div className="database__table" key={tablesKey}>
								<div className="database__table-info">
									<p className="database__table-name">{tableName}</p>
									<button
										type={"button"}
										onClick={() => {
											handleDeleteTable({ tableName: tableName }).then();
										}}
										className="database__table-delete"
									>
										Delete table
									</button>
								</div>

								<div className="database__table-items">
									{/*{tableFields.map((tableField) => {*/}
									{/*	console.log(table[tableName][tableField]);*/}
									{/*	return table[tableName][tableField].map((values) => {*/}
									{/*		return <>{values.value}</>;*/}
									{/*	});*/}
									{/*})}*/}
									{/*{tableFields.map((tableField, fieldsKey) => {*/}
									{/*	return (*/}
									{/*	<div className="database__table-item" key={fieldsKey}>*/}
									{/*		<p>{tableRecord}</p>*/}
									{/*		<p>{table[tableName][tableRecord].value}</p>*/}
									{/*		<p>{table[tableName][tableRecord].createdAt}</p>*/}
									{/*		<p>{table[tableName][tableRecord].alteredAt}</p>*/}
									{/*		<p>{table[tableName][tableRecord].type}</p>*/}
									{/*		<div className="database__actions">*/}
									{/*			<button*/}
									{/*				className="database__action-button"*/}
									{/*				type={"button"}*/}
									{/*				onClick={() => {*/}
									{/*					handleDeleteRecord({*/}
									{/*						tableName: tableName,*/}
									{/*						fieldName: tableRecord,*/}
									{/*					}).then();*/}
									{/*				}}*/}
									{/*			>*/}
									{/*				Delete*/}
									{/*			</button>*/}
									{/*			<button*/}
									{/*				className="database__action-button"*/}
									{/*				type={"button"}*/}
									{/*				onClick={() => {*/}
									{/*					handleChangeRecord({*/}
									{/*						tableName: tableName,*/}
									{/*						fieldName: tableRecord,*/}
									{/*						newValue: "",*/}
									{/*					}).then();*/}
									{/*				}}*/}
									{/*			>*/}
									{/*				Edit*/}
									{/*			</button>*/}
									{/*		</div>*/}
									{/*	</div>*/}
									{/*	);*/}
									{/*})}*/}
								</div>
							</div>
						);
					})}
					<form
						onSubmit={(e) => {
							e.preventDefault();

							// handleAddRecord().then();
						}}
						className="database__field-add"
					>
						<input
							type="text"
							className="database__input-field"
							required={true}
							placeholder={"FieldName"}
						/>
						<input type="text" className="database__input-field" required={true} placeholder={"Value"} />
						<select name="" id="">
							<option value="">string</option>
							<option value="">image</option>
							<option value="">float</option>
							<option value="">int</option>
						</select>
					</form>
				</div>
				<div className="database__tree">
					<p className="database__tree-title">Database Tree info</p>
					<p className="database__tree-text">{JSON.stringify(database, null, "\t")}</p>
				</div>
			</div>
		</section>
	);
}
