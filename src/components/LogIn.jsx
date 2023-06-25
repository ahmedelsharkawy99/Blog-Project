import useAuthContext from "../hooks/useAuthContext";

const LogIn = () => {
  const { login, user } = useAuthContext();
  return (
    !user && (
      <button type="button" className="btn btn-warning w-100" onClick={login}>
        Login
      </button>
    )
  );
};

export default LogIn;
