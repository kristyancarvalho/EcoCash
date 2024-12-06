import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { User } from '@/firebase/firestore';

function LeaderBoard() {
    const [topUsers, setTopUsers] = useState<User[]>([]);
    const [topThreeUsers, setTopThreeUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchTopUsers = async () => {
            try {
                const usersRef = collection(db, 'users');
                const q = query(usersRef, orderBy('pontosAtuais', 'desc'), limit(8));
                
                const querySnapshot = await getDocs(q);
                const users = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as User));

                setTopUsers(users.slice(3));
                setTopThreeUsers(users.slice(0, 3));
            } catch (error) {
                console.error('Erro buscando usuários:', error);
            }
        };

        fetchTopUsers();
    }, []);

    const renderTopThree = () => {
        const sortedTopThree = [...topThreeUsers].sort((a, b) => b.pontosAtuais - a.pontosAtuais);
        
        return (
            <LeaderInfoDetails>
                {sortedTopThree.map((user, index) => (
                    <LeaderInfoBanner key={user.id} style={{
                        backgroundColor: 
                            index === 1 ? '#ACACAC' : 
                            index === 0 ? '#FFD400' : 
                            '#FA9547'
                    }}>
                        <LeaderInfoTitle variant="h5">{user.nome}</LeaderInfoTitle>
                        <img 
                            src={
                                index === 1 ? "icons/secondplace-icon.svg" : 
                                index === 0 ? "icons/firstplace-icon.svg" : 
                                "icons/thirdplace-icon.svg"
                            }
                            id='leader-medal'
                        />
                        <LeaderInfoScoreContainer>
                            <img 
                                src={
                                    index === 1 ? "icons/wallet-silver-icon.svg" : 
                                    index === 0 ? "icons/wallet-golden-icon.svg" : 
                                    "icons/wallet-bronze-icon.svg"
                                } 
                            />
                            <LeaderInfoScoreTitle 
                                variant="h5" 
                                color={
                                    index === 1 ? "#ACACAC" : 
                                    index === 0 ? "#FFD400" : 
                                    "#FA9547"
                                }
                            >
                                {user.pontosAtuais}
                            </LeaderInfoScoreTitle>
                        </LeaderInfoScoreContainer>
                    </LeaderInfoBanner>
                ))}
            </LeaderInfoDetails>
        );
    };

    return (
        <>
            <NavigationBar />
            <Container>
                    <LeaderInfoHeader>
                        <img src='icons/leaderboard-page-icon.svg' />
                        <div id='header-text'>
                            <LeaderInfoHeaderTitle variant="h4">LeaderBoard</LeaderInfoHeaderTitle>
                            <LeaderInfoHeaderSubtitle variant="h6">Descubra as 7 melhores colocações!</LeaderInfoHeaderSubtitle>
                        </div>
                    </LeaderInfoHeader>
                <LeaderInfoContainer>
                    
                    {renderTopThree()}
                    
                    <LeaderInfoTable>
                        <thead>
                            <LeaderInfoTableRow>
                                <LeaderInfoTableHeader>RA</LeaderInfoTableHeader>
                                <LeaderInfoTableHeader>Nome</LeaderInfoTableHeader>
                                <LeaderInfoTableHeader>Turma</LeaderInfoTableHeader>
                                <LeaderInfoTableHeader>Pontos</LeaderInfoTableHeader>
                            </LeaderInfoTableRow>
                        </thead>
                        <tbody>
                            {topUsers.map((user) => (
                                <LeaderInfoTableRow key={user.id}>
                                    <LeaderInfoTableData>{user.ra}</LeaderInfoTableData>
                                    <LeaderInfoTableData>{user.nome}</LeaderInfoTableData>
                                    <LeaderInfoTableData>{user.turma}</LeaderInfoTableData>
                                    <LeaderInfoTableData>{user.pontosAtuais}</LeaderInfoTableData>
                                </LeaderInfoTableRow>
                            ))}
                        </tbody>
                    </LeaderInfoTable>
                </LeaderInfoContainer>
            </Container>
        </>
    );
}


const Container = styled.div`
    padding: 128px 300px 0px 300px;
    width: 100vw;
    align-items: center;
    justify-content: center;
    background-color: #f3f2f2;
    height: 100dvh;
    `;

const LeaderInfoContainer = styled.div`
    display: flex;
    height: auto;
    gap: 15px;
`;

const LeaderInfoHeader = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin: 0px 0px 1em  0px;
    && img {
        width: 6em;
  }`;

const LeaderInfoHeaderTitle = styled(Typography)`
  font-weight: bold;
  overflow-y: hidden;
  font-size: 16px;
`;

const LeaderInfoHeaderSubtitle = styled(Typography)`
  font-weight: bold;
  width: 100%;
  overflow: hidden;
  color: #ACACAC;
  font-family: 'Poppins', sans-serif;
`;

const LeaderInfoDetails = styled.div`
    > div:nth-child(1) {
        background-color: #ACACAC;
    }
    > div:nth-child(2) {
        background-color: #FFD400;
    }
    > div:nth-child(3) {
        background-color: #FA9547;
    }
    display: flex;
    width: 60%;
    height: fit-content;
    justify-content: space-between;
    background-color: #FFF;
    border-radius: 15px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    padding: 10px;
    gap: 5%;

    && img {
        background-color: transparent;
    }
`;

const LeaderInfoBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 5px;
    height: 55dvh;
    width: 40%;

    && #leader-medal {
        width: 90px;
    }
`;

const LeaderInfoTitle = styled(Typography)`
    color: #FFF;
    font-size: 16px;
    max-height: 2em;
    text-align: center;
    overflow-y: hidden;
`;

const LeaderInfoScoreContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #FFF;
    border-radius: 15px;
    gap: 15px;
    padding: 5px;
    && img {
        width: 40px;
    }
`;

const LeaderInfoScoreTitle = styled(Typography)`
  font-size: 14px;
`;

const LeaderInfoTable = styled.table`
    font-family: 'Poppins', sans-serif;
    font-size: 14px;
    width: 30%;
    text-align: justify;
    border-collapse: separate;
    border-spacing: 0 15px;
`;

const LeaderInfoTableHeader = styled.th`
    background-color: #18DBB1;
    text-align: center;
    padding: 15px;
    font-weight: 200;
    color: #FFF;
`;

const LeaderInfoTableRow = styled.tr`
    width: 25%;
    background-color: #FFF;
`;

const LeaderInfoTableData = styled.td`
    width: 25%;
    text-align: center;
    padding: 10px;
`;

export default LeaderBoard;