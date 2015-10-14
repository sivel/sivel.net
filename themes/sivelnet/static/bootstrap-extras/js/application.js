var $window = $(window);

// Disable certain links in docs
$('section [href^=#]').click(function (e) {
	e.preventDefault()
});

$('ul.pager li.disabled a').click(function (e) {
	e.preventDefault()
});


$('code').each(function(){
	if ( $(this).parent().get(0).tagName.toLowerCase() == 'pre') {
		$(this).parent().addClass("prettyprint linenums");
	} else {
		$(this).addClass("prettyprint");
	}
});
window.prettyPrint && prettyPrint();
