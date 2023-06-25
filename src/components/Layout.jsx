import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import UploadForm from "./UploadForm";
import useAuthContext from "../hooks/useAuthContext";
import useFirestoreContext from "../hooks/useFirestoreContext";
import Backdrop from "./Loader/Backdrop";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch, read } = useFirestoreContext();
  const { user, authenticate } = useAuthContext();
  const toggle = () => dispatch({ type: "collapse" });
  const location = useLocation();

  useEffect(() => {
    const readDocs = async () => {
      setIsLoading(true);
      await read();
      await authenticate();
      setIsLoading(false);
    };
    readDocs();
  }, []);
  return (
    <>
      {isLoading && <Backdrop />}
      <Navbar />
      <div className="container text-center mt-5">
        {user && !location.pathname.includes("/article") && (
          <>
            <button className="btn btn-success float-end" onClick={toggle}>
              {state.isCollpased ? "Close" : "+Add"}
            </button>
            <div className="clearfix mb-4"></div>
            {state.isCollpased && <UploadForm />}
          </>
        )}
        {children}
      </div>
    </>
  );
};

export default Layout;
