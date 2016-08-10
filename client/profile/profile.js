import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Advisors } from '../../imports/collections.js';

Template.profile.onCreated(function profileOnCreated() {
	Meteor.subscribe('advisors');
	console.log(Router.current().params);
	console.log(Advisors.find().fetch());
	console.log(Advisors.findOne({_id: Router.current().params.id}));
	
});

Template.profile.onRendered(function profileOnRendered(){
	console.log(Advisors.findOne({_id: Router.current().params.id}));
	ratings();
});
	var ratings = function(){
		console.log(Advisors.findOne({_id: Router.current().params.id}));
		let advisor = Advisors.findOne({_id: Router.current().params.id}).fetch()[0];
		let overall_ratings = {};

		//Compute average stature rating
		let s_overall = advisor.stature;
		let sum = 0;
		for(let i = 0; i < s_overall.length; i++){
			sum += s_overall[i];
		}
		if(s_overall.length > 0) {
			s_overall = sum/s_overall.length;	
		}
		else {
			s_overall = 0;
		}
		sum = 0;

		//Compute average mentorship rating
		let m_overall = advisor.mentorship;
		for(let i = 0; i < m_overall.length; i++){
			sum += m_overall[i];
		}
		if(m_overall.length > 0) {
			m_overall = sum/m_overall.length;	
		}
		else {
			m_overall = 0;
		}
		sum = 0;

		//Compute average autonomy rating
		let a_overall = advisor.autonomy;
		for(let i = 0; i < a_overall.length; i++){
			sum += a_overall[i];
		}
		if(a_overall.length > 0) {
			a_overall = sum/a_overall.length;	
		}
		else {
			a_overall = 0;
		}
		sum = 0;

		//Compute average resources rating
		let r_overall = advisor.resources;
		for(let i = 0; i < r_overall.length; i++){
			sum += r_overall[i];
		}
		if(r_overall.length > 0) {
			r_overall = sum/r_overall.length;	
		}
		else {
			r_overall = 0;
		}
		sum = 0;

		//Compute average resources rating
		let t_overall = advisor.tact;
		for(let i = 0; i < t_overall.length; i++){
			sum += t_overall[i];
		}
		if(t_overall.length > 0) {
			t_overall = sum/t_overall.length;	
		}
		else {
			t_overall = 0;
		}
		sum = 0;

		overall_ratings = {
			s:s_overall.toFixed(0),
			m:m_overall.toFixed(0),
			a:a_overall.toFixed(0),
			r:r_overall.toFixed(0),
			t:t_overall.toFixed(0), 
		};

		for(property in overall_ratings){
			switch(overall_ratings.property){
				case 1:
					document.getElementById(property+"star-"+1).click();
					break;
				case 2:
					document.getElementById(property+"star-"+2).click();
					break;
				case 3:
					document.getElementById(property+"star-"+3).click();
					break;
				case 4:
					document.getElementById(property+"star-"+4).click();
					break;
				case 5:
					document.getElementById(property+"star-"+5).click();
					break;
			}
		}
	}



Template.profile.events({
	'click button': function(event){
		Router.go("/rate-pi/"+ event.target.id);
	},
	'click': function(event){
		console.log(event.target);	
	}

});


Template.profile.helpers({
	thisAdvisor: function (){
		console.log(Advisors.find().count());
		let returnVar = Advisors.findOne({_id: Router.current().params.id});
		return returnVar;
	}
});

function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}