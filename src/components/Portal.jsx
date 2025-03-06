import { createPortal } from 'react-dom';

export default function Portal({ children }) {
    const modalRoot = document.getElementById('modal-root');
    return createPortal(children, modalRoot);
} 