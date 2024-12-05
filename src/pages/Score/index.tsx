import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';
import { collection,getDocs } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { User } from '@/firebase/firestore';

function ScorePage() {
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterField, setFilterField] = useState('nome');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersRef = collection(db, 'users');
                const querySnapshot = await getDocs(usersRef);
                
                const fetchedUsers = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as User));

                setUsers(fetchedUsers);
                setFilteredUsers(fetchedUsers);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSearch = () => {
        if (!searchTerm) {
            setFilteredUsers(users);
            return;
        }

        const filtered = users.filter(user => {
            const fieldValue = user[filterField as keyof User]?.toString().toLowerCase() || '';
            return fieldValue.includes(searchTerm.toLowerCase());
        });

        setFilteredUsers(filtered);
    };

    return (
        <>
            <NavigationBar/>
            <Container>
                <ScoreHeader>
                    <img src="icons/search-page-icon.svg" />
                    <div id='header-text'>
                        <ScoreHeaderTitle variant="h4">
                            Consulta de Pontos
                        </ScoreHeaderTitle>
                        <ScoreHeaderSubtitle variant="h6">
                            Descubra a pontuação dos seus amigos!
                        </ScoreHeaderSubtitle>
                    </div>
                </ScoreHeader>
                <ScoreSearchContainer>
                    <ScoreSearchSelect 
                        value={filterField}
                        onChange={(e) => setFilterField(e.target.value)}
                    >
                        <option value="ra">RA</option>
                        <option value="nome">Nome</option>
                        <option value="turma">Turma</option>
                        <option value="pontosAtuais">Pontos</option>
                    </ScoreSearchSelect>
                    <ScoreSearchInputContainer>
                        <ScoreSearchInput 
                            type="text" 
                            placeholder="Pesquise aqui"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <ScoreSearchButton onClick={handleSearch}>
                            <img src="icons/search-icon.svg" />
                        </ScoreSearchButton>
                    </ScoreSearchInputContainer>
                </ScoreSearchContainer>

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
                        {filteredUsers.map((user) => (
                            <LeaderInfoTableRow key={user.id}>
                                <LeaderInfoTableData>{user.ra}</LeaderInfoTableData>
                                <LeaderInfoTableData>{user.nome}</LeaderInfoTableData>
                                <LeaderInfoTableData>{user.turma}</LeaderInfoTableData>
                                <LeaderInfoTableData>{user.pontosAtuais}</LeaderInfoTableData>
                            </LeaderInfoTableRow>
                        ))}
                    </tbody>
                </LeaderInfoTable>
            </Container>
        </>
    )
}

const Container = styled.div`
  padding: 120px 320px 0 320px;
  height: 100vh;
  width: 100vw;
  background-color: #F3F2F2;
`;

const ScoreHeader = styled.div`
    display: flex;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2em;
    margin: 0px 0px 1em  0px;
    overflow: hidden;

    && img {
        width: 80px;
  }
`;

const ScoreHeaderTitle = styled(Typography)`
    overflow: hidden;
`;

const ScoreHeaderSubtitle = styled(Typography)`
    color: #ACACAC;
    font-family: 'Poppins', sans-serif;
`;

const ScoreSearchContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin: 2em 0 2em 0;
`;

const ScoreSearchSelect = styled.select`
    font-family: 'Poppins', sans-serif;
    width: 30%;
    height: 50px;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 15px;
    border: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
`;

const ScoreSearchInputContainer = styled.div`
    display: flex;
    align-items: center;
    width: 70%;
    height: 50px;
    border-radius: 15px;
    overflow: hidden;
    
    && img {
        width: 50px;
    }
    `;

const ScoreSearchInput = styled.input`  
    font-family: 'Poppins', sans-serif;  
    font-size: 16px;
    height: 100%;
    width: 100%;
    padding: 10px 20px;
    border: none;
    border-radius: 15px 0 0 15px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
`;

const ScoreSearchButton = styled.button`
    background-color: #18DBB1;
    padding: 10px 20px;
    border: none;
    border-radius: 0 15px 15px 0;

    && img {
        width: 40px;
        margin-left: -8px;
    }
`;

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

export default ScorePage;