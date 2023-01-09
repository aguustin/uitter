import './friends.css';
import menu from '../../imgs/menu.png';
import search from '../../imgs/search.png'
import { useEffect, useState } from 'react';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { firestoreDB } from '../../services/firebase';
import { Link } from 'react-router-dom';

const Friends = (props) => {

    
    const [allFriends, setGetAllFriends] = useState([]);
   
    useEffect(() => {
        (async() => {

            const getAllFriends = await query(collection(firestoreDB, 'friends'), where('idUser', '==', props.userInfo));
            await getDocs(getAllFriends)
            .then((res) => {
                const allFriends = res.docs.map(doc => {
                    return {id: doc.id, ...doc.data() }
                })
                setGetAllFriends(allFriends);
            })
        })()
    }, [props.userInfo])

    return(
        <div className='friends'>
            <div>
            <label className='label-search' for="search"><img src={search} alt=""></img></label>
                <input id="search" type="text" name="buscar" placeholder='Buscar uits'></input>
                <p id="mail">agustin.molee@gmail.com</p>
            </div>
            <div className='contact'>
                {allFriends.map(f=> <div key={f.id} className='contact-container d-flex'>
                       <Link to={`/friends/${f.idFriend}`}><div className='contact-img'>
                            <img src={menu} alt=""></img>
                        </div>
                        <div className='contact-names'>
                            <p>{f.alias}</p>
                            <p>@{f.username}</p>
                        </div></Link> 
                    </div>)}
            </div>
        </div>
    )
}

export default Friends;