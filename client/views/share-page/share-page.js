Template.sharePage.onCreated(function() {
    const DEFAULT_NUMBER_OF_EMAIL_FIELDS = 5;
    this.emailFieldsNumber = new ReactiveVar(DEFAULT_NUMBER_OF_EMAIL_FIELDS);
});

Template.sharePage.helpers({
    emailFields() {
        let numberOfFields = Template.instance().emailFieldsNumber.get()
        return Array.from(Array(numberOfFields)); // створює масив розміру numberOfFields
    },
    // hasName() {
    //     return Meteor.user() && Meteor.user().profile && Meteor.user().profile.name;
    // }
});

Template.sharePage.events({
    'click #add-fields-btn' (event, template) {
        let currentEmailFieldsNumber = template.emailFieldsNumber.get();
        template.emailFieldsNumber.set(currentEmailFieldsNumber + 1);
    },
    'focusout input[name=share-form-email]' (event, template) {
        let elem = event.currentTarget;
        let val = elem.value;
        let regexp = /@\S+\.edu/i;
        if (val !== '') {
            if (val.search(regexp) == -1) {
                let parent = $(elem).closest('.form-group');
                $(parent).addClass('has-error');
                toastr.error('Email domain must include .edu');
                // $(parent).append('<p>Email domain must include .edu</p>');
            } else {
                let parent = $(elem).closest('.form-group');
                $(parent).removeClass('has-error');
                // $(parent).find('p').remove();
            }
        }
    },
    'submit #share-form' (event, instance) {
        event.preventDefault();
        let formData = {};

        formData['receivers'] = [];
        $("input[name=share-form-email]").each(function() {
            const $name = $(this).closest('.row').find('input[name=share-form-name]');
            let name = $name.val(),
                email = $(this).val();

            if(!name && email) {
                let parent = $name.closest('.form-group');
                $(parent).addClass('has-error');
            }

            if(!email && name) {
                let parent = $(this).closest('.form-group');
                $(parent).addClass('has-error');
            }

            if(!name || !email) {
                throw 'name or email missing';
            }

            formData['receivers'].push({
                name,
                email
            });
        });

        if ($(body).is('#share-from-senderName')) {
            formData['senderName'] = event.currentTarget.senderName.value;
        } 

        Meteor.call('sendBulkInvitations', formData, function(error){
            if(error){
                console.log(error);
                toastr.error(error.reason);
                return;
            }
            event.currentTarget.reset();
            toastr.success('Thanks for invitating your friends!');
            FlowRouter.go('home');
        });
        
        
        //let username = Meteor.user().username;
        //console.log(Meteor.user());
        //username = Meteor.user().profile.name;
        //console.log(username);

    }
})