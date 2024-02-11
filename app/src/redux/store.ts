// redux
import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { selectedGameSave } from "./selectGameSave/selectedGameSave.reducer";
import { appLanguage } from "./appLanguage/appLanguage.reducer";

// reducers
const reducer = combineReducers({
  selectedGameSave,
  appLanguage,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["selectedGameSave", "appLanguage"],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer);

export type RootState = ReturnType<typeof store.getState>;

const persistor = persistStore(store);

export { store, persistor };
