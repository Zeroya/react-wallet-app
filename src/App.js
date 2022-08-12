import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardsField from './components/CardsField/CardsField';
import BalanceField from './components/BalanceField/BalanceField';
import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  justify-content:center;
`;

function App() {
  return (
    <Page className="App">
      <BalanceField />
      <CardsField />
    </Page>
  );
}

export default App;
