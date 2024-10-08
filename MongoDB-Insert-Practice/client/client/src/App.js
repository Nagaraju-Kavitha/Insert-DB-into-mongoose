import './App.css';
import { useState } from 'react';

function App() {
  let [data,setData]  = useState([]);

  let getStudentData=async()=>{
    
  let reqOptions={
    method:"GET",
  };
  let JSONData = await fetch("http://localhost:4678/studentData",reqOptions);
  let JSOData = await JSONData.json();
  console.log(JSOData);
   setData(JSOData);

  }
  return (
    <div className="App">
      <button type="button" onClick={()=>{
              getStudentData();
      }}>Student data</button>

      {data.map((ele,i)=>{
          return <div>
            <h1>{ele.firstName} {ele.lastName}</h1>
            <h1>{ele.age}</h1>
            <h1>{ele.email}</h1>
            <h1>{ele.gender}</h1>
            <h1>{ele.batchId}</h1>
          </div>
      })}
    </div>
  );
}

export default App;      

