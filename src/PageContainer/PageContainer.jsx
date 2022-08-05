import styles from './styles.module.scss';

function PageContainer(props) {
  return (
    <div className={styles.container}>
      {props.children}
    </div>
  );
}

export default PageContainer;
