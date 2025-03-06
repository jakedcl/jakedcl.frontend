// src/components/MyObjects/MyObject.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { MODEL_URLS } from '../../config/modelUrls';

const MyObject = ({ type, controlsOn = false }) => {
  const modelUrl = MODEL_URLS[type];

  if (!modelUrl) {
    return (
      <div style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <p>3D Model Coming Soon</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '86%', maxHeight: '70vh', height: '100%', width: '100%', margin: 'auto', overflow: 'visible' }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          {/* This will render whatever 3D model component you pass */}
        </Suspense>
        {controlsOn && <OrbitControls />}
        <Environment preset="sunset" />
      </Canvas>
    </div>
  );
};

MyObject.propTypes = {
  controlsOn: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

export default MyObject;