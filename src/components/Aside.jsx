import React from "react";
import { useNavigate } from "react-router-dom";

const Aside = ({ relatedItems }) => {
  const navigate = useNavigate();

  const onClickHandler = (id) => navigate(`/article/${id}`);
  let content;

  if (relatedItems.length === 0) content = <li>There is no related blogs</li>;
  else
    content = relatedItems.map((item) => (
      <li key={item.id} className="related-post">
        <img
          src={item.path}
          alt={item.title}
          className="rounded"
          height="65"
          width="65"
        />
        <div>
          <h5
            to={`/article/${item.id}`}
            className="related-link"
            onClick={() => onClickHandler(item.id)}
          >
            {item.title}
          </h5>
          <p className="related-auther">{item.user}</p>
        </div>
      </li>
    ));

  return (
    <aside className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-3">
      <div className="text-start bg-light rounded p-3 w-100">
        <h4>Related Blogs</h4>
        <ul className="related-posts">{content}</ul>
      </div>
    </aside>
  );
};

export default Aside;
