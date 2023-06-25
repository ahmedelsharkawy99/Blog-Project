import { useMemo } from "react";
import { useLocation } from "react-router-dom";

const Info = ({ createdAt, updatedAt, user }) => {
  const { pathname } = useLocation();
  const createDate = useMemo(() => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(createdAt?.seconds * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return `${date}`;
  }, [createdAt]);

  const updateDate = useMemo(() => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const date = new Date(updatedAt?.seconds * 1000).toLocaleDateString(
      "en-US",
      options
    );

    return `${date}`;
  }, [updatedAt]);

  console.log(updatedAt);
  return (
    <div className="d-flex align-items-center justify-content-between p-2 gap-3 mt-2 flex-wrap">
      <small className="text-start fw-semibold mb-0 text-sm">@{user}</small>
      <div className="text-start mb-0 d-flex d-flex flex-column gap-2">
        <small className=" text-sm">{createDate}</small>
        {updatedAt && pathname.includes("/article") && (
          <small className=" text-sm">Updated At: {updateDate}</small>
        )}
      </div>
    </div>
  );
};

export default Info;
