import { Button, Modal } from "react-bootstrap";
import { SavedPokemon } from "src/utils/types";

interface Props {
  confirmationHandler: (confirm: boolean) => void;
  pokemon?: SavedPokemon;
  show: boolean;
}

const ReleaseModal = ({ confirmationHandler, pokemon, show }: Props) => {
  const handleConfirm = () => confirmationHandler(true);
  const handleCancel = () => confirmationHandler(false);
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to release{" "}
          <span className="text-capitalize">{pokemon?.name}</span>?
        </Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <div>
          <Button variant="dark" onClick={handleConfirm}>
            Confirm
          </Button>
          <Button variant="light" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ReleaseModal;
