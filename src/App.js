import { Route } from 'react-router-dom';

// modules
import Dashboard from 'modules/Dashboard'
import Project from 'modules/Project';

// components
import Header from 'components/Header';

function App() {
  return (
    <>
      <Header />
      <main>
        <Route path="/" exact component={Project} />
        <Route path="/project/:id" exact component={Dashboard} />
      </main>
    </>
  )
}

export default App;
