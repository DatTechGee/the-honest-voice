$(function () {

    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
        },
        submitSuccess: function ($form, event) {
            event.preventDefault();
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();
            var $this = $("#sendMessageButton");
            var recipientEmail = "charityyohana201@gmail.com";
            var mailSubject = encodeURIComponent(subject + " - from " + name);
            var mailBody = encodeURIComponent(
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                message
            );

            $this.prop("disabled", true);

            // Open the visitor's default email app with pre-filled details.
            window.location.href = "mailto:" + recipientEmail + "?subject=" + mailSubject + "&body=" + mailBody;

            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
            $('#success > .alert-success')
                    .append("<strong>Your email app has been opened. Please send the draft message to complete your contact request.</strong>");
            $('#success > .alert-success')
                    .append('</div>');

            $('#contactForm').trigger("reset");

            setTimeout(function () {
                $this.prop("disabled", false);
            }, 1000);
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
