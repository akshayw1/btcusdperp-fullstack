import React from 'react'

const EmailTemplate = ({ email, first, last, message, phone}) => {
  return (
    <>
      <div className='text-xl'>Hello BTCUSDPERP</div>
      <p>
        Name : {first} {last}; <br/>
        Email : {email};<br/>
        message : {message};<br/>
        phone : {phone};<br/>
      </p>
    
    </>
  
  )
}

export default EmailTemplate;