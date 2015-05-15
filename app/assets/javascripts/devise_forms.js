
    var DeviseAPI = function(){
        this.loginPath = "/users/sign_in",
        this.signUpPath = "/users";
    }
    DeviseAPI.fetch = function(path, user,success,failback){

         $.ajax({
            type: 'POST',
            data: user,
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

    //this whole mess needs to be refactored
    //Create a DeviseForm class that SIgnup and SignIn forms will inherit from
    //Makes it a lot easier to work with
    //too tired to fix
    //

    //SignUpFormStuff//
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
        this.form.querySelector('#sign-up-errors').innerHTML ="";
        var user = {
            email: this.email.value,
            password: this.password.value,
            password_confirmation : this.password_confirmation.value,
            last_name : this.first_name.value,
            first_name : this.last_name.value
        };
        var data = {};
        data.user = user

        DeviseAPI.signUp(data,this.success.bind(this), this.fail.bind(this));
    }
    SignUpForm.prototype.success = function(response){
         $('#sign-up-modal').foundation('reveal', 'close');
         $('#sign-in-nav').hide();
         $('#sign-out-nav').show();
    }
    SignUpForm.prototype.fail = function(response){
        console.log(response.responseJSON);
        //Errors from devise can be response.responseJSON.error {}
        //or response.responseJSON.errors[] array depending on how many fields are messed up.
        //build an object that abstracts out the error handling but for now we just tell the use to not mess up form input
         this.form.querySelector('#sign-up-errors').innerHTML = this.alertboxText("Error occured, please validate form data before proceeding");
    }
     //stupid function because foundation alert boxes dont behave with document create element
    SignUpForm.prototype.alertboxText = function(text){
        var response =
        "<div data-alert class='alert-box alert radius'  >" + text + " </div>" ;
        //still didnt work I assume that foundations close handler happens on load.  oh well it is still red and pretty
        return response;
    }





     //SignInFormStuff//
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
         this.form.querySelector('#sign-in-errors').innerHTML = "";
        var user = {
            email: this.email.value,
            password: this.password.value,
            remember_me: 1
        };
        var data = {};
        data.user = user;
        DeviseAPI.signIn(data,this.success.bind(this), this.fail.bind(this));
    }
    SignInForm.prototype.success = function(response){
         $('#sign-in-modal').foundation('reveal', 'close');
         $('#sign-in-nav').hide();
         $('#sign-out-nav').show();
    }
    SignInForm.prototype.fail = function(response){
        console.log(response.responseJSON);
        //Errors from devise can be response.responseJSON.error {}
        //or response.responseJSON.errors[] array depending on how many fields are messed up.
        //build an object that abstracts out the error handling but for now we just tell the use to not mess up form input
        this.form.querySelector('#sign-in-errors').innerHTML = this.alertboxText("Error occured, please validate form data before proceeding");
    }
    //stupid function because foundation alert boxes dont behave with document create element
    SignInForm.prototype.alertboxText = function(text){
        var response =
        "<div data-alert class='alert-box alert radius'  >" + text + " </div>" ;
        return response;
    }



    //only load the ajax forms in the match index page
    //any other page will use the HTML response
    //this is how you would activate this ajax goodness
    // var signInForm = new SignInForm();
    // var signUpForm = new SignUpForm();
