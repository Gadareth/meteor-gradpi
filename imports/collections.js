import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Apprentices = new Mongo.Collection('apprentices');

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
	Meteor.publish('apprentices', function() {
	return Apprentices.find({"_id": this.userId});
	})

	Meteor.methods({
	'add_apprentice'(profile){
		Apprentices.update({ "_id": Meteor.userId()  }, { "profile": profile, createdAt: new Date() }, { upsert: true });
			}
		});
}
