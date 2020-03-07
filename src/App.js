import React, { Component } from 'react';

import SignIn from './signin';



class App extends Component {
  constructor(props)
  {
    super(props);
  }
    render()
  
  {
    console.log(this.props)
      return(
        <div>
            <SignIn/>
        </div>
        );
  }
        


      
    
}

export default App;