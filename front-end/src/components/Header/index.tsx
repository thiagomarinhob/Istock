import { Container, Logo, Menu, ContainerDropdown } from './styles';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header(){
  const history = useHistory();
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    window.removeEventListener("click", detectClickOusideMenu);
    window.addEventListener("click", detectClickOusideMenu);

    return () => window.removeEventListener("click", detectClickOusideMenu);
  }, [isOpenMenu]);

  function detectClickOusideMenu(e: MouseEvent) {
    const menuModal = document.getElementById("menuModal");

    // @ts-ignore
    if (!menuModal?.contains(e.target)) {
      if (!menuModal) {
        return;
      }

      if (isOpenMenu) {
        setIsOpenMenu(false);
      }
    }
  }

  return (
    <Container>
      <Logo onClick={() => history.push('/')}>ISTOCK</Logo>
      <Menu onClick={() => setIsOpenMenu(prevState => !prevState)} id="menuModal">
        <svg
          width="17"
          height="20"
          viewBox="0 0 16 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5625 2.89062H15.1875C15.4688 2.89062 15.75 2.64453 15.75 2.32812V0.921875C15.75 0.640625 15.4688 0.359375 15.1875 0.359375H0.5625C0.246094 0.359375 0 0.640625 0 0.921875V2.32812C0 2.64453 0.246094 2.89062 0.5625 2.89062ZM0.5625 8.51562H15.1875C15.4688 8.51562 15.75 8.26953 15.75 7.95312V6.54688C15.75 6.26562 15.4688 5.98438 15.1875 5.98438H0.5625C0.246094 5.98438 0 6.26562 0 6.54688V7.95312C0 8.26953 0.246094 8.51562 0.5625 8.51562ZM0.5625 14.1406H15.1875C15.4688 14.1406 15.75 13.8945 15.75 13.5781V12.1719C15.75 11.8906 15.4688 11.6094 15.1875 11.6094H0.5625C0.246094 11.6094 0 11.8906 0 12.1719V13.5781C0 13.8945 0.246094 14.1406 0.5625 14.1406Z"
            fill="white"
          />
        </svg>
        {isOpenMenu && (
          <ContainerDropdown>
            <p onClick={() => history.push('/')}>Home</p>
            <p onClick={() => history.push('/create')}>Cadastrar produto</p>
            <p onClick={() => history.push('/movement')}>Movimentações</p>
          </ContainerDropdown>
        )}
      </Menu>
      
    </Container>
  )
}