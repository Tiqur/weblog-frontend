import styles from './styles.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import {useState, useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

const AddTradeButton = (trades) => {
  return (
    <div onClick={() => {
      console.log(trades)
    }} className={styles.add_trade_button}>

    </div>
  )
}

function calculatePL(e) {
  return (e.position_type == 'LONG' ? (e.exit_price-e.entry_price)/e.entry_price : (e.entry_price-e.exit_price)/e.exit_price);
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
  const [trades, setTrades] = useState([]);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [data1, setData1] = useState({datasets:[]});
  const [data2, setData2] = useState({datasets:[]});
  ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

  // Update window height state on resize
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);

  // Update trades_pl array on trades update
  useEffect(() => {
    const trades_pl = trades.map(e => calculatePL(e));
    console.log(trades, trades_pl)
      
    setData1({
      labels: ['Win', 'Loss'],
      datasets: [
            {
              label: 'P/L',
              data: [trades_pl.filter(e => e >= 0).length / trades_pl.length, trades_pl.filter(e => e < 0).length / trades_pl.length],
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
        })

    setData2({
      labels: trades.map((e, index) => index),
      datasets: [
        {
          label: 'Trades',
          data: trades_pl,
          backgroundColor: 'rgba(122, 179, 199, 0.8)',
        }
      ]
    })
  }, [trades]);


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


  return (
    <div className={styles.container}>
        <div className={styles.stats_container} style={{height: window.innerHeight*0.3}}>
          <div className={styles.pie_chart_container}>
            <Pie options={{ maintainAspectRatio: false }} data={data1}/>
          </div>
          <div className={styles.bar_chart_container}>
            <Bar options={{ maintainAspectRatio: false }} data={data2}/>
          </div>
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
                  <td style={{color: calculatePL(e)>=0 ? '#62C951' : '#D15D5D'}}>%{calculatePL(e).toFixed(2)}</td>
                </tr>
            ))}
          </table>
        </InfiniteScroll>
      <AddTradeButton trades={[trades]}/>
    </div>
  );
}

export default HomePage;
