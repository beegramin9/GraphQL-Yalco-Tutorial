import './App.css';
import React, { useState } from 'react';

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Roles from './components/roles'
import Teams from './components/teams'
import People from './components/people'

const client = new ApolloClient({
  //* GraphQL서버(=uri)로부터 데이터를 받는 Client 역할
  // RestAPI에서의 Axios와 같은 역할
  //* http, https가 헷갈리거나 유동적이라면 생략하면 된다
  uri: "//localhost:4000",
  // Cache 저장 역할
  cache: new InMemoryCache()

})

function App() {

  const [menu, setMenu] = useState('Roles')

  let mainComp = {
    Roles: (<Roles />),
    Teams: (<Teams />),
    People: (<People />),
  }

  function NavMenus() {
    return [
      'Roles', 'Teams', 'People'
    ].map((_menu, key) => {
      return (
        <li key={key} className={menu === _menu ? 'on' : ''}
          onClick={() => { setMenu(_menu); }}>{_menu}</li>
      );
    });
  }

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>
              {NavMenus()}
            </ul>
          </nav>
        </header>
        <main>
          {mainComp[menu]}
        </main>
      </ApolloProvider>
    </div>
  );
}

export default App;
