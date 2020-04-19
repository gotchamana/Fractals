package fractal

import processing.core.PApplet

class Main extends PApplet {

	private final int WIDTH = 500, HEIGHT = 500

	private def fractals = new Fractals(this)
	private def p1 = new Point(WIDTH / 2, 0)
	private def p2 = new Point(0, HEIGHT)
	private def p3 = new Point(WIDTH, HEIGHT)

	void settings() {
		size(WIDTH, HEIGHT, FX2D)
	}

	void setup() {
		surface.setTitle("Fractals")
	}

	void draw() {
		background(255)

		noStroke()
		fill(0)
		fractals.sierpinskiCarpet(new Point(), WIDTH, 5)
		// fractals.fractalTree(new Point(WIDTH / 2, HEIGHT), new Point(WIDTH / 2, HEIGHT * 3 / 4), 5)
	}

	void triangle(Point p1, Point p2, Point p3) {
		def (x1, y1) = p1
		def (x2, y2) = p2
		def (x3, y3) = p3

		triangle(x1 as float, y1 as float, x2 as float, y2 as float, x3 as float, y3 as float)
	}

	void rect(Point p, double w1, double w2) {
		def (x, y) = p
		rect(x as float, y as float, w1 as float, w2 as float)
	}

	void line(Point p1, Point p2) {
		def (x1, y1) = p1
		def (x2, y2) = p2

		line(x1 as float, y1 as float, x2 as float, y2 as float)
	}

    static void main(String[] args) {
		PApplet.main(Main, args)
    }
}
