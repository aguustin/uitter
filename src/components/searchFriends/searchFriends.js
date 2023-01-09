import './searchFriends.css';
import yugi from '../../imgs/yugioh.jpg';
import mas from '../../imgs/mas.png';
import { useEffect, useState } from 'react';
import { addDoc, collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firestoreDB } from '../../services/firebase';

const SearchFriends = (props) => {

    const [allUsers, setAllUsers] = useState([]);
    const [addF, setAddF] = useState([]);

    useEffect(() => {

        (async() => {
            const getAllUsers = await query(collection(firestoreDB, 'user'), orderBy('username', 'desc'));

            await getDocs(getAllUsers)
            .then((res) => {
                const users = res.docs.map(doc => {
                    return {id: doc.id, ...doc.data() }
                })
                setAllUsers(users);
            })
        })();
      
    }, [])

    const addFriend = async (sid) => {

    const userId = props.userInfo.uid;
    
    console.log("e", userId);
    const friendData = query(collection(firestoreDB, "user"), where("id", '==', sid));
    await getDocs(friendData)
    .then((res) => {
        const getIdFriend = res.docs.map(doc => {
            return {id: doc.id, ...doc.data()}
        })
        setAddF(getIdFriend);
    })
    
    const idFriend = addF[0].id;
    const username = addF[0].username;
    const alias = addF[0].alias;
    const email = addF[0].email;

    await addDoc(collection(firestoreDB, 'friends'), {
        idUser: userId,
        idFriend: idFriend,
        username: username,
        alias: alias,
        email: email
    })

   }
    
    return(
        <div className='searchFriends d-flex'>
            {allUsers.map(s => <div key={s.id} className='searchFriends-container'>
                <div className='searchFriends-img-follows text-center'>
                    <img src={yugi} alt=""></img>
                </div>
                <div className='searchFriends-username-alias d-flex'>
                    <button onClick={() => addFriend(s.id)}><img src={mas} alt=""></img></button>
                    <div className='text-left'>
                        <p>{s.username}</p>
                        <p>@{s.alias}</p>
                    </div>
                    <div className='follows-followers text-left'>
                        <p>Follows: 4531</p>
                        <p>Followers: 19731</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default SearchFriends;