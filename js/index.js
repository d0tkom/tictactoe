//default values for player and computer
var computer = 4;
var player = 1;
//create and zero 2d array used for representing game table
var table = [];
for (var i = 0; i < 3; i++) {
		table[i] = [];
}
for (var i = 0; i < 3; i++) {
		for (var e = 0; e < 3; e++) {
				table[i][e] = 0;
		}
}
//this function is called every time a user tries to place an x/o. it is called using the id of the clicked tile
function action(x) {
		//converting string id to actual coordinate numbers in the table
		var i = parseInt(x[0]);
		var e = parseInt(x[1]);
		//
		if (player == 1 && table[i][e] == 0) {
				table[i][e] = 1;
		} else if (table[i][e] == 0) {
				table[i][e] = 4;
		} else {
				return 0;
		}
		draw();
		if (check() == player) {
				alert("you win");
				reset();
		} else if (check() == computer) {
				alert("you lose");
				reset();
		} else if (isFull()) {
				alert("it's a tie");
				reset();
		} else {
				ai();
				if (check() == player) {
						alert("you win");
						reset();
				} else if (check() == computer) {
						alert("you lose");
						reset();
				} else if (isFull()) {
						alert("it's a tie");
						reset();
				}
		}

}

function ai() {
		if (table[1][1] == 0) {
				table[1][1] = computer;
				draw();
				return 1;
		}
		var x = check2(computer);
		if (x) {
				var i = parseInt(x[0]);
				var e = parseInt(x[1]);
				table[i][e] = computer;
				draw();
				return 1;
		}
		x = check2(player);
		if (x) {
				var i = parseInt(x[0]);
				var e = parseInt(x[1]);
				table[i][e] = computer;
				draw();
				return 1;
		}
		if (table[0][0] == 0 || table[0][2] == 0 || table[2][0] == 0 || table[2][2] == 0) {
				var random = Math.floor(4 * Math.random());
				switch (random) {
						case 0:
								if (table[0][0] == 0) {
										table[0][0] = computer;
										draw();
								} else {
										random_corner(1);
								}
								return 1;
								break;
						case 1:
								if (table[0][2] == 0) {
										table[0][2] = computer;
										draw();
								} else {
										random_corner(2);
								}
								return 1;
								break;
						case 2:
								if (table[2][0] == 0) {
										table[2][0] = computer;
										draw();
								} else {
										random_corner(3);
								}
								return 1;
								break;
						case 3:
								if (table[2][2] == 0) {
										table[2][2] = computer;
										draw();
								} else {
										random_corner(0);
								}
								return 1;
								break;
				}
		}
		for (var i = 0; i < 3; i++) {
				for (var e = 0; e < 3; e++) {
						if (table[i][e] == 0) {
								table[i][e] = computer;
								draw();
								return 1;
						}
				}
		}

}

function random_corner(x) {
		switch (x) {
				case 0:
						if (table[0][0] == 0) {
								table[0][0] = computer;
								draw();
						} else {
								random_corner(1);
						}
						return 1;
						break;
				case 1:
						if (table[0][2] == 0) {
								table[0][2] = computer;
								draw();
						} else {
								random_corner(2);
						}
						return 1;
						break;
				case 2:
						if (table[2][0] == 0) {
								table[2][0] = computer;
								draw();
						} else {
								random_corner(3);
						}
						return 1;
						break;
				case 3:
						if (table[2][2] == 0) {
								table[2][2] = computer;
								draw();
						} else {
								random_corner(0);
						}
						return 1;
						break;
		}
}

function check2(comp_or_player) {
		for (var i = 0; i < 3; i++) {
				var sum = 0;
				for (var e = 0; e < 3; e++) {
						sum += table[i][e];
				}
				if (sum == comp_or_player * 2) {
						var e = 0;
						while (table[i][e] != 0) {
								e++;
						}
						return i.toString() + e.toString();
				}
				sum = 0;
				for (var e = 0; e < 3; e++) {
						sum += table[e][i];
				}
				if (sum == comp_or_player * 2) {
						var e = 0;
						while (table[e][i] != 0) {
								e++;
						}
						return e.toString() + i.toString();
				}
				var sum = table[0][0] + table[1][1] + table[2][2];
				if (sum == comp_or_player * 2) {
						var e = 0;
						while (table[e][e] != 0) {
								e++;
						}
						return e.toString() + e.toString();
				}
				sum = table[0][2] + table[1][1] + table[2][0];
				if (sum == player * 2) {
						var e = 0;
						while (table[e][2 - e] != 0) {
								e++;
						}
						var res = 2 - e;
						return e.toString() + res.toString();
				}
		}
		return false;
}

function draw() {
		for (var i = 0; i < 3; i++) {
				for (var e = 0; e < 3; e++) {
						if (table[i][e] == 1) {
								var id = i.toString() + e.toString();
								document.getElementById(id).innerHTML = ("X");
						} else if (table[i][e] == 4) {
								var id = i.toString() + e.toString();
								document.getElementById(id).innerHTML = ("O");
						} else {
								var id = i.toString() + e.toString();
								document.getElementById(id).innerHTML = ("");
						}
				}
		}
}

function reset() {
		for (var i = 0; i < 3; i++) {
				for (var e = 0; e < 3; e++) {
						table[i][e] = 0;
				}
		}
		if (computer==1) {
			ai();
		}
		draw();
}

function isFull() {
		for (var i = 0; i < 3; i++) {
				for (var e = 0; e < 3; e++) {
						if (table[i][e] == 0) {
								return false;
						}
				}
		}
		return true;
}

function check() {
		for (var i = 0; i < 3; i++) {
				var sum = 0;
				for (var e = 0; e < 3; e++) {
						sum += table[i][e];
				}
				if (sum == player * 3) {
						return player;
				} else if (sum == computer * 3) {
						return computer;
				}
				sum = 0;
				for (var e = 0; e < 3; e++) {
						sum += table[e][i];
				}
				if (sum == player * 3) {
						return player;
				} else if (sum == computer * 3) {
						return computer;
				}
		}
		var sum = table[0][0] + table[1][1] + table[2][2];
		if (sum == player * 3) {
				return player;
		} else if (sum == computer * 3) {
				return computer;
		}
		sum = table[0][2] + table[1][1] + table[2][0];
		if (sum == player * 3) {
				return player;
		} else if (sum == computer * 3) {
				return computer;
		}
}