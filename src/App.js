import { useState, useEffect} from 'react'

//functional expression
const App = () =>{
  const[deals, setDeals] = useState(null)

  const getDeals = async() => {
    try {
      const response = await fetch('http://localhost:8000/deals', {
        method: "GET"
      });
      const data = await response.json();
      setDeals(data);
    } catch (err) {
      console.error(err);
    }
    

  }//Remember if code is inside a method or not

  //useEffect must be not be inside an async function
  useEffect(() => {
    getDeals() 
  }, []);


  console.log(deals)
  //pickup 28:33
  return (
    <div className="App">

    </div>
  );
}

export default App;
