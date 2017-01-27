Meteor.methods({
    // 'add_student'(profile, id){
    //  Students.update(
    //      { "_id": id },
    //      { "profile": profile, createdAt: new Date() },
    //      { upsert: true }
    //  );
    // },
    'add_advisor' (name, school, dept, image) {
        console.log("add_advisor");
        // console.log(name);
        // console.log(school);
        //Advisors._ensureIndex('name', {unique: 1});
        if(Advisors.findOne({name, school, dept})){
            throw new Meteor.Error(`Advisor is already created!`);
        }
        return Advisors.insert({
            createdAt: new Date(),
            //owner: Meteor.userId(),
            //username: Meteor.user().username,
            name,
            school,
            dept,
            image,
            // stature: [],
            // mentorship: [],
            // autonomy: [],
            // resources: [],
            // tact: [],
            // free_response: []
        });
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