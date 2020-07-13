const database = require("../database")
after(async () => {  
    await database.destroy()
  })