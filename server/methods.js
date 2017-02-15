Meteor.methods({
    // 'add_student'(profile, id){
    //  Students.update(
    //      { "_id": id },
    //      { "profile": profile, createdAt: new Date() },
    //      { upsert: true }
    //  );
    // },
    'add_advisor' (formData) {
        console.log("add_advisor", formData);
        let {firstName, lastName, school, dept} = formData; 
        
        if(Advisors.findOne({firstName, lastName, school, dept})){
            throw new Meteor.Error(`Advisor is already created!`);
        }

        let schoolDoc = Schools.findOne({name: school});
        if(!schoolDoc){
            Schools.insert({name: school});
        } 
        let departmentDoc = Departments.findOne({school, name:dept});
        if(!departmentDoc){
            Departments.insert({school, name:dept});
        }

        formData.createdAt = new Date();
        formData.createdBy = Meteor.userId();

        return Advisors.insert(formData);
    },
    'rate_advisor' (advisorId, rating, free_response) {
        const advisor = Advisors.findOne({
            "_id": advisorId
        });

        if (!advisor) {
            throw new Meteor.Error(`Not found advisor with id: ${id}!`)
        }

        if (!Meteor.userId()) {
            throw new Meteor.Error(`Access denied. Must be logged in!`)
        }
        
        let {
            stature,
            mentorship,
            autonomy,
            resources,
            tact
        } = rating;

        const owner = Meteor.userId();
        const oldRating = Ratings.findOne({owner, advisorId});

        if(oldRating){
            return Ratings.update(oldRating._id, {
                $set:{
                    stature,
                    mentorship,
                    autonomy,
                    resources,
                    tact,
                    free_response
                }
            });
        } 

        return Ratings.insert({
            advisorId,
            owner,
            stature,
            mentorship,
            autonomy,
            resources,
            tact,
            free_response
        });
    },

    'advisors.update'(advisorId, formData) {
        const advisor = Advisors.findOne(advisorId); 
        if(!advisor){
            throw new Meteor.Error(404, 'Advisor not found');
        }
        if(advisor.createdBy !== Meteor.userId() ){
            throw new Meteor.Error(404, "You don't have permissions for this operation");
        }

        Advisors.update(advisorId, {$set: formData});
    },

    'clearDB'(pass) {
        if(pass === '9aGZCA27'){
            Meteor.users.remove({});
            Departments.remove({});
            Schools.remove({});
            Advisors.remove({});
            Images.remove({});
            Students.remove({});
            Ratings.remove({});
        }
    }

});