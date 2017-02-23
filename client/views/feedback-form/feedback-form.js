Template.feedbackForm.events({
    'submit #feedback-form' (event, instance) {
        event.preventDefault();

        var form = event.currentTarget;

        let formData = {
            from: form.from.value,
            title: form.title.value,
            message: form.message.value,
        }

        if (Meteor.user()) {
            let userId = this.userId();
            formData.userId = userId;
            formData.message = formData.message + " userId:" + userId;
        }

        //get the captcha data
        let captchaData = grecaptcha.getResponse();

        Meteor.call('feedbacks.insert', formData, captchaData, function(error, result) {
            //reset the captcha
            grecaptcha.reset();

            if (error) {
                console.log(error);
            } else {
                let {
                    from,
                    title,
                    message
                } = formData;
                Meteor.call('sendEmail', 'gradpi.app@gmail.com', from, title, message);
                console.log('feedback is added');
                console.log(formData);
                FlowRouter.go('/');
            }
        });

    }
});