Template.navbar.onCreated(function(){
	let instance = this;

	this.closeLoginPopup = function(event) {
		const container = $('#login-buttons'),
			  target = $(event.target);

		if($(event.target).hasClass('additional-link') || $(event.target).hasClass('login-close-text')) return;

		if(target.is(container) || target.closest('#login-buttons').length !== 0) return 0;
        
        $('.login-close-text').trigger('click');
	}

	this.updateWindowWidth = function(event) {
		instance.windowWidth.set($(window).width());
	}

	this.windowWidth = new ReactiveVar($(window).width());
	$('body').on('click', this.closeLoginPopup);
	$(window).on('resize', this.updateWindowWidth);
});

Template.navbar.onDestroyed(function(){
	$('body').off('click', this.closeLoginPopup);
	$(window).off('resize', this.updateWindowWidth);
});

Template.navbar.helpers({
	isMobile() {
		return Template.instance().windowWidth.get() < 768;
	}
});