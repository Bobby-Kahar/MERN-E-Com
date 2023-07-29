import Navbar from './pages/components/navbar';

function App({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default App;
