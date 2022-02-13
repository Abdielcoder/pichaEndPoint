const { Router } = require("express");
const router = Router();

const admin = require("firebase-admin");
const { picha, firestore } = require("firebase-functions/v1");
const db = admin.firestore();
const TIKE = admin.firestore;

//Create
router.post("/api/categorias/", async(req, res) => {
    try {
        await db
            .collection("Categorias")
            .doc("/" + req.body.id + "/")
            .create({ name: req.body.name });
        return res.status(200).json();
    } catch (error) {
        return res.status(500).send(error);
    }
});

router.get("/api/categorias/:categoria_id", (req, res) => {
    (async() => {
        try {
            const doc = db.collection("Categorias").doc(req.params.categoria_id);
            const item = await doc.get();
            const response = item.data();
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json(error);
        }
    })();
});

//ALL MESSAGES
router.get("/api/lista/categorias", async(req, res) => {
    try {
        let query = db.collection("Categorias");
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.data().id,
            fecha: doc.data().fecha,
            eatatus: doc.data().eatatus,
            nombre: doc.data().nombre,
            icono: doc.data().icono,
            imagen: doc.data().imagen,
            pupular: doc.data().pupular,
        }));

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// //ALL DRIVERS
// router.get("/api/ciem", async(req, res) => {
//     try {
//         let query = db.collection("Drivers");
//         const querySnapshot = await query.get();
//         let docs = querySnapshot.docs;

//         const response = docs.map((doc) => ({
//             userName: doc.data().username,
//         }));

//         return res.status(200).json(response);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// });

// //Consulta de la direccion del restaurante por Place uid.
// router.get("/api/place/:placeUid", (req, res) => {
//   (async () => {
//     try {
//       const doc = db.collection("Tijuana").doc(req.params.placeUid);
//       const item = await doc.get();
//       const response = item.data();
//       return res.status(200).send(response);
//     } catch (error) {
//       return res.status(500).send(error);
//     }
//   })();
// });



// router.put("/api/orders/:product_id", async (req, res) => {
//   try {
//     const takeTime = TIKE.Timestamp.fromDate(new Date());
//     console.log(takeTime);
//     const document = db.collection("ORDERS").doc(req.params.product_id);
//     await document.update({
//     driveUid :req.body.driveUid,
//     takeTime :takeTime,

//     //total: 33,
//     });
//     return res.status(200).json();
//   } catch (error) {
//     console.error(error); 
//     return res.status(500).send(error);
//   }
// });

// router.put("/api/orders/recolectado/:product_id", async (req, res) => {
//   try {
//     const pickupTime = TIKE.Timestamp.fromDate(new Date());
//     console.log(pickupTime);
//     const document = db.collection("ORDERS").doc(req.params.product_id);
//     await document.update({
//     pickupTime: pickupTime,

//     //total: 33,
//     });
//     return res.status(200).json();
//   } catch (error) {
//     console.error(error); 
//     return res.status(500).send(error);
//   }
// });

// router.put("/api/orders/llegada/:product_id", async (req, res) => {
//   try {
//     const arriveTime = TIKE.Timestamp.fromDate(new Date());
//     console.log(arriveTime);
//     const document = db.collection("ORDERS").doc(req.params.product_id);
//     await document.update({
//       arriveTime: arriveTime,

//     //total: 33,
//     });
//     return res.status(200).json();
//   } catch (error) {
//     console.error(error); 
//     return res.status(500).send(error);
//   }
// });

// router.put("/api/orders/entrega/:product_id", async (req, res) => {
//   try {
//     const deliveryTime = TIKE.Timestamp.fromDate(new Date());
//     console.log(deliveryTime);
//     const document = db.collection("ORDERS").doc(req.params.product_id);
//     await document.update({
//       deliveryTime: deliveryTime,

//     //total: 33,
//     });
//     return res.status(200).json();
//   } catch (error) {
//     console.error(error); 
//     return res.status(500).send(error);
//   }
// });




// router.get("/api/products", async (req, res) => {
//   try {
//     let query = db.collection("products");
//     const querySnapshot = await query.get();
//     let docs = querySnapshot.docs;

//     const response = docs.map((doc) => ({
//       id: doc.id,
//       name: doc.data().name,
//     }));

//     return res.status(200).json(response);
//   } catch (error) {
//     return res.status(500).json(error);
//   }
// });


// router.delete("/api/products/:product_id", async (req, res) => {
//   try {
//     const doc = db.collection("products").doc(req.params.product_id);
//     await doc.delete();
//     return res.status(200).json();
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

module.exports = router;