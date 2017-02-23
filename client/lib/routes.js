// FlowRouter.configure({layoutTemplate: "layout"});

FlowRouter.route('/', {
    name: 'home',
    action: function(){
        BlazeLayout.render('mainLayout', {content:'about'});
    }
});

var loggedInRoutes = FlowRouter.group({
    name: 'loggedIn',
    triggersEnter: [function() {
        if (!(Meteor.loggingIn() || Meteor.userId())) {
            FlowRouter.go('/');
        }
    }]
});

// loggedInRoutes.route('/schools', {
//      name: '',    
//      action: function(){
//         BlazeLayout.render('mainLayout', {content:'schools'});
//     }
// });

// loggedInRoutes.route('/student-bio', {
//      name: '',    
//      action: function(){
//         BlazeLayout.render('mainLayout', {content:'studentBio'});
//     }
// });

loggedInRoutes.route('/advisors', {
    name: 'advisors.list',
    action: function(){
        BlazeLayout.render('mainLayout', {content:'advisorsList'});
    }
});

loggedInRoutes.route('/advisors/new', {
    name: 'advisors.new',
    action: function(){
        BlazeLayout.render('mainLayout', {content:'advisorsForm'});
    }
});

loggedInRoutes.route('/advisors/:id', {
    // waitOn: function() {
    //     return Meteor.subscribe('images')
    // },
    name: 'advisors.details',
    action: function() {
        BlazeLayout.render('mainLayout', {content:'advisorDetails'});
    }
});

// loggedInRoutes.route('/choose-pi', {
//      name: '',    
//      action: function(){
//         BlazeLayout.render('mainLayout', {content:'choose-pi'});
//     }
// });

loggedInRoutes.route('/rate-advisor/:id', {
    name: 'advisors.rate',
    action: function() {
        BlazeLayout.render('mainLayout', {content:'advisorRate'});
    }
});

loggedInRoutes.route('/contact', {
    name: 'contact',
    action: function(){
        BlazeLayout.render('mainLayout', {content:'contact'});
    }
});

loggedInRoutes.route('/logout', {
    name: 'logout',
    action() {
        Accounts.logout();
        FlowRouter.redirect('/');
    }
});
// Add route for schools. Google URL parameters for iron FlowRouter.
// FlowRouter.route('/school/:id', function (id) {
//   wait
// })

// Add routes for advisor
// Steps
// 1. Create collection for schools, fill with data
// 2. Make iron FlowRouter routes for schools and advisors
// 3. Make template for school (needs helper to load lists of advisors) 
// 4. Make template for advisor
// Derek
// Make a page to choose PIs
// Create a page showing the scores/rankings of each PIs