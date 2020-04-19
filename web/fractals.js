function Fractals(sketch) {

	this.sierpinskiTriangle = (p1, p2, p3, level) => {
		if (level <= 0) {
			sketch.triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y);
		} else {
			var m1 = p1.middle(p2);
			var m2 = p1.middle(p3);
			var m3 = p2.middle(p3);
			level--;

			this.sierpinskiTriangle(p1, m1, m2, level);
			this.sierpinskiTriangle(p2, m1, m3, level);
			this.sierpinskiTriangle(p3, m2, m3, level);
		}
	}

	this.sierpinskiCarpet = (p, width, level) => {
		if (level <= 0) {
			sketch.rect(p.x, p.y, width, width);
		} else {
			var newWidth = width / 3;

			for (var i = 0; i < 9; i++) {
				if (i == 4) {
					continue;
				}

				var newX = p.x + newWidth * (i % 3);
				var newY = p.y + newWidth * sketch.floor(i / 3);
				this.sierpinskiCarpet(new Point(newX, newY), newWidth, level - 1);
			}
		}
	}

	this.kochCurve = (p1, p2, level) => {
		if (level <= 0) {
			sketch.line(p1.x, p1.y, p2.x, p2.y);
		} else {
			var mX1 = p1.x + (p2.x - p1.x) / 3;
			var mY1 = p1.y + (p2.y - p1.y) / 3;
			var m1 = new Point(mX1, mY1);

			var mX2 = p1.x + (p2.x - p1.x) * 2 / 3;
			var mY2 = p1.y + (p2.y - p1.y) * 2 / 3;
			var m2 = new Point(mX2, mY2);

			var edgeLength = p1.dist(p2) / 3;
			var angle = sketch.atan2(p2.y - p1.y, p2.x - p1.x) + sketch.radians(60);
			var mX3 = mX1 + edgeLength * sketch.cos(angle);
			var mY3 = mY1 + edgeLength * sketch.sin(angle);
			var m3 = new Point(mX3, mY3);

			level--;
			this.kochCurve(p1, m1, level);
			this.kochCurve(m1, m3, level);
			this.kochCurve(m3, m2, level);
			this.kochCurve(m2, p2, level);
		}
	}

	this.levyCCurve = (p1, p2, level) => {
		if (level <= 0) {
			sketch.line(p1.x, p1.y, p2.x, p2.y);
		} else {
			var edgeLength = p1.dist(p2) / sketch.pow(2, 0.5);
			var angle = sketch.atan2(p2.y - p1.y, p2.x - p1.x) + sketch.radians(45);
			var mX = p1.x + edgeLength * sketch.cos(angle);
			var mY = p1.y + edgeLength * sketch.sin(angle);
			var m = new Point(mX, mY);

			level--;
			this.levyCCurve(p1, m, level);
			this.levyCCurve(m, p2, level);
		}
	}

	this.fractalTree = (p1, p2, level) => {
		sketch.line(p1.x, p1.y, p2.x, p2.y);

		if (level > 0) {
			var trunkLength = p1.dist(p2) * 2 / 3;
			var angle = sketch.atan2(p2.y - p1.y, p2.x - p1.x) + sketch.radians(45);
			var mX1 = p2.x + trunkLength * sketch.cos(angle);
			var mY1 = p2.y + trunkLength * sketch.sin(angle);
			var m1 = new Point(mX1, mY1);

			angle = sketch.atan2(p2.y - p1.y, p2.x - p1.x) + sketch.radians(-45);
			var mX2 = p2.x + trunkLength * sketch.cos(angle);
			var mY2 = p2.y + trunkLength * sketch.sin(angle);
			var m2 = new Point(mX2, mY2);

			level--;
			this.fractalTree(p2, m1, level);
			this.fractalTree(p2, m2, level);
		}
	}
}
