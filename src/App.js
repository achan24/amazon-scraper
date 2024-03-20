import { useState, useEffect} from 'react'
import Card from './Components/Card'
import Header from './Components/Header'

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
      <Header />
      <nav>
        <button className="primary">Amazon</button>
        <button className="primary" disabled>Aliexpress</button>
        <button className="primary" disabled>eBay</button>
        <button className="primary" disabled>Etsy</button>
      </nav>
      <div>
        <h2>Best deal!</h2>
        <div className="feed">
          {/* If deal exists grab card component*/}
          {/* pos will be the unique identifier*/}
          {/* The item we pass through is that whole object */}
          {deals?.map(deal => <Card key="deal.pos" item={deal}/>)}
        </div>
      </div>
    </div>
  );
}

export default App;
