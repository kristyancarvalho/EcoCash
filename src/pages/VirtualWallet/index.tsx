import { useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Button, TextField, Typography } from '@mui/material';

function VirtualWalletPage() {
  const [points, setPoints] = useState('');
  const [redeemValue, setRedeemValue] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handlePointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/[^\d]/g, '');
    setPoints(inputValue);
    
    const calculatedValue = inputValue ? (parseInt(inputValue) / 10).toFixed(2) : '';
    setRedeemValue(calculatedValue);
  };

  const handleRedeem = () => {
    if (points && parseInt(points) > 0) {
      setIsRedeemed(true);
    }
  };

  const handleBack = () => {
    setIsRedeemed(false);
    setPoints('');
    setRedeemValue('');
  };

  return (
    <>
      <NavigationBar />
      <Container>
        <InfoHeader>
          <img src="icons/wallet-page-icon.svg" alt="Wallet Page Icon" />
          <div id='header-text'>
            <InfoHeaderTitle variant="h4">
              Carteira Virtual
            </InfoHeaderTitle>
            <InfoHeaderSubtitle variant="h6">
              Troque seus pontos por incríveis recompensas!
            </InfoHeaderSubtitle>
          </div>
        </InfoHeader>

        <Card>
          {!isRedeemed ? (
            <>
              <CardTitle variant='h6'>
                Obrigada pela sua contribuição! 
                <br />
                Seu saldo atual:
              </CardTitle>
              <BalanceInfo>
                <img src="icons/points-icon.svg" alt="saldo" />
                <BalanceNumber>
                  180
                </BalanceNumber>
              </BalanceInfo>
              
              <RedeemPoints>
                <RedeemPointsTitle variant="h6">
                  Gostaria de trocar seus pontos?
                </RedeemPointsTitle>
                <div>
                  <Input
                    id="amount-points"
                    variant="outlined"
                    placeholder="Selecione a quantidade de pontos"
                    type="text"
                    value={points}
                    onChange={handlePointsChange}
                    required
                    InputProps={{
                      disableUnderline: true,
                    }}
                  />

                  <CalculatedValueDisplay>
                    <span>
                      R$ {redeemValue}
                    </span>
                  </CalculatedValueDisplay>
                </div>
                <ConfirmButton 
                  onClick={handleRedeem}
                  disabled={!points || parseInt(points) === 0}
                  style={{
                    backgroundColor: points && parseInt(points) > 0 ? "#18DBB1" : "#ACACAC",
                  }}
                >
                  <ConfirmButtonTitle>Resgatar</ConfirmButtonTitle>
                </ConfirmButton>
              </RedeemPoints>
            </>
          ) : (
            <>
              <ConfirmationCard>
                <ConfirmationTitle>
                  Vale-Ponto
                </ConfirmationTitle>
                <ConfirmationBody>
                  <img src="icons/qr-code.svg" alt="QR Code" />
                  <ConfirmationLegend>
                    Agora, basta scanear e mostrar seu vale-ponto na cantina.
                    <br />
                    O planeta agradece!
                  </ConfirmationLegend>
                </ConfirmationBody>
              </ConfirmationCard>
              <ConfirmationActions>
                <BackButton onClick={handleBack}>
                  <ConfirmButtonTitle>
                    Voltar
                  </ConfirmButtonTitle>
                </BackButton>
              </ConfirmationActions>
            </>
          )}
        </Card> 
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 120px 320px 0 320px;
  height: 100vh;
  width: 100vw;
  background-color: #F3F2F2;
`;

const InfoHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Poppins', sans-serif; 
  
  && img {
    width: 80px;
  }
`;

const InfoHeaderTitle = styled(Typography)`
  font-weight: bold;
  overflow: hidden;
`

const InfoHeaderSubtitle = styled(Typography)`
  color: #ACACAC;
  font-family: 'Poppins', sans-serif;
`

const Card = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 32px;
  border-radius: 16px;
  width: 100%;
  padding: 32px;
  background: #FFFFFF;
`

const CardTitle = styled(Typography)`
  text-align: center;
`

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  && img {
    width: 70px;
  }
`

const BalanceNumber = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 2.5rem;
  font-weight: 500;
  
  margin: 16px 0;
`

const RedeemPoints = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  && div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`

const RedeemPointsTitle = styled(Typography)``

const Input = styled(TextField)`
  && {
    width: 100%;
    font-size: 2rem;
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
    font-size: 1rem;
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

const CalculatedValueDisplay = styled.div`
  width: 100%;
  background: #F3F2F2;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #000;
`;

const ConfirmButton = styled(Button)`
    && {
      margin-top: 24px;
      width: 100%;
      background-color: #18DBB1;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
`

const ConfirmButtonTitle = styled.span`
  font-size: 1rem;
`

const ConfirmationCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmationTitle = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size:  1.5rem;
  font-weight: 600;
`;

const ConfirmationBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  && img {
    width: 70px;
    margin: 16px 0;
  }
`;

const ConfirmationLegend = styled.span`
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  text-align: center;
  color: #acacac;
`

const ConfirmationActions = styled.div`
  width: 100%;
  display: flex;
`;

const BackButton = styled(Button)`
  && {
    margin-top: 16px;
    width: 100%;;
    background-color: #18DBB1;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: white;
  }
`;


export default VirtualWalletPage;