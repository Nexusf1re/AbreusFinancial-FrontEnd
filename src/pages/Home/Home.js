import React from 'react';
import "./Home.css"
import TopBar from '../../components/TopBar/TopBar';
import BottomBar from '../../components/BottomBar/BottomBar';




const Home = () => {

  const date = new Date().toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div id='body'>
     <TopBar />

     <div id='date'>
      {date}
     </div>

    <div className='InOut'>

    <div className="income">
    <p>Total Entrada</p>
    <p className='icomeValue'></p>
    </div>

    <div className="outgoing">
    <p>Total Saída</p>
    <p className="outgoingValue"></p>
    </div>
      
    </div>

     <div className="monthBalance">
     <p className='name'>Balanço Mês</p>
     <p className='balanceValue'> R$1500,00</p>
     </div>

     <BottomBar />
    </div>
  );
};

export default Home;
