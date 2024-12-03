import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useAuth } from '@/contexts/AuthContext';

function NavigationBar() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Falha ao sair', error);
        }
    };

    if (!currentUser) {
        return null;
    }

    return (
        <NavigationContainer>
            <Logo src="white-logo.svg" />
            <Links>
                <Link to="/">
                    <Icon src="icons/person-icon.svg"/>
                </Link>
                <Link to="/trocar-materiais">
                    <Icon src="icons/exchange-icon.svg"/>
                </Link>
                <Link to="/">
                    <Icon src="icons/wallet-icon.svg"/>
                </Link>
                <Link to="/">
                    <Icon src="icons/leaderboard-icon.svg"/>
                </Link>
                <Link to="/">
                    <Icon src="icons/search-icon.svg"/>
                </Link>
            </Links>
            <div id="action-button">
                <LogoutButton 
                    variant="text"
                    onClick={handleLogout}
                >
                    <Icon src="icons/logout-icon.svg" />
                </LogoutButton>
            </div>
        </NavigationContainer>
    )
}

const NavigationContainer = styled.div`
    width: 100vw;
    z-index: 5;
    background: #1ADB72;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 32px;

    && #action-button {
        margin-top: 20px;
    }
`;

const Logo = styled.img`
    width: 170px;
`

const Icon = styled.img`
    width: 80px;
`

const Links = styled.div`
    display: flex;
    gap: 48px;
    margin-top: 20px;
`

const LogoutButton = styled(Button)`
    && {
        border-radius: 16px;

        &:hover {
            background-color: rgba(255,255,255,0.3);
        }
    }
`

export default NavigationBar;