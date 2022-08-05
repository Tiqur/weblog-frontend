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
    position_type: Math.floor(Math.random()) ? "LONG" : "SHORT",
    entry_price: Math.random(),
    exit_price: Math.random()
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
        <InfiniteScroll 
          className={styles.infinite_scroll_container}
          dataLength={trades.length}
          next={fetchMoreData}
          hasMore={true}
          height={400}
          loader={<h4>Loading...</h4>}>
          <div className={styles.trade_log_container}>
          {trades.map((e, index) => (
              <div key={index} className={styles.trade_log}>
                <p>{e.time_entry}</p>
                <p>{e.time_exit}</p>
                <p>{e.position_type}</p>
                <p>${e.entry_price}</p>
                <p>${e.exit_price}</p>
                <p>%{e.entry_price / e.entry_price}</p>
              </div>
          ))}
          </div>
        </InfiniteScroll>
      <AddTradeButton/>
    </div>
  );
}

export default HomePage;
