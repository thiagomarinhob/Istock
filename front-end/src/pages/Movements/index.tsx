import Header from '../../components/Header';
import MovimentTable from '../../components/MovimentTable';

import { Container } from './styles';

export function Movements(){
  return (
    <Container>
      <Header />
      <MovimentTable />
    </Container>
  )
}