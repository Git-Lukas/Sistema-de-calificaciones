const formProfesores = document.querySelector('#form-profesores')

const cardProfesor = document.querySelector('.card-profesor')
const cardEstudiante = document.querySelector('.card-estudiante')

const templateProfesor = document.querySelector('.template-profesor').content
const templateEstudiante = document.querySelector('.template-estudiante').content

const alertWarning = document.querySelector('.alert')

let profesores = []
let estudiantes = []


document.addEventListener('submit', e => {
    //console.log(e.target.dataset.form);
    if(e.target.dataset.form) {
        //console.log(e.target.matches('#form-estudiantes'));
        if(e.target.matches('#form-estudiantes')) {
            profesores.map(item => {
                if(item.nombre === e.target.dataset.form){
                    e.preventDefault()
                    alertWarning.classList.add('warning')
                    const formEstudiantes = document.querySelector('#form-estudiantes')

                    const inputs = new FormData(formEstudiantes)
                    const [nombre, edad] = [...inputs.values()]

                    const estudiante = new Estudiante(nombre, edad)

                    if(!nombre.trim()) {
                        alertWarning.classList.remove('warning')
                        return
                    }

                    estudiantes.push(estudiante)

                    item.setEstudiantes = estudiante
                
                    Estudiante.mostrarEstudiante(item.getEstudiantes)
                }
            })
        }
    }
})


document.addEventListener('click', e => {
    //console.log(e.target.dataset.button);
    if(e.target.dataset.button) {

        if(e.target.matches('.aprobar-btn')){
            estudiantes.map(item => {
                if(item.uid === e.target.dataset.button) {
                    item.estado = 'Aprobado'
                }
                //console.log(item);
                return item
            })
            Estudiante.mostrarEstudiante(estudiantes)
        }   

        if(e.target.matches('.suspenso-btn')){
            estudiantes.map(item => {
                if(item.uid === e.target.dataset.button) {
                    item.estado = 'Suspenso'
                }
                //console.log(item);
                return item
            })
            Estudiante.mostrarEstudiante(estudiantes)
        }

    }
})


class Estudiante {

    constructor(nombre, edad, estado) {
        this.nombre = nombre
        this.edad = edad
        this.estado = estado
        //agregamos un id aleatorio para los botones, así los alumnos con el mismo nombre no tendrán la misma calificación
        this.uid = `${Date.now()}`
    }

    get getNombre() {
        return this.nombre
    }

    get getEdad(){
        return this.edad
    }

    agregarEstudiante() {
        const clone = templateEstudiante.cloneNode(true)

        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.edad
        clone.querySelector('.aprobar-btn').dataset.button = this.uid
        clone.querySelector('.suspenso-btn').dataset.button = this.uid
        clone.querySelector('.estado').textContent = this.estado

        return clone
    }

    static mostrarEstudiante(estudiantes) {
        cardEstudiante.textContent = ""
        const fragment = document.createDocumentFragment()

        estudiantes.forEach(estudiante => {
            fragment.appendChild(estudiante.agregarEstudiante())
        })
        cardEstudiante.classList.remove('active-card')
        cardEstudiante.appendChild(fragment)
    }


}


class Profesor extends Estudiante{

    constructor(nombre, email, estudiantes = [] ) {
        super(nombre)
        this.email = email
        this.estudiantes = estudiantes
    }

    get getEmail() {
        return this.email
    }

    set setEstudiantes(estudiantes) {
        this.estudiantes.push(estudiantes)
    }

    get getEstudiantes() {
        return this.estudiantes
    }

    agregarProfesor() {
        const clone = templateProfesor.cloneNode(true)

        clone.querySelector('h5').textContent = this.nombre
        clone.querySelector('h6').textContent = this.email
        clone.querySelector('#form-estudiantes').dataset.form = this.nombre
        
        return clone
    }

    static mostrarProfesor(profesor) {
        cardProfesor.textContent = ""
        const fragment = document.createDocumentFragment()
        // profesores.forEach(profesor => {
        //     fragment.appendChild(profesor.agregarProfesor())
        // })
        fragment.appendChild(profesor.agregarProfesor())
        cardProfesor.appendChild(fragment)
    }

}


formProfesores.addEventListener('submit', e => {
    e.preventDefault()
    cardEstudiante.classList.add('active-card')
    alertWarning.classList.add('warning')

    const inputs = new FormData(formProfesores)
    const [nombre, email] = [...inputs.values()]

    const profesor = new Profesor(nombre, email)

    //const patternEmail = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/
    //patternEmail.test(email)

    if(!nombre.trim() || !email.trim()) {
        alertWarning.classList.remove('warning')
        return
    }

    profesores.push(profesor) 

    Profesor.mostrarProfesor(profesor)

})








