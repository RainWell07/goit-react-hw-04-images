import React, { useEffect } from 'react';
import css from '../Modules/ImageFinder.module.css'

const Modal = ({ imageUrl, onClose }) => {

useEffect(() => {
const handleKeyDown = (event) => {
if (event.key === 'Escape') {
 onClose();
}};

window.addEventListener('keydown', handleKeyDown);
document.body.style.overflow = 'hidden';

return () => {
  window.removeEventListener('keydown', handleKeyDown);
  document.body.style.overflow = 'auto';
};
}, [onClose]);

const handleClick = (event) => {
if (event.target === event.currentTarget) {
onClose();
}};

return (
<div className={css.Overlay} onClick={handleClick}>
<div className={css.Modal}>
<img src={imageUrl} alt="" /></div>
</div>
)};

export default Modal;