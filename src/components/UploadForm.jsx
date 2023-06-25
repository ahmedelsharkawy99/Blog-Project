import { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "./Input";
import Preview from "./Preview";
import { Context } from "../contexts/FirestoreContext";
import Firebase from "../handlers/firestore";
import Storage from "../handlers/storage";
import useAuthContext from "../hooks/useAuthContext";
import useFirestoreContext from "../hooks/useFirestoreContext";
import Backdrop from "./Loader/Backdrop";

const { writeDoc } = Firebase;
const { uploadFile, downloadFile } = Storage;

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch, read } = useFirestoreContext(Context);
  const { user } = useAuthContext();
  const { inputs } = state;
  const username = user?.displayName.split(" ").join("").toLowerCase();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    uploadFile(inputs)
      .then(downloadFile)
      .then((url) => {
        writeDoc({ ...inputs, path: url, user: username }, "stocks").then(
          () => {
            read();
            dispatch({ type: "collapse" });
            setIsLoading(false);
          }
        );
      });
  };

  const onChangeHandler = (e) => dispatch({ type: "setInputs", payload: e });

  const isDisabled = useMemo(() => {
    return !!Object.values(inputs).some((inputs) => !inputs);
  }, [inputs]);

  return (
    <>
      {isLoading && <Backdrop />}
      <p className="display-6 text-center mb-3">Upload Article</p>
      <div className="mb-5 d-flex align-items-center justify-content-center flex-wrap">
        <Preview />
        <form
          className="mb-2 mw-100"
          style={{ textAlign: "left" }}
          onSubmit={onSubmitHandler}
        >
          <Input
            type="title"
            placeholder="title"
            aria-describedby="text"
            onChange={onChangeHandler}
          />
          <Input type="file" onChange={onChangeHandler} />

          <div className="mb-3">
            <ReactQuill theme="snow" onChange={onChangeHandler} />
          </div>

          <button
            type="submit"
            className="btn btn-success float-end"
            disabled={isDisabled}
          >
            Save and Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadForm;
