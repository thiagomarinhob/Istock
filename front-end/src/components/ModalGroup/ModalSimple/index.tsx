import Modal from "react-modal";
import { Container, Button } from './styles';

interface ModalProps {
  isOpen: boolean;
  onRequesrClose: () => void;
  onContinue: () => void;
  icon: string;
  title: string;
  message: string;
}

export function ModalSimple({ 
  isOpen, 
  onRequesrClose, 
  icon,
  title,
  message,
  onContinue
}: ModalProps){
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequesrClose}
      overlayClassName="react-modal-overlay"
      className='react-modal-content'
    >
      <Container>
        <img src={icon} alt="icon"/>
        <h2>{title}</h2>
        <p>{message}</p>
        <Button
          onClick={() => onContinue()}
        >
          Fechar
        </Button>
      </Container>
    </Modal>
  )
}