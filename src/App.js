
import './App.css';
import Search from './Components/Search';
import Favorites from './Components/Favorites';
import Meals from './Components/Meals';
import Modal from './Components/Modal';
import { useGlobalContext } from './context'

function App() {
  const { showModal,favorites } = useGlobalContext()
  return (
    <main>
       <Search />
       {favorites.length >0 && <Favorites/>}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
