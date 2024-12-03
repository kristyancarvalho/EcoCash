import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';

function LeaderBoard() {
    return(
        <>
        <NavigationBar/>
        <Container>
            <UserInfoContainer>
                <UserInfoHeader>
                    <img src='icons/leaderboard-icon.svg'/>
                </UserInfoHeader>
            </UserInfoContainer>
        </Container>
        </>
    );
}

const Container = styled.div`
background-color: #f3f2f2;
height: 100vh;
`;

const UserInfoContainer = styled.div``;
const UserInfoHeader = styled.div``;

export default LeaderBoard;