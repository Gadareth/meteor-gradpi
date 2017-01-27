// FlowRouter.configure({layoutTemplate: "layout"});

FlowRouter.route('/', {
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

loggedInRoutes.route('/schools', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'schools'});
    }
});

loggedInRoutes.route('/student-bio', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'studentBio'});
    }
});

loggedInRoutes.route('/find-pi', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'findPi'});
    }
});

loggedInRoutes.route('/choose-pi', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'choose-pi'});
    }
});

loggedInRoutes.route('/rate-pi/:id', {
    action: function() {
        BlazeLayout.render('mainLayout', {content:'ratepi'});
    }
});

loggedInRoutes.route('/contact', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'contact'});
    }
});

loggedInRoutes.route('/add-pi', {
    action: function(){
        BlazeLayout.render('mainLayout', {content:'addpi'});
    }
});

loggedInRoutes.route('/profile/:id', {
    // waitOn: function() {
    //     return Meteor.subscribe('images')
    // },
    action: function() {
        BlazeLayout.render('mainLayout', {content:'profile'});
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