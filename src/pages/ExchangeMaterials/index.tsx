import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';


interface UserInfo {
  ra: string;
  name: string;
  dataNascimento: string;
  turma: string;
  pontosAcumulados: number;
  senha: string
}

function ExchangeMaterialsPage() {
  const userInfo: UserInfo = {
    ra: '000109435761',
    name: 'Miguel',
    dataNascimento: '24/10/2006',
    turma: '3D',
    pontosAcumulados: 210,
    senha: '******'
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <UserInfoContainer>
          <UserInfoHeader>
            <img src="icons/exchange-page-icon.svg" />
            <div id='header-text'>
              <UserInfoHeaderTitle variant="h1">
                Troca de Materiais
              </UserInfoHeaderTitle>
              <UserInfoHeaderSubtitle variant="h4">
              Recicle itens para ganhar pontos!!
              </UserInfoHeaderSubtitle>
            </div>
          </UserInfoHeader>
          <UserInfoDetails>
            <UserinfoCell>
              <UserInfoLabel>RA</UserInfoLabel>
              <UserInfoValue>{userInfo.ra}</UserInfoValue>
            </UserinfoCell>
            <UserinfoCell>
              <UserInfoLabel>Nome</UserInfoLabel>
              <UserInfoValue>{userInfo.name}</UserInfoValue>
            </UserinfoCell>
            <div className='inline-items'>
              <UserinfoCell>
                <UserInfoLabel>Data de Nascimento</UserInfoLabel>
                <UserInfoValue>{userInfo.dataNascimento}</UserInfoValue>
              </UserinfoCell>
              <UserinfoCell>
                <UserInfoLabel>Turma</UserInfoLabel>
                <UserInfoValue>{userInfo.turma}</UserInfoValue>
              </UserinfoCell>
            </div>
            <div className='inline-items'>
              <UserinfoCell>
                <UserInfoLabel>Senha</UserInfoLabel>
                <UserInfoValue>{userInfo.senha}</UserInfoValue>
              </UserinfoCell>
              <UserinfoCell>
                <UserInfoLabel>Pontos Acumulados</UserInfoLabel>
                <UserInfoValue>{userInfo.pontosAcumulados}</UserInfoValue>
              </UserinfoCell>
            </div>
          </UserInfoDetails>
        </UserInfoContainer>
      </Container>
    </>
  );
};

const Container = styled.div`
  padding: 64px 32px;
  height: 100vh;
  width: 100vw;
  background-color: #F3F2F2;
`;

const UserInfoContainer = styled.div``;

const UserInfoHeader = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif; 

  && img {
    width: 150px;
    margin-bottom: -32px;
  }
`;

const UserInfoHeaderTitle = styled(Typography)`
  font-weight: bold;
`

const UserInfoHeaderSubtitle = styled(Typography)`
  color: #ACACAC;
  font-family: 'Poppins', sans-serif;
`

const UserInfoDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 128px 16px;
  background: #ffffff;
  border-radius: 8px;
  margin-top: 128px;
  gap: 20px;

  && .inline-items {
    display: flex;
    width: 100%;
    gap: 20px;
  }
`;

const UserinfoCell = styled.div`
  font-size: 32px;
  display: flex;
  width: 100%;
  flex-direction: column;
  background: #F3F2F2;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px; 
  padding: 10px;
  font-family: 'Poppins', sans-serif;
`

const UserInfoLabel = styled.span`
  color: #454545;
`;

const UserInfoValue = styled.span``;

export default ExchangeMaterialsPage;