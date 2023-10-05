import { modal, main, btnCreate, btnSave, btnCancel, form, inputSearch, tareaContainer, fechaNota } from './variables.js';


let textoBuscado = '';

// Array contenedor de las tareas
const tareas = localStorage.getItem('tareas') ? JSON.parse(localStorage.getItem('tareas')) : [];

modal.style.display = 'none';

window.addEventListener("load", (event) => {
    mostrarTareas();
    mostrarFecha();
});

btnCreate.addEventListener('click', function() {
    modal.style.display = '';
    main.style.filter = 'blur(20px)';
});

btnCancel.addEventListener('click', function(){
    modal.style.display = 'none';
    main.style.filter = 'none';
});


// Boton Guardar
btnSave.addEventListener('click', function(){
    const nuevaTareaTexto = document.getElementById('nueva-nota-nombre').value; 

    if (nuevaTareaTexto.trim() !== '') {
        tareas.push(nuevaTareaTexto);
        document.getElementById('nueva-nota-nombre').value = '';
        localStorage.setItem('tareas', JSON.stringify(tareas));
        modal.style.display = 'none';
        main.style.filter = 'none';
        mostrarTareas();
    }
});


// Muestra las tareas guardadas
function mostrarTareas(){
    tareaContainer.innerHTML = '';

    for (let i = tareas.length - 1; i >= 0; i--) {
        const tareaTexto = tareas[i];
        const nuevoItemTarea = document.createElement('div');
        nuevoItemTarea.className = 'tareas__lista animate__animated animate__zoomIn';
        nuevoItemTarea.innerHTML = `
            <div class="tarea">
                <div class="tarea__items">
                    <label class="tarea__label">${tareaTexto}</label>
                    <input class="tarea__input-edit" type="text">
                    <button class="btn__edit"></button>
                    <button class="btn__save-edit">Guardar</buttons>
                    <button class="btn__delete"></button>
                </div>
            </div> 
        `;

        
        tareaContainer.appendChild(nuevoItemTarea);

        const btnEdit = nuevoItemTarea.querySelector('.btn__edit');
        const btnSaveEdit = nuevoItemTarea.querySelector('.btn__save-edit');
        const btnDelete = nuevoItemTarea.querySelector('.btn__delete');
        const tareaLabel = nuevoItemTarea.querySelector('.tarea__label');
        const tareaInputEdit = nuevoItemTarea.querySelector('.tarea__input-edit');
        
        btnSaveEdit.style.display = 'none';
        tareaInputEdit.style.display = 'none'

        btnEdit.addEventListener('click', function() {
            tareaLabel.style.display = 'none';
            tareaInputEdit.style.display = '';
            btnEdit.style.display = 'none';
            btnSaveEdit.style.display = '';
            tareaInputEdit.value = tareaTexto;
        });

        // Boton Editar
        btnSaveEdit.addEventListener('click', function() {
            const editarTextoTarea = tareaInputEdit.value.trim();
            if (editarTextoTarea !== '') {
                tareas[i] = editarTextoTarea;
                localStorage.setItem('tareas', JSON.stringify(tareas));
                mostrarTareas();
            }
        });

        // Boton Delete
        btnDelete.addEventListener('click', function() {
            if (confirm('¿Segur@ que querés eliminar esta tarea?')) {
                tareas.splice(i, 1);
                localStorage.setItem('tareas', JSON.stringify(tareas));
                mostrarTareas();
            }
        });
    }
}

// Busqueda por letra/nombre de cada tarea
inputSearch.addEventListener('keyup', function(){
    textoBuscado = inputSearch.value;
    const tareasCargadas = Array.from(document.querySelectorAll('.tareas__lista'));

    tareasCargadas.forEach(div => {
        const label = div.querySelector('.tarea__label');

        if (label.textContent.toLowerCase().includes(textoBuscado.toLowerCase())) {
            div.style.display = '';
        } else {
            div.style.display = 'none';
        }
    });
});

// Previene la recarga de la pagina al enviar el form
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nuevaTareaTexto = document.getElementById('nueva-nota-nombre').value;

    if (nuevaTareaTexto.trim() !== '') {
        tareas.push(nuevaTareaTexto);
        document.getElementById('nueva-nota-nombre').value = '';
        localStorage.setItem('tareas', JSON.stringify(tareas));
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('main').style.filter = 'none';
        mostrarTareas();
    }
});

// Mostrar fecha actual
function mostrarFecha(){
    let fecha = new Date();
    fecha = fecha.toString().split(" ");
    fechaNota.innerHTML = fecha[2] + " " + fecha[1] + " " + fecha[3][2] + fecha[3][3];
}