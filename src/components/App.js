import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
// import * as dayjs from 'dayjs'
// var relativeTime = require('dayjs/plugin/relativeTime')
// dayjs.extend(relativeTime)


function App(){
  // console.log(dayjs().fromNow());
  // console.log();
  return ( 
    <React.Fragment>
      <Header />
      <TicketControl />
      {/* <h1>Hellow World</h1> */}
    </React.Fragment>
  );
}

export default App;