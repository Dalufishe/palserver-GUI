import { useEffect, useState } from "react";
import { ipcRenderer, run } from "./constant/contextBridge";
import StartBtnImage from "./assets/images/start.webp";
import AboutSection from "./components/layout/AboutSection/AboutSection";
import Button from "./components/global/Button";
import RightList from "./components/layout/RightList/RightList";
import {
  BrowserRouter,
  HashRouter,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Monitor from "./pages/Monitor";
import WorldSettings from "./pages/WorldSettings";
import SaveSettings from "./pages/SaveSettings";
import { Theme } from "@radix-ui/themes";
import ServerSettings from "./pages/ServerSettings/ServerSettings";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";

function App() {
  // useEffect(() => {
  //   // 意外關閉時備份
  //   ipcRenderer.send("request-set-engine-to-save");
  // }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HashRouter>
          <Theme>
            <div className="App">
              <div className="w-screen h-screen flex">
                <div className="w-full h-full p-4 bg-bg-1 flex flex-col gap-4">
                  <AboutSection />
                  <Switch>
                    {/* <Route path="/monitor" component={Monitor} /> */}
                    <Route path="/server-settings" component={ServerSettings} />
                    <Route path="/world-settings" component={WorldSettings} />
                    <Route path="/save-settings" component={SaveSettings} />
                    <Redirect from="/" to="/server-settings" />
                  </Switch>
                </div>
                <RightList />
              </div>
            </div>
          </Theme>
        </HashRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
