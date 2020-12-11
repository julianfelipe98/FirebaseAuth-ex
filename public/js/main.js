const singupForm=document.querySelector('#singup-form');
const singinForm=document.querySelector('#login-form');
const createForm=document.querySelector('#create-form');
const accountInfo=document.querySelector('#account-info');
const logOut=document.querySelector('#logout');
const googleBtn=document.querySelector('#google-auth');
const facebookBtn=document.querySelector('#facebook-auth');
const loggedOutLinks=document.querySelectorAll('.logged-out');
const loggedInLinks=document.querySelectorAll('.logged-in');
const modal1=document.querySelector('#modal1');
const modal2=document.querySelector('#modal2');
const modal3=document.querySelector('#modal3');
const modal4=document.querySelector('#modal4');

// preventDefault dont allow the default update from the form 
//create new user in firebase auth with email and password
singupForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const  email=document.querySelector('#email').value;
    const password=document.querySelector('#password').value;
    auth
        .createUserWithEmailAndPassword(email,password)
        .then(userCreedential=>{
            //write in db the user id for load custom data
            return fs.collection('userNames').doc(userCreedential.user.uid)
            .set({
                username:document.querySelector('#userName').value
            });
        }).then(()=>{
            singupForm.reset();
            console.log("Registrado")
            M.Modal.getInstance(modal1).close();

        }).catch(err=>window.alert(err))
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
        }).catch((err)=>window.alert(err))
})
//storage the post data in the db
createForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    fs.collection('users').add({
        nombre:createForm['post-field1'].value,
        apellido:createForm['post-field2'].value
    }).then(()=>{
        console.log("added");
        M.Modal.getInstance(modal3).close();
        createForm.reset();
    }).catch(err=> window.alert(err))
})
//logout
logOut.addEventListener('click',e =>{
    e.preventDefault();
    auth.signOut().then(()=>{
        console.log("signOut");
    })
})
//google auth
googleBtn.addEventListener('click',e=>{
    const provider=new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
    .then(result=>{
        return fs.collection('userNames').doc(result.user.uid)
            .set({
                username:"google account"
            });
        }).then(()=>{
            console.log("google sign in");
            M.Modal.getInstance(modal2).close();
    })
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
        fs.collection('users').onSnapshot((snapshot)=>{
            setupPosts(snapshot.docs)
            loginCheck(user);
        },err=>console.log(err))
    } else {
        setupPosts([]);
        loginCheck(user);
    }
  });