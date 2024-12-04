import { useState, FormEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { getUserByRA } from '@/firebase/firestore';
import { FirebaseError } from 'firebase/app';

function LoginPage() {
  const [ra, setRA] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    try {
      const user = await getUserByRA(ra);
      
      if (!user) {
        setError('Usuário não encontrado');
        return;
      }
  
      const email = `${ra}@escola.com`;
  
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        email, 
        password
      );
  
      console.log('Usuário logado:', userCredential.user);
      navigate('/');
    } catch (error: unknown) {
      console.error('Erro no login:', error);
      
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-credential':
            setError('RA ou senha incorretos');
            break;
          case 'auth/user-not-found':
            setError('Usuário não encontrado');
            break;
          case 'auth/wrong-password':
            setError('Senha incorreta');
            break;
          default:
            setError('Erro ao fazer login. Tente novamente.');
        }
      } else {
        setError('Erro ao fazer login. Tente novamente.');
      }
    }
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <img src="/logo.svg" alt="logo" />
        <Title>Que bom te ver novamente!</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Input
          id="ra"
          variant="outlined"
          placeholder="RA"
          type="text"
          value={ra}
          onChange={(e) => setRA(e.target.value)}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Input
          id="password"
          variant="outlined"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <StyledButton 
          type="submit" 
          variant="contained"
        >
          Entrar
        </StyledButton>
        
        <ActionLinks>
          <Link to="/cadastro">Cadastrar-se</Link>
          <Link to="/redefinir-senha">Esqueci a Senha</Link>
        </ActionLinks>
      </LoginForm>
    </Container>
  );
};

const ErrorMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  color: red;
  margin: 16px 0;
  text-align: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 20px;

  && img {
    width: 170px;
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
    font-size: 2rem;
    font-family: 'Poppins', sans-serif;
  }
  
  & .MuiOutlinedInput-root {
    height: 75px;
    background: #F3F2F2;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px;
  }

  & .MuiOutlinedInput-input {
    padding: 0;
    color: #000;
    font-size: 2rem;
  }

  & .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border: none;
  }a

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border: none;
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

export default LoginPage;