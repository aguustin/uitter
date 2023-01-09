import './profiles.css';
import yugi from '../../imgs/yugioh.jpg';
import comentar from '../../imgs/comentar.png';
import like from '../../imgs/like.png';
import adjunt from '../../imgs/adjuntar.png';
import draw from '../../imgs/draw.png';
import { useEffect, useState } from 'react';
import Friends from '../friends/friends';
import { collection, getDocs, where, query, addDoc} from 'firebase/firestore';
import { firestoreDB } from '../../services/firebase';
import { useParams } from 'react-router';

//import { publicUit } from '../functions/functions';

const Profiles = (props) => {

    const [showPublic, setShowPublic] = useState(false);
    const [showPublicComment, setShowPublicComment] = useState(false);
    const [showDesc, setShowDesc] = useState(false);
    const [profile, setProfileData] = useState([]);
    const [follows, setFollows] = useState([]);
    const [uits, setUitsData] = useState([]);
    const {idFriend} = useParams()
    console.log("?",  idFriend);
    
   useEffect(() => { //problema de consumo de base de datos
   
    (async() => {
    
      if(idFriend){
        // TRAE EL PERFIL DEL AMIGO
        const profileData = await query(collection(firestoreDB, 'user'), where('id', '==', idFriend));
        await getDocs(profileData)
         .then((res) => {
             const dataProfile = res.docs.map(doc => {
                 return { id: doc.id, ...doc.data() }
             })
             setProfileData(dataProfile);
         })

         //ESTO ES SOLO DE LOS SEGUIDOS DE LOS AMIGOS

         const followsData = await query(collection(firestoreDB, 'friends'), where('idUser', '==', idFriend));
         await getDocs(followsData)
          .then((res) => {
              const follows = res.docs.map(doc => {
                  return {id: doc.id, ...doc.data()}
              })

              setFollows(follows);
          })

          //BUSCA LOS UITS PUBLICADOS QUE HIZO EL AMIGO EN SU PERFIL
         const uitsData = await query(collection(firestoreDB, 'uits'), where('idUser', '==', idFriend));
         await getDocs(uitsData)
         .then((res) => {
             const uitsProfile = res.docs.map(doc => {
                 return {id: doc.id, ...doc.data() }
             })
             setUitsData(uitsProfile);
         })
             
      }else{
        //TRAE EL PERFIL DEL USUARIO MISMO
            const profileData = await query(collection(firestoreDB, 'user'), where('id', '==', props.userInfo.user.uid));
            await getDocs(profileData)
             .then((res) => {
                 const dataProfile = res.docs.map(doc => {
                     return { id: doc.id, ...doc.data() }
                 })
                 setProfileData(dataProfile);
             })
        }
 
          //ESTO ES SOLO DE LOS SEGUIDOS, HAY QUE HACER OTRA BASE DE DATOS CON LOS SEGUIDORES
 
             const followsData = await query(collection(firestoreDB, 'friends'), where('idUser', '==', props.userInfo.user.uid));
            await getDocs(followsData)
             .then((res) => {
                 const follows = res.docs.map(doc => {
                     return {id: doc.id, ...doc.data()}
                 })
 
                 setFollows(follows);
             })
             
        //BUSCA LOS UITS PUBLICADOS POR EL USUARIO MISMO (HACER UNO PARA LOS AMIGOS DEL USUARIO)
         const uitsData = await query(collection(firestoreDB, 'uits'), where('idUser', '==', props.userInfo.user.uid));
         await getDocs(uitsData)
         .then((res) => {
             const uitsProfile = res.docs.map(doc => {
                 return { id: doc.id, ...doc.data() }
             })
             setUitsData(uitsProfile);
         })    
    })();

   },[idFriend, props.userInfo.user, props.userInfo.user.uid])
        
    const followsNumber = follows.length;
    
    const publicUitt = (e) => {  //AGREGA A LA BASE DE DATOS EL UIT

        e.preventDefault();

        const uit = e.target.elements.publicUit.value;
        const username = profile[0].username;
        const alias = profile[0].alias;
        console.log(uit);

        addDoc(collection(firestoreDB, 'uits'),{
            idUser: 'Mz3cNBxMNlTrh66jm1yqjLrx3It2',
            username: username,
            alias: alias,
            uit: uit
        })
        setShowPublic(!showPublic);
    }

    const PublicAUit = () => { //ABRE LA VENTANA PARA PUBLICAR UN UIT
//no se si el textarea tiene que estar relacionado con el nombre del formulario en vez de con la clase
        return(
            <div className='back-public'>
                <div>
                <h2 className='text-white'>Share what you want!</h2>
                    <form className='publicAuit' onSubmit={publicUitt}> 
                        <textarea cols="46" rows="8" maxLength="400" id="publicUit" name="publicUit" placeholder='What are you thinking?'>

                        </textarea>
                        <button onClick={() => setShowPublic(!showPublic)}>Cancel</button>
                        <button type="submit">Public</button>
                        <button id="adjunt"><img src={adjunt} alt=""></img></button>
                    </form>
                </div>
            </div>
        )
    }


    const updateDesc = () => {  //EDITA LA DESCRIPCION DEL PERFIL

    }

    const EditDesc = () => {  //ABRE LA VISTA PARA EDITAR LA DESCRIPCION DEL PERFIL

        return(
            <div className='back-public'>
                <div>
                <h2 className='text-white'>Edit you description!</h2>
                    <form className='updateDesc' onSubmit={updateDesc}> 
                    <input type="text" placeholder="@Write your alias"></input>
                        <textarea form="updateDesc" cols="46" rows="3" maxLength="300" name="publiDesc" placeholder='Write your description'>

                        </textarea>
                        <button onClick={() => setShowDesc(false)}>Cancel</button>
                        <button type="submit">Public</button>
                    </form>
                </div>
            </div>
        )
    }

    const PublicComment = () => { //ABRE EL TEXTO PARA COMENTAR UN UIT
        return(
            <div className='publicComment'>
                <form>
                    <textarea cols="58" rows="7" maxLength="300">

                    </textarea>
                </form>
            </div>
        )
    }

if(profile.length === 0){
    //cambiar esto por un loader bonito
   return(
    <div>
        <img src={yugi} alt=""></img> 
    </div>
   )
}else{
  return (
        <div className='profiles mb-3'>
        {showPublic ? <PublicAUit/> : null}
        {showDesc ? <EditDesc/> : null}
           {profile.map( p => <div key={p.id} className='header-profile'>
            <h2>{p.username}</h2>
                <img id="back-img" src={yugi} alt=""></img>
                <div className='header-img-profile'>
                    <img src={yugi} alt=""></img>
                </div>
                <div className='info-profile'>
                    <p>Follows: {followsNumber}</p>
                    <p>Followers: </p>
                    <button id="publicButton" onClick={() => PublicAUit(setShowPublic(!showPublic))}>Public a uit</button>
                    <h2>{p.username}</h2>
                    <p>@{p.alias}</p>
                    <button onClick={() => setShowDesc(true)}><img src={draw} alt=""></img></button>
                    <p>{p.desc}</p>
                </div>
            </div>)}
            {uits.map(u => <div key={u.id} className='body-profile d-flex'>
                <div>
                    <img id="profile-img" src={yugi} alt=""></img>
                </div>
                <div className='body-profile-text'>
                    <div>
                        <div className='d-flex'>
                            <p>{u.username}</p>
                            <p>@{u.alias}</p>
                        </div>
                        <p id="public-text">{u.uit}</p>
                    </div>
                    <div className='body-profile-media'>
                        <img src={yugi} alt=""></img>
                    </div>
                    <div className='com-like'>
                        <ul className='d-flex'>
                            <button onClick={() => setShowPublicComment(!showPublicComment)}><img src={comentar} alt=""></img> 2319</button>
                            <button><img src={like} alt=""></img> 2319</button>
                            </ul>
                        {showPublicComment ? <PublicComment/> : null}
                    </div>
                </div>
            </div>)}
            <Friends userInfo={props.userInfo.user.uid}/>
        </div>
    )

  }
}

export default Profiles;