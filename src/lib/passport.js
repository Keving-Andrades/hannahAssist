const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database')
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {

    const query = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (query.length > 0) {
        const user = query[0];
        const validPass = await helpers.matchPass(password, user.password);
        if (validPass == true) {
            done(null, user, req.flash('success', '¡Inicio de sesión exitoso!'));
        } else {
            done(null, false, req.flash('error', 'Contraseña incorrecta'));
        };
    } else {
        return done(null, false, req.flash('error', 'El nombre de usuario no existe'))
    };
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { firstname, lastname, ci, email, cpass } = req.body;
    const query = await pool.query('SELECT * FROM users WHERE ci = ? OR username = ? OR email = ?', [ci, username, email]);

    const result = query => {
        let sql = query;
        if (sql.length == 0) {
            sql = {
                ci: false,
                username: false,
                email: false
            };
        } else {
            sql = sql[0];
        };
        return sql;
    };

    if (password == cpass) {
        if (ci !== result(query).ci) {
            if (username !== result(query).username) {
                if (!email == result(query).email) {
                    const newUser = {
                        firstname,
                        lastname,
                        ci,
                        username,
                        email,
                        password
                    };
                    newUser.password = await helpers.encryptPass(password);

                    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
                    newUser.id = result.insertId;
                    return done(null, newUser, req.flash('success', '¡Cuenta creada exitosamente!'));
                } else {
                    return done(null, false, req.flash('error', 'El correo electrónico ya existe'));
                };
            } else {
                return done(null, false, req.flash('error', 'El nombre de usuario ya existe'));
            };
        } else {
            return done(null, false, req.flash('error', 'La cédula ya existe'));
        };
    } else {
        return done(null, false, req.flash('error', 'Las contraseñas deben ser iguales'));
    };
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});