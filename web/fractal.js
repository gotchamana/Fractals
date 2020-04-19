var type = 0;
var level = 0;

document.addEventListener('DOMContentLoaded', function() {
	populateIterationsMenu();
	initDrawBtn();
	initSelect();

	function populateIterationsMenu() {
		var iterations = document.querySelector("select[name=iterations]");

		for (var i = 0; i < 11; i++) {
			var option = document.createElement("option");
			option.value = i;
			option.text = i;
			iterations.appendChild(option);
		}
	}

	function initDrawBtn() {
		var drawBtn = document.querySelector("button");
		drawBtn.onclick = () => {
			var iterations = document.querySelector("select[name=iterations]");
			var types = document.querySelector("select[name=fractal-type]");

			var options = iterations.options;
			var selectedOption = options[options.selectedIndex];
			level = parseInt(selectedOption.value);

			options = types.options;
			selectedOption = options[options.selectedIndex];
			type = parseInt(selectedOption.value);
		}
	}

	function initSelect() {
		var elems = document.querySelectorAll("select");
		M.FormSelect.init(elems);  
	}
});

const sketch = (s) => {

	var width = 500;
	var fractals = new Fractals(s);
	var fractalTypes = [sierpinskiTriangle, sierpinskiCarpet, kochCurve, levyCCurve, fractalTree];

	var p1 = new Point(width / 2, 0);
	var p2 = new Point(0, width);
	var p3 = new Point(width, width);
	var p4 = new Point(0, 0);
	var p5 = new Point(width / 2, width);
	var p6 = new Point(width / 2, width / 2);

	s.setup = () => {
		s.createCanvas(width, width);
	};

	s.draw = () => {
		s.background(255);
		// s.noStroke();
		s.fill(0);
		fractalTypes[type]();
	};

	function sierpinskiTriangle() {
		fractals.sierpinskiTriangle(p1, p2, p3, level);
	}

	function sierpinskiCarpet() {
		fractals.sierpinskiCarpet(p4, width, level);
	}

	function kochCurve() {
		s.translate(width / 2, width / 2);
		s.scale(0.7);
		s.translate(-width / 2, -width * 2 / 3);
		fractals.kochCurve(p1, p2, level);
		fractals.kochCurve(p3, p1, level);
		fractals.kochCurve(p2, p3, level);
	}

	function levyCCurve() {
		s.translate(width / 2, width / 2);
		s.scale(0.5);
		s.translate(-width / 2, -width / 2);
		fractals.levyCCurve(p3, p2, level);
	}

	function fractalTree() {
		s.translate(width / 2, width / 2);
		s.scale(0.6);
		s.translate(-width / 2, -width / 3);
		fractals.fractalTree(p5, p6, level);
	}
};

loadScripts(["web/fractals.js", "web/point.js", "web/p5.min.js"], () => new p5(sketch, "sketch"));

function loadScripts(urls, callback) {
	if (urls.length > 0) {
		loadScript(urls.shift(), () => loadScripts(urls, callback));
	} else {
		callback();
	}
}

function loadScript(url, callback) {
	var script = document.createElement("script");
	script.src = url;
	script.onload = callback;
	document.head.appendChild(script);
}
