import ReactDOM from "react-dom";
import Loader from "./Loader";

function Backdrop() {
  const overlaysContainer = document.getElementById("ovarlay");
  return <>{ReactDOM.createPortal(<Loader />, overlaysContainer)}</>;
}

export default Backdrop;
