import styles from './styles.module.scss';

const AddTradeButton = () => {
  return (
    <div onClick={() => {
      console.log("test")
    }} className={styles.add_trade_button}>

    </div>
  )
}


function HomePage() {
  return (
    <div classname={styles.container}>
      <div className={styles.trades_container}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25].map(e => (
          <div className={styles.trade_log}>
            <p>07/31/22 1:25:00</p>
            <p>07/31/22 1:32:00</p>
            <p>LONG</p>
            <p>$23,7242.10</p>
            <p>$23,707.20</p>
            <p>+0.15%</p>
          </div>
        ))}
      </div>
      <AddTradeButton/>
    </div>
  );
}

export default HomePage;
