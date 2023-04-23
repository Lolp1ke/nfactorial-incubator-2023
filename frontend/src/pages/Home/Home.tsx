import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { IDatabaseList } from "@shared/types/DBTypes";

import "./styles/home.scss";
import { useDB } from "../../context/DBContext.tsx";

export default function Home() {
	const [databaseList, setDatabaseList] = useState<IDatabaseList[]>([]);
	const [search, setSearch] = useState<string>("");

	const dbNameRef = useRef<HTMLInputElement>(null);
	const { getAll, createDB, deleteDB } = useDB();

	useEffect(() => {
		Promise.all([getAll()]).then((data) => {
			setDatabaseList(data[0]);
		});
	}, []);

	return (
		<section className="home">
			<div className="home__container">
				<div className="home__info">
					<h2 className="home__title">All databases</h2>
					<input
						type="text"
						className="home__input-field"
						placeholder={"Search..."}
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
						}}
					/>

					<form
						onSubmit={(e) => {
							e.preventDefault();
							if (!dbNameRef.current) return;

							createDB({
								dbName: dbNameRef.current.value,
							}).then();
						}}
						className="home__actions"
					>
						<input
							type="text"
							className="home__input-field"
							required={true}
							placeholder={"New database name"}
							ref={dbNameRef}
						/>
						<button className="home__create" type={"submit"}>
							Create
						</button>
					</form>
				</div>
				<div className="home__databases">
					{databaseList
						.filter((db) => {
							if (db.name.toLowerCase().includes(search.split(" ").join("").toLowerCase())) return db;
							else if (search === "") return db;
						})
						.map((filteredDb, key) => {
							return (
								<div className="home__database" key={key}>
									<article className="home__article">
										<h3 className="home__database-name">{filteredDb.name}</h3>
										<p className="home__database-size">{(filteredDb.size / 1000).toFixed(2)} Kb</p>
									</article>
									<p className="home__database-date">
										{new Date(filteredDb.createdAt).toLocaleDateString("kz-KZ", {
											hour: "numeric",
											minute: "numeric",
											timeZone: "Asia/Almaty",
										})}
									</p>
									<Link to={"/db/" + filteredDb.name} className="home__database-link">
										View
									</Link>
									<div className="home__actions">
										<Link to={"/db/" + filteredDb.name} className="home__database-link">
											Edit
										</Link>
										<button
											className="home__action delete"
											type={"button"}
											onClick={() => {
												deleteDB({
													dbName: filteredDb.name,
												}).then();
											}}
										>
											Delete
										</button>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</section>
	);
}
