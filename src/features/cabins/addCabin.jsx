import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens='cabin-form'>
				<Button>Add new Cabin</Button>
			</Modal.Open>

			<Modal.Window name='cabin-form'>
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}



// function AddCabin() {
//    const [isOpenModal, setIsOpenModal] = useState(false);

// 	const close = () => setIsOpenModal(prev => !prev);

// 	return <div>
// 		<Button
// 			onClick={() => setIsOpenModal(prev => !prev)}
// 		>Add new cabin</Button>
// 		{ isOpenModal &&
// 			<Modal onClose={close}>
// 				<CreateCabinForm onClose={close} />
// 			</Modal>
// 		}
// 	</div>
// }

export default AddCabin;