
// Création de la grille du sudoku
var grid = new Array();
// Création d'un tableau qui contient les 9 chiffres possible
var lineList = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);

// Création d'un tableau qui contient par ligne toute les possibilité de lineList pour les colonnes
var columnList = new Array();

// Création d'un tableau qui contient par ligne toute les possibilité de lineList pour les zones
var zoneList = new Array();

// Initialise le nombre de tour de boucle
var i_while = 0;

// Idicateur de grille complète ou non
var fullGrid = false;

// Nombre de tour estimé suffisant pour complèter une grille correctement
var max_loop = 10000;

// Création de variable servant à créer la grille graphiquement
var cellWidth = 50;//l cel
var cellHeight = 50;//h cel
var xSpacer = 20;//esp entre les cell abcisses
var ySpacer = 20;//esp entre les cell ordonnée
var xGrid = 9;//nbr ligne
var yGrid = 9;//nbr colonne
var colorSetIndex = 0;
var cellIndex = 0;

var tableData = [];

var colorSet = ["#D44646", "#46D463", "#46D4BE", "#C2D446", "#D446D5", "#4575D5", "#E39127", "#879181", "#E291D4"];

function shuffle(array) {
	for (var j,x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
	return array;
};

// Fonction générant une grille aléatoire
function generateSudoku() 
{
	// Point de référence
	outerwhile:
	while ((i_while < max_loop) && !fullGrid) 
	{
		i_while++;

		for (var i = 1; i <= 9; i++) 
		{
			// Création de chaque ligne de la grille
			grid[i] = new Array();
			// Création du tableau gérant les lignes
			lineList[i] = new Array();
			// Création du tableau gérant les colonnes
			columnList[i] = new Array();

			for (var j = 0; j <= 9; j++) 
			{
				// Remplissage de toutes les cases de la grille à 0
				grid[i][j] = 0;
				// Remplissage de toutes les possibilité de ligne
				lineList[i][j] = j;
				// Remplissage de toutes les possibilité de colonnes
				columnList[i][j] = j;
			}
		}

		for (var i = 1; i <= 3; i++) 
		{
			// Création des trois lignes de cases
			zoneList[i] = new Array();

			for (var j = 1; j <= 3; j++) 
			{
				// Création des trois colonnes de cases dans chaque ligne
				zoneList[i][j] = new Array();
				for (var k = 1; k <= 9; k++) 
				{
					// Remplissage de toutes les possibilité de zone
					zoneList[i][j][k] = k;
				}
			}
		}

		for (var y = 1; y <= 9; y++) 
		{
			for (var x = 1; x <= 9; x++) 
			{
				var tmpGrid = new Array();
				var index = 0;

				for (var k = 1; k <= 9; k++) 
				{
					if (!lineList[y][k])
						continue;
					if (!columnList[x][k])
						continue;
					if (!zoneList[Math.ceil (y/3)][Math.ceil (x/3)][k])
						continue;

					tmpGrid[index] = k;
					index++;
				}

				if (tmpGrid.length == 0)
					continue outerwhile;

				var nb = tmpGrid[Math.floor((Math.random() * tmpGrid.length))];
				grid[y][x] = nb;
				lineList[y][nb] = undefined;
				columnList[x][nb] = undefined;
				zoneList[Math.ceil(y/3)][Math.ceil(x/3)][nb] = undefined;
			}
		}

		fullGrid = true;
	}

	if (fullGrid) 
	{
		for (var y = 1; y <= yGrid; y++) 
		{
			var thisRow = Ti.UI.createTableViewRow({
				className : "grid",
				layout : "horizontal",
				height : cellHeight + (ySpacer),
				selectedBackgroundColor : "red"
			});

			for (var x = 1; x <= xGrid; x++) 
			{
				if(y>=1 && y<=3){
			if(x>=1 && x<=3){
					colorSetIndex = 0;
				}
				else if(x>=3 && x<=6){
					colorSetIndex = 1;
				}
				else if(x>=6 && x<=9){
					colorSetIndex = 2;
				}
			}
			else if(y>=4 && y<=6){
				 if(x>=1 && x<=3){
					colorSetIndex = 3;
				}
				else if(x>=3 && x<=6){
					colorSetIndex = 4;
				}
				else if(x>=6 && x<=9){
					colorSetIndex = 5;
				}
			}
			else if(y>=4 && y<=9){
				if(x>=1 && x<=3){
					colorSetIndex = 6;
				}
				else if(x>=3 && x<=6){
					colorSetIndex = 7;
				}
				else if(y>=6 && y<=9){
					colorSetIndex = 8;
				}
			}
				cellIndex = grid[y][x];
				var thisView = Ti.UI.createView({
					objName : "grid-view",
					objIndex : cellIndex.toString(),
					backgroundColor : colorSet[colorSetIndex],
					left : ySpacer,
					height : cellHeight,
					width : cellWidth,
					borderRadius: 5,
           			top: '20px'
				});

				var thisLabel = Ti.UI.createLabel({
					color : "white",
					font : {
						fontSize : 12,
						fontWeight : 'bold'
					},
					text : cellIndex.toString(),
					touchEnabled : false
				});
				thisView.add(thisLabel);
				thisRow.add(thisView);
				colorSetIndex++;

				if (colorSetIndex === colorSet.length) 
				{
					colorSetIndex = 0;
				}
			}
			tableData.push(thisRow);
		}

		var tableview = Ti.UI.createTableView({
			data : tableData
		});

		$.game.add(tableview);
	}

}

generateSudoku();
