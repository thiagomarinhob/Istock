import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { useHistory } from 'react-router-dom';
import { Api } from '../../services/Api';
import IconSucess from '../../images/sucess.svg';

import { ModalSimple } from '../../components/ModalGroup/ModalSimple';

import { Container } from './styles';

interface Product {
  name: string;
  description: string;
  price: string;
  amount: string;
}

export function Create(){
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [isDisable, setIsDisable] = useState(false);

  const [isOpenModalSucess, setIsOpenModalSucess] = useState(false);

  async function handleCreateProduct({
    name,
    description,
    price,
    amount,
  }: Product){
    await Api.post('/products', {
      name,
      description,
      price,
      amount,
    });
    setIsOpenModalSucess(true);
  }

  useEffect(() => {
    if(name.length !== 0 && description.length !== 0 && price.length !== 0 && amount.length !== 0){
      setIsDisable(true);
    }else{
      setIsDisable(false);
    }
  }, [name, description, price, amount])


  return (
      <Container>
        <Header />
          <div className="card">
              <h1>Cadastrar produto</h1>
              <div className="label-float">
                  <input type="text" required onChange={(event)=> setName(event.target.value)}/>
                  <label>Nome</label>
              </div>

              <div className="label-float">
                  <input type="text" required onChange={(event)=> setDescription(event.target.value)}/>
                  <label>Descrição</label>
              </div>

              <div className="label-float">
                  <input type=" number" required value={price} onChange={(event)=> setPrice(event.target.value)}/>
                  <label>Preço</label>
              </div>

              <div className="label-float">
                  <input type=" number" required value={amount} onChange={(event)=> setAmount(event.target.value)}/>
                  <label>Quantidade</label>
              </div>

              <div className="justify-center">
                  <button className="btn" onClick={() => handleCreateProduct({
                    name,
                    description,
                    price,
                    amount,
                  })} disabled={!isDisable}>Cadatrar</button>
                  <button className="btnBack" onClick={() => history.push('/')}>Voltar</button>
              </div>
          </div>
          <ModalSimple 
            isOpen={isOpenModalSucess}
            onRequesrClose={() => setIsOpenModalSucess(false)}
            icon={IconSucess}
            title="Sucesso"
            message="Produto cadastrado com sucesso."
            onContinue={() => {
              history.push('/');
              setIsOpenModalSucess(false);
            }}
          />
    </Container>
  )
}