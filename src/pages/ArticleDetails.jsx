import { Link, useParams } from "react-router-dom";
import useFirestoreContext from "../hooks/useFirestoreContext";
import Aside from "../components/Aside";
import { useEffect, useMemo, useState } from "react";
import parse from "html-react-parser";
import useAuthContext from "../hooks/useAuthContext";
import Info from "../components/Info";

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [relatedItems, setRelatedItems] = useState([]);
  const { state, filteredItems: filter } = useFirestoreContext();

  const username = user?.displayName.split(" ").join("").toLowerCase();
  const item = useMemo(() => {
    return state.placeholders.find((item) => item.id === id);
  }, [id, state.placeholders]);

  useEffect(() => {
    const articles = filter(item?.title);
    const removeItem = articles.filter((article) => article.id !== item.id);
    setRelatedItems(removeItem);
  }, [filter, id, item]);

  return (
    <>
      {user && username === item.user && (
        <div className="my-3 text-start">
          <Link to={`/article/${id}/edit`}>Edit</Link>
        </div>
      )}
      <div className="row justify-content-between">
        <div className="col-12 col-md-8 text-start">
          <img
            src={item?.path}
            className="img-fluid rounded"
            alt={item?.title}
          />
          <Info
            createdAt={item.createdAt}
            user={username}
            updatedAt={item.updatedAt}
          />
          <h1 className="h1 my-3">{item?.title}</h1>
          {item?.body && <div>{parse(item?.body)}</div>}
        </div>
        <Aside relatedItems={relatedItems} />
      </div>
    </>
  );
};

export default ArticleDetails;
