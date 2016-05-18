Template.addpi.events({
	'click #submit': function(event,template) {
		event.preventDefault();
		
		advisors.insert({
			name: "name",
			school: "school",
			s: 0,
			m: 0,
			a: 0,
			r: 0,
			t: 0,
			f: null
		})
	Meteor.call('add_advisor',s,m,a,r,t,f,name,school);
	}
})