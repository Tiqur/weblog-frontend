import styles from './styles.module.scss';
import InfiniteScroll from "react-infinite-scroll-component";
import {useState} from 'react';

const AddTradeButton = () => {
  return (
    <div onClick={() => {
      console.log("test")
    }} className={styles.add_trade_button}>

    </div>
  )
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
        <div className={styles.stats_container}>
          
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
          height={400}>
          <table className={styles.trade_log_container}>
            {trades.map((e, index) => (
                <tr key={index} className={styles.trade_log}>
                  <td>{e.time_entry}</td>
                  <td>{e.time_exit}</td>
                  <td style={{color: e.position_type == 'LONG' ? '#62C951' : '#D15D5D'}}>{e.position_type}</td>
                  <td>${e.entry_price}</td>
                  <td>${e.exit_price}</td>
                  <td>%{e.entry_price / e.entry_price}</td>
                </tr>
            ))}
          </table>
        </InfiniteScroll>
      <AddTradeButton/>
    </div>
  );
}

export default HomePage;
