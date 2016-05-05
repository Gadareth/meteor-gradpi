
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