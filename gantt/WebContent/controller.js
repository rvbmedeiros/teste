$(function() {
	createGantt();
	setInterval(function() {
		var cb = $(pull);
		if (cb.context.checked) {
			retrieveData();
		}
	}, 1000 * 15 * 1);
});

function retrieveData() {
	$.getJSON('/gantt/mock.json', {}, function(data) {
		gantt.parse(data);
	});
}

function createGantt() {
	$(function() {
		gantt.config.columns = [ {
			name : "text",
			label : "Task name",
			width : 150,
			resize : true,
			tree : true
		}, {
			name : "start_date",
			label : "Start time",
			resize : true,
			width : 100
		}, {
			name : "end_date",
			label : "End time",
			width : 100
		}, {
			name : "duration",
			label : "Duration",
			width : 100
		} ];
		gantt.templates.task_text = function(start, end, task) {
			return task.text;
		};
		gantt.config.scale_unit = "month";
		gantt.config.date_scale = "%F, %Y";
		var daysStyle = function(date) {
			var dateToStr = gantt.date.date_to_str("%D");
			if (dateToStr(date) == "Sun" || dateToStr(date) == "Sat")
				return "weekend";

			return "";
		};
		gantt.config.subscales = [ {
			unit : "day",
			step : 1,
			css : daysStyle,
			date : "%d"
		} ];
		gantt.config.keep_grid_width = true;
		gantt.ignore_time = function(date) {
			if (date.getDay() == 0 || date.getDay() == 6)
				return true;
		};
		gantt.config.work_time = true; // removes non-working time from
		// calculations
		gantt.skip_off_time = true; // hides non-working time in the chart
		gantt.config.autosize = "xy";
		gantt.init("gantt_here");
		retrieveData();
	});
}