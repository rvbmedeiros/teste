$(function() {
	createGantt();
	setInterval(function() {
		var cb = $(pull);
		if (cb.context.checked) {
			retrieveData();
		}
	}, 1000 * 60 * 1);
});

function retrieveData() {
	$.ajax({
		url : "mock.json",
		type : 'GET',
		datatype : "json",
		success : function(data) {
			gantt.parse(data);
		},
		error : function(data) {
			alert('Failed!');
		},
		beforeSend : setHeader
	});
}

function setHeader(xhr) {
	xhr.setRequestHeader('Content-Type', 'application/json');
}

function createGantt() {
	gantt.config.columns = [ {
		name : "holder",
		label : "Owner",
		width: "200",
		resize : true,
		tree : true
	}, {
		name : "duration",
		label : "Duration",
		resize : true,
		width: "140"
	} ];

	gantt.config.date_grid = "%d %M %Y, %H:%i";
	gantt.config.scale_unit = "hour";
	gantt.config.date_scale = "%H";
	gantt.config.duration_unit = "hour";
	gantt.config.duration_step = 1;

	gantt.setWorkTime({
		hours : [ 8, 12, 13, 17 ]
	});

	gantt.config.work_time = true;
	gantt.skip_off_time = true;

	gantt.templates.scale_cell_class = function(date) {
		if (date.getDay() == 0 || date.getDay() == 6) {
			return "weekend";
		}
	};
	gantt.templates.task_cell_class = function(task, date) {
		if (!gantt.isWorkTime(date))
			return "outhour";
		return "";
	};
	gantt.ignore_time = function(date) {
		if (date.getDay() == 0 || date.getDay() == 6)
			return true;
	};

	gantt.config.subscales = [ {
		unit : "day",
		step : 1,
		date : "%d %M %Y"
	} ];

	gantt.config.keep_grid_width = true;
	gantt.config.scale_height = 54;
	gantt.config.autosize = "xy";

	gantt.init("gantt_here");
	retrieveData();
}
