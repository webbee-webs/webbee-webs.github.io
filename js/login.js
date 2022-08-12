/* -------------------------------------------------------------------------- */
/*                              BOTON DE INGRESO                              */
/* -------------------------------------------------------------------------- */

var submit = () => {
    let user = document.getElementById('user')
    if (user.value == "") {
        user.style.borderColor = "red"
        user.placeholder = "Campo obligatorio"
        return
    }
    let pass = document.getElementById('pass')
    if (pass.value == "") {
        pass.style.borderColor = "red"
        pass.placeholder = "Campo obligatorio"
        return
    }
    window.location.href = "./home.html"
}

/* -------------------------------------------------------------------------- */
/*                             LOG IN WITH GOOGLE                             */
/* -------------------------------------------------------------------------- */

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    window.location.href = "./home.html"
}