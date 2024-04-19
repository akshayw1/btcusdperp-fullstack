import React from 'react';
import styles from "./styles.module.css";


const ResetPassword = ({ resetUrl }) => {
  return (
    <>
     
     
       
       
          <div className="container">
            <h1>Reset Password</h1>
            <p>To reset your password, click the button below:</p>
            <br/>
            <a className={styles.button} href={resetUrl} target="_blank" rel="noopener noreferrer">
              Reset Password
            </a>
          </div>
       
      
    </>
  );
};

export default ResetPassword;
