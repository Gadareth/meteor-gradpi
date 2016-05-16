import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Students = new Mongo.Collection('students');
export const Advisors = new Mongo.Collection('advisors');

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
	// Meteor.publish('students', function() {
	// return Students.find({"_id": 1});
	// });

	Meteor.methods({
	'add_student'(profile, id){
		Students.update({ "_id": id }, { "profile": profile, createdAt: new Date() }, { upsert: true });
			},
	'add_advisor'(profile, id){
		Advisors.update({ "_id": id }, { "profile": profile, createdAt: new Date() }, { upsert: true });
			},
	});
}
