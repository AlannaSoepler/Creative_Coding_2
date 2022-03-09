let data02 = [];
let bodyFont;
let table;

//Happenes before the setup, will load all my data and the font
function preload() {
  table = loadTable('data/data01.csv', 'csv', 'header');
  bodyFont = loadFont('assets/Roboto-Regular.ttf');
}

function generateData() {
  //Pushes the data into the table variable
  //Additionally, changes a few of the names i the array to integers 
  for (let r = 0; r < table.getRowCount(); r++) {
    data02.push(table.rows[r].obj);
    data02[r].Total_Dwelling = int(data02[r].Total_Dwelling);
    data02[r].Multi_Development_Housing = int(
      data02[r].Multi_Development_Housing
    );
    data02[r].One_Off_Housing = int(data02[r].One_Off_Housing);
    data02[r].Apartments = int(data02[r].Apartments);
    data02[r].All_Houses = int(data02[r].All_Houses);
  }
}
