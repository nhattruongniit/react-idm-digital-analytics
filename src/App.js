import { Route } from 'react-router-dom';

// modules
import Dashboard from 'modules/Dashboard'

// components
import Header from 'components/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Route path="/" exact component={Dashboard} />
      </main>
    </>
  )
}

export default App;
