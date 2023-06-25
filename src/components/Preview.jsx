import useFirestoreContext from "../hooks/useFirestoreContext";

const Preview = () => {
  const ctx = useFirestoreContext();
  const { path } = ctx.state.inputs;
  return (
    path && (
      <div
        className="rounded p-1 m-5"
        style={{
          width: "30%",
          height: "300px",
          backgroundImage: `url(${path}`,
          backgroundSize: "cover",
          backgroundOrigin: "padding-box",
        }}
      ></div>
    )
  );
};

export default Preview;
