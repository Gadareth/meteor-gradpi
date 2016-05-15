Router.route('/', function () {
  this.render('about');
});

Router.route('/school', function () {
  this.render('school');
});

Router.route('/login', function () {
  this.render('login');
});

Router.route('/find-pi', function () {
  this.render('find-pi');
});

Router.route('/rate-pi', function () {
  this.render('rate-pi');
});

Router.route('/contact', function () {
  this.render('contact');
});

Router.route('/apprentice-bio', function () {
  this.render('apprenticeBio');
});

Router.route('/profile', function () {
  this.render('apprenticeProfileCopy');
});

Router.route('/choose-pi', function () {
  this.render('choose-pi');
});
