import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Students = new Mongo.Collection('students');
export const Advisors = new Mongo.Collection('advisors');
export const Schools = new Mongo.Collection('schools');

var imageStore = new FS.Store.GridFS('images');

Images = new FS.Collection('images', {
 	stores: [imageStore]
});

Images.allow({
	insert: function(){
		return true;
	},
	update: function(){
		return true;
	},
	remove: function(){
		return true;
	},
	download: function(){
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
		return Advisors.findOne({_id: id});
	});

	Meteor.publish('images', function() {
		return Images.find({});
	}); 

	Meteor.methods({
	// 'add_student'(profile, id){
	// 	Students.update(
	// 		{ "_id": id },
	// 		{ "profile": profile, createdAt: new Date() },
	// 		{ upsert: true }
	// 	);
	// },
	'add_advisor'(name,school,dept,image){
		console.log("add_advisor");
		// console.log(name);
		// console.log(school);
		//Advisors._ensureIndex('name', {unique: 1});
		return Advisors.insert({
			createdAt: new Date(),
			//owner: Meteor.userId(),
      		//username: Meteor.user().username,
			name: name,
			school: school,
			dept: dept,
			image: image,
			stature: [],
			mentorship: [],
			autonomy: [],
			resources: [],
			tact: [],
			free_response: []
		});
	},
	'rate_advisor'(id,s,m,a,r,t,f)
		{
			let advisor = Advisors.find({
				"_id": id
			}).fetch();
			let stature = advisor[0].stature;
			let mentorship = advisor[0].mentorship;
			let autonomy = advisor[0].autonomy;
			let resources = advisor[0].resources;
			let tact = advisor[0].tact; 
			let free_response = advisor[0].free_response;

			stature.push(s);
			mentorship.push(m);
			autonomy.push(a);
			resources.push(r);
			tact.push(t);
			free_response.push(f);

		Advisors.update(
		 	{ "_id": id },
		 	{$set:
		 		{
					stature: stature,
					mentorship: mentorship,
					autonomy: autonomy,
					resources: resources,
					tact: tact,
					free_response: free_response
					
				}
			});
		},
	});
}
