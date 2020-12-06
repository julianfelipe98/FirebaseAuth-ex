const singupForm=document.querySelector('#singup-form');
const singinForm=document.querySelector('#login-form');
const logOut=document.querySelector('#logout');
const googleBtn=document.querySelector('#google-auth');
const facebookBtn=document.querySelector('#facebook-auth');
const loggedOutLinks=document.querySelectorAll('.logged-out');
const loggedInLinks=document.querySelectorAll('.logged-in');
const modal1=document.querySelector('#modal1');
const modal2=document.querySelector('#modal2');
//validate nav links with session
const loginCheck=(user)=>{
    if(user){
        loggedInLinks.forEach(link=>link.style.display='block');
        loggedOutLinks.forEach(link=>link.style.display='none');
    }else{
        loggedInLinks.forEach(link=>link.style.display='none');
        loggedOutLinks.forEach(link=>link.style.display='block');
        
    }
}
// preventDefault dont allow the default update from the form 
//create new user in firebase auth
singupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  email=document.querySelector('#email').value;
    const password=document.querySelector('#password').value;
    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCreedential=>{
            singupForm.reset();
            console.log("Registrado")
            M.Modal.getInstance(modal1).close();
        }).catch((err)=>console.log(err))
})
//login with email and password user 
singinForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  email=document.querySelector('#email-login').value;
    const password=document.querySelector('#password-login').value;
    auth
        .signInWithEmailAndPassword(email,password)
        .then(userCreedential=>{
            singupForm.reset();
            M.Modal.getInstance(modal2).close();
            console.log("sesion iniciada");
        }).catch((err)=>console.log(err))
})
//logout
logOut.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("signOut");
    })
})
//posts
//user data format and inner in html file

//google auth
googleBtn.addEventListener('click',e=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        console.log("google sign in");
        M.Modal.getInstance(modal2).close();
    }).catch((err)=>console.log(err))
})
//facebook auth
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
//login validation
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