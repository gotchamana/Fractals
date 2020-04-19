function Point(x, y) {
	this.x = x;
	this.y = y;

	this.middle = function(p) {
		var midX = (this.x + p.x) / 2;
		var midY = (this.y + p.y) / 2;
		return new Point(midX, midY);
	}

	this.dist = function(p) {
		var xSqure = Math.pow(x - p.x, 2);
		var ySqure = Math.pow(y - p.y, 2);
		return Math.pow(xSqure + ySqure, 0.5);
	}
}
