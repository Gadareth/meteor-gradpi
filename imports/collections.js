import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Students = new Mongo.Collection('students');
export const Advisors = new Mongo.Collection('advisors');
export const Schools = new Mongo.Collection('schools');

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
		return Advisors.findOne({_id: id});
	});

	Meteor.methods({
	// 'add_student'(profile, id){
	// 	Students.update(
	// 		{ "_id": id },
	// 		{ "profile": profile, createdAt: new Date() },
	// 		{ upsert: true }
	// 	);
	// },
	'add_advisor'(name,school){
		console.log("add_advisor");
		// console.log(name);
		// console.log(school);
		return Advisors.insert({
			// { "_id": id },
			createdAt: new Date(),
			owner: Meteor.userId(),
      		username: Meteor.user().username,
			name: name,
			school: school,
			stature: 0,
			mentorship: 0,
			autonomy: 0,
			resources: 0,
			tact: 0,
			free_response: null
		});
	},
	'rate_advisor'(id,s,m,a,r,t,f){
		Advisors.update(
		 	{ "_id": id },
			{$push:{
				"rating":
					{
					stature: s,
					mentorship: m,
					autonomy: a,
					resources: r,
					tact: t,
					free_response: f
					}
				}
			});
		},
	});
}
