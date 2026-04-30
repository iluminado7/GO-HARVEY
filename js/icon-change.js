const navMenu = document.getElementById('nav-menu')
const navToggle = document.getElementById('nav-toggle')
const icon = navToggle.querySelector('i')

navToggle.addEventListener('click', () => {

    navMenu.classList.toggle('show-menu')

    if(navMenu.classList.contains('show-menu')){
        icon.classList.remove('bx-menu')
        icon.classList.add('bx-x')
    }else{
        icon.classList.remove('bx-x')
        icon.classList.add('bx-menu')
    }

})