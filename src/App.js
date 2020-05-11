import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import notFound from "./components/notFound/notFound";
import Detail from "./components/detail/Detail";


function App() {
  // const title = "React Coin";

  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Detail} exact />
          <Route component={notFound} />
        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
