import './Home.css';
import Stars from './../components/Stars';
import Clusters from './../components/Clusters';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Stellection</h1>
        <Clusters/>
        <Stars />
      </header>
    </div>
  );
}

export default Home;
