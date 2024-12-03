import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUserByRA } from '@/firebase/firestore';
import { 
  getAuth, 
  updatePassword 
} from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';

function ForgotPasswordPage() {
  const [ra, setRA] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleResetPassword = async () => {
    if (!ra || !birthDate || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('As senhas não correspondem');
      return;
    }

    if (newPassword.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    try {
      const user = await getUserByRA(ra);
  
      if (!user) {
        setError('Usuário não encontrado');
        return;
      }
  
      let storedDate: Date;
      if (user.dataNascimento instanceof Date) {
        storedDate = user.dataNascimento;
      } else if (typeof user.dataNascimento === 'string') {
        storedDate = new Date(user.dataNascimento);
      } else if (user.dataNascimento instanceof Timestamp) {
        storedDate = user.dataNascimento.toDate();
      } else {
        console.error('Unexpected date format:', user.dataNascimento);
        setError('Formato de data inválido');
        return;
      }
  
      const [year, month, day] = birthDate.split('-').map(Number);
      const inputDate = new Date(year, month - 1, day);
  
      const normalizedStoredDate = new Date(
        storedDate.getFullYear(), 
        storedDate.getMonth(), 
        storedDate.getDate()
      );
      const normalizedInputDate = new Date(
        inputDate.getFullYear(), 
        inputDate.getMonth(), 
        inputDate.getDate()
      );
  
      const isSameDate = 
        normalizedStoredDate.getFullYear() === normalizedInputDate.getFullYear() &&
        normalizedStoredDate.getMonth() === normalizedInputDate.getMonth() &&
        normalizedStoredDate.getDate() === normalizedInputDate.getDate();
  
      if (!isSameDate) {
        setError('Data de nascimento não corresponde');
        return;
      }

      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        setError('Erro: Usuário não autenticado');
        return;
      }

      await updatePassword(currentUser, newPassword);

      alert('Senha alterada com sucesso!');
      navigate('/login');

    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes('requires-recent-login')) {
          setError('Sessão expirada.');
        } else {
          setError('Erro ao redefinir senha');
        }
      }
      console.error(err);
    }
  };

  return (
    <Container>
      <main>
        <img src="/logo.svg" alt="logo" />
        <Title>Ops! Esqueceu a senha...</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Input
          id="ra"
          variant="outlined"
          placeholder="Insira seu RA"
          type="text"
          value={ra}
          onChange={(e) => setRA(e.target.value)}
        />
        <Input
          id="birthDate"
          variant="outlined"
          placeholder="Confirme sua data de nascimento"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <Input
          id="newPassword"
          variant="outlined"
          placeholder="Nova senha"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Input
          id="confirmPassword"
          variant="outlined"
          placeholder="Confirmação de senha"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <StyledButton 
          variant="contained" 
          onClick={handleResetPassword}
        >
          Enviar
        </StyledButton>
        <ActionLinks>
          <Link to="/login">Voltar para o Login</Link>
          <Link to="/cadastro">Cadastre-se</Link>
        </ActionLinks>
      </main>
    </Container>
  );
}

const ErrorMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  color: red;
  margin: 16px 0;
  text-align: center;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  & main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    gap: 20px;

    > img {
      width: 170px;
    }
  }
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 35px;
  margin-top: 24px;
`;

const Input = styled(TextField)`
  && {
    width: 100%;
    margin-top: 8px;
    font-size: 30px;
  }
`;

const StyledButton = styled(Button)`
  && {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 35px;
    text-transform: capitalize;
    padding: 8px 24px;
    margin-top: 24px;
    width: 100%;
    background: #1ADB72;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
  }
`;

const ActionLinks = styled.div`
  display: flex;
  gap: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 22px;
  margin-top: 16px;
`;

export default ForgotPasswordPage;