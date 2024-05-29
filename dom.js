const formCreate = document.querySelector('#form-create');
const createInput = document.querySelector('#create-input');
const formLogin = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const notification = document.querySelector('.notification');

formLogin.addEventListener('submit', async e =>{
    e.preventDefault();
    //este fetch es para verificar que no se repitan los usuarios, entrando al array.
    const response = await fetch('http://localhost:3000/users', {method: 'GET'});
    //Aqui da los usuarios.
    const users = await response.json();
    // Aqui busca y verifica si existe un usuario.
    const user = users.find(user => user.username === loginInput.value);
   
    if (!user) {
     notification.innerHTML = 'El usuario no existe.';
     notification.classList.add('show-notification');
     setTimeout(() =>{
        notification.classList.remove('show-notification');
     }, 3000);
    } else {
        localStorage.setItem('user', JSON.stringify(user));
        //Aqui al presionar el boton ingresar te lleva a la pagina de contactos (si el ususrio existe).
        window.location.href = '../../../../../../contactos/';
    }
 });


formCreate.addEventListener('submit', async e =>{
 e.preventDefault();
 //este fetch es para verificar que no se repitan los usuarios, entrando al array.
 const response = await fetch('http://localhost:3000/users', {method: 'GET'});
 //Aqui da los usuarios.
 const users = await response.json();
 // Aqui busca y verifica si existe un usuario.
 const user = users.find(user => user.username === createInput.value);

 if (createInput.value === '') {
    notification.innerHTML = 'Debe llenar el campo para crear un usuario.';
    notification.classList.add('show-notification');
    setTimeout(() =>{
        notification.classList.remove('show-notification');
    }, 3000);
 } else if (user) {
    notification.innerHTML = 'El usuario ingresado ya existe.';
    notification.classList.add('show-notification');
    setTimeout(() =>{
        notification.classList.remove('show-notification');
    }, 3000);
 } else {
    //esto es otra forma de pasar la informacion a JSON
   await fetch('http://localhost:3000/users', {method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    //aqui es a donde se envia el contenido.
    body: JSON.stringify({username:createInput.value}),
   });
   notification.innerHTML = `Usuario ${createInput.value} creado con exito.`;
   notification.classList.add('show-notification');
   setTimeout(() =>{
        notification.classList.remove('show-notification');
    }, 3000);
    createInput.value = '';
 }
});
