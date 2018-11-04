var mysql = require("mysql");
var inquirer = require("inquirer");
var updated_quantity;
var product_itemID;

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
  managerInput();
});

function managerInput(){
inquirer
  .prompt([
 // Here we give the user a list to choose from.
 {
    type: "list",
    message: "Manager to choose an action?",
    choices: ["View Product for Sale", "View Low Inventory", "Add Quantity to Inventory", "Add New Product"],
    name: "action"
  },
  // Here we ask the user to confirm.
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
    var action = inquirerResponse.action.split(" ")[0];
    var item = inquirerResponse.action.split(" ")[1];
  
    //console.log("You chose to (action): " + inquirerResponse.username);
    console.log("Your chose " + action +"  "+ item + " !\n");
    if (action === "Add")
    {
      if (item === "New")
        add_new_product();
      else
        add_inventory();
    }
    //connection.end();
  }
 // else {
 //   console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
 // }
});
}

function add_inventory() {
  
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Item ID",
      name: "item_id"
    },
    {
      type: "input",
      message: "Number of Unit you are adding",
      name: "quantity"
    }  
  ])
  .then(function(answer){

  
  var query ="SELECT stock_quantity FROM products WHERE item_id = ?";
  connection.query(query, [answer.item_id], function(err, res){

  console.log("database   " +res[0].stock_quantity);
  
  console.log("item id "+answer.item_id);
  //product_itemID = parseInt(answer.item_id);
  updated_quantity = res[0].stock_quantity+ parseInt(answer.quantity);
  console.log("updated_quantity  "+updated_quantity); 
  update_DB_inventory(updated_quantity,parseInt(answer.item_id));

  });
 
  }); 
}

function update_DB_inventory(quantity, item_id_input)
{
    
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

function add_new_product() {
  inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "Product description",
      name: "product_name"
    },
    {
      type: "input",
      message: "Product Department: (Travel, Electronics, Entertainment, Clothing)",
      name: "department_name"
    },
    {
      type: "input",
      message: "Price of product",
      name: "price"
    },
    {
      type: "input",
      message: "Quantity of Product",
      name: "quantity"
    }
  ])
  .then(function(answer){

    //console.log("answer product name"+answer.product_name);
    //console.log("answer department"+answer.department_name);
    //console.log("answer price"+parseFloat(answer.price));
    //console.log("answer quantity"+parseInt(answer.quantity));

    var query = connection.query("INSERT INTO products SET ?",
 
    {
       product_name : answer.product_name,
       department_name : answer.department_name,
       price : answer.price,
       stock_quantity : answer.quantity
    },
  function(err, res)
   {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res.affectedRows + " products inserted!\n");
    connection.end();
   }
  
  );  
  
});
}//end