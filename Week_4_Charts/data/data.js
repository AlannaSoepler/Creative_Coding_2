let data02 = [];
let titleFont;
let bodyFont;
let table;

function preload() {
  table = loadTable('data/data06.csv', 'csv', 'header');
}

function generateData() {
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

  // for (let i = 0; i < data02.length; i++) {
  //   data02[i].Total_Dwelling = int(data02[i].Total_Dwelling);
  // }
  titleFont = loadFont('assets/Merriweather-Regular.ttf');
  bodyFont = loadFont('assets/Roboto-Regular.ttf');
}
