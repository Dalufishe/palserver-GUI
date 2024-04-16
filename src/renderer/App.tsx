import {
  MemoryRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Theme, ThemePanel } from '@radix-ui/themes';
import Home from './pages/Home';
import AboutSection from './components/AboutSection/AboutSection';
import Translation from './provider/Translation/Translation';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import RightSection from './components/RightSection/RightSection';
import WorldSettings from './pages/WorldSettings';
import WorldSettingsJSON from './pages/WorldSettingsJSON';
import ServerManagement from './pages/ServerManagement';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Theme>
          <Translation>
            {/* <ThemePanel /> */}
            <div className="App">
              <div className="w-screen h-screen flex">
                <div className="w-full h-full p-4 bg-bg-1 flex flex-col gap-4">
                  <AboutSection />
                  <Switch>
                    {/* <Route path="/monitor" component={Monitor} /> */}
                    <Route exact path="/" component={Home} />
                    <Route path="/world-settings" component={WorldSettings} />
                    <Route
                      path="/server-management"
                      component={ServerManagement}
                    />

                    {/*
                <Route path="/save-settings" component={SaveSettings} />
                <Route path="/mod-settings" component={ModSettings} />
                <Route path="/faq" component={FAQ} /> */}
                    <Redirect exact from="/" to="/" />
                  </Switch>
                </div>
                <RightSection />
              </div>
            </div>
          </Translation>
        </Theme>
      </Router>
    </Provider>
  );
}
