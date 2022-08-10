import styles from './styles.module.scss';

export default (props) => {
  return (
    <div className={styles.container} id='background'>
      <div>
        <h1>{props.title}</h1>
        <div>
          {props.children}
        </div>
      </div>
    </div>
  )
}
