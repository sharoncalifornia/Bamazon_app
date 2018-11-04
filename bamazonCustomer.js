var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  select_All();

  
});

function select_All() {
    console.log("Selecting all items \n");
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    
    connection.query(query, function(err, res)
     {
      if (err) throw err;
      // Log all results of the SELECT statement
      for (var i=0; i<res.length; i++){
        console.log("Item_ID: " + res[i].item_id + " || Product Name:  "+res[i].product_name+ "  ||  Price:  "+res[i].price+"  || Quantity: "+res[i].stock_quantity);
      }
      userInput();
      
    });

  }

function userInput(){
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "item_id of the product you would like to buy?",
      name: "item_id"
    },
  
    {
      type: "input",
      message: "how many units",
      name: "units"
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
    
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("Item_id " + inquirerResponse.item_id);
      console.log("Number of Units " + inquirerResponse.units);

    }

    var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE item_id = ?";
    
    connection.query(query, [inquirerResponse.item_id],function(err, res){
     
      console.log(res.length + "matches found!")
    
      //for (var i=0; i<res.length; i++){
     //   console.log("Item_ID: " + res[i].item_id + " || Product Name:  "+res[i].product_name+ "  ||  Price:  "+res[i].price);
          if (res[0].stock_quantity > inquirerResponse.units){

            var remain_quantity = res[0].stock_quantity - inquirerResponse.units;
            console.log("Product Name:  "+res[0].product_name+ "  |  Price:  "+res[0].price+"  | Quantity  :"+inquirerResponse.units+"  | Total Cost :"+inquirerResponse.units*res[0].price);
            update_ProductsDB(remain_quantity, inquirerResponse.item_id);
          }
          else 
          {
            console.log("Item_ID: " + res[0].item_id + " | Product Name:  "+res[0].product_name+ "  |  Price:  "+res[0].price+" Insufficient Quantity!");
            connection.end();
           }
    });
  

  });
}

function update_ProductsDB(quantity, item_id_input) {
  
  var query = connection.query("UPDATE products SET ? WHERE ?",
[  
 {
    stock_quantity : quantity
 },
 {
   item_id : item_id_input
 } 
],
  function(err, res)
   {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res.affectedRows + " products updated!\n");
    connection.end();
   
    
  });

}