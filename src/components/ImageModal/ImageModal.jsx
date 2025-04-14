import ReactModal from "react-modal";
import React, { useEffect } from "react";
import s from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ isOpen, onClose, image }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!image) return null;

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={handleBackdropClick}
      className={s.modalContent}
      overlayClassName={s.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description}
        className={s.img}
      />
      <p className={s.caption}>
        Автор: {image.user.name} | ❤️ {image.likes}
      </p>
    </ReactModal>
  );
};

export default ImageModal;
