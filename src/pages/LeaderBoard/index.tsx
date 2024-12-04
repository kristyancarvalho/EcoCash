import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Typography } from '@mui/material';

function LeaderBoard() {
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
                    <LeaderInfoDetails>
                        <LeaderInfoBanner>
                            <LeaderInfoTitle variant="h3">Diogo</LeaderInfoTitle>
                            <img src="icons/secondplace-icon.svg"/>
                            <LeaderInfoScoreContainer>
                                <img src="icons/wallet-silver-icon.svg" />
                                <LeaderInfoScoreTitle variant="h3" color="#ACACAC">160</LeaderInfoScoreTitle>
                            </LeaderInfoScoreContainer>
                        </LeaderInfoBanner>
                        <LeaderInfoBanner>
                            <LeaderInfoTitle variant="h3">Miguel</LeaderInfoTitle>
                            <img src="icons/firstplace-icon.svg"/>
                            <LeaderInfoScoreContainer>
                                <img src="icons/wallet-golden-icon.svg" />
                                <LeaderInfoScoreTitle variant="h3" color="#FFD400">180</LeaderInfoScoreTitle>
                            </LeaderInfoScoreContainer>
                        </LeaderInfoBanner>
                        <LeaderInfoBanner>
                            <LeaderInfoTitle variant="h3">Bianca</LeaderInfoTitle>
                            <img src="icons/thirdplace-icon.svg"/><LeaderInfoScoreContainer>
                                <img src="icons/wallet-bronze-icon.svg" />
                                <LeaderInfoScoreTitle variant="h3" color="#FA9547">140</LeaderInfoScoreTitle>
                            </LeaderInfoScoreContainer>
                        </LeaderInfoBanner>
                    </LeaderInfoDetails>
                    <LeaderInfoTable>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableHeader>RA</LeaderInfoTableHeader>
                            <LeaderInfoTableHeader>Nome</LeaderInfoTableHeader>
                            <LeaderInfoTableHeader>Turma</LeaderInfoTableHeader>
                            <LeaderInfoTableHeader>Pontos</LeaderInfoTableHeader>
                        </LeaderInfoTableRow>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableData>RA</LeaderInfoTableData>
                            <LeaderInfoTableData>Nome</LeaderInfoTableData>
                            <LeaderInfoTableData>Turma</LeaderInfoTableData>
                            <LeaderInfoTableData>Pontos</LeaderInfoTableData>
                        </LeaderInfoTableRow>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableData>RA</LeaderInfoTableData>
                            <LeaderInfoTableData>Nome</LeaderInfoTableData>
                            <LeaderInfoTableData>Turma</LeaderInfoTableData>
                            <LeaderInfoTableData>Pontos</LeaderInfoTableData>
                        </LeaderInfoTableRow>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableData>RA</LeaderInfoTableData>
                            <LeaderInfoTableData>Nome</LeaderInfoTableData>
                            <LeaderInfoTableData>Turma</LeaderInfoTableData>
                            <LeaderInfoTableData>Pontos</LeaderInfoTableData>
                        </LeaderInfoTableRow>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableData>RA</LeaderInfoTableData>
                            <LeaderInfoTableData>Nome</LeaderInfoTableData>
                            <LeaderInfoTableData>Turma</LeaderInfoTableData>
                            <LeaderInfoTableData>Pontos</LeaderInfoTableData>
                        </LeaderInfoTableRow>
                        <LeaderInfoTableRow>
                            <LeaderInfoTableData>RA</LeaderInfoTableData>
                            <LeaderInfoTableData>Nome</LeaderInfoTableData>
                            <LeaderInfoTableData>Turma</LeaderInfoTableData>
                            <LeaderInfoTableData>Pontos</LeaderInfoTableData>
                        </LeaderInfoTableRow>
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