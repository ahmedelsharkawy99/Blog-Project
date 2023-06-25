import { useNavigate } from "react-router-dom";
import Info from "./Info";

const Card = ({ path, title, body, createdAt, updatedAt, user, id }) => {
  const navigate = useNavigate();

  const p = String(body).replaceAll(/<(\w\d||\w+)>/gi, " ");
  const finalPrag = p.replaceAll(/<\/(\w\d||\w+)>/gi, " ");
  const description = `${finalPrag?.slice(0, 30)}...`;

  const onClickHandler = () => navigate(`/article/${id}`, { state: { id } });

  return (
    <div
      className="col g-col-md-4 mb-5 d-flex justify-content-center"
      onClick={onClickHandler}
      role="button"
    >
      <div className="card overflow-hidden" style={{ width: "18rem" }}>
        <div
          style={{
            height: "220px",
            backgroundImage: `url(${path})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <div className="card-body">
          <h5 className="card-title text-start">{title}</h5>
          <p className="card-text text-start">{description}</p>
        </div>
        <Info createdAt={createdAt} user={user} updatedAt={updatedAt} />
      </div>
    </div>
  );
};

export default Card;
