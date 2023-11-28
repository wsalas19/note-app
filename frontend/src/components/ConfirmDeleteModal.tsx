import { DeleteModalProps } from "@/utils/types";
import Modal from "react-modal";
function ConfirmDeleteModal({ isOpen, onClose, deleteFn }: DeleteModalProps) {
	return (
		<>
			{isOpen && <div className='overlay'></div>}
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				className=' rounded-lg center-modal'
				overlayClassName='overlay'
			>
				<div className='flex flex-col p-2'>
					<h2 className='text-2xl font-bold mb-4'>Are you sure?</h2>
					<div className='flex justify-between items-center'>
						<button onClick={onClose} className='btn-primary '>
							Cancel
						</button>
						<button
							onClick={() => {
								onClose();
								deleteFn();
							}}
							className='btn-secondary'
						>
							Delete
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default ConfirmDeleteModal;
