import { useEffect, useState } from "react";
import { fetchImages } from "./services/api";
import toast from "react-hot-toast";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from 'react-hot-toast';


const App = () => {
  const [img, setImg] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [isError, setIsError] = useState(false);
  const imgPerPage = 12;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const getData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchImages(
          query,
          page,
          imgPerPage,
          abortController.signal
        );

        
        setImg((prev) => {
          const newImages = data.results.filter(
            (newImage) => !prev.some((prevImage) => prevImage.id === newImage.id)
          );
          return [...prev, ...newImages];
        });

        setTotalPages(data.total_pages);
      } catch (error) {
        console.log(error);
        if (error.code !== "ERR_CANCELED") {
          setIsError(true);
          toast.error("Something went wrong :(");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query) {
      getData();
    }

    return () => {
      abortController.abort();
    };
  }, [query, page, imgPerPage]);

  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) return;
    toast.success(`Query changed to ${newQuery}`);
    setQuery(newQuery);
    setImg([]); 
    setPage(1); 
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  useEffect(() => {
    if (img.length > 0 && page > 1) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [img, page]); 

  const loadMoreImages = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const filteredImages = img.filter((item) => item.alt_description || item.user.name);

  return (
    <div style={{ paddingBottom: "200px" }}>
      <Toaster position="top-right" reverseOrder={false} />
      <SearchBar handleChangeQuery={handleChangeQuery} />
      {isError && <ErrorMessage />}
      <ImageGallery images={filteredImages} onImageClick={openModal} />
      <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      {isLoading && <Loader />}
      {page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={loadMoreImages} />
      )}
    </div>
  );
};

export default App;
