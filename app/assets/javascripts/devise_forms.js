$(document).ready(function(){
    var DeviseAPI = function(){
        this.loginPath = "/users/sign_in",
        this.signUpPath = "/users";
    }
    DeviseAPI.fetch = function(path, user,success,failback){

         $.ajax({
            type: 'POST',
            data:{user} ,
            dataType: 'json',
            url: path,
            context: this
        }).done(function(response){
            console.log(arguments)
            if(success)
                success(response);
        }).fail(function(response){
            console.log(response);
            if(failback)
                failback(response);
        });
    }


    DeviseAPI.signUp = function(user,callback,failback){
        DeviseAPI.fetch("/users",user,callback,failback)
    }

    DeviseAPI.signIn = function(user, callback,failback){
        DeviseAPI.fetch("/users/sign_in",user,callback,failback)
    }




    var SignUpForm = function(){
        this.form = document.querySelector('#sign-up-form form');
        this.email = this.form.querySelector('#user_email');
        this.password = this.form.querySelector('#user_password');
        this.password_confirmation = this.form.querySelector('#user_password_confirmation');
        this.first_name = this.form.querySelector('#user_first_name');
        this.last_name = this.form.querySelector('#user_last_name');
        this.submitButton = this.form.querySelector("input[type='submit']");
        this.initialize();
    }
    SignUpForm.prototype.initialize = function(){
        this.form.addEventListener('submit', this.attemptSignIn.bind(this));
    }

    SignUpForm.prototype.attemptSignIn = function(event){
        event.preventDefault();
        var user = {
            email: this.email.value,
            password: this.password.value,
            password_confirmation : this.password_confirmation.value,
            last_name : this.first_name.value,
            first_name : this.last_name.value
        };

        DeviseAPI.signUp(user,this.success.bind(this), this.fail.bind(this));
    }
    SignUpForm.prototype.success = function(response){
         $('#sign-up-modal').foundation('reveal', 'close');
    }
    SignUpForm.prototype.fail = function(response){
        console.log(response);
    }


    var SignInForm = function(){
        this.form = document.querySelector('#sign-in-form form');
        this.email = this.form.querySelector('#user_email');
        this.password = this.form.querySelector('#user_password');
        this.remember  = this.form.querySelector('#user_remember_me');
        this.submitButton = this.form.querySelector("input[type='submit']");
        this.initialize();
    }

    SignInForm.prototype.initialize = function(){
        this.form.addEventListener('submit', this.attemptSignIn.bind(this));
    }

    SignInForm.prototype.attemptSignIn = function(event){
        event.preventDefault();
        var user = {
            email: this.email.value,
            password: this.password.value,
            remember_me: 1
        };

        DeviseAPI.signIn(user,this.success.bind(this), this.fail.bind(this));

    }
    SignInForm.prototype.success = function(response){
         $('#sign-in-modal').foundation('reveal', 'close');
    }
    SignInForm.prototype.fail = function(response){
        console.log(response);
    }

    //$('#shelter-modal').foundation('reveal', 'close');

    var signInForm = new SignInForm();
    var signUpForm = new SignUpForm();
});