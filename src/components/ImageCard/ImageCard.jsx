const ImageCard = ({ image, onClick }) => {
  return (
    <div onClick={() => onClick(image)} style={{ cursor: "pointer" }}>
      <img src={image.urls.small} alt={image.alt_description} />
    </div>
  );
};
  
  export default ImageCard;