import styles from './styles.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const AddTradeButton = () => {
  return (
    <div onClick={() => {
      console.log("test")
    }} className={styles.add_trade_button}>

    </div>
  )
}

function calculatePL(position_type, entry_price, exit_price) {
  return (position_type == 'LONG' ? (exit_price-entry_price)/entry_price : (entry_price-exit_price)/exit_price);
}

function formatUnixToDate(unix) {
 return(new Date(unix).toLocaleString());
}

function generateFakeTrade() {
  return ({
    time_entry: Date.now(),
    time_exit: Date.now(),
    position_type: Math.round(Math.random()) ? "LONG" : "SHORT",
    entry_price: Math.random().toFixed(5),
    exit_price: Math.random().toFixed(5)
  })
}



function HomePage() {
  const [trades, setTrades] = useState([])
  const [windowHeight, setWindowHeight] = useState(window.innerHeight)
  ChartJS.register(ArcElement, Tooltip, Legend);

  // Update window height state on resize
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);




  // Gen fake trades
  for (let i=0; i<50; i++) {
    trades.push(generateFakeTrade())
  }

  function fetchMoreData() {
    setTimeout(() => {
      const new_trades = [];
      for (let i=0; i<5; i++)
        new_trades.push(generateFakeTrade())

      setTrades([...trades, ...new_trades])
    }, 500);
  };


  // Temp
  const data = {
    labels: ['Win', 'Loss'],
    datasets: [
          {
            label: '# of Votes',
            data: [62, 38],
            backgroundColor: [
              'rgba(122, 179, 199, 0.8)',
              'rgba(48, 151, 178, 0.8)'
            ],
            borderColor: [
              'rgba(122, 179, 199, 0.8)',
              'rgba(48, 151, 178, 0.8)'
            ],
            borderWidth: 1,
          },
        ],
      }



  return (
    <div className={styles.container}>
        <div className={styles.stats_container} style={{height: window.innerHeight*0.3}}>
          <Pie options={{ maintainAspectRatio: false }} data={data}/>
        </div>
        <table className={styles.trade_log_container}>
          <tr className={styles.trade_log_label}>
            <td>Time Enter</td>
            <td>Time Exit</td>
            <td>Position</td>
            <td>Price Enter</td>
            <td>Price Exit</td>
            <td>P/L</td>
          </tr>
        </table>
        <InfiniteScroll 
          className={styles.infinite_scroll_container}
          dataLength={trades.length}
          next={fetchMoreData}
          hasMore={true}
          height={window.innerHeight*0.6}>
          <table className={styles.trade_log_container}>
            {trades.map((e, index) => (
                <tr key={index} className={styles.trade_log}>
                  <td>{formatUnixToDate(e.time_entry)}</td>
                  <td>{formatUnixToDate(e.time_exit)}</td>
                  <td style={{color: e.position_type == 'LONG' ? '#62C951' : '#D15D5D'}}>{e.position_type}</td>
                  <td>${e.entry_price}</td>
                  <td>${e.exit_price}</td>
                  <td style={{color: calculatePL(e.position_type, e.entry_price, e.exit_price)>=0 ? '#62C951' : '#D15D5D'}}>%{calculatePL(e.position_type, e.entry_price, e.exit_price).toFixed(2)}</td>
                </tr>
            ))}
          </table>
        </InfiniteScroll>
      <AddTradeButton/>
    </div>
  );
}

export default HomePage;
