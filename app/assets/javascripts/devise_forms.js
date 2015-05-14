$(document).ready(function(){
    var DeviseAPI = function(){

    }
    DeviseAPI.signUp = function(user,callback){
        console.log(user);

        $.ajax({
            type: 'POST',
            data:{user} ,
            dataType: 'json',
            url: "/users",
            context: this
        }).done(function(response){

            console.log(response)
            if(callback)
                callback(response);
        }).fail(function(response){
            console.log(response);
        });
    }

    DeviseAPI.signIn = function(user, callback){
        console.log(user);

        $.ajax({
            type: 'POST',
            data:{user} ,
            dataType: 'json',
            url: "/users/sign_in",
            context: this
        }).done(function(response){

            console.log(response)
            if(callback)
                callback(response);
        }).fail(function(response){
            console.log(response);
        });
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

        DeviseAPI.signUp(user);
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

        DeviseAPI.signIn(user);

    }




    var signInForm = new SignInForm();
    var signUpForm = new SignUpForm();
});