import { Advisors } from '../../imports/collections.js';

Template.ratepi.onCreated(function ratepiOnCreated() {
	Meteor.subscribe('advisors');
	console.log(Router.current().params);
});

Template.ratepi.events({
	'click #ratingSubmit': function(event,template) {
		console.log ("rate submit clicked");
		event.preventDefault();
		var s,m,a,r,t,f;
		let s1 = template.find("#sstar-1").checked;
		let s2 = template.find("#sstar-2").checked;
		let s3 = template.find("#sstar-3").checked;
		let s4 = template.find("#sstar-4").checked;
		let s5 = template.find("#sstar-5").checked;
		if(s5) {
			s = 5;
		} 	else if(s4) {
			s = 4;
		}	else if(s3) {
			s = 3;
		}	else if(s2) {
			s = 2;
		}	else if(s1) {
			s = 1;
		}	else {
				alert("You didn't enter a rating for stature!")
		}
		let m1 = template.find("#mstar-1").checked;
		let m2 = template.find("#mstar-2").checked;
		let m3 = template.find("#mstar-3").checked;
		let m4 = template.find("#mstar-4").checked;
		let m5 = template.find("#mstar-5").checked;
		if(m5) {
			m = 5;
		} 	else if(m4) {
			m = 4;
		}	else if(m3) {
			m = 3;
		}	else if(m2) {
			m = 2;
		}	else if(m1) {
			m = 1;
		}	else {
				alert("You didn't enter a rating for mentorship!")
		}
		let a1 = template.find("#astar-1").checked;
		let a2 = template.find("#astar-2").checked;
		let a3 = template.find("#astar-3").checked;
		let a4 = template.find("#astar-4").checked;
		let a5 = template.find("#astar-5").checked;
		if(a5) {
			a = 5;
		} 	else if(a4) {
			a = 4;
		}	else if(a3) {
			a = 3;
		}	else if(a2) {
			a = 2;
		}	else if(a1) {
			a = 1;
		}	else {
				alert("You didn't enter a rating for autonomy!")
		}
		let r1 = template.find("#rstar-1").checked;
		let r2 = template.find("#rstar-2").checked;
		let r3 = template.find("#rstar-3").checked;
		let r4 = template.find("#rstar-4").checked;
		let r5 = template.find("#rstar-5").checked;
		if(r5) {
			r = 5;
		} 	else if(r4) {
			r = 4;
		}	else if(r3) {
			r = 3;
		}	else if(r2) {
			r = 2;
		}	else if(r1) {
			r = 1;
		}	else {
				alert("You didn't enter a rating for resources!")
		}
		let t1 = template.find("#tstar-1").checked;
		let t2 = template.find("#tstar-2").checked;
		let t3 = template.find("#tstar-3").checked;
		let t4 = template.find("#tstar-4").checked;
		let t5 = template.find("#tstar-5").checked;
		if(t5) {
			t = 5;
		} 	else if(t4) {
			t = 4;
		}	else if(t3) {
			t = 3;
		}	else if(t2) {
			t = 2;
		}	else if(t1) {
			t = 1;
		}	else {
				alert("You didn't enter a rating for tact!")
		}
		f = template.find("#comments").value;
		Meteor.call('rate_advisor',s,m,a,r,t,f,name,school);
		Router.go('/');
	}
});

Template.ratepi.helpers({
	thisAdvisor: function (){
		console.log(Advisors.find().count());
		let returnVar = Advisors.findOne({_id: Router.current().params.id});
		console.log(Advisors.find().fetch());
		return returnVar;
	}
});


function removeTextAreaWhiteSpace() {
	var myTxtArea = document.getElementById('#comments');
	myTxtArea.value = myTxtArea.value.replace(/^\s*|\s*$/g,'');
}

// var name = Advisors.findOne({_id:});
// name.name;
// Sessions.



// Meteor.call("api.go", payload, function(error, result) {
// 	if(error){

// 	}
// }

// advisor.rating = []

// for (var i = Things.length - 1; i >= 0; i--) {
// 	Things[i]
// };

//Step 1: route and page with professor at that route
//Step 2: create methods for inserting and updating
//
