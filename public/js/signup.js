$(document).ready(function(){
    $('#signUpForm').submit(function(e){
        e.preventDefault();
        let email = $('#email').val();
        let pass = $('#pass').val();
        alert(pass)
        alert(email)
        $.ajax({
            url: `${window.location.origin}/signup`,
            type: "POST",
            headers:{
                'Content-Type': 'application/json'
              },
            body : JSON.stringify({data : {email: email.toString(), password: pass.toString()}}),
            success: function () {
                alert(1);
                console.log("old token deleted!!");
            },
            error: function(e) {
                alert(e)
            }
        })

    })
})