import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useMemo } from "react";
import useFirestoreContext from "../hooks/useFirestoreContext";
import List from "../components/List";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { state } = useFirestoreContext();

  const items = useMemo(() => {
    const username = user?.displayName.split(" ").join("").toLowerCase();
    const filtered = state.items.filter((item) => item.user === username);
    return user ? filtered : [];
  }, [state.items, user]);

  if (!user) return navigate("*");

  return (
    <>
      <h1 className="text-center">Profile</h1>
      <hr style={{ width: "50%", margin: "3rem auto" }} />
      <div className="d-flex justify-content-center align-items-center flex-wrap gap-3 mb-3">
        <img
          style={{ borderRadius: "4px " }}
          src={user?.photoURL}
          alt={user?.displayName}
          width="150"
          height="150"
        />
        <ul className="list-group mx-5">
          <li className="list-group-item">
            <span className="fs-5 text-capitalize">name: </span>
            <span className="fs-5">{user?.displayName}</span>
          </li>
          <li className="list-group-item">
            <span className="fs-5 text-capitalize">email: </span>
            <span className="fs-5">{user?.email}</span>
          </li>
        </ul>
      </div>
      <hr style={{ width: "50%", margin: "3rem auto" }} />
      <List items={items} />
    </>
  );
};
export default Profile;
