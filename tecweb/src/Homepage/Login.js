import "./login.css"
export default function Login() {

    return (
        <>
            <link rel="canonical" href="https://getbootstrap.com/docs/5.2/examples/album/"></link>
            <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js"
                integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
                crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js"
                integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
                crossorigin="anonymous"></script>
            <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet"></link>
            <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
            <main class="flex-shrink-0">
                <div class="container">
                    <div class="col-md-6 mx-auto p-0">
                        <div class="login-box">
                            <div class="login-snip"> <input id="tab-1" type="radio" name="tab" class="sign-in" checked></input><label for="tab-1" class="tab">Login</label> <input id="tab-2" type="radio" name="tab" class="sign-up"></input><label for="tab-2" class="tab">Registrati</label>
                                <div class="login-space">
                                    <div class="login">
                                        <div class="group"> <label for="user" class="label">Username</label> <input id="user" type="text" class="input" placeholder="Inserisci il tuo Username"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Inserisci la tua password"></input> </div>
                                        <div class="group"> <input id="check" type="checkbox" class="check" checked></input> <label for="check"><span class="icon"></span> Mantienimi connesso</label> </div>
                                        <div class="group"> <input type="submit" class="button" value="Login" id="myButton"></input> </div>
                                        <div class="foot"> <a href="#">Password dimenticata?</a> </div>

                                    </div>
                                    <div class="sign-up-form">
                                        <div class="group"> <label for="user" class="label">Username</label> <input id="user" type="text" class="input" placeholder="Crea un Username"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Inserisci una password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Ripeti Password</label> <input id="pass" type="password" class="input" data-type="password" placeholder="Ripeti la password"></input> </div>
                                        <div class="group"> <label for="pass" class="label">Indirizzo email</label> <input id="pass" type="text" class="input" placeholder="Inserisci la tua email"></input> </div>
                                        <div class="group"> <input type="submit" class="button" value="Sign Up" ></input> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}