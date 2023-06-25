import useAuthContext from "../hooks/useAuthContext";

const LogOut = () => {
  const { logout, user } = useAuthContext();
  return (
    user && (
      <button type="button" className="btn btn-danger w-100" onClick={logout}>
        Logout
      </button>
    )
  );
};

export default LogOut;
