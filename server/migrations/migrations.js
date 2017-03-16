Migrations.add({
    version: 1,
    name: 'Added universities',
    up: function() {
        if(!Universities.findOne({name:'Columbia University'})){
            Universities.insert({
                name: 'Columbia University'
            });
        }

        if(!Universities.findOne({name:'Yale University'})){
            Universities.insert({
                name: 'Yale University'
            });
        }

        if(!Universities.findOne({name:'Harvard'})){
            Universities.insert({
                name: 'Harvard'
            });
        }
        
        Advisors.update({
            school: 'Yale University Graduate School of Arts & Sciences'
        }, {
            $set: {
                university: 'Yale University'
            }
        }, {
            multi: true
        });
        Advisors.update({
            school: 'Columbia University Mailman School of Public Health'
        }, {
            $set: {
                university: 'Columbia University'
            }
        }, {
            multi: true
        });
        Advisors.update({
            school: 'Harvard '
        }, {
            $set: {
                university: 'Harvard'
            }
        }, {
            multi: true
        });

        Departments.update({
            school: 'Yale University Graduate School of Arts & Sciences'
        }, {
            $set: {
                university: 'Yale University'
            }
        }, {
            multi: true
        });

        Departments.update({
            school: 'Columbia University Mailman School of Public Health'
        }, {
            $set: {
                university: 'Columbia University'
            }
        }, {
            multi: true
        });

        Departments.update({
            school: 'Harvard '
        }, {
            $set: {
                university: 'Harvard'
            }
        }, {
            multi: true
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

        Meteor.call('schools.update', {
            name:'Harvard '
        },{
            name: 'Medical School',
            university: 'Harvard'           
        });

    },
    
});

Migrations.add({
    version: 2,
    name: 'Changed dept key in advisors to department',
    up: function() {
        let advisors = Advisors.find().fetch();

        advisors.forEach(a=> {
            let dept = a.dept;
            Advisors.update({_id: a._id}, {
                $set: {
                    department: dept
                }, 
                $unset: {
                    dept: 1
                }
            });
        });

    },
    
});
