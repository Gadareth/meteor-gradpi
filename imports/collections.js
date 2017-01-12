import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';

export const Students = new Mongo.Collection('students');
export const Advisors = new Mongo.Collection('advisors');
export const Schools = new Mongo.Collection('schools');
export const Ratings = new Mongo.Collection('ratings');

var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
    stores: [imageStore]
});

Images.allow({
    insert: function() {
        return true;
    },
    update: function() {
        return true;
    },
    remove: function() {
        return true;
    },
    download: function() {
        return true;
    }
});

//Code for Unique Name and School
//Advisors.createIndex({name: 1, school: 1}, {unique: true});

// begin using Autoform to create sign up form
//
// Apprentices.attachSchema(new SimpleSchema({
//   title: {
//     type: String,
//     label: "Title",
//     max: 200
//   },
//   content: {
//     type: String,
//     label: "Content"
//   }
// }));


if (Meteor.isServer) {
    // This code runs only on server
    // Only publish apprentices that are public or belong to the current user
    // If you retain autopublish you don't need these lines.
    Meteor.publish('advisors', function() {
        return Advisors.find();
    });

    Meteor.publish('advisor', function(id) {
        return Advisors.find({
            _id: id
        });
    });

    Meteor.publish('images', function() {
        return Images.find({});
    });

    Meteor.publish('ratings', function(advisorId){
        return Ratings.find({advisorId});
    });

    Meteor.methods({
        // 'add_student'(profile, id){
        // 	Students.update(
        // 		{ "_id": id },
        // 		{ "profile": profile, createdAt: new Date() },
        // 		{ upsert: true }
        // 	);
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

            const userId = Meteor.userId();
            if(!userId || Ratings.findOne({owner:userId, advisorId})){
                throw new Meteor.Error(`You've already rated this advisor!`)
            }

            let {
                stature,
                mentorship,
                autonomy,
                resources,
                tact
            } = rating;

            return Ratings.insert({
                advisorId,
                owner: userId,
                stature,
                mentorship,
                autonomy,
                resources,
                tact,
                free_response
            });
        },

    });
}