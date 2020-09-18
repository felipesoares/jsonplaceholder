import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './libs/bootstrap.min.css';
import './App.css';

import { routes } from './routes';

import { Header, Footer } from './components';

function App() {
  return (
    <main role="main" className={`container`}>
      <BrowserRouter>
        <Header />
        <Suspense fallback={<div></div>}>
          <Switch>
            {routes.map((route: any, idx: any) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                    <route.component {...props} name={route.name} />
                  )}
                  // render={props => <route.component {...props} />}
                />
              ) : null;
            })}
          </Switch>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
