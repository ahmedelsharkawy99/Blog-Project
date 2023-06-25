import { createContext, useCallback, useMemo, useReducer } from "react";
import Firebase from "../handlers/firestore";

export const Context = createContext();

const { readDocs } = Firebase;
const articals = [];

const initialInputs = {
  title: null,
  body: null,
  file: null,
  path: null,
};

const initialState = {
  items: articals,
  placeholders: articals,
  counter: articals.length,
  inputs: initialInputs,
  isCollpased: false,
};

const onChangeHandler = (state, e) => {
  if (e.target === undefined) {
    return { ...state, body: e };
  } else if (e.target.name === "title")
    return { ...state, title: e.target.value };
  else if (e.target.name === "file")
    return {
      ...state,
      file: e.target.files[0],
      path: URL.createObjectURL(e.target.files[0]),
    };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setItem":
      return {
        ...state,
        items: [action.payload, ...state.items],
        placeholders: [action.payload, ...state.items],
        counter: state.items.length + 1,
        inputs: initialInputs,
      };

    case "filterItems":
      return {
        ...state,
        items: action.payload.results,
      };

    case "setItems":
      return {
        ...state,
        items: action.payload.items,
        placeholders: action.payload.items,
      };

    case "setInputs":
      return {
        ...state,
        inputs: onChangeHandler(state.inputs, action.payload),
      };

    case "updateInputs":
      return { ...state, inputs: { ...action.payload } };

    case "collapse":
      return {
        ...state,
        inputs: initialInputs,
        isCollpased: !state.isCollpased,
      };

    case "reset":
    default:
      return initialState;
  }
};

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const read = async () => {
    const items = await readDocs("stocks");
    dispatch({ type: "setItems", payload: { items } });
  };

  const filteredItems = useCallback(
    (input) => {
      if (input === "" || !!input)
        dispatch({ type: "setItems", payload: { items: state.placeholders } });

      let list = state.placeholders.flat();
      let results = list.filter((item) => {
        const name = item?.title?.toLowerCase();
        const query = input?.toLowerCase();
        return name.indexOf(query) > -1;
      });

      dispatch({ type: "filterItems", payload: { results } });
      return results;
    },
    [state.placeholders]
  );

  const value = useMemo(() => {
    return { state, dispatch, read, filteredItems };
  }, [filteredItems, state]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default Provider;
