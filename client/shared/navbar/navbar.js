Template.navbar.onCreated(function(){
	this.closeLoginPopup = function(event) {
		const container = $('#login');

		if($(event.target).hasClass('additional-link') || $(event.target).hasClass('login-close-text')) return;
	    if (!container.is(event.target) && container.has(event.target).length === 0){
	        $('.login-close-text').trigger('click');
		}
	}
	$('body').on('click', this.closeLoginPopup);
});

Template.navbar.onDestroyed(function(){
	$('body').off('click', this.closeLoginPopup);
});