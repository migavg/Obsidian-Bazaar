export function pluralize(name, count) {
  // Function to pluralize a word based on the count
  if (count === 1) {
    return name;
  }
  return name + "s";
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    // Open the IndexedDB database
    const request = window.indexedDB.open("shop-shop", 1);
    let db, tx, store;

    // Create object stores if the database is being upgraded
    request.onupgradeneeded = function (e) {
      const db = request.result;
      db.createObjectStore("products", { keyPath: "_id" });
      db.createObjectStore("categories", { keyPath: "_id" });
      db.createObjectStore("cart", { keyPath: "_id" });
    };

    // Handle errors during database open
    request.onerror = function (e) {
      console.log("There was an error");
    };

    // Perform operations on the database once it's successfully opened
    request.onsuccess = function (e) {
      db = request.result;
      tx = db.transaction(storeName, "readwrite");
      store = tx.objectStore(storeName);

      // Handle errors during database operations
      db.onerror = function (e) {
        console.log("error", e);
      };

      // Perform the specified method on the object store
      switch (method) {
        case "put":
          store.put(object);
          resolve(object);
          break;
        case "get":
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          };
          break;
        case "delete":
          store.delete(object._id);
          break;
        default:
          console.log("No valid method");
          break;
      }

      // Close the database transaction once it's completed
      tx.oncomplete = function () {
        db.close();
      };
    };
  });
}
