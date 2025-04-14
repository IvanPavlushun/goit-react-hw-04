import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ClipLoader color="#3f51b5" size={50} />
    </div>
  );
};

export default Loader;