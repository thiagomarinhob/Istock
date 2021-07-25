import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Api } from '../../services/Api';
import Header from "../../components/Header";
import { ModalSimple } from "../../components/ModalGroup/ModalSimple";

import IconSucess from '../../images/sucess.svg';

import { Container } from './styles';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  amount: string;
}

export function Update(){
  const history = useHistory();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');

  const [isOpenModalSucess, setIsOpenModalSucess] = useState(false);

  let id: any;
  id = localStorage.getItem('idProduct');

  useEffect(() => {
   async function load() {
     const response = await Api.get(`/products/${id}`);

     setName(response.data.name);
     setDescription(response.data.description);
     setPrice(response.data.price);
     setAmount(response.data.amount);
   }
   load();
  }, [])

  async function handleUpdateProduct({
    id,
    name,
    description,
    price,
    amount,
  }: Product){
    await Api.put(`/products/${id}`, {
      id,
      name,
      description,
      price,
      amount,
    });

    setIsOpenModalSucess(true);
  }

  return (
      <Container >
        <Header />

        <div className="card">
              <h1>Editar produto</h1>
              <div className="label-float">
                  <input type="text" required value={name} onChange={(event)=> setName(event.target.value)}/>
                  <label>Nome</label>
              </div>

              <div className="label-float">
                  <input type="text" required value={description} onChange={(event)=> setDescription(event.target.value)}/>
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
                  <button className="btn" onClick={() => handleUpdateProduct({
                    id,
                    name,
                    description,
                    price,
                    amount,
                  })}>Salvar</button>
                  <button className="btnBack" onClick={() => history.push('/')}>Voltar</button>
              </div>
          </div>

          <ModalSimple 
            isOpen={isOpenModalSucess}
            onRequesrClose={() => setIsOpenModalSucess(false)}
            icon={IconSucess}
            title="Sucesso"
            message="Produto editado com sucesso."
            onContinue={() => {
              history.push('/');
              setIsOpenModalSucess(false);
            }}
          />
      </Container>
  )
}