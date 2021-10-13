//<===!================== create variable to hold db connection ===========================================!===============>
let db;
// establish a connection to IndexedDB database called 'pizza_hunt' and set it to version 1
const request = indexedDB.open("pizza_hunt", 1);

// he .open() method we use here takes the following two parameters:

// The name of the IndexedDB database you'd like to create (if it doesn't exist) or connect to (if it does exist). We'll use the name pizza_hunt.

// The version of the database. By default, we start it at 1. This parameter is used to determine whether the database's structure has changed between connections. Think of it as if you were changing the columns of a SQL database.

// <==!=============================================OBJECT STORE==============================================================!===>

// Like other database systems, the IndexedDB database itself doesn't hold the data. In SQL, tables hold the data; likewise, in MongoDB, collections hold the data. In IndexedDB, the container that stores the data is called an object store. We can't create an object store until the connection to the database is open, emitting an event that the request variable will be able to capture

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function(event) {
  // save a reference to the database 
  const db = event.target.result;
  // create an object store (table) called `new_pizza`, set it to have an auto incrementing primary key of sorts 
  db.createObjectStore('new_pizza', { autoIncrement: true });
};


// <===!============finalizing connection, store the resulting database object on a global var db =========================!=========>

// upon a successful 
request.onsuccess = function(event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadPizza() function to send all local db data to api
  if (navigator.onLine) {
    // we haven't created this yet, but we will soon, so let's comment it out for now
    // uploadPizza();
  }
};

request.onerror = function(event) {
  // log error here
  console.log(event.target.errorCode);
};



// <==!==============================functionality for writing data to database========================================================!===>

// This function will be executed if we attempt to submit a new pizza and there's no internet connection
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions 
  const transaction = db.transaction(['new_pizza'], 'readwrite');

  // access the object store for `new_pizza`
  const pizzaObjectStore = transaction.objectStore('new_pizza');

  // add record to your store with add method
  pizzaObjectStore.add(record);
}