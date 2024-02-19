import AboutSection from "./components/layout/AboutSection/AboutSection";
import RightList from "./components/layout/RightList/RightList";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import WorldSettings from "./pages/WorldSettings";
import SaveSettings from "./pages/SaveSettings/SaveSettings";
import { Theme } from "@radix-ui/themes";
import HomePage from "./pages/ServerSettings/HomePage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store";
import SaveBackup from "./pages/SaveBackup/SaveBackup";
import ModSettings from "./pages/ModSettings/ModSettings";
import FAQ from "./pages/FAQ/FAQ";

function App() {
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
                    <Route exact path="/" component={HomePage} />
                    <Route path="/world-settings" component={WorldSettings} />
                    <Route path="/save-settings" component={SaveSettings} />
                    <Route path="/mod-settings" component={ModSettings} />
                    <Route path="/faq" component={FAQ} />
                    <Redirect exact from="/" to="/" />
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
