// Variables
var btnCreate = document.querySelector('.btn__create');
var btnSave = document.querySelector('.btn__save');
var btnCancel = document.querySelector('.btn__cancel');
var btnBuscar = document.querySelector('.btn__buscar');
var tareaContainer = document.querySelector('.tareas__container');

const tareas = [];

// Event listeners
btnCreate.addEventListener('click', function() {
    // Mostrar el modal
    document.querySelector('.modal').style.display = 'block';
    document.querySelector('main').style.filter = 'blur(20px)';
    mostrarTareas();
});

btnCancel.addEventListener('click', function(){
    // Ocultar el modal
    document.querySelector('.modal').style.display = 'none';
    document.querySelector('main').style.filter = 'none';
});

btnSave.addEventListener('click', function(){
    const nuevaTareaTexto = document.getElementById('nueva-nota-nombre').value; 

    if (nuevaTareaTexto.trim() !== '') {
        // Agregar la nueva tarea al array
        tareas.push(nuevaTareaTexto);

        document.getElementById('nueva-nota-nombre').value = '';
        
        // Ocultar el modal
        document.querySelector('.modal').style.display = 'none';
        document.querySelector('main').style.filter = 'none';

        mostrarTareas();
    }
});

function mostrarTareas(){
    tareaContainer.innerHTML = '';

    for (let i = 0; i < tareas.length; i++) {
        const tareaTexto = tareas[i];

        // Crear elementos HTML para mostrar las tareas
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
            // editar la tarea
            const editarTextoTarea = prompt('Editar tarea:', tareas[i]);
            if (editarTextoTarea !== null) {
                tareas[i] = editarTextoTarea.trim();
                mostrarTareas();
            }
        });

        btnDelete.addEventListener('click', function() {
            // borrar la tarea
            if (confirm('¿Segur@ que querés eliminar esta tarea?')) {
                tareas.splice(i, 1);
                mostrarTareas();
            }
        });
    }
}

function buscarTarea(textoABuscar) {
    const resultado = tareas.filter(tarea => tarea.includes(textoABuscar));
    return resultado;
}

btnBuscar.addEventListener('click', function(){
    const textoBuscado = prompt('¿Qué tarea quieres buscar?')

    if(textoBuscado !== null){
        const resultados = buscarTarea(textoBuscado);
        console.log(resultados);
    }
});
