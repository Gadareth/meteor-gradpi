Template.addpi.events({
	'click #submit': function(event,template) {
		event.preventDefault();
		
		db.advisors.insert({
			name: "name",
			school: "school",
			s: 0,
			m: 0,
			a: 0,
			r: 0,
			t: 0
		})
	}
})