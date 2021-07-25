import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { ModalSimple } from '../ModalGroup/ModalSimple';
import { Api } from '../../services/Api';
import closeImg from '../../images/close.svg';
import incomeImg from '../../images/income.svg';
import outcomeImg from '../../images/outcome.svg';
import IconCancel from '../../images/icon-cancel.svg';

import { Container, MovementTypeContainer, RadioBox } from './styles';

interface NewMovementProps {
  isOpen: boolean;
  onRequestClose: () => void;
  product_id: string
}

export function NewMovementModal({ isOpen, onRequestClose, product_id }: NewMovementProps) {
  const [amount, setAmount] = useState(0);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [type, setType] = useState('entrada');
  
  const [isOpenModalSimple, setIsOpenModalSimple] = useState(false);
  
  useEffect(() => {
    async function load(){
      const response = await Api.get(`/products/${product_id}`);
      setName(response.data.name);
      setPrice(response.data.price);
    }
    load();
  }, [product_id])

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await Api.post('/movements', {
      product_id,
      type,
      amount
    }).then(() => {
      setAmount(0);
      setType('entrada');
      onRequestClose();
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    })
    .catch(() => {
      setAmount(0);
      setType('entrada');
      setIsOpenModalSimple(true);
    })
    
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal"/>
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastra movimentação</h2>

        <div className="campoInfo"><span>{name}</span></div>

        <input
          type="number"
          min='0'
          placeholder="Quantidade"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <MovementTypeContainer>
            <RadioBox
              type="button"
              onClick={() => { setType('entrada')}}
              isActive={type === 'entrada'}
              activeColor='green'
            >
              <img src={incomeImg} alt="Entrada"/>
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => { setType('saida')}}
              isActive={type === 'saida'}
              activeColor='red'
            >
              <img src={outcomeImg} alt="Saida"/>
              <span>Saida</span>
            </RadioBox>
        </MovementTypeContainer>

        <div className="campoInfo">
          <span>
            {new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price)
            }
          </span>
        </div>

        <button type="submit">Cadastrar</button>

      </Container>

      <ModalSimple 
        isOpen={isOpenModalSimple}
        onRequesrClose={() => setIsOpenModalSimple(false)}
        icon={IconCancel}
        title={'Error'}
        message={'Quantidade de produtos indisponível em estoque.'}
        onContinue={() => setIsOpenModalSimple(false)}
      />

    </Modal>
  );
}