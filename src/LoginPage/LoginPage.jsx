import styles from './styles.module.scss';

function LoginPage() {
  return (
    <div className={styles.container}>
	<div className={styles.login_container}>
	  <h1>Login</h1>
	  <input className={styles.input_box} placeholder="Username"/>
	  <input className={styles.input_box} type="password" placeholder="Password"/>
	  <div className={styles.submit_button}>Submit</div>
	</div>
    </div>
  );
}

export default LoginPage;
