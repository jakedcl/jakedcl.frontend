import { useParams } from 'react-router-dom';
import { Container, Title, ResponsivePageSection, CardDescription } from '../Styles';
import styled from 'styled-components';
import MyObject from '../components/MyObjects/MyObject';
import Minitruck from '../components/MyObjects/Minitruck';
import { Model as Hilux } from '../components/MyObjects/Hilux';
import Camera from '../components/MyObjects/Camera';

const ObjectContainer = styled.div`
  width: 100%;
  height: 70vh;
  margin: 2rem 0;
`;

const ObjectDetails = styled.div`
  margin: 2rem 0;
`;

export default function ObjectPage() {
    const { object } = useParams();

    const objects = {
        minitruck: {
            title: 'Mazda E 2200 Pickup Truck',
            description: 'A detailed 3D model of a classic Mazda mini truck. Features fully modeled interior and exterior details.',
            component: Minitruck,
            author: 'ARDmation',
            date: '2024',
        },
        hilux: {
            title: 'Toyota Hilux',
            description: 'Modern Toyota Hilux pickup truck model with detailed textures and materials.',
            component: Hilux,
            author: 'Toyota',
            date: '2023',
        },
        camera: {
            title: 'Vintage Camera',
            description: 'Detailed 3D model of a classic film camera.',
            component: Camera,
            author: 'Classic Cameras',
            date: '2024',
        },
    };

    const currentObject = objects[object];

    if (!currentObject) {
        return <div>Object not found</div>;
    }

    const ObjectComponent = currentObject.component;

    return (
        <Container>
            <ResponsivePageSection>
                <Title>{currentObject.title}</Title>
                <ObjectContainer>
                    <MyObject controlsOn={true}>
                        <ObjectComponent />
                    </MyObject>
                </ObjectContainer>
                <ObjectDetails>
                    <CardDescription>{currentObject.description}</CardDescription>
                    <CardDescription>Created by: {currentObject.author}</CardDescription>
                    <CardDescription>{currentObject.date}</CardDescription>
                </ObjectDetails>
            </ResponsivePageSection>
        </Container>
    );
} 