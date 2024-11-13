const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql2/promise');
const path = require('path');
const { equal } = require('assert');


async function getAll(table) {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        const [results] = await db.query('SELECT * FROM ' + table);
        console.log(results);
        return results;
    }
    catch(err) {
        console.log(err)
    }
    return null;
}

async function selectDistinct(table, tableAtr) {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        const [results] = await db.query('SELECT DISTINCT + ' + tableAtr + ' FROM ' + table);
        console.log(results);
        return results;
    }
    catch(err) {
        console.log(err)
    }
    return null;
}

async function getAllComputers() {
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        const [results] = await db.query('SELECT * FROM computers\nJOIN cpus ON computers.compCpu = cpus.cpuId\nJOIN gpus ON computers.compGpu = gpus.gpuId');
        console.log(results);
        return results;
    }
    catch(err) {
        console.log(err)
    }
    return null;
}

async function getAllPurchases() {
    try{
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        const [results] = await db.query(
            'SELECT purchases.userEmail, purchases.purchaseDate, computers.compBrand, computers.compModel\nFROM computers\nJOIN purchases ON computers.compId = purchases.compId ORDER BY purchases.purchaseDate DESC'
        );
        console.log(results);
        return results;
    }
    catch(err) {
        console.log(err);
    }
    return null;
}

const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './views');

app.get("/", async (req, res) => {

    res.render('index', {
        customData: await getAllComputers(),
        cpuBrandList: await selectDistinct('cpus', 'cpuBrand'),
        gpuBrandList: await selectDistinct('gpus', 'gpuBrand')
    });
})

app.get("/add", async (req, res) => {
    res.render('add', {cpuList: await getAll('cpus'), gpuList: await getAll('gpus') });
})

app.get("/purchases", async (req, res) => {
    res.render('purchases', {purchaseList: await getAllPurchases()});
})

app.get('/edit/:entity/:id', async (req, res) => {
    const { entity, id } = req.params;
    
    var entityData;

    if (entity == 'computer') {

        try {
            const db = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                database: 'computer_store'
            });
    
             [entityData] = await db.query(`SELECT * FROM (computers\nJOIN cpus ON computers.compCpu = cpus.cpuId\nJOIN gpus ON computers.compGpu = gpus.gpuId) WHERE compId = ${id}`);
            console.log(entityData)
        }
        catch(err) {
            console.log(err)
        }
        

    }
    else {
        entityData = null;
    }

    res.render('edit', {entityData: entityData, cpuList: await getAll('cpus'), gpuList: await getAll('gpus')});
})

app.post('/filter', async (req, res) => {
    const data = req.body;
    
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        // const query = "SELECT * FROM (((computers JOIN cpus) JOIN gpus) WHERE compPrice > ? AND compPrice < ? AND compRam > ? AND compRam < ? AND compDisk > ? AND compDisk < ? AND cpuBrand IN (?) AND gpuBrand IN (?))";
        const query = "SELECT * FROM computers JOIN cpus ON computers.compCpu = cpus.cpuId JOIN gpus ON computers.compGpu = gpus.gpuId WHERE compPrice >= ? AND compPrice <= ? AND compRam >= ? AND compRam <= ? AND compDisk >= ? AND compDisk <= ? AND cpuBrand IN (?) AND gpuBrand IN (?)";

        const [results] = await db.query(query, [data.priceRange[0], data.priceRange[1], data.ramRange[0], data.ramRange[1], data.storageRange[0], data.storageRange[1], data.cpuBrands, data.gpuBrands ]);
        res.json({ message: 'Data received successfully', data: results });
    }
    catch(err) {
        console.log(err)
    }

    // res.json({ message: 'Data received successfully', data: data });
})

app.post('/addcpu', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "INSERT INTO cpus (cpuBrand, cpuModel) VALUES (?, ?)";

        await db.execute(query, [data.cpuBrand, data.cpuModel], (err, results) => {
            if (err) {
                console.log("Error inserting CPU: ", err);
                return;
            }

            console.log("CPU Inserted Success: ", results);
        })

    }
    catch(err) {
        console.log(err)
    }

    res.json({ message: 'Data received successfully', data: data });
})

app.post('/addgpu', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "INSERT INTO gpus (gpuBrand, gpuModel) VALUES (?, ?)";

        await db.execute(query, [data.gpuBrand, data.gpuModel], (err, results) => {
            if (err) {
                console.log("Error inserting GPU: ", err);
                return;
            }

            console.log("GPU Inserted Success: ", results);
        })

    }
    catch(err) {
        console.log(err)
    }

    res.json({ message: 'Data received successfully', data: data });
})

app.post('/addcomputer', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "INSERT INTO computers (compBrand, compModel, compCpu, compGpu, compRam, compDisk, compStock, compPrice) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

        await db.execute(query, [data.brand, data.model, data.cpu, data.gpu, data.ram, data.disk, data.stock, data.price], (err, results) => {
            if (err) {
                console.log("Error inserting Computer: ", err);
                return;
            }

            console.log("Computer Inserted Success: ", results);
        })

    }
    catch(err) {
        console.log(err)
    }

    res.json({ message: 'Data received successfully', data: data });
})

app.post('/adduser', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "INSERT INTO users (userEmail) VALUES (?)";

        await db.execute(query, [data.userEmail], (err, results) => {
            if (err) {
                console.log("Error inserting User: ", err);
                return;
            }

            console.log("User Inserted Success: ", results);
            
        })
        res.json({ message: 'Data received successfully', data: data });
    }
    catch(err) {
        console.log("/adduser", err)
        res.json({ message: 'Duplicate', data: data });
    }

    
})

app.post('/buy', async (req, res) => {
    const data = req.body;
    console.log(data);
    
    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        const [result] = await db.query( "SELECT compStock FROM computers WHERE compId = " + data.compId);
        if (result[0].compStock < 1) {
            res.json({message: 'Out of Stock', data: data});
            return;
        }

        const alterQuery = "UPDATE computers\nSET compStock = compStock - 1\nWHERE compId = " + data.compId;
        
        await db.execute(alterQuery)

        const userQuery = "INSERT IGNORE INTO users (userEmail) VALUES (?)";

        await db.execute(userQuery, [data.email], (err, results) => {
            if (err) {
                console.log("Error with inserting user ", err);
                return;
            }

            console.log("User inserted ", results);
        })

        const purchaseQuery = "INSERT INTO purchases (userEmail, compId) VALUES (?, ?)";

        await db.execute(purchaseQuery, [data.email, data.compId], (err, results) => {
            if (err) {
                console.log("Error with purchase ", err);
                return;
            }

            console.log("Purchase Inserted Success: ", results);
            
        })
        res.json({ message: 'Data received successfully', data: data });
    }
    catch(err) {
        console.log("/buy", err)
        // res.json({ message: 'Duplicate', data: data });
    }
})

app.post('/search', async (req, res) => {
    const data = req.body;
    console.log(data);

    if (data.searchTerms.length == 0 || (data.searchTerms[0] == '' && data.searchTerms.length == 1)) {
        res.json({ message: 'Data received successfully', data: await getAllComputers() });
        return;
    }

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });

        // const query = "SELECT * FROM computers JOIN cpus ON computers.compCpu = cpus.cpuId JOIN gpus ON computers.compGpu = gpus.gpuId WHERE compBrand in (?) OR compModel in (?) OR cpuBrand in (?) OR cpuModel in (?) OR gpuBrand in (?) OR gpuModel in (?)";

        const pattern = `(^| )(${data.searchTerms.join('|')})( |$)`

        const query = `SELECT * FROM computers JOIN cpus ON computers.compCpu = cpus.cpuId JOIN gpus ON computers.compGpu = gpus.gpuId WHERE compBrand REGEXP ? OR compModel REGEXP ? OR cpuBrand REGEXP ? OR cpuModel REGEXP ? OR gpuBrand REGEXP ? OR gpuModel REGEXP ?`;

        const [results] = await db.query(query, [pattern, pattern, pattern, pattern, pattern, pattern ]);
        res.json({ message: 'Data received successfully', data: results });
    }
    catch(err) {
        console.log(err)
    }
})

app.post('/editcomputer', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "UPDATE computers SET compBrand = ?, compModel = ?, compCpu = ?, compGpu = ?, compRam = ?, compDisk = ?, compStock = ?, compPrice = ? WHERE compId = ?";

        await db.execute(query, [data.brand, data.model, data.cpu, data.gpu, data.ram, data.disk, data.stock, data.price, data.compId], (err, results) => {
            if (err) {
                console.log("Error editing computer: ", err);
                return;
            }

            console.log("computer edit success: ", results);
        })

    }
    catch(err) {
        console.log(err)
    }

    res.json({ message: 'Data received successfully', data: data });
})

app.post('/removecomputer', async (req, res) => {
    const data = req.body;
    console.log(data);

    try {
        const db = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'computer_store'
        });


        const query = "DELETE FROM computers WHERE compId = ?";

        await db.execute(query, [data.compId], (err, results) => {
            if (err) {
                console.log("Error removing computer: ", err);
                return;
            }

            console.log("computer remove success: ", results);
        })

    }
    catch(err) {
        console.log(err)
    }

    res.json({ message: 'Data received successfully', data: data });
})

app.use((req, res) => {
    res.status(404).send('<h1>404 Not Found</h1>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

// db.end((err) => {
//     if (err) {
//         console.error('Error closing the database connection: ', err);
//     }
//     console.log("db connection closed");
// })