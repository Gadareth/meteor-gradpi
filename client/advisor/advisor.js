import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

import { Advisors } from '../../imports/collections.js';

// Template.advisor.onRendered(function(){
// 	let advisor = Advisors.findOne({'_id': "id"});
// 	console.log(advisor);
// 	// Get the array of rating.
// 	// let s_rating = advisors.s;
// 	// Iterate through the array.
// 	// let s_size = s_rating.length;
// 	// let s = 0;
// 	// for (let i = 0; i < s_size; i++){
// 	// 	s += rating[i].s;
// 	// }
// 	// let s_average = s/size;
// });

// Template.advisor.helpers({
// 	name: function() {
// 		return Session.get('name');
// 	},
// 	school: function() {
// 		return Session.get('school');
// 	}
// });