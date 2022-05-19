// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
        textbox.addEventListener(event, function () {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

// appStart
if (document.title == 'HannaH - Iniciar Sesión') {
    setInputFilter(document.getElementById("usernameIndex"), function (value) {
        return /^(?!\_)(?!\s)[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ]*(\_?|\s?)[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ]*$/i.test(value);
    });

    document.addEventListener('DOMContentLoaded', () => {
        alertBox();
        checkForm();
    });
}

//Register
if (document.title == 'HannaH - Registro') {
    // Install input filters.
    setInputFilter(document.getElementById("ci"), function (value) {
        return /^\d*$/.test(value);
    });
    
    setInputFilter(document.getElementById("fName"), function (value) {
        return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*$/i.test(value);
    });
    
    setInputFilter(document.getElementById("lName"), function (value) {
        return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]*$/i.test(value);
    });
    
    setInputFilter(document.getElementById("username"), function (value) {
        return /^(?!\_)(?!\s)[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ]*(\_?|\s?)[a-zA-ZÁÉÍÓÚÜÑáéíóúüñ]*$/i.test(value);
    });

    document.addEventListener('DOMContentLoaded', () => {
        alertBox();

        const registerForm = document.getElementById('signInUpForm');
        const emailForm = document.getElementById('form1');
        const emailInput = document.getElementById('email');
        const perDataForm = document.getElementById('form2');
        const userDataForm = document.getElementById('form3');
        const nextBtn = document.getElementById('signInUpBtn');
        const formNavBar = document.getElementById('formNavbar');
        const formTabs = formNavBar.children;

        emailInput.addEventListener('keyup', () => {
            if (emailInput.classList.contains('invalid') && emailInput.checkValidity() == true) {
                emailInput.classList.remove('invalid');
            };
            
            if (emailInput.checkValidity() == true) {
                if (perDataForm.querySelectorAll('input')[0].checkValidity() == true && perDataForm.querySelectorAll('input')[1].checkValidity() == true && perDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                    formTabs[1].classList.add('filled');
                } else {
                    formTabs[1].classList.add('next');
                };

                if (!formTabs[1].classList.contains('next')) {
                    if (userDataForm.querySelectorAll('input')[0].checkValidity() == true && userDataForm.querySelectorAll('input')[1].checkValidity() == true && userDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                        formTabs[2].classList.add('filled');
                    } else {
                        if (perDataForm.querySelectorAll('input')[0].value.length !== 0 && perDataForm.querySelectorAll('input')[1].value.length !== 0 && perDataForm.querySelectorAll('input')[2].value.length !== 0) {
                            formTabs[2].classList.add('next');
                        };
                    };
                };


                nextBtn.classList.add('next');
            } else {
                nextBtn.classList.remove('next');
                if (formTabs[1].classList.contains('next')) formTabs[1].classList.remove('next');
                if (formTabs[1].classList.contains('filled')) formTabs[1].classList.remove('filled');
                if (formTabs[2].classList.contains('next')) formTabs[2].classList.remove('next');
                if (formTabs[2].classList.contains('filled')) formTabs[2].classList.remove('filled');
            };
        });

        for (let i = 0; i < perDataForm.querySelectorAll('input').length; i++) {
            perDataForm.querySelectorAll('input')[i].addEventListener('keyup', () => {
                if (perDataForm.querySelectorAll('input')[i].classList.contains('invalid') && perDataForm.querySelectorAll('input')[i].checkValidity() == true) {
                    perDataForm.querySelectorAll('input')[i].classList.remove('invalid');
                };
                
                if (perDataForm.querySelectorAll('input')[0].checkValidity() == true && perDataForm.querySelectorAll('input')[1].checkValidity() == true && perDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                    if (userDataForm.querySelectorAll('input')[0].checkValidity() == true && userDataForm.querySelectorAll('input')[1].checkValidity() == true && userDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                        formTabs[2].classList.add('filled');
                    } else {
                        formTabs[2].classList.add('next');
                    };

                    nextBtn.classList.add('next');
                } else {
                    if (formTabs[2].classList.contains('next')) formTabs[2].classList.remove('next');
                    if (formTabs[2].classList.contains('filled')) formTabs[2].classList.remove('filled');
                    nextBtn.classList.remove('next');
                };
            });
        };

        for (let i = 0; i < userDataForm.querySelectorAll('input').length; i++) {
            userDataForm.querySelectorAll('input')[i].addEventListener('keyup', () => {
                if (userDataForm.querySelectorAll('input')[i].classList.contains('invalid') && userDataForm.querySelectorAll('input')[i].checkValidity() == true) {
                    userDataForm.querySelectorAll('input')[i].classList.remove('invalid');
                };
                
                if (registerForm.checkValidity() == true) {
                    nextBtn.classList.add('next');
                } else {
                    nextBtn.classList.remove('next');
                };
            });
        };

        for (let i = 0; i < formTabs.length; i++) {
            formTabs[i].addEventListener('click', (e) => {
                const visibleForm = document.querySelector('.front');

                if (formTabs[i].classList.contains('next')) {
                    if (visibleForm.children[0].innerText == '¿Cuál es tu correo electrónico?') {
                        //Ocultando a la izquierda el formulario del correo
                        emailForm.classList.remove('front');
                        emailForm.classList.add('hidden');
                        emailForm.classList.add('left');

                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            //Activando la pestaña clickeada
                            e.target.classList.add('active');
                            e.target.classList.remove('next');

                            //Pasando pestaña actual a modo "rellenado"
                            formTabs[0].classList.remove('active');
                            formTabs[0].classList.add('filled');

                            //Mostrando formulario
                            if (e.target == formTabs[2]) {
                                userDataForm.classList.remove('hidden');
                                userDataForm.classList.add('show');
                                userDataForm.classList.add('front');

                                perDataForm.classList.add('left');
                                perDataForm.classList.add('show');
                            }

                            if (e.target == formTabs[1]) {
                                perDataForm.classList.remove('hidden');
                                perDataForm.classList.add('show');
                                perDataForm.classList.add('front');
                            }
                            nextBtn.classList.remove('next');
                        }, 280);
                    };

                    if (visibleForm.children[0].innerText == 'Ingresa tus datos personales') {
                        //Ocultando a la izquierda el formulario de los datos personales
                        perDataForm.classList.remove('front');
                        perDataForm.classList.add('hidden');
                        perDataForm.classList.add('left');

                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            //Activando la pestaña clickeada
                            e.target.classList.add('active');
                            e.target.classList.remove('next');

                            //Pasando pestaña actual a modo "rellenado"
                            formTabs[1].classList.remove('active');
                            formTabs[1].classList.add('filled');

                            //Mostrando formulario
                            if (e.target == formTabs[2]) {
                                userDataForm.classList.remove('hidden');
                                userDataForm.classList.add('show');
                                userDataForm.classList.add('front');
                            }
                            nextBtn.classList.remove('next');
                        }, 280);
                    };
                };

                if (formTabs[i].classList.contains('filled')) {
                    if (visibleForm.children[0].innerText == '¿Cuál es tu correo electrónico?') {
                        //Ocultando el formulario actual
                        emailForm.classList.add('hidden');
                        emailForm.classList.add('left');
                        emailForm.classList.remove('front');
                        
                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            //Activando la pestaña clickeada
                            e.target.classList.add('active');
                            if (e.target.classList.contains('next')) e.target.classList.remove('next');
                            if (e.target.classList.contains('filled')) e.target.classList.remove('filled');

                            //Pasando pestaña actual a modo "rellenado"
                            formTabs[0].classList.remove('active');
                            formTabs[0].classList.add('filled');

                            //Mostrando formulario
                            if (e.target == formTabs[1]) {
                                perDataForm.classList.remove('hidden');
                                perDataForm.classList.add('front');
                                perDataForm.classList.add('show');
                            }

                            if (e.target == formTabs[2]) {
                                userDataForm.classList.remove('hidden');
                                userDataForm.classList.add('show'); 
                                userDataForm.classList.add('front');

                                perDataForm.classList.add('show');
                                perDataForm.classList.add('left');
                            }
                            nextBtn.classList.add('next');
                        }, 280);
                    };

                    if (visibleForm.children[0].innerText == 'Ingresa tus datos personales') {
                        //Ocultando el formulario actual
                        perDataForm.classList.add('hidden');
                        perDataForm.classList.remove('front');

                        if (e.target == formTabs[0]) {
                            perDataForm.classList.remove('show');
                        }

                        if (e.target == formTabs[2]) {
                            perDataForm.classList.add('left');
                        }
                        
                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            //Activando la pestaña clickeada
                            e.target.classList.add('active');
                            if (e.target.classList.contains('next')) e.target.classList.remove('next');
                            if (e.target.classList.contains('filled')) e.target.classList.remove('filled');

                            //Pasando pestaña actual a modo "rellenado"
                            formTabs[1].classList.remove('active');
                            if (perDataForm.querySelectorAll('input')[0].checkValidity() == true && perDataForm.querySelectorAll('input')[1].checkValidity() == true && perDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                                formTabs[1].classList.add('filled');
                            } else {
                                formTabs[1].classList.add('next');
                            }

                            //Mostrando formulario
                            if (e.target == formTabs[0]) {
                                emailForm.classList.remove('left');
                                emailForm.classList.remove('hidden');
                                emailForm.classList.add('front');
                            }

                            if (e.target == formTabs[2]) {
                                userDataForm.classList.remove('hidden');
                                userDataForm.classList.add('show');
                                userDataForm.classList.add('front');
                            }
                            nextBtn.classList.add('next');
                        }, 280);
                    };

                    if (visibleForm.children[0].innerText == 'Escoje un usuario y contraseña') {
                        //Ocultando el formulario actual
                        userDataForm.classList.add('hidden');
                        userDataForm.classList.remove('show');
                        userDataForm.classList.remove('front');
                        
                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            //Activando la pestaña clickeada
                            e.target.classList.add('active');
                            if (e.target.classList.contains('next')) e.target.classList.remove('next');
                            if (e.target.classList.contains('filled')) e.target.classList.remove('filled');

                            //Pasando pestaña actual a modo "rellenado"
                            formTabs[2].classList.remove('active');
                            if (userDataForm.querySelectorAll('input')[0].checkValidity() == true && userDataForm.querySelectorAll('input')[1].checkValidity() == true && userDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                                formTabs[2].classList.add('filled');
                            } else {
                                formTabs[2].classList.add('next');
                            }

                            //Mostrando formulario
                            if (e.target == formTabs[1]) {
                                perDataForm.classList.remove('hidden');
                                perDataForm.classList.remove('left');
                                perDataForm.classList.add('front');
                            }

                            if (e.target == formTabs[0]) {
                                perDataForm.classList.remove('left');
                                perDataForm.classList.remove('show');

                                emailForm.classList.remove('hidden');
                                emailForm.classList.remove('left');
                                emailForm.classList.add('front');
                            }
                            nextBtn.classList.add('next');
                        }, 280);
                    };
                };
            });
        };

        nextBtn.addEventListener('click', () => {
            if (nextBtn.innerText == 'Siguiente') {
                const visibleForm = document.querySelector('.front');

                if (visibleForm.children[0].innerText == '¿Cuál es tu correo electrónico?') {
                    if (emailInput.value.length == 0) {
                        emailInput.focus();
                    } else {
                        if (emailInput.checkValidity() == false) {
                            emailInput.classList.add('invalid');
                            emailInput.focus();
                        } else {
                            //Ocultando a la izquierda el formulario del correo
                            emailForm.classList.remove('front');
                            emailForm.classList.add('hidden');
                            emailForm.classList.add('left');

                            //Mostrando siguiente formulario
                            setTimeout(() => {
                                if (formTabs[1].classList.contains('filled')) {
                                    nextBtn.classList.add('next');
                                } else {
                                    nextBtn.classList.remove('next');
                                };

                                //Activando la siguiente pestaña
                                formTabs[1].classList.add('active');
                                if (formTabs[1].classList.contains('next')) formTabs[1].classList.remove('next');
                                if (formTabs[1].classList.contains('filled')) formTabs[1].classList.remove('filled');

                                //Pasando anterior pestaña a modo "rellenado"
                                formTabs[0].classList.remove('active');
                                formTabs[0].classList.add('filled');

                                //Mostrando formulario
                                perDataForm.classList.remove('hidden');
                                perDataForm.classList.add('show');
                                perDataForm.classList.add('front');
                            }, 280);
                        };
                    };
                };

                if (visibleForm.children[0].innerText == 'Ingresa tus datos personales') {
                    for (let i = 0; i < perDataForm.querySelectorAll('input').length; i++) {
                        if (perDataForm.querySelectorAll('input')[i].value.length == 0) {
                            perDataForm.querySelectorAll('input')[i].focus();
                            break;
                        } else {
                            if (perDataForm.querySelectorAll('input')[i].checkValidity() == false) {
                                perDataForm.querySelectorAll('input')[i].classList.add('invalid');
                                perDataForm.querySelectorAll('input')[i].focus();
                                break;
                            };
                        };
                    };

                    if (perDataForm.querySelectorAll('input')[0].checkValidity() == true && perDataForm.querySelectorAll('input')[1].checkValidity() == true && perDataForm.querySelectorAll('input')[2].checkValidity() == true) {
                        //Ocultando a la izquierda el formulario de datos personales
                        perDataForm.classList.remove('front');
                        perDataForm.classList.add('hidden');
                        perDataForm.classList.add('left');

                        //Mostrando siguiente formulario
                        setTimeout(() => {
                            if (formTabs[2].classList.contains('filled')) {
                                nextBtn.classList.add('next');
                            } else {
                                nextBtn.classList.remove('next');
                            };

                            //Activando la siguiente pestaña
                            formTabs[2].classList.add('active');
                            if (formTabs[2].classList.contains('next')) formTabs[2].classList.remove('next');
                            if (formTabs[2].classList.contains('filled')) formTabs[2].classList.remove('filled');

                            //Pasando anterior pestaña a modo "rellenado"
                            formTabs[1].classList.remove('active');
                            formTabs[1].classList.add('filled');

                            //Mostrando formulario
                            userDataForm.classList.remove('hidden');
                            userDataForm.classList.add('show');
                            userDataForm.classList.add('front');
                        }, 280);
                    };
                };

                if (visibleForm.children[0].innerText == 'Escoje un usuario y contraseña') {
                    for (let i = 0; i < userDataForm.querySelectorAll('input').length; i++) {
                        if (userDataForm.querySelectorAll('input')[i].value.length == 0) {
                            userDataForm.querySelectorAll('input')[i].focus();
                            break;
                        } else {
                            if (userDataForm.querySelectorAll('input')[i].checkValidity() == false) {
                                userDataForm.querySelectorAll('input')[i].classList.add('invalid');
                                userDataForm.querySelectorAll('input')[i].focus();
                                break;
                            };
                        };
                    };

                    if (registerForm.checkValidity() == true) {
                        registerForm.submit();
                    };
                };
            };
        });
    });
}

//INICIO
if (document.title == 'HannaH - Inicio') {
    document.addEventListener('DOMContentLoaded', () => {
        alertBox();
    });
};

//AGENDA
if (document.title == 'HannaH - Agenda') {
    //VARIABLES
    const selected = document.querySelector('.selectedOption');
    const optionsContainer = document.querySelector('.optionsContainer');
    const optionsList = document.querySelectorAll('.option');
    const taskBtn = document.getElementById('taskBtn');
    const taskMenu = document.getElementById('taskMenu');
    const main_cover = document.getElementById('main_cover');
    const noTask = document.getElementById('noTask');
    const taskOptsNew = document.getElementById('taskOpts__new');
    const newTaskWindow = document.getElementById('newtask');
    const newTaskWindow__denyBtn = document.getElementById('newtask__form--denyBtn');
    const newTaskWindow__acceptBtn = document.getElementById('newtask__form--acceptBtn');
    const formLeft = document.getElementById('newtask__formLeft');
    const formFront = document.getElementById('newtask__formFront');

    //Boton Flotante
    if (taskBtn !== null) {
        taskBtn.addEventListener('click', () => {
            if (!taskBtn.classList.contains('task_btn--close')) {
                taskBtn.classList.add('task_btn--close');
                taskMenu.classList.add('taskMenu--opened');
                popupOpen();
            } else {
                popupClose();
                taskBtn.classList.remove('task_btn--close');
                taskMenu.classList.remove('taskMenu--opened');
            };
        });
    }

    //Boton Crear
    if (taskOptsNew !== null) {
        taskOptsNew.addEventListener('click', () => {
            if (taskMenu.classList.contains('taskMenu--opened')) {
                if (newTaskWindow.classList.contains('newtask--hide')) {
                    newTaskWindow.classList.remove('newtask--hide');
                    hideTaskMenu();
                    taskMenu.classList.remove('taskMenu--opened');
                    taskBtn.classList.remove('task_btn--close');
                }
            };
        });
    }

    //Gestion del formulario
    let titleTask = document.getElementById('titleTask');
    let categoryTask = document.getElementById('categoryTask');
    let categoryTaskHidden = document.getElementById('categoryTask__hidden');
    let dateTask = document.getElementById('dateTask');
    let dateTaskHidden = document.getElementById('dateTask__hidden');
    let hourTaskHidden = document.getElementById('hourTask__hidden');
    let courseTask = document.getElementById('courseTask');
    let noteTask = document.getElementById('noteTask');
    let idTaskHidden = document.getElementById('idTask__hidden');

    //Gestión de las tareas
    let taskListHTML = document.getElementById('taskList');
    let taskList = []
    let taskCompletedList = []

    eventListeners();
    function eventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            showNotTask();
            taskListeners();
            showMoreDetails();
            if (newTaskWindow !== null && newTaskWindow.getAttribute('editMode') == 'true') {
                editMode();
            }

            alertBox();
        });
    }

    function editMode() {
        if (newTaskWindow.classList.contains('newtask--hide')) {
            newTaskWindow.classList.remove('newtask--hide');
            popupOpen();
        }

        newTaskWindow__acceptBtn.addEventListener('click', () => {
            if (newTaskWindow__acceptBtn.innerHTML == 'Siguiente') {
                if (titleTask.value == '' || categoryTask.innerHTML == 'Seleccionar' || dateTask.value == '') {
                    if (titleTask.value == '') {
                        titleTask.classList.add('invalid');
                    } else {
                        titleTask.classList.remove('invalid');
                    };

                    if (categoryTask.innerHTML == 'Seleccionar') {
                        categoryTask.classList.add('invalid');
                        optionsContainer.classList.add('invalid');
                    } else {
                        categoryTask.classList.remove('invalid');
                        optionsContainer.classList.remove('invalid');
                    };

                    if (dateTask.value == '') {
                        dateTask.classList.add('invalid');
                    } else {
                        dateTask.classList.remove('invalid');
                    };

                } else {
                    //Validando campos y pasando al siguiente formulario
                    titleTask.classList.remove('invalid');
                    categoryTask.classList.remove('invalid');
                    dateTask.classList.remove('invalid');

                    formLeft.classList.add('toLeft');
                    formFront.classList.add('toFront');
                    newTaskWindow__acceptBtn.innerHTML = 'Aceptar';
                    newTaskWindow__denyBtn.innerHTML = 'Atrás';
                };
            } else {
                // Formateando valores de la fecha a uno legible
                let dayTaskCard = dateTask.value.split('-')[2].split('T')[0];
                let monthTaskCard = dateTask.value.split('-')[1];
                let yearTaskCard = dateTask.value.split('-')[0];
                //Armando fecha con los valores formateados
                dateTaskHidden.value = dayTaskCard + '/' + monthTaskCard + '/' + yearTaskCard;

                // Formateando y transformando hora de 24 a 12
                let hourTaskCard = dateTask.value.split('-')[2].split('T')[1];
                let hora = parseInt(hourTaskCard.split(':')[0]);
                let minutos = hourTaskCard.split(':')[1];
                let AmOrPm = hora >= 12 ? 'pm' : 'am';
                hora = (hora % 12) || 12;
                hourTaskHidden.value = hora + ':' + minutos + ' ' + AmOrPm;

                courseTask.value = courseTask.value || 'Sin asignatura';
                noteTask.value = noteTask.value || 'Sin nota';
                categoryTaskHidden.value = categoryTask.innerHTML;
                document.getElementById('formTask').submit();
            };
        })

        //Boton cancelar/atras en ventana de crear
        newTaskWindow__denyBtn.addEventListener('click', () => {
            if (newTaskWindow__denyBtn.innerHTML == 'Atrás') {
                formLeft.classList.remove('toLeft');
                formFront.classList.remove('toFront');
                newTaskWindow__acceptBtn.innerHTML = 'Siguiente';
                newTaskWindow__denyBtn.innerHTML = 'Cancelar';
            } else {
                if (titleTask.classList.contains('invalid')) {
                    titleTask.classList.remove('invalid');
                };

                if (categoryTask.classList.contains('invalid')) {
                    categoryTask.classList.remove('invalid');
                    optionsContainer.classList.remove('invalid');
                };

                if (dateTask.classList.contains('invalid')) {
                    dateTask.classList.remove('invalid');
                };

                window.location.href = '/schedule';
            };
        });
    };

    function taskListeners() {
        let tasks = document.querySelectorAll('.taskCard');

        tasks.forEach((e) => {
            e.addEventListener('click', () => {
                let idTask = e.getAttribute('taskid');
                window.location.href = `schedule/details/${idTask}`;
            });
        });
    };

    function showMoreDetails() {
        const moreDetailWindow = document.getElementById('moreDetailsTask');
        if (moreDetailWindow !== null) {
            const idTask = moreDetailWindow.getAttribute('idTask');
            const moreDetailsContentTop = document.getElementById('moreDetails__content--top');
            const threeDotsOpenMenu = document.getElementById('moreDetails__topRightContent--svg');
            const completedButton = document.getElementById('moreDetails__bottom--completedButton');
            const completedClassHidden = document.getElementById('completedClass__hidden');
            const completedHidden = document.getElementById('completed__hidden');
            const completedDetailsHidden = document.getElementById('completedDetails__hidden');
            const completedTaskForm = document.getElementById('completedTaskForm');

            setTimeout(function () {
                moreDetailWindow.classList.add('front');
                popupOpen();
            }, 50)

            completedButton.addEventListener('click', () => {
                const completedText = document.getElementById('moreDetails__completedButton--Completed');

                if (completedText.innerHTML == 'Completar') {
                    completedText.innerHTML = 'Completado';

                    completedClassHidden.value = 'completed';
                    completedHidden.value = 'Completado';
                    completedDetailsHidden.value = 'Completado';

                    if (!completedButton.classList.contains('completed')) {
                        completedButton.classList.add('completed');
                        completedButton.classList.remove('uncompleted');
                    };

                    setTimeout(() => {
                        completedTaskForm.submit();
                    }, 300);
                } else {
                    completedText.innerHTML = 'Completar';

                    completedDetailsHidden.value = 'Completar';
                    completedClassHidden.value = 'uncompleted';
                    completedHidden.value = 'Sin completar';

                    if (completedButton.classList.contains('completed')) {
                        completedButton.classList.remove('completed');
                        completedButton.classList.add('uncompleted');
                    };

                    setTimeout(() => {
                        completedTaskForm.submit();
                    }, 300);
                };
            });

            threeDotsOpenMenu.addEventListener('click', () => {
                if (document.getElementById('moreDetails__moreMenu') == null && document.getElementById('moreDetailsCover') == null) {
                    moreDetailWindow.insertAdjacentHTML('afterbegin', `<div id="moreDetailsCover" class="moreDetailsCover"></div>`);
                    moreDetailsContentTop.insertAdjacentHTML('beforeend', `<div id="moreDetails__moreMenu" class="moreDetails__moreMenu"><div id="moreDetails__moreMenu--container" class="moreDetails__moreMenu--container"><div id="moreDetails__moreMenu--content" class="moreDetails__moreMenu--content"></div></div></div>`);
                    const moreDetailsMoreMenuContent = document.getElementById('moreDetails__moreMenu--content');

                    setTimeout(function () {
                        document.getElementById('moreDetailsCover').classList.add('darker');
                        document.getElementById('moreDetails__moreMenu').classList.add('show');
                        setTimeout(function () {
                            document.getElementById('moreDetails__moreMenu').classList.add('opened');
                        }, 550)
                    }, 1);

                    moreDetailsMoreMenuContent.insertAdjacentHTML('beforeend', `<span id="moreDetails__moreMenuContent--delete" class="moreDetails__moreMenuContent--delete">Eliminar</span>`);
                    moreDetailsMoreMenuContent.insertAdjacentHTML('beforeend', `<span class="moreDetails__moreMenuContent--separator"></span>`);
                    moreDetailsMoreMenuContent.insertAdjacentHTML('beforeend', `<span id="moreDetails__moreMenuContent--edit" class="moreDetails__moreMenuContent--edit">Editar</span>`);
                    moreDetailsMoreMenuContent.insertAdjacentHTML('beforeend', `<span class="moreDetails__moreMenuContent--separator"></span>`);
                    moreDetailsMoreMenuContent.insertAdjacentHTML('beforeend', `<span id="moreDetails__moreMenuContent--close" class="moreDetails__moreMenuContent--close">Cerrar</span>`);
                    const moreDetailsMoreMenuContentClose = document.getElementById('moreDetails__moreMenuContent--close');
                    const moreDetailsMoreMenuContentEdit = document.getElementById('moreDetails__moreMenuContent--edit');
                    const moreDetailsMoreMenuContentDelete = document.getElementById('moreDetails__moreMenuContent--delete');

                    moreDetailsMoreMenuContentDelete.addEventListener('click', () => {
                        closeMoreMenu();
                        setTimeout(function () {
                            moreDetailWindow.classList.remove('front');
                        }, 500);
                        setTimeout(function () {
                            popupClose();
                            setTimeout(() => {
                                window.location.href = `/schedule/delete/${idTask}`;
                            }, 100);
                        }, 800);
                    });

                    moreDetailsMoreMenuContentEdit.addEventListener('click', () => {
                        closeMoreMenu();
                        setTimeout(function () {
                            moreDetailWindow.classList.remove('front');
                        }, 500);
                        setTimeout(function () {
                            popupClose();
                            setTimeout(() => {
                                window.location.href = `/schedule/edit/${idTask}`;
                            }, 100);
                        }, 800);
                    });

                    moreDetailsMoreMenuContentClose.addEventListener('click', () => {
                        closeMoreMenu();
                        setTimeout(function () {
                            moreDetailWindow.classList.remove('front');
                        }, 500);
                        setTimeout(function () {
                            popupClose();
                            setTimeout(() => {
                                window.location.href = '/schedule';
                            }, 100);
                        }, 800);
                    })

                    //Para cerrar el menu eliminar y cerrar
                    moreDetailWindow.addEventListener('click', function (e) {
                        if (document.getElementById('moreDetailsCover') != null && document.getElementById('moreDetails__moreMenu') != null && document.getElementById('moreDetails__moreMenu').classList.contains('opened')) {
                            if (document.getElementById('moreDetails__moreMenu').contains(e.target) == false) {
                                closeMoreMenu();
                                moreDetailWindow.removeEventListener('click', arguments.callee);
                            };
                        };
                    });

                    function closeMoreMenu() {
                        document.getElementById('moreDetails__moreMenu').classList.remove('show');
                        document.getElementById('moreDetailsCover').classList.remove('darker');
                        setTimeout(function () {
                            document.getElementById('moreDetails__moreMenu').remove();
                        }, 400);
                        setTimeout(function () {
                            if (document.getElementById('moreDetailsCover') != null) {
                                document.getElementById('moreDetailsCover').remove();
                            }
                        }, 600);
                    };
                };
            });
        };
    };

    function showNotTask() {
        if (taskListHTML !== null && taskListHTML.childNodes.length == 0 && noTask !== null) { //SI NO HAY TAREAS, MOSTRAR MENSAJE "NO HAY TAREAS"
            noTask.classList.add('show'); // MENSAJE "NO HAY TAREAS"
        }
    }

    function popupOpen() {
        main_cover.classList.add('darker');
        if (noTask !== null && noTask.classList.contains('show')) {
            noTask.classList.remove('show'); // MENSAJE DE NO HAY TAREAS
        }
    }

    function popupClose() {
        main_cover.classList.remove('darker');
        showNotTask();
    }
    
    function hideTaskMenu() {
        taskMenu.classList.add('taskMenu--hide');
    }

    function showTaskMenu() {
        taskMenu.classList.remove('taskMenu--hide');
    }

    //Boton siguiente/aceptar en ventana de crear
    if (newTaskWindow__acceptBtn !== null && (newTaskWindow.getAttribute('editmode') == null || newTaskWindow.getAttribute('editmode') == undefined)) {
        newTaskWindow__acceptBtn.addEventListener('click', () => {

            if (newTaskWindow__acceptBtn.innerHTML == 'Siguiente') {
                if (titleTask.value == '' || categoryTask.innerHTML == 'Seleccionar' || dateTask.value == '') {
                    if (titleTask.value == '') {
                        titleTask.classList.add('invalid');
                    } else {
                        titleTask.classList.remove('invalid');
                    };
    
                    if (categoryTask.innerHTML == 'Seleccionar') {
                        categoryTask.classList.add('invalid');
                        optionsContainer.classList.add('invalid');
                    } else {
                        categoryTask.classList.remove('invalid');
                        optionsContainer.classList.remove('invalid');
                    };
    
                    if (dateTask.value == '') {
                        dateTask.classList.add('invalid');
                    } else {
                        dateTask.classList.remove('invalid');
                    };
                } else {
                    //Validando campos y pasando al siguiente formulario
                    titleTask.classList.remove('invalid');
                    categoryTask.classList.remove('invalid');
                    dateTask.classList.remove('invalid');
                    
                    formLeft.classList.add('toLeft');
                    formFront.classList.add('toFront');
                    newTaskWindow__acceptBtn.innerHTML = 'Aceptar';
                    newTaskWindow__denyBtn.innerHTML = 'Atrás';
                };
            } else {
                // Formateando valores de la fecha a uno legible
                let dayTaskCard = dateTask.value.split('-')[2].split('T')[0];
                let monthTaskCard = dateTask.value.split('-')[1];
                let yearTaskCard = dateTask.value.split('-')[0];
                //Armando fecha con los valores formateados
                dateTaskHidden.value = dayTaskCard + '/' + monthTaskCard + '/' + yearTaskCard;
    
                // Formateando y transformando hora de 24 a 12
                let hourTaskCard = dateTask.value.split('-')[2].split('T')[1];
                let hora = parseInt(hourTaskCard.split(':')[0]);
                let minutos = hourTaskCard.split(':')[1];
                let AmOrPm = hora >= 12 ? 'pm' : 'am';
                hora = (hora % 12) || 12;
                hourTaskHidden.value = hora + ':' + minutos + ' ' + AmOrPm;
                
                courseTask.value = courseTask.value || 'Sin asignatura';
                noteTask.value = noteTask.value || 'Sin nota';
                categoryTaskHidden.value = categoryTask.innerHTML;
                idTaskHidden.value = Date.now();
                document.getElementById('formTask').submit();
    
                //Cerrando ventana de crear
                if (!newTaskWindow.classList.contains('newtask--hide')) {
                    popupClose();
                    newTaskWindow.classList.add('newtask--hide');
                    taskMenu.classList.remove('taskMenu--opened');
                    taskMenu.classList.remove('taskMenu--hide');
                };
    
                setTimeout(function() {
                    //Reseteando valores
                    titleTask.value = '';
                    categoryTask.innerHTML = 'Seleccionar';
                    dateTask.value = '';
                    courseTask.value = ''
                    noteTask.value = ''
    
                    formLeft.classList.remove('toLeft');
                    formFront.classList.remove('toFront');
                    newTaskWindow__acceptBtn.innerHTML = 'Siguiente';
                    newTaskWindow__denyBtn.innerHTML = 'Cancelar';
                }, 250)
            };
        })
    }

    //Boton cancelar/atras en ventana de crear
    if (newTaskWindow__denyBtn !== null && (newTaskWindow.getAttribute('editmode') == null || newTaskWindow.getAttribute('editmode') == undefined)) {
        newTaskWindow__denyBtn.addEventListener('click', () => {

            if (newTaskWindow__denyBtn.innerHTML == 'Atrás') {
                formLeft.classList.remove('toLeft');
                formFront.classList.remove('toFront');
                newTaskWindow__acceptBtn.innerHTML = 'Siguiente';
                newTaskWindow__denyBtn.innerHTML = 'Cancelar';
            } else {
                if (titleTask.classList.contains('invalid')) {
                    titleTask.classList.remove('invalid');
                };
    
                if (categoryTask.classList.contains('invalid')) {
                    categoryTask.classList.remove('invalid');
                    optionsContainer.classList.remove('invalid');
                };
    
                if (dateTask.classList.contains('invalid')) {
                    dateTask.classList.remove('invalid');
                };
    
                //Reseteando valores
                setTimeout(function() {
                    titleTask.value = '';
                    categoryTask.innerHTML = 'Seleccionar';
                    dateTask.value = '';
                }, 250)
    
                //Cerrando ventana de crear
                if (!newTaskWindow.classList.contains('newtask--hide')) {
                    popupClose();
                    newTaskWindow.classList.add('newtask--hide');
                    taskMenu.classList.remove('taskMenu--opened');
                    taskMenu.classList.remove('taskMenu--hide');
                };
            };
        })
    }

    //Lista para seleccionar categoria
    if (selected) {
        selected.addEventListener('click', () => {
            if (categoryTask.classList.contains('invalid')) {
                optionsContainer.classList.toggle('ecActive');
            } else {
                optionsContainer.classList.toggle('ecActive');
            };

        });
    };

    optionsList.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerHTML = option.querySelector('label').innerHTML;
            if (categoryTask.innerHTML != 'Seleccionar' & categoryTask.classList.contains('invalid')) {
                categoryTask.classList.remove('invalid');
                optionsContainer.classList.remove('invalid');
            };
            optionsContainer.classList.remove('ecActive');
        });
    });

    //Fecha
    if (document.getElementById('dateTask') !== null) {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd;
        }

        if (mm < 10) {
            mm = '0' + mm;
        }

        today = yyyy + '-' + mm + '-' + dd + 'T00:00';
        maxdate = yyyy + 5 + '-' + mm + '-' + dd + 'T23:59';
        document.getElementById("dateTask").setAttribute("min", today);
        document.getElementById("dateTask").setAttribute("max", maxdate);
    };
};

//AJUSTES
if (document.getElementById("dark_mode") !== null) {

    document.addEventListener('DOMContentLoaded', () => {
        alertBox();

        document.getElementById("dark_mode").addEventListener("click", () => {
            const formTheme = document.getElementById('formTheme');
            const themeSetting = document.getElementById('themeSetting');

            if (document.documentElement.classList.contains("light")) {

                document.documentElement.classList.remove("light");
                document.documentElement.classList.add("dark");
                document.getElementById("dark_mode_msg").innerText = 'Activar modo claro';
                themeSetting.value = "dark";
                setTimeout(() => {
                    formTheme.submit();
                }, 400);
                
            } else {

                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
                document.getElementById("dark_mode_msg").innerText = 'Activar modo oscuro';
                themeSetting.value = "light";
                setTimeout(() => {
                    formTheme.submit();
                }, 400);

            }

        });

    });
};

//OPEN AND CLOSE MENU_SIDE
if (document.getElementById('menu_side') != null) {

    setTimeout(function() {
        if (document.body.classList.contains('preload')) {
            document.body.classList.remove('preload');
        };
    }, 500);
    
    document.getElementById("toggle_menu").addEventListener('click', () => {
        let closed_menu = menu_side.classList.contains('menu_closed')
        if (closed_menu == true) {
            body_cover.classList.add('darker');
            menu_side.classList.remove("menu_closed");
            setTimeout(function () {
                menu_side.classList.add("menu_opened");
            }, 550);
        };
    });
    
    document.addEventListener('click', function(e){
        if (menu_side.classList.contains('menu_opened')) {
            if (document.getElementById('menu_side').contains(e.target) == false) {
                menu_side.classList.add("menu_closed");
                body_cover.classList.remove('darker');
                menu_side.classList.remove("menu_opened");
            };
        };
    });
};

function alertBox() {
    const alertBox = document.querySelector('.alertBox');
    const alertBoxCloseBtn = document.querySelector('.alertBox__container--close');

    if (alertBox !== null) {
        alertBoxCloseBtn.addEventListener('click', () => {
            closeAlertBox();
        })

        setTimeout(() => {
            alertBox.classList.add('show');
        }, 100);

        setTimeout(() => {
            closeAlertBox();
        }, 7200);

        const closeAlertBox = () => {
            alertBox.classList.remove('show');
            setTimeout(() => {
                alertBox.remove();
            }, 200);
        };
    };
};

function checkForm() {
    const signInForm = document.getElementById('signInUpForm');
    const signInBtn = document.getElementById('signInUpBtn');

    for (let i = 0; i < signInForm.elements.length; i++) {
        signInForm.elements[i].addEventListener('keyup', () => {
            if (signInForm.checkValidity() == true) {
                signInBtn.classList.add('next');
            } else {
                signInBtn.classList.remove('next');
            };
        });
    };

    signInBtn.addEventListener('click', () => {
        if (signInBtn.classList.contains('next')) {
            signInForm.submit();
        } else {
            for (let i = 0; i < signInForm.elements.length; i++) {
                if (signInForm[i].value.length == 0 || signInForm[i].checkValidity() == false) {
                    signInForm[i].focus();
                    break;
                };
            };
        };
    });
};