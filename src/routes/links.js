//Routes
const express = require('express');
const router = express.Router();

//Auth
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

//GET & POST Routes with Auth
router.get('/home', isLoggedIn, async (req, res) => {
    res.render('links/home', {
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'styles',
        documentTitle: 'HannaH - Inicio',
        headerTitle: 'Inicio',
        theme: req.user.theme
    });
});

router.get('/schedule', isLoggedIn, async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE completed = "Sin completar" AND user_id = ?', [req.user.id]);
    const completedTasks = await pool.query('SELECT * FROM tasks WHERE completed = "Completado" AND user_id = ?', [req.user.id]);
    res.render('links/schedule', {
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'styles',
        documentTitle: 'HannaH - Agenda',
        headerTitle: 'Agenda',
        tasks: () => {
            if (tasks.length > 0) {
                return tasks;
            };
        },
        tasksCompleted: () => {
            if (completedTasks.length > 0) {
                return completedTasks;
            };
        },
        theme: req.user.theme
    });
});

router.post('/schedule', isLoggedIn, async (req, res) => {
    const { title, category, date, hour, course, note, completedClass, completed, completedDetails, idTask } = req.body;
    const newTask = {
        title,
        category,
        date,
        hour,
        course,
        note,
        completedClass,
        completed,
        completedDetails,
        idTask,
        user_id: req.user.id
    }
    await pool.query('INSERT INTO tasks set ?', [newTask]);
    req.flash('success', 'Tarea creada exitosamente');
    res.redirect('/schedule');
    // const tasks = await pool.query('SELECT * FROM tasks WHERE completed = "Sin completar" AND user_id = ?', [req.user.id]);
    // const completedTasks = await pool.query('SELECT * FROM tasks WHERE completed = "Completado" AND user_id = ?', [req.user.id]);
    // res.render('links/schedule', {
    //     rendererJS: '<script defer src="/scripts/renderer.js"></script>',
    //     styles: 'styles',
    //     documentTitle: 'HannaH - Agenda',
    //     headerTitle: 'Agenda',
    //     tasks: () => {
    //         if (tasks.length > 0) {
    //             return tasks;
    //         };
    //     },
    //     tasksCompleted: () => {
    //         if (completedTasks.length > 0) {
    //             return completedTasks;
    //         };
    //     },
    //     theme: req.user.theme
    // });
});

router.get('/schedule/details/:idTask', isLoggedIn, async (req, res) => {
    let idTask = req.params.idTask;
    const task = await pool.query('SELECT * FROM tasks WHERE idTask = ? AND user_id = ?', [idTask, req.user.id]);

    if (task.length == 1) {
        const taskDetails = {
            titleTask: task[0].title,
            categoryTask: task[0].category,
            dateTask: task[0].date,
            hourTask: task[0].hour,
            courseTask: task[0].course,
            noteTask: task[0].note,
            completedClassTask: task[0].completedClass,
            completedDetailsTask: task[0].completedDetails,
            idTask: task[0].idTask
        }

        res.render('links/details', {
            rendererJS: '<script defer src="/scripts/renderer.js"></script>',
            styles: 'styles',
            documentTitle: 'HannaH - Agenda',
            headerTitle: 'Agenda - Detalles',
            taskDetails: taskDetails,
            theme: req.user.theme
        });
    } else {
        res.redirect('/schedule');
    };
});

router.get('/schedule/delete/:idTask', isLoggedIn, async (req, res) => {
    let idTask = req.params.idTask;
    const deleteTask = await pool.query('DELETE FROM tasks WHERE idTask = ? AND user_id = ?', [idTask, req.user.id]);

    if (deleteTask.affectedRows == 0) {
        res.redirect('/schedule');
    } else {
        req.flash('success', 'Tarea eliminada exitosamente');
        res.redirect('/schedule');
    };
});

router.get('/schedule/edit/:idTask', isLoggedIn, async (req, res) => {
    let idTask = req.params.idTask;
    const task = await pool.query('SELECT * FROM tasks WHERE idTask = ? AND user_id = ?', [idTask, req.user.id]);

    if (task.length == 1) {
        const [time, AmOrPm] = task[0].hour.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") {
            hours = "00";
        };
        if (hours.length < 10) {
            hours = `0${hours}`;
        };
        if (AmOrPm === "pm") {
            hours = parseInt(hours, 10) + 12;
        };
        const hour = `T${hours}:${minutes}`;
        const [day, month, year] = task[0].date.split('/');
        const date = year + '-' + month + '-' + day + hour;

        const taskEdit = {
            title: task[0].title,
            category: task[0].category,
            date: date,
            course: task[0].course,
            note: task[0].note,
            completedClass: task[0].completedClass,
            completed: task[0].completed,
            completedDetails: task[0].completedDetails,
            idTask: idTask
        };

        res.render('links/edit', {
            rendererJS: '<script defer src="/scripts/renderer.js"></script>',
            styles: 'styles',
            documentTitle: 'HannaH - Agenda',
            headerTitle: 'Agenda - Editar',
            editMode: 'true',
            task: taskEdit,
            theme: req.user.theme
        });
    } else {
        res.redirect('/schedule');
    };
});

router.post('/schedule/edit/:idTask', isLoggedIn, async (req, res) => {
    const idTask = req.params.idTask;
    const { title, category, date, hour, course, note, completedClass, completed, completedDetails} = req.body;
    
    const editTask = {
        title,
        category,
        date,
        hour,
        course,
        note,
        completedClass,
        completed,
        completedDetails
    }
    await pool.query('UPDATE tasks set ? WHERE idTask = ? AND user_id = ?', [editTask, idTask, req.user.id]);
    req.flash('success', 'Tarea actualizada exitosamente');
    res.redirect('/schedule');
});

router.post('/schedule/completedTask/:idTask', isLoggedIn, async (req, res) => {
    const idTask = req.params.idTask;
    const { completedClass, completed, completedDetails } = req.body;

    const completedTask = {
        completedClass,
        completed,
        completedDetails
    }

    await pool.query('UPDATE tasks set ? WHERE idTask = ? AND user_id = ?', [completedTask, idTask, req.user.id]);
    req.flash('success', 'Tarea actualizada exitosamente');
    res.redirect('/schedule');
});

router.get('/config', isLoggedIn, (req, res) => {
    res.render('links/config', {
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'styles',
        documentTitle: 'HannaH - Ajustes',
        headerTitle: 'Ajustes',
        theme: req.user.theme
    })
});

router.get('/config/theme', isLoggedIn, (req, res) => {
    res.render('links/configtheme', {
        rendererJS: '<script defer src="/scripts/renderer.js"></script>',
        styles: 'styles',
        documentTitle: 'HannaH - Ajustes',
        headerTitle: 'Ajustes - Apariencia',
        theme: req.user.theme,
        themeMsg: () => {
            if (req.user.theme == 'light') {
                return 'Activar modo oscuro'
            } else {
                return 'Activar modo claro'
            }
        }
    })
});

router.post('/config/theme', isLoggedIn, async (req, res) => {
    const userId = req.user.id;
    const { theme } = req.body;
    await pool.query('UPDATE users SET theme = ? WHERE id = ?', [theme, userId]);

    req.flash('success', 'Apariencia cambiada correctamente');
    res.redirect('/config/theme');
});

module.exports = router;