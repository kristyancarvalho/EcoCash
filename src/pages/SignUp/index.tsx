import React, { useState } from 'react';
import { Button, TextField, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '@/firebase/firestore';

function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: '',
    ra: '',
    birthDate: '',
    classGroup: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório');
      return false;
    }
    if (!formData.ra.trim() || !/^\d+$/.test(formData.ra)) {
      setError('RA deve conter apenas números');
      return false;
    }
    if (!formData.birthDate) {
      setError('Data de nascimento é obrigatória');
      return false;
    }
    if (!formData.classGroup.trim()) {
      setError('Turma é obrigatória');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Senha deve ter no mínimo 6 caracteres');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Senhas não coincidem');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        `${formData.ra}@escola.com`, 
        formData.password
      );
      const user = userCredential.user;

      await createUser(user.uid, {
        nome: formData.name,
        ra: formData.ra,
        dataNascimento: new Date(formData.birthDate + 'T00:00:00'),
        turma: formData.classGroup,
        pontosAtuais: 0,
        pontosAdquiridos: 0
      });

      navigate('/');
    } catch (error: unknown) {
        console.error('Erro no cadastro:', error);
        
        if (error instanceof Error && 'code' in error) {
          const firebaseError = error as { code: string };
          
          if (firebaseError.code === 'auth/email-already-in-use') {
            setError('RA já cadastrado');
          } else {
            setError('Erro ao criar conta. Tente novamente.');
          }
        } else {
          setError('Erro ao criar conta. Tente novamente.');
        }
      }
    }

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <img src="/logo.svg" alt="logo" />
        <Title>Seja bem vindo!</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Input
          id="name"
          variant="outlined"
          placeholder="Nome"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Input
          id="ra"
          variant="outlined"
          placeholder="RA"
          type="text"
          value={formData.ra}
          onChange={handleInputChange}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <InlineInputs>
          <Input
            id="birthDate"
            variant="outlined"
            placeholder="Data de Nascimento"
            type="date"
            value={formData.birthDate}
            onChange={handleInputChange}
            required
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Input
            id="classGroup"
            variant="outlined"
            placeholder="Turma"
            type="text"
            value={formData.classGroup}
            onChange={handleInputChange}
            required
            InputProps={{
              disableUnderline: true,
            }}
          />
        </InlineInputs>
        <Input
          id="password"
          variant="outlined"
          placeholder="Senha"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <Input
          id="confirmPassword"
          variant="outlined"
          placeholder="Confirmar Senha"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
          InputProps={{
            disableUnderline: true,
          }}
        />
        <StyledButton 
          variant="contained" 
          type="submit" 
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Cadastrar'}
        </StyledButton>
        <ActionLinks>
          <Link to="/login">Já tem uma conta? Faça login</Link>
        </ActionLinks>
      </form>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  && form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    width: 50%;
  }
  && form > img {
    width: 170px;
  }
`;

const Title = styled.h1`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 22px;
  margin-top: 12px;
`;

const Input = styled(TextField)`
  && {
    width: 100%;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
  }
  
  & .MuiOutlinedInput-root {
    background: #F3F2F2;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px;
  }

  & .MuiOutlinedInput-input {
    padding: 0;
    color: #000;
    font-size: 18px;
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

const InlineInputs = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
`

const StyledButton = styled(Button)`
  && {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 18px;
    text-transform: capitalize;
    padding: 8px 24px;
    margin-top: 12px;
    width: 100%;
    background: #1ADB72;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
  }
`;

const ActionLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 18px;
  margin-top: 16px;
`;

const ErrorMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  color: red;
  margin: 16px 0;
  text-align: center;
`;

export default RegistrationPage;