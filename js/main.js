var btnCreate = document.querySelector('.btn__create');
var btnSave = document.querySelector('.btn__save');
var btnCancel = document.querySelector('.btn__cancel');
var btnEdit = document.querySelector('btn__edit')
var btnDelete = document.querySelector('btn__delete')

var mainContainer = document.querySelector('.container');
var modalContainer = document.querySelector('.modal');
var taskList = document.querySelector('.tareas__lista'); 
// Elemento donde se mostrarán las tareas
var tareaContainer = document.querySelector('.tareas__container')

// Array Tareas
const tareas = []

modalContainer.style.display = 'none';

btnCreate.addEventListener('click', function() {
    modalContainer.style.display = (modalContainer.style.display === 'none') ? 'block' : 'none';
    mainContainer.style.filter =  ( mainContainer.style.filter === "blur(20px)") ? 'none' : 'blur(20px)';

    mostrarTareas();
});

btnCancel.addEventListener('click', function(){
    modalContainer.style.display = (modalContainer.style.display === 'none') ? 'block' : 'none';
    mainContainer.style.filter =  ( mainContainer.style.filter === "blur(20px)") ? 'none' : 'blur(20px)';
});

btnSave.addEventListener('click', function(){
    const nuevaTareaTexto = document.getElementById('nueva-nota-nombre').value; 

    if (nuevaTareaTexto.trim() !== '') {
        tareas.push(nuevaTareaTexto)

        document.getElementById('nueva-nota-nombre').value = ''

        mostrarTareas()

        modalContainer.style.display = (modalContainer.style.display === 'none') ? 'block' : 'none';
        mainContainer.style.filter =  ( mainContainer.style.filter === "blur(20px)") ? 'none' : 'blur(20px)';
    }
});

function mostrarTareas(){
    tareaContainer.innerHTML = '' 

    for (let i = 0; i < tareas.length; i++) { 
        const tareaTexto = tareas[i];

        const nuevoItemTarea = document.createElement('div');
        nuevoItemTarea.className = 'tareas__lista animate__animated animate__zoomIn';
        nuevoItemTarea.innerHTML = `
            <div class="tarea__input">
                <input class="tarea__check" type="checkbox">
            </div>
            <div class="tarea">
                <div class="tarea__items">
                    <label class="tarea__label">${tareaTexto}</label>
                </div>
            </div> 
            <div class="tarea__btn">
                <button class="btn__edit"></button>
                <button class="btn__delete"></button>
            </div>
        `;
        tareaContainer.appendChild(nuevoItemTarea);

        const btnEdit = nuevoItemTarea.querySelector('.btn__edit');
        const btnDelete = nuevoItemTarea.querySelector('.btn__delete');

        btnEdit.addEventListener('click', function() {
            editarTarea(i);
        });

        btnDelete.addEventListener('click', function() {
            borrarTarea(i);
        });
    }
}


function editarTarea(index) {
    const editarTextoTarea = prompt('Editar tarea:', tareas[index]);
    if (editarTextoTarea !== null) {
        tareas[index] = editarTextoTarea.trim();
        mostrarTareas();
    }
}

function borrarTarea(index) {
    if (confirm('¿Segur@ que querés eliminar esta tarea?')) {
        tareas.splice(index, 1);
        mostrarTareas();
    }
}