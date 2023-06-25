import { useContext } from "react";
import { Context } from "../contexts/FirestoreContext";

const useFirestoreContext = () => {
  return useContext(Context);
};

export default useFirestoreContext;
