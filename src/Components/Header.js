const Header = () => {

  const today = new Date().toString.slice(0, 10)


  return ( 
    <header>
      <div>
        <h1>Dealfinder</h1>
        <p>{today}</p>
      </div>
    </header>
    
  );
}
 
export default Header;