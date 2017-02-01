Meteor.startup(function(){
	if(Schools.find().count() === 0){
		var schools = [
			{
				name: 'Albertus Magnus College',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			},
			{
				name: 'Columbia',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			},
			{
				name: 'Quinnipiac',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			},
			{
				name: 'Southern Connecticut State University',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			},
			{
				name: 'University of New Haven',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			},
			{
				name: 'Yale',
				departments: [
					{ name: 'Bioinformatics'},
					{ name: 'Biomedical Sciences'},
					{ name: 'Engineering'},
					{ name: 'Humanities'},
					{ name: 'Public Health'}
				]
			}
		];

		schools.forEach(function(school){
			var departments = school.departments;
			delete school.departments;
			var schoolId = Schools.insert(school);
			
			if(departments){
				departments.forEach(function(department){
					department.schoolId = schoolId;
					Departments.insert(department);
				});
			}
		});
	}
});