import { BrowserRouter } from 'react-router-dom';
import './App.css';
// import ChildComp from './sandbox/components/ChildComponent';
// import PageHeader from './components/PageHeader';
// import TypographyComponent from './sandbox/components/TypographyComponent';
import Router from './routes/Router';
import Layout from './layout/Layout';
import { ThemeProvider } from './providers/ThemeProvider';
import { SnackbarProvider } from './providers/SnackbarProvider';
import { UserProvider } from './users/providers/UserProvider';

function App() {
  // const hwString = 'Hello World';
  // const name = { firstName: 'John', lastName: 'Doe' };
  return (
    <div className="App"  >
      <BrowserRouter>
        <ThemeProvider>
          <SnackbarProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
