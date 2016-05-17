// Router.configure({layoutTemplate: "layout"});

Router.route('/', function () {
  this.render('about');
});

Router.route('/school', function () {
  this.render('school');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/student-bio', function () {
  this.render('studentBio');
});

Router.route('/profile', function () {
  this.render('studentProfile');
});

Router.route('/find-pi', function () {
  this.render('find-pi');
});

Router.route('/choose-pi', function () {
  this.render('choose-pi');
});

Router.route('/rate-pi', function () {
  this.render('ratepi');
});

Router.route('/contact', function () {
  this.render('contact');
});

Router.route('/add-pi', function () {
  this.render('addpi');
});




