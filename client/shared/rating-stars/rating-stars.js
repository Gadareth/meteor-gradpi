Template.ratingStars.onRendered(function(){
	let $input = this.$('input.rating');
    //init stars plugin
    $input.removeClass('rating-loading').addClass('rating-loading').rating({
    	readonly: !!Template.currentData().readonly
    });
	//do the stars live - reactive to any changes in PI's rating
	this.autorun(()=>{
		$input.rating('update', Template.currentData().value);
	});
})