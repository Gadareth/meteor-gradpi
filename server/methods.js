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
        let {name, school, dept} = formData; 
        
        if(Advisors.findOne({name, school, dept})){
            throw new Meteor.Error(`Advisor is already created!`);
        }

        let schoolId;
        let schoolDoc = Schools.findOne({name: school});

        if(!schoolDoc){
            console.log(school);
            schoolId = Schools.insert({name: school});
            Departments.insert({schoolId, name:dept});
        } else {
            schoolId = schoolDoc._id;
        }

        let departmentDoc = Departments.findOne({schoolId, name:dept});
        if(!departmentDoc){
            Departments.insert({schoolId, name:dept});
        }

        formData.createdAt = new Date();

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

});