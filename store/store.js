import { createStore, applyMiddleware, combineReducers } from "redux";

import { createWrapper } from "next-redux-wrapper";

import thunkMiddleware from "redux-thunk";

const combinedReducer = combineReducers({});

const blindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
};

const makeStore = ({ isServer }) => {
  if (isServer) {
    return createStore(combinedReducer, blindMiddleware([thunkMiddleware]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");
    const storage = require("redux-persist/lib/storage").default;

    const persistConfig = {
      key: "mysssg",
      whitelist: [],
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, combinedReducer);

    const store = createStore(
      persistedReducer,
      blindMiddleware([thunkMiddleware])
    );
    store._peristor = persistStore(store);

    return store;
  }
};

export const wrapper = createWrapper(makeStore);
