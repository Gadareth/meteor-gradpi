Template.feedbackForm.events({
    'submit #feedback-form' (event, instance) {
        event.preventDefault();

        var form = event.currentTarget;

        let formData = {
            from: form.from.value,
            title: form.title.value,
            message: form.message.value,
        }

        //get the captcha data
        let captchaData = grecaptcha.getResponse();

        Meteor.call('feedbacks.insert', formData, captchaData, function(error, result) {
            //reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log(error);
                toastr.error(error.reason);
                return
            }
            toastr.success('Your feedback was successfully sent to us');
            FlowRouter.go('/');
        });

    }
});