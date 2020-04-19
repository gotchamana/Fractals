package fractal

import groovy.transform.TupleConstructor
import processing.core.PApplet
import static java.lang.Math.*

@TupleConstructor
class Fractals {
	
	final PApplet parent

	void sierpinskiTriangle(Point p1, Point p2, Point p3, int level) {
		if (level <= 0) {
			triangle(p1, p2, p3)
		} else {
			def m1 = p1.middle(p2)
			def m2 = p1.middle(p3)
			def m3 = p2.middle(p3)
			level--

			sierpinskiTriangle(p1, m1, m2, level)
			sierpinskiTriangle(p2, m1, m3, level)
			sierpinskiTriangle(p3, m2, m3, level)
		}
	}

	void sierpinskiCarpet(Point p, double width, int level) {
		if (level <= 0) {
			rect(p, width, width)
		} else {
			def newWidth = width / 3

			for (i in 0..<9) {
				if (i == 4) {
					continue
				}

				def newX = p.x + newWidth * (i % 3)
				def newY = p.y + newWidth * i.intdiv(3)
				sierpinskiCarpet(new Point(newX, newY), newWidth, level - 1)
			}
		}
	}

	void kochCurve(Point p1, Point p2, int level, boolean direction) {
		if (direction) {
			kochCurve(p2, p1, level)
		} else {
			kochCurve(p1, p2, level)
		}

	}

	void kochCurve(Point p1, Point p2, int level) {
		if (level <= 0) {
			line(p1, p2)
		} else {
			def mX1 = p1.x + (p2.x - p1.x) / 3
			def mY1 = p1.y + (p2.y - p1.y) / 3
			def m1 = new Point(mX1, mY1)

			def mX2 = p1.x + (p2.x - p1.x) * 2 / 3
			def mY2 = p1.y + (p2.y - p1.y) * 2 / 3
			def m2 = new Point(mX2, mY2)

			def edgeLength = p1.dist(p2) / 3
			def angle = atan2(p2.y - p1.y, p2.x - p1.x) + radians(60)
			def mX3 = mX1 + edgeLength * cos(angle)
			def mY3 = mY1 + edgeLength * sin(angle)
			def m3 = new Point(mX3, mY3)

			level--
			kochCurve(p1, m1, level)
			kochCurve(m1, m3, level)
			kochCurve(m3, m2, level)
			kochCurve(m2, p2, level)
		}
	}

	void levyCCurve(Point p1, Point p2, int level) {
		if (level <= 0) {
			line(p1, p2)
		} else {
			def edgeLength = p1.dist(p2) / (2 ** 0.5)
			def angle = atan2(p2.y - p1.y, p2.x - p1.x) + toRadians(45)
			def mX = p1.x + edgeLength * cos(angle)
			def mY = p1.y + edgeLength * sin(angle)
			def m = new Point(mX, mY)

			level--
			levyCCurve(p1, m, level)
			levyCCurve(m, p2, level)
		}
	}

	void fractalTree(Point p1, Point p2, int level) {
		line(p1, p2)

		if (level > 0) {
			def trunkLength = p1.dist(p2) * 2 / 3
			def angle = atan2(p2.y - p1.y, p2.x - p1.x) + toRadians(45)
			def mX1 = p2.x + trunkLength * cos(angle)
			def mY1 = p2.y + trunkLength * sin(angle)
			def m1 = new Point(mX1, mY1)

			angle = atan2(p2.y - p1.y, p2.x - p1.x) + toRadians(-45)
			def mX2 = p2.x + trunkLength * cos(angle)
			def mY2 = p2.y + trunkLength * sin(angle)
			def m2 = new Point(mX2, mY2)

			level--
			fractalTree(p2, m1, level)
			fractalTree(p2, m2, level)
		}
	}

	def invokeMethod(String name, Object args) {
		parent."$name"(*args)
	}
}
