import { useState } from 'react';
import { Container, Title } from '../Styles';
import { Dialog, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import MyObject from '../components/MyObjects/MyObject';
import Minitruck from '../components/MyObjects/Minitruck';

const MasonryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  width: 90%;
  
  @media (min-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (min-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MasonryItem = styled.div`
  cursor: pointer;
  break-inside: avoid;
  transition: transform 0.2s ease;
  height: 200px;
  
  @media (min-width: 768px) {
    height: 250px;
  }

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    font-size: 1rem;
    margin-bottom: 4px;
    margin-top: 4px;
    
    @media (min-width: 768px) {
      font-size: 1.2rem;
    }
  }
`;

const ObjectWrapper = styled.div`
  height: 80%;
  width: 100%;
`;

const StyledDialogContent = styled(DialogContent)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  position: relative;
`;

const StyledCanvasWrapper = styled.div`
  width: 90vw;
  height: 80vh;
  
  @media (min-width: 768px) {
    width: 80vw;
  }
  
  canvas {
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100%;
  }
`;

export default function MyObjectsPage() {
  const [open, setOpen] = useState(false);
  const [selectedObject, setSelectedObject] = useState(null);

  const handleClickOpen = (objectComponent) => {
    setSelectedObject(objectComponent);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedObject(null);
  };

  const objects = Array(12).fill(0).map((_, index) => (
    <MasonryItem key={index} onClick={() => handleClickOpen(<Minitruck />)}>
      <ObjectWrapper>
        <MyObject controlsOn={false}>
          <Minitruck />
        </MyObject>
      </ObjectWrapper>
      <h3>Mazda E 2200 Pickup Truck {index + 1}</h3>
    </MasonryItem>
  ));

  return (
    <Container>
      <Title>3d things</Title>
      <MasonryGrid>
        {objects}
      </MasonryGrid>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <StyledDialogContent dividers>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{ position: 'absolute', right: 8, top: 8, zIndex: 1 }}
          >
            <CloseIcon />
          </IconButton>
          <StyledCanvasWrapper>
            <MyObject controlsOn={true}>
              {selectedObject}
            </MyObject>
          </StyledCanvasWrapper>
        </StyledDialogContent>
      </Dialog>
    </Container>
  );
}