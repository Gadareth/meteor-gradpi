/*
Migrations.add({
    version: 1,
    name: 'Added universities',
    up: function() {
        Universities.insert({
            name: 'Columbia University'
        });
        
        Universities.insert({
            name: 'Yale University'
        });

        University.insert({
            name: 'Harvard'
        });


        Meteor.call('schools.update', {
            name:'Yale University Graduate School of Arts & Sciences'
        },{
            name: 'Graduate School of Arts & Sciences',
            university: 'Yale University'           
        });

        Meteor.call('schools.update', {
            name:'Columbia University Mailman School of Public Health'
        },{
            name: 'Mailman School of Public Health',
            university: 'Columbia University'           
        });

    },

});

*/