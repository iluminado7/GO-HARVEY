function iniciarMenu(){

    const navMenu = document.getElementById('nav-menu')
    const navToggle = document.getElementById('nav-toggle')
    const icon = navToggle ? navToggle.querySelector('i') : null

    if(!navMenu || !navToggle){
        console.log("Menu no encontrado aún")
        return
    }

    /* ================= TOGGLE MENU ================= */

    navToggle.addEventListener('click', () => {

        navMenu.classList.toggle('show-menu')

        if(icon){
            if(navMenu.classList.contains('show-menu')){
                icon.classList.replace('bx-menu','bx-x')
            }else{
                icon.classList.replace('bx-x','bx-menu')
            }
        }

    })

    /* ================= DROPDOWN MOBILE ================= */

    const dropdownLinks = document.querySelectorAll('.dropdown > .navLink')

    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e){

            if(window.innerWidth < 768){

                e.preventDefault()

                const dropdown = this.parentElement

                document.querySelectorAll('.dropdown').forEach(d => {
                    if(d !== dropdown){
                        d.classList.remove('open')
                    }
                })

                dropdown.classList.toggle('open')
            }

        })
    })

    /* ================= CERRAR MENU AL HACER CLICK ================= */

    const navLinks = document.querySelectorAll('.navM a')

    navLinks.forEach(link => {
        link.addEventListener('click', function(){

            if(window.innerWidth < 768){

                const isDropdownParent = this.parentElement.classList.contains('dropdown')

                if(!isDropdownParent){

                    navMenu.classList.remove('show-menu')

                    if(icon){
                        icon.classList.replace('bx-x','bx-menu')
                    }

                    document.querySelectorAll('.dropdown').forEach(d => {
                        d.classList.remove('open')
                    })
                }
            }

        })
    })
}


/* ================= SWIPER =================
   Eliminado: instanciaba un carrusel sobre '.new-swiper', un elemento que
   no existe en ninguna pagina. En las paginas que no cargaban la libreria
   tiraba "Uncaught ReferenceError: Swiper is not defined".
   Si mas adelante se agrega un carrusel, volver a cargar swiper-bundle
   (sigue en js/ y css/) e instanciarlo comprobando antes que exista:
     if (document.querySelector('.new-swiper')) new Swiper('.new-swiper', {...})
*/

