import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Input from "../components/Input";
import Preview from "../components/Preview";
import Firebase from "../handlers/firestore";
import Storage from "../handlers/storage";
import useAuthContext from "../hooks/useAuthContext";
import useFirestoreContext from "../hooks/useFirestoreContext";
import { useNavigate, useParams } from "react-router-dom";
import Backdrop from "../components/Loader/Backdrop";

const { updateDoc } = Firebase;
const { uploadFile, downloadFile } = Storage;

const UploadForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { state, dispatch, read } = useFirestoreContext();
  const { user } = useAuthContext();
  const { inputs } = state;
  const [selectedItem] = state.placeholders.filter(
    (article) => article.id === id
  );

  const username = user?.displayName.split(" ").join("").toLowerCase();

  useEffect(() => {
    dispatch({
      type: "updateInputs",
      payload: {
        title: selectedItem.title,
        body: selectedItem.body,
        path: selectedItem.path,
        file: null,
      },
    });
  }, [dispatch, selectedItem]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (inputs.path !== selectedItem.path) {
      uploadFile(inputs)
        .then(downloadFile)
        .then((url) => {
          updateDoc(
            {
              ...inputs,
              createdAt: selectedItem.createdAt,
              path: url,
              user: username,
            },
            id
          ).then(async () => {
            await read();
            navigate(`/article/${id}`);
            setIsLoading(false);
          });
        });
    } else {
      updateDoc(
        {
          ...inputs,
          createdAt: selectedItem.createdAt,
          user: username,
        },
        id
      ).then(async () => {
        await read();
        navigate(`/article/${id}`);
        setIsLoading(false);
      });
    }
  };

  const onChangeHandler = (e) => {
    dispatch({ type: "setInputs", payload: e });
  };

  return (
    <>
      {isLoading && <Backdrop />}

      <p className="display-6 text-center mb-3">Edit Article</p>
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

          <button type="submit" className="btn btn-success float-end">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default UploadForm;
