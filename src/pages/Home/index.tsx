import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';
import { getUserById } from '@/firebase/firestore';
import { auth } from '@/firebase/config';
import { Timestamp } from 'firebase/firestore';

function HomePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  interface UserInfo {
    ra: string;
    name: string;
    dataNascimento: string;
    turma: string;
    pontosAcumulados: number;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userData = await getUserById(currentUser.uid);
          if (userData) {
            const formattedDate = 
              userData.dataNascimento instanceof Timestamp
                ? userData.dataNascimento.toDate().toLocaleDateString('pt-BR')
                : typeof userData.dataNascimento === 'string'
                  ? userData.dataNascimento
                  : (userData.dataNascimento as Date).toLocaleDateString('pt-BR');

            setUserInfo({
              ra: userData.ra,
              name: userData.nome,
              dataNascimento: formattedDate,
              turma: userData.turma,
              pontosAcumulados: userData.pontosAdquiridos
            });
          }
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <NavigationBar />
      <Container>
        <UserInfoContainer>
          <UserInfoHeader>
            <img src="icons/user-icon.svg" alt="User Icon" />
            <div id='header-text'>
              <UserInfoHeaderTitle variant="h1">
                Área do Usuário
              </UserInfoHeaderTitle>
              <UserInfoHeaderSubtitle variant="h4">
                Suas informações estão aqui!
              </UserInfoHeaderSubtitle>
            </div>
          </UserInfoHeader>
          {userInfo && (
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
                  <UserInfoValue>******</UserInfoValue>
                </UserinfoCell>
                <UserinfoCell>
                  <UserInfoLabel>Pontos Acumulados</UserInfoLabel>
                  <UserInfoValue>{userInfo.pontosAcumulados}</UserInfoValue>
                </UserinfoCell>
              </div>
            </UserInfoDetails>
          )}
        </UserInfoContainer>
      </Container>
    </>
  );
}

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
  gap: 20px;
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

export default HomePage;