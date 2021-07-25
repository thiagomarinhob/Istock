import { Api } from '../../services/Api';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NewMovementModal } from '../NewMovementModal';

import { ModalSimple } from '../ModalGroup/ModalSimple';

import { Container, Search, Total } from './styles';

import IconDelete from '../../images/delete.svg';
import IconUpdate from '../../images/update.svg';
import IconNoResult from '../../images/noResult.svg';
import IconSucess from '../../images/sucess.svg';
import IconMovement from '../../images/movements.svg';

interface Product{
  id: string;
  name: string;
  description: string;
  price: number;
  amount: number;
}

export default function Table() {
  const history = useHistory();
  const [products, setProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState(0)
  const [productsFilter, setProductsFilter] = useState<Product[]>([]);
  const [filter, setFilter] = useState('');
  const [productIdMovement, setProductIdMovement] = useState('');

  const [isOpenModalSucess, setIsOpenModalSucess] = useState(false);
  const [isOpenNewMovementTable, setIsOpenNewMovementTable] = useState(false);

  async function load(){
     const response = await Api.get('/products');
     setTotal(response.data[1]);
     setProducts(response.data[0]);
     setProductsFilter(response.data[0]);
   }

  useEffect(() => {
    load();
    
  console.table(products)
  }, [])

  useEffect(() => {
    if(filter){
      const filterProducts = products.filter(
        (product) => product.name.toLowerCase().includes(filter.toLowerCase())
      )

      if(filterProducts) {
        setProductsFilter(filterProducts)
      }
    } else {
      setProductsFilter(products);
    }
  }, [filter, isOpenNewMovementTable, productIdMovement])
  
  
  async function handleDelete(id: string){
    await Api.delete(`/products/${id}`);
    
    load();
    setIsOpenModalSucess(true);
  }

  function hanldeUpdate(id: string) {
    localStorage.setItem('idProduct', id);
    history.push('/update');
  }

  function handleMoviment(id: string){
    localStorage.setItem('idMovement', id);
    setProductIdMovement(id);
    setIsOpenNewMovementTable(true);
  }

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
        <Total>Total de produtos: {total}</Total>
      </Search>

      {productsFilter.length === 0 ? (
        <div className="noResult">
          <img src={IconNoResult} alt="noResult" />
          <span>Você não possui nenhum produto no estoque</span>
        </div>
      ) : (
        <div className="scrol">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {productsFilter.map(item => {
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(item.price)
                    }</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                    <td  style={{
                      display: 'flex',
                      flexDirection: 'row'
                    }}>
                      <img src={IconDelete} onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer', marginRight: '5px'}}/>
                      <img src={IconUpdate} onClick={() => hanldeUpdate(item.id)} style={{ cursor: 'pointer'}}/>                  
                      <img src={IconMovement} onClick={() => handleMoviment(item.id)} alt="movements" style={{ cursor: 'pointer'}}/>
                    </td>
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

      <NewMovementModal 
        isOpen={isOpenNewMovementTable}
        onRequestClose={() => setIsOpenNewMovementTable(false)}
        product_id={productIdMovement}
      />
    </Container>
  )
}