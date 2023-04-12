import React, { useState } from 'react';


export default function Success() {
    const [apple, addApple] = useState(false);
    const [orange, addOrange] = useState(false);
    const [loaded, isLoading]= useState(false);
    const [amount, setAmount] = useState(0);
  
 
    return(
       <div>
        <h1>Here shouold be success</h1>
       </div>
    )
}
