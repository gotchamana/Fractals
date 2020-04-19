package fractal

import groovy.transform.TupleConstructor

@TupleConstructor
class Point {

	double x, y

	Point middle(Point p) {
		def midX = (this.x + p.x) / 2
		def midY = (this.y + p.y) / 2
		new Point(midX, midY)
	}

	double dist(Point p) {
		def xSqure = (x - p.x) ** 2
		def ySqure = (y - p.y) ** 2
		(xSqure + ySqure) ** 0.5
	}

	double getAt(int i) {
		if (i == 0) {
			x
		} else {
			y
		}
	}
}
