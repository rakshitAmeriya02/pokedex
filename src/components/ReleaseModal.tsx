import { Button, Modal } from "react-bootstrap";
import { IMAGES } from "src/utils/constants";
import { SavedPokemon } from "src/utils/types";
import { LazyImage } from "./shared";

interface Props {
  confirmationHandler: (confirm: boolean) => void;
  pokemon?: SavedPokemon;
  show: boolean;
}

const ReleaseModal = ({ confirmationHandler, pokemon, show }: Props) => {
  const handleConfirm = () => confirmationHandler(true);
  const handleCancel = () => confirmationHandler(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imageElement = e.target as HTMLImageElement;
    imageElement.src = IMAGES.missingPokemon;
  };

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          Are you sure you want to release{" "}
          <span className="text-capitalize">{pokemon?.nickName}</span>?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LazyImage
          className="mw-100"
          onError={handleImageError}
          placeholderImage={IMAGES.pokemonPlaceholder}
          src={pokemon?.image || IMAGES.missingPokemon}
          alt={pokemon?.nickName || ""}
        />
      </Modal.Body>
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
