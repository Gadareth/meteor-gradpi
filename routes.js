// Router.configure({layoutTemplate: "layout"});

Router.route('/', function () {
  // console.log('about');
  this.render('about');
});

Router.route('/schools', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('schools');
  }
});

/*Router.route('/login', function () {
  this.render('login');
});
*/

Router.route('/student-bio', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('studentBio');
  }
});

// Router.route('/profile', function () {
//   this.render('studentProfile');
// });

Router.route('/find-pi', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('findPi');
  }
});

Router.route('/choose-pi', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('choose-pi');
  }
});

Router.route('/rate-pi/:id', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('ratepi');
  }
});

Router.route('/contact', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('contact');
  }
});

Router.route('/add-pi', function () {
  if(!Meteor.userId()){
    Router.go('/');
  }
  else {
    this.render('addpi');
  }
});

// Router.route('/advisor/:id', function () {
//   this.render('advisor');
// });

Router.route('/profile/:id',{
  waitOn: function () {
  return Meteor.subscribe('images')
  },
  action: function () {
  if (this.ready())
  this.render('Profile');
  else
  this.render('Loading');
  }
});

// Add route for schools. Google URL parameters for iron router.
// Router.route('/school/:id', function (id) {
//   wait
// })

// Add routes for advisor
// Steps
// 1. Create collection for schools, fill with data
// 2. Make iron router routes for schools and advisors
// 3. Make template for school (needs helper to load lists of advisors) 
// 4. Make template for advisor
// Derek
// Make a page to choose PIs
// Create a page showing the scores/rankings of each PIs



