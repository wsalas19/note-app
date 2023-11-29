import { /* useState, */ ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterOption } from "../utils/types";
import { useNotes } from "../utils/useNotes";

function HeadingControls({ openModal }: { openModal: () => void }) {
	const [searchParams, setSearchParams] = useSearchParams({ archived: "all", category: "all" });
	const { filterArchived } = useNotes();
	const archived = searchParams.get("archived") || "all";

	const handleArchivedChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (typeof value === "string") {
			const filterOptionValue = value as FilterOption;

			filterArchived(filterOptionValue);
		}
		setSearchParams(
			(prev) => {
				prev.set("archived", event.target.value);
				return prev;
			},
			{ replace: true },
		);
	};

	return (
		<>
			<div className=' bg-blue-500 p-2'>
				<h1 className=' font-bold text-2xl text-white text-center'>Note App</h1>
			</div>
			<div className='flex flex-col gap-2 p-2'>
				<div>
					<h1 className=' font-bold text-lg text-[#121212]'>My Notes</h1>

					<div className='flex flex-row gap-3 justify-between md:justify-start'>
						<button className=' btn-primary' onClick={() => openModal()}>
							+ new note
						</button>
						{/* <button disabled className=' btn-primary'>
							+ new category
						</button> */}

						<select className='btn-primary' value={archived} onChange={handleArchivedChange}>
							<option value='all'>All Notes</option>
							<option value='archived'>Archived</option>
							<option value='unarchived'>Unarchived</option>
						</select>

						{/* <select
							className='btn-primary'
							value={category}
							disabled
							onChange={handleCategoryChange}
						>
							<option value='all'>All Categories</option>
							<option value='category1'>Generic</option>
						</select> */}
					</div>
				</div>
			</div>
		</>
	);
}

export default HeadingControls;
