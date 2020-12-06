const singupForm=document.querySelector('#singup-form');
const singinForm=document.querySelector('#login-form');
const logOut=document.querySelector('#logout');
const postList=document.querySelector(".posts");
const googleBtn=document.querySelector('#google-auth');
const facebookBtn=document.querySelector('#facebook-auth');
const loggedOutLinks=document.querySelectorAll('.logged-out');
const loggedInLinks=document.querySelectorAll('.logged-in');
//vista links
const loginCheck=(user)=>{
    if(user){
        loggedInLinks.forEach(link=>link.style.display='block');
        loggedOutLinks.forEach(link=>link.style.display='none');
    }else{
        loggedInLinks.forEach(link=>link.style.display='none');
        loggedOutLinks.forEach(link=>link.style.display='block');
        
    }
}

// preventDefault no permite que los formularios se actualicen por defecto
//crea usuario de autenticacion con firebase
singupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  email=document.querySelector('#email').value;
    const password=document.querySelector('#password').value;


    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCreedential=>{
            singupForm.reset();
            console.log("Registrado")
        }).catch((err)=>console.log(err))
})
//login con usuario de firebase ya creado 
singinForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  email=document.querySelector('#email-login').value;
    const password=document.querySelector('#password-login').value;
    auth
        .signInWithEmailAndPassword(email,password)
        .then(userCreedential=>{
            singupForm.reset();
            console.log("sesion iniciada");
        }).catch((err)=>console.log(err))
})
logOut.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("signOut");
    })
})
//posts
//fromateo de informacion de firestore e inner en html 
const setupPosts =data=>{
    if(data.length){
        let html ='';
        data.forEach(user => {
            const post=user.data();
            console.log(post);
            
            const li=`
            <li>
                <div class="collapsible-header grey lighten-4">${post.nombre}</div>
                <div class="collapsible-body white"><span>${post.apellido}</span></div>
            </li>
           `;
            html+=li;
        });
        postList.innerHTML=html;
    }else{
        postList.innerHTML=`<h5 class="center-align red-text">INICIAR SESION</h5>`
    }
    
}
//google auth
googleBtn.addEventListener('click',e=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        console.log("google sign in");
    }).catch((err)=>console.log(err))
})
//facebook auth
// facebookBtn.addEventListener('click',e=>{
//     const provider=new firebase.auth.FacebookAuthProvider();
//     auth.signInWithPopup(provider)
//     .then(result=>{
//         console.log(result);
//         console.log("dacebook login");
//     }).catch(err=>console.log(err))
// })

facebookBtn.addEventListener('click', e => {
  e.preventDefault();
  singinForm.reset();
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("facebook sign in");
  })
  .catch(err => {
    console.log(err);
  })

})
//validacion de inicio de sesion 
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(user.email);
        //snapshot es donde vienen los datos de firestore
        fs.collection('users').get().then((snapshot)=>{
            setupPosts(snapshot.docs)
            loginCheck(user);
        })
    } else {
        setupPosts([]);
        loginCheck(user);
    }
  });