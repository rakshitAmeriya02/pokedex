import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface Props {
  onHide: (name: string) => void;
  show: boolean;
}

const PokemonModal = ({ show, onHide }: Props) => {
  const [nickName, setNickName] = useState("");
  const handleSave = () => onHide(nickName);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNickName(e.target.value);
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>Give Nickname</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          type="input"
          value={nickName}
          onChange={handleChange}
          placeholder="e.g., zemo"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={nickName.trim().length === 0} onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;
