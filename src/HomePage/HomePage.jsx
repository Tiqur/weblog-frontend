import styles from './styles.module.scss';

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
  const trades = [];
  for (let i=0; i<20; i++) {
    trades.push(generateFakeTrade())
  }

  return (
    <div classname={styles.container}>
      <div className={styles.trades_container}>
        {trades.map(e => (
          <div className={styles.trade_log}>
            <p>{e.time_entry}</p>
            <p>{e.time_exit}</p>
            <p>{e.position_type}</p>
            <p>${e.entry_price}</p>
            <p>${e.exit_price}</p>
            <p>%{e.entry_price / e.entry_price}</p>
          </div>
        ))}
      </div>
      <AddTradeButton/>
    </div>
  );
}

export default HomePage;
