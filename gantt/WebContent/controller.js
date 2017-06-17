$(function() {
	var data
	setInterval(function() {
		$.getJSON('/gantt/mock.json', {}, function(data) {
			$(gantt_here).parse(data);
		});
	}, 1000 * 60 * 1);
});