import classes from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={classes.overlay}>
      <div className={classes.loader}>
        <div className={classes["lds-roller"]}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
