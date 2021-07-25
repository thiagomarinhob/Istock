import { Api } from '../../services/Api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ModalSimple } from '../ModalGroup/ModalSimple';

import { Container, Search } from './styles';

import IconNoResult from '../../images/noResult.svg';
import IconSucess from '../../images/sucess.svg';

interface Moviment{
  id: string;
  name: string;
  type: string;
  amount: number;
  date: string;
}

interface Product{
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}

export default function MovimentTable() {
  const history = useHistory();
  const [movements, setMovements] = useState<Moviment[]>([]);
  const [movementsFilter, setMovementsFilter] = useState<Moviment[]>([]);
  const [filter, setFilter] = useState('');

  const [isOpenModalSucess, setIsOpenModalSucess] = useState(false);

  async function load(){
     const response = await Api.get('/movements');
     const products = await Api.get('/products');
     
     const result: Moviment[] = response.data.map((item: any) => {
        const product: Product = products.data[0].find((pdt: Product ) => pdt.id === item.product_id);
        
        return {
          id: item.id,
          name: product.name,
          type: item.type,
          amount: item.amount,
          date: new Intl.DateTimeFormat("pt-BR", {
            timeZone: "UTC",
            day: "2-digit",
            month: "2-digit",
            year: "2-digit",
          }).format(new Date(item.updated_at)),
        }
     })
     console.log('result:', result)
     setMovements(result);
     setMovementsFilter(result);
   }

  useEffect(() => {
    load();
  }, [])

  useEffect(() => {
    if(filter){
      const filterMovements = movements.filter(
        (product) => product.name.toLowerCase().includes(filter.toLowerCase())
      )

      if(filterMovements) {
        setMovementsFilter(filterMovements);
      }
    } else {
      setMovementsFilter(movements);
    }
  }, [filter])

  return (
    <Container>
      <Search>
        <div>
          <label>Buscar</label>
          <input 
            type="text"
            placeholder="Buscar por nome"
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
            autoFocus
          />
        </div>
      </Search>

      {movementsFilter.length === 0 ? (
        <div className="noResult">
          <img src={IconNoResult} alt="noResult" />
          <span>Você não possui nenhuma movimentação</span>
        </div>
      ) : (
        <div className="scrol">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {movementsFilter.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td>{item.date}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <ModalSimple 
        isOpen={isOpenModalSucess}
        onRequesrClose={() => setIsOpenModalSucess(false)}
        icon={IconSucess}
        title="Sucesso"
        message="Produto excluido com sucesso."
        onContinue={() => {
          setIsOpenModalSucess(false);
        }}
      />
    </Container>
  )
}