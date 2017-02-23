Students = new Mongo.Collection('students');
Advisors = new Mongo.Collection('advisors');
Schools = new Mongo.Collection('schools');
Departments = new Mongo.Collection('departments');
Ratings = new Mongo.Collection('ratings');
Feedbacks = new Mongo.Collection('feedbacks');


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
