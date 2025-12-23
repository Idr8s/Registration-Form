let nme = document.getElementById('name');
let nameerror = document.getElementById('nameerror');
let pass = document.getElementById('pass');
let passerror = document.getElementById('passerror');
let form = document.getElementById('form');
let note = document.getElementById('note');
let email = document.getElementById('email');
let list = document.getElementById('list');
let confirmpass = document.getElementById('confirmpass');
let cnfirmerror = document.getElementById('cnfirmerror');

let users = JSON.parse(localStorage.getItem('users')) || [];
function save(){
    localStorage.setItem('users',JSON.stringify(users));
}

function show(){
    list.textContent = '';
    users.forEach((user, index) => {
        let li = document.createElement('li');
        li.textContent = user.name;
        list.appendChild(li);
    });
}

function checking() {
    let valid = true;

    if (nme.value.length < 3) {
        nameerror.textContent = 'Name must contain at least 3 characters';
        valid = false;
    } else {
        nameerror.textContent = '';
    }

    if (pass.value.length < 6) {
        passerror.textContent = 'Password must contain at least 6 characters';
        valid = false;
    } else {
        passerror.textContent = '';
    }
    if(confirmpass.value !== pass.value){
        cnfirmerror.textContent = "Password must be same";
        valid = false;
    }
    else{
        cnfirmerror.textContent = '';
    }

    return valid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!checking()) return;
    
    users.push({name:nme.value,email:email.value,password:pass.value});
    note.textContent = 'Submitted successfully';
    save();

    setTimeout(() => {
        form.submit(); 
    }, 1500);
});
pass.addEventListener('input',()=>{
    let value =pass.value;

    if (value.length>6 && /[A-Za-z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value)){
        passerror.textContent = 'Strong';
        passerror.style.color = 'green';

    }
    else if (value.length>=6 && /[A-Za-z]/.test(value)&&/\d/.test(value)){
        passerror.textContent = 'Medium';
        passerror.style.color = 'orange';
    }
    else if(/[A-Za-z]/.test(value) || /\d/.test(value)){
        passerror.textContent = "Weak";
    }
    else{
        passerror.textContent = '';
    }
})
show();