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
                        <LeaderInfoTitle variant="h3">{user.nome}</LeaderInfoTitle>
                        <img 
                            src={
                                index === 1 ? "icons/secondplace-icon.svg" : 
                                index === 0 ? "icons/firstplace-icon.svg" : 
                                "icons/thirdplace-icon.svg"
                            }
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
                                variant="h3" 
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
                <LeaderInfoContainer>
                    <LeaderInfoHeader>
                        <img src='icons/leaderboard-page-icon.svg' />
                        <div id='header-text'>
                            <LeaderInfoHeaderTitle variant="h1">LeaderBoard</LeaderInfoHeaderTitle>
                            <LeaderInfoHeaderSubtitle variant="h4">Descubra as 8 melhores colocações!</LeaderInfoHeaderSubtitle>
                        </div>
                    </LeaderInfoHeader>
                    
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
    padding: 64px 32px;
    width: 100vw;
    background-color: #f3f2f2;
    height: 100dvh;
    `;

const LeaderInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    gap: 2em;
`;

const LeaderInfoHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 0px 1em  0px;
    && img {
        width: 150px;
        margin-bottom: -16px;
  }`;

const LeaderInfoHeaderTitle = styled(Typography)``;

const LeaderInfoHeaderSubtitle = styled(Typography)`
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
    justify-content: space-between;
    background-color: #FFF;
    border-radius: 15px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    padding: 25px;
    && img {
        background-color: transparent;
    }
`;

const LeaderInfoBanner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 5px 15px;
    height: 464px;
    width: 250px;
`;

const LeaderInfoTitle = styled(Typography)`
    color: #FFF;
`;

const LeaderInfoScoreContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #FFF;
    border-radius: 15px;
    gap: 15px;
    padding: 10px 20px;
`;

const LeaderInfoScoreTitle = styled(Typography)``;

const LeaderInfoTable = styled.table`
    font-family: 'Poppins', sans-serif;
    font-size: 22px;
    width: 100%;
    text-align: justify;
    border-collapse: separate;
    border-spacing: 0 15px;
`;

const LeaderInfoTableHeader = styled.th`
    background-color: #18DBB1;
    padding: 10px;
    font-weight: 200;
    color: #FFF;
`;

const LeaderInfoTableRow = styled.tr`
    width: 25%;
    background-color: #FFF;
`;

const LeaderInfoTableData = styled.td`
    width: 25%;
    padding: 5px;
`;

export default LeaderBoard;