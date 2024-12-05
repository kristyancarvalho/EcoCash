import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';

function ScorePage(){

    return(
    <>
        <NavigationBar/>
        <Container>
            <ScoreHeader>
                <img src="icons/search-page-icon.svg" />
                <div id='header-text'>
                <ScoreHeaderTitle variant="h1">Consulta de Pontos</ScoreHeaderTitle>
                <ScoreHeaderSubtitle variant="h4">Descubra a pontuação dos seus amigos!</ScoreHeaderSubtitle>
                </div>
            </ScoreHeader>
            <ScoreSearchContainer>
                    <ScoreSearchLabel>Filtrar por:
                        <ScoreSearchSelect>
                            
                        </ScoreSearchSelect>
                    </ScoreSearchLabel>
                    <ScoreSearchInputContainer>
                        <ScoreSearchInput type="text" placeholder="Pesquise aqui"/>
                        <ScoreSearchButton>
                            <img src="icons/search-icon.svg" />
                        </ScoreSearchButton>
                    </ScoreSearchInputContainer>
                </ScoreSearchContainer>
        </Container>
    </>
    )
}

const Container = styled.div`
    background-color: #f3f2f2;
    width: 100vw;
    padding: 64px 32px;
    height: 100dvh;
`;

const ScoreHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 2em;
    margin: 0px 0px 1em  0px;
    && img {
        width: 150px;
        margin-bottom: -16px;
  }
`;

const ScoreHeaderTitle = styled(Typography)`
    font-size: 5rem !important;
`;

const ScoreHeaderSubtitle = styled(Typography)`
    color: #ACACAC;
    font-family: 'Poppins', sans-serif;
`;

const ScoreSearchContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const ScoreSearchLabel = styled.label`
    font-family: font-family: 'Poppins', sans-serif;  
`;
const ScoreSearchSelect = styled.select``;
const ScoreSearchInput = styled.input`  
    font-family: font-family: 'Poppins', sans-serif;  
    font-size: 30px;
    height: 100%;
    padding: 10px 20px;
    border: none;
  `;
const ScoreSearchInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-radius: 15px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
  && img {
    width: 50px;
  }
`;
const ScoreSearchButton = styled.button`
    background-color: #18DBB1;
    padding: 10px 20px;
    border: none;
    `;

export default ScorePage;