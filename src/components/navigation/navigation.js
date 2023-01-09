import './navigation.css';
import menu from '../../imgs/menu.png';
import back from '../../imgs/back.png';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const Navigation = (props) => {


    const signO = () => {
        getAuth().signOut();
    }

    return(
        <div>
        <label for="btn-menu"><img className='navIcon'src={menu} alt=""></img></label>
            <input type="checkbox" id="btn-menu"></input>
                <div className='navigation'>
                <label for="btn-menu"><img className="closeNav" src={back} alt=""></img></label>
                    <input type="checkbox" id="btn-menu"></input>
                <div className='text-center'>
                <h2>uitter</h2>
                </div>
                    <div className='navigation-container'>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/Forms">Sign In</Link></li>
                            <li><Link to="/SearchFriends">Search Friends</Link></li>
                            <li><Link to="/Forms">Configuration</Link></li>
                            <li><Link to="/Forms">ReUitts *funcionalidad a ver</Link></li>
                            <button onClick={() => signO()}>Sign Out</button>
                    </div>
                </div>
        </div>
    )
}

export default Navigation;