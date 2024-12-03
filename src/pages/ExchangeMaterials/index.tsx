import { useState } from 'react';
import styled from 'styled-components';
import NavigationBar from '@/components/NavigationBar';
import { Button, Typography } from '@mui/material';

interface MaterialType {
  type: string;
  color: string;
  icon: string;
}

function ExchangeMaterialsPage() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>(null);

  const materialTypes: MaterialType[] = [
    { 
      type: 'Papel', 
      color: '#FFD400',
      icon: 'icons/exchange-icon.svg'
    },
    { 
      type: 'Plástico', 
      color: '#FF3C36',
      icon: 'icons/exchange-icon.svg'
    },
    { 
      type: 'Metal', 
      color: '#1ADB72',
      icon: 'icons/exchange-icon.svg'
    },
    { 
      type: 'Vidro', 
      color: '#0055FF',
      icon: 'icons/exchange-icon.svg'
    }
  ];

  const materialScores = [
    { type: 'Papel', score: 200, weight: 20 },
    { type: 'Plástico', score: 200, weight: 60 },
    { type: 'Metal', score: 200, weight: 100 },
    { type: 'Vidro', score: 40, weight: 22 },
  ];

  const handleMaterialSelect = (material: MaterialType) => {
    if (selectedMaterial?.type === material.type) {
      setSelectedMaterial(null);
    } else {
      setSelectedMaterial(material);
    }
  };
  

  return (
    <>
      <NavigationBar />
      <Container>
        <InfoHeader>
          <img src="icons/exchange-page-icon.svg" alt="Exchange Page Icon" />
          <div id='header-text'>
            <InfoHeaderTitle variant="h1">
              Trocar Materiais
            </InfoHeaderTitle>
            <InfoHeaderSubtitle variant="h4">
              Recicle itens para ganhar pontos!!
            </InfoHeaderSubtitle>
          </div>
        </InfoHeader>

        <Card>
          <CardTitle variant='h3'>
            Coloque o item na balança, e selecione o tipo de material.
          </CardTitle>
          <CardButtons>
            {materialTypes.map((material) => (
              <CardButton
                key={material.type}
                style={{ 
                  backgroundColor: material.color,
                  opacity: selectedMaterial && selectedMaterial.type !== material.type ? 0.5 : 1
                }}
                disabled={selectedMaterial !== null && selectedMaterial.type !== material.type}
                onClick={() => handleMaterialSelect(material)}
              >
                <img src={material.icon} alt={`${material.type} icon`} />
                <CardButtonTitle>
                  {material.type}
                </CardButtonTitle>
              </CardButton>
            ))}
          </CardButtons>
        </Card> 

        <ConfirmButton 
          disabled={selectedMaterial === null}
          style={{ 
            backgroundColor: selectedMaterial ? '#18DBB1' : '#ACACAC' 
          }}
        >
          <ConfirmButtonTitle>
            Confirmar
          </ConfirmButtonTitle>
        </ConfirmButton>

        <ScoreCards>
          {materialScores.map(({ type, score, weight }, index) => (
            <ScoreCard key={index}>
              <LeftSection bgColor={materialTypes.find((m) => m.type === type)?.color || "#ddd"}>
                <img src="icons/wallet-icon.svg" alt="" /> {score}
              </LeftSection>
              <RightSection>
                <span>Peso (g)</span>
                <span>{weight}</span>
              </RightSection>
            </ScoreCard>
          ))}
        </ScoreCards>;
      </Container>
    </>
  );
}


/*
#FFD400
#FF3C36
#1ADB72
#05F
*/

const Container = styled.div`
  padding: 64px 32px;
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
    width: 150px;
    margin-bottom: -32px;
  }
`;

const InfoHeaderTitle = styled(Typography)`
  font-weight: bold;
`

const InfoHeaderSubtitle = styled(Typography)`
  color: #ACACAC;
  font-family: 'Poppins', sans-serif;
`

const Card = styled.div`
  margin-top: 64px;
  border-radius: 16px;
  width: 100%;
  padding: 32px;
  background: #FFFFFF;
  text-align: center;
`

const CardTitle = styled(Typography)``

const CardButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 64px;
  margin-top: 64px;
`

const CardButton = styled(Button)`
  && {
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    color: white;

    img {
      width: 50px;
    }

    &:disabled {
      opacity: 0.5;
    }
  }
`


const CardButtonTitle = styled.span`
  font-size: 2rem;
`

const ConfirmButton = styled(Button)`
    && {
      margin-top: 64px;
      width: 100%;
      height: 75px;
      background-color: #18DBB1;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      color: white;
    }
`

const ConfirmButtonTitle = styled.span`
  font-size: 2rem;
`

const ScoreCards = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 64px;
  gap: 16px;
  font-family: 'Poppins', sans-serif;
`;

const ScoreCard = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  flex: 1;
  height: 80px;
`;

const LeftSection = styled.div<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 50%;
  color: #fff;
  font-size: 1.5rem;

  && img {
    width: 30px;
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  color: #000;
  font-size: 1.3rem;
  font-weight: 400;

  span:first-child {
    color: #888;
  }
`;


export default ExchangeMaterialsPage;