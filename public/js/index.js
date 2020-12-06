const postList=document.querySelector(".posts");
//init materialize components 
document.addEventListener("DOMContentLoaded", function () {
    const modals=document.querySelectorAll('.modal');
    M.Modal.init(modals);
    const items =document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  });
  const setupPosts =data=>{
    if(data.length){
        let html ='';
        data.forEach(user => {
            const userD=user.data();
            console.log(userD);
            
            const li=`
            <li>
                <div class="collapsible-header grey lighten-4">${userD.nombre}</div>
                <div class="collapsible-body white">${userD.apellido}</div>
            </li>
           `;
            html+=li;
        });
        postList.innerHTML=html;
    }else{
        postList.innerHTML=`<h5 class="center-align red-text">INICIAR SESION</h5>`
    }
    
}