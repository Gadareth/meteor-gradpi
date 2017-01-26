Template.navbar.onCreated(function(){
	this.closeLoginPopup = function(event) {
		let $el = $(event.target);
		if(!$el.closest('#login').length){
			$('.login-close-text').trigger('click');
		}
	}
	$('body').on('click', this.closeLoginPopup);
});

Template.navbar.onDestroyed(function(){
	$('body').off('click', this.closeLoginPopup);
});