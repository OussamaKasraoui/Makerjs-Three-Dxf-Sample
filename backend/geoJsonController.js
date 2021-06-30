// Import geojson model
let geoJSON = require('./geoJsonModel');
let makerjsModel = require('./makerjsModel');
let makerjs = require('makerjs');

const { db } = require('./geoJsonModel');
const mongoose = require('mongoose');
const { assert } = require('console');


// Handle index actions -------------------------------------------------------------------------------------------     not yet
exports.index = function (req, res) {
    geoJSON.get(function (err, geojson) {

        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Backend retrieved successfully",
            data: geojson
        });
    });
};


// Handle create geojson actions   +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     Done                  
exports.new = function (req, res) {

    console.log("Backend start time : " + new Date().toTimeString().split(' ')[0])

    //console.log("Hellooooo:\n" + JSON.stringify(req.body))
    // File
    //let fileASjson = req.body;

    // parcelle points
    //let points = req.body;//    [];

    // all parcelles holder
    let i = 0;
    let geos = req.body.map(geo => {
        console.log("parcelle "+ i +" + DXF     time start : " + new Date().toTimeString().split(' ')[0])
        i++;
        return {
          ...geo,
          DXF: cartouche(geo.DXF)
        };
      });



    // counter
    //let i = 0;
    // fileASjson.features.forEach(feature => {


    //     // geoJSON instance : gonna be sent to MongoDB
    //     var geojson = new geoJSON();
    //     //console.log('\n\n' + 'makerjsModel(points)  = ' + JSON.stringify(geojson) + '\n\n')

    //     feature.geometry.coordinates.forEach(element => {
    //         element.forEach(elm => {
    //             elm.forEach(el => {
    //                 points.push(el);
    //             })
    //         });
    //     });


    //     // Makerjs Cartouche Model
    //     let cartouch = makerjsModel(points, feature)
    //     //console.log('\n\n' + 'cartouche ('+ i +')  = ' + JSON.stringify(cartouch) + '\n\n')

    //     geojson.DXF                     = cartouch;//'Wa fiiine a DXF';//makerjsModel(points);
    //     geojson._id                     = mongoose.Schema.Types.ObjectId;
    //     geojson.N_ordre                 = feature.properties.N_ordre;
    //     geojson.NUMERO_DOSSIER          = feature.properties.NUMERO_DOSSIER;
    //     geojson.Nom_AR                  = feature.properties.Nom_AR;
    //     geojson.NOm_FR                  = feature.properties.NOm_FR;
    //     geojson.CIN                     = feature.properties.CIN;
    //     geojson.PROVINCE                = feature.properties.PROVINCE;
    //     geojson.CERCLE                  = feature.properties.CERCLE;
    //     geojson.CAIDAT                  = feature.properties.CAIDAT;
    //     geojson.COMMUNE                 = feature.properties.COMMUNE;
    //     geojson.LIEUX_RESIDENCE         = feature.properties.LIEUX_RESIDENCE;
    //     geojson.QUALITE                 = feature.properties.QUALITE;
    //     geojson.cote_part_empietement   = feature.properties.cote_part_empietement;
    //     geojson.COLLECTIVITE_REF        = feature.properties.COLLECTIVITE_REF;
    //     geojson.REF_FONCIERE            = feature.properties.REF_FONCIERE;
    //     geojson.CONSISTANCE             = feature.properties.CONSISTANCE;
    //     geojson.CODE_PARCELLE           = feature.properties.CODE_PARCELLE;
    //     geojson.SEXE                    = feature.properties.SEXE;
    //     geojson.FRACTION                = feature.properties.FRACTION;
    //     geojson.LISTE_AD                = feature.properties.LISTE_AD;
    //     geojson.N_ORDRE_LISTE_AD        = feature.properties.N_ORDRE_LISTE_AD;
    //     geojson.Superficie_Si           = feature.properties.Superficie_Si;
    //     geojson.PLU_VALU_EXPLOITATION   = feature.properties.PLU_VALU_EXPLOITATION;
    //     geojson.LIVRAISON               = feature.properties.LIVRAISON;
    //     geojson.INTEGRATION             = feature.properties.INTEGRATION;
    //     geojson.ORGANISME               = feature.properties.ORGANISME;
    //     geojson.Location                = feature.geometry;

    //     //console.log('\n\n' + '[ after ] geojsonModel instance = ' + JSON.stringify(geojson) + '\n\n')

    //     geos.push(geojson);

    //     i++
    // });
    i = 0;
    db.collection("geoJSON").insertMany(geos)
        .then(geo => {
            // set all parcelles shapes     for     GeoMap
            let all_Parcelle = [];

            // counter
            let j = 1;

            // set Tables data List         for     GeoTable
            let dataList = [];

            geo.ops.forEach(G => {
                console.log("insertMany "+ j +"  time end : " + new Date().toTimeString().split(' ')[0]);

                // set single parcelle shape    for     GeoRapport
                let one_parcelle = {};

                //console.log("\ngeo.ops.G " + j + "  : " + JSON.stringify(G) + "\n")

                // set Table data List
                dataList.push(
                    {
                        N_ordre: G.N_ordre,
                        NUMERO_DOSSIER: G.NUMERO_DOSSIER,
                        Nom_AR: G.Nom_AR,
                        NOm_FR: G.NOm_FR,
                        CIN: G.CIN,
                        PROVINCE: G.PROVINCE,
                        CERCLE: G.CERCLE,
                        CAIDAT: G.CAIDAT,
                        COMMUNE: G.COMMUNE,
                        LIEUX_RESIDENCE: G.LIEUX_RESIDENCE,
                        QUALITE: G.QUALITE,
                        cote_part_empietement: G.cote_part_empietement,
                        COLLECTIVITE_REF: G.COLLECTIVITE_REF,
                        REF_FONCIERE: G.REF_FONCIERE,
                        CONSISTANCE: G.CONSISTANCE,
                        CODE_PARCELLE: G.CODE_PARCELLE,
                        SEXE: G.SEXE,
                        FRACTION: G.FRACTION,
                        LISTE_AD: G.LISTE_AD,
                        N_ORDRE_LISTE_AD: G.N_ORDRE_LISTE_AD,
                        Superficie_Si: G.Superficie_Si,
                        PLU_VALU_EXPLOITATION: G.PLU_VALU_EXPLOITATION,
                        LIVRAISON: G.LIVRAISON,
                        INTEGRATION: G.INTEGRATION,
                        ORGANISME: G.ORGANISME,
                        _id: G._id,
                        //DXF: G.DXF
                    }
                );

                // set single parcelle shape
                one_parcelle.coordinates = G.Location.coordinates;
                //console.log('\n\n\nG.Location.coordinates :  ' + JSON.stringify(G.Location.coordinates) + '\n\n\n')

                one_parcelle.type = G.Location.type;
                //console.log('\n\n\nG.Location.type :  ' + JSON.stringify(G.Location.type) + '\n\n\n')

                one_parcelle._id = G._id;
                //console.log('\n\n\nG._id :  ' + JSON.stringify(G._id) + '\n\n\n')


                //console.log("\ngeo.ops." + j + " - one_parcelle : " + JSON.stringify(one_parcelle) + "\n")


                // set all parcelles shapes
                all_Parcelle.push(one_parcelle);
                //console.log("\ngeo.ops." + j + "  : all_Parcelle" + all_Parcelle + "\n")
                //console.log("\ngeo.ops." + j + "  : all_Parcelle    count" + all_Parcelle.length + "\n")

                //console.log('\n\n\nshape ' + j + " = " + JSON.stringify(geo)+"\n\n\n")
                j++;
            console.log("insertMany "+ j +"  time end : " + new Date().toTimeString().split(' ')[0])
            });

            //console.log('\n\n\nFinally :  ' + JSON.stringify(all_Parcelle) + '\n\n\n')
            //console.log('\n\n\nFInally :  ' + JSON.stringify(dataList) + '\n\n\n')
            
            res.send({
                'all_parcelles': all_Parcelle,
                'response': geo,
                'dataList': dataList
            });
        })
        .catch(err => {
            console.log('\n\n Error DTB: ' + JSON.stringify(err))
            res.send(err)
        });
}

exports.newOne = async function (req, res) {


    console.log('\n\nreq.body = \n' + req.body.properties.N_ordre + "\n_n")

    // Get Object from request
    let feature = req.body;

    // parcelle points
    let points = [];

    // all parcelles holder
    //let geos = [];

    // counter
    //let i = 0;

    // geoJSON Model instance
    let geojson = new geoJSON();

    // get Parcelle points as Array
    feature.geometry.coordinates.forEach(element => {
        element.forEach(elm => {
            elm.forEach(el => {
                points.push(el);
            })
        });
    });

    // Makerjs Cartouche Model
    let cartouch = makerjsModel(points, feature)

    // implement Model object
    geojson.DXF = JSON.stringify(cartouch);
    // geojson._id = mongoose.Schema.Types.ObjectId;
    geojson.N_ordre = feature.properties.N_ordre;
    geojson.NUMERO_DOSSIER = feature.properties.NUMERO_DOSSIER;
    geojson.Nom_AR = feature.properties.Nom_AR;
    geojson.NOm_FR = feature.properties.NOm_FR;
    geojson.CIN = feature.properties.CIN;
    geojson.PROVINCE = feature.properties.PROVINCE;
    geojson.CERCLE = feature.properties.CERCLE;
    geojson.CAIDAT = feature.properties.CAIDAT;
    geojson.COMMUNE = feature.properties.COMMUNE;
    geojson.LIEUX_RESIDENCE = feature.properties.LIEUX_RESIDENCE;
    geojson.QUALITE = feature.properties.QUALITE;
    geojson.cote_part_empietement = feature.properties.cote_part_empietement;
    geojson.COLLECTIVITE_REF = feature.properties.COLLECTIVITE_REF;
    geojson.REF_FONCIERE = feature.properties.REF_FONCIERE;
    geojson.CONSISTANCE = feature.properties.CONSISTANCE;
    geojson.CODE_PARCELLE = feature.properties.CODE_PARCELLE;
    geojson.SEXE = feature.properties.SEXE;
    geojson.FRACTION = feature.properties.FRACTION;
    geojson.LISTE_AD = feature.properties.LISTE_AD;
    geojson.N_ORDRE_LISTE_AD = feature.properties.N_ORDRE_LISTE_AD;
    geojson.Superficie_Si = feature.properties.Superficie_Si;
    geojson.PLU_VALU_EXPLOITATION = feature.properties.PLU_VALU_EXPLOITATION;
    geojson.LIVRAISON = feature.properties.LIVRAISON;
    geojson.INTEGRATION = feature.properties.INTEGRATION;
    geojson.ORGANISME = feature.properties.ORGANISME;
    geojson.Location = feature.geometry;


    // // save geoJSON object to database 
    // var query = db.collection("geoJSON").insert(geojson);
    // assert.ok(!(query instanceof Promise));
    // const promise = query.exec();
    // promise.ok(promise instanceof Promise);
    // promise


    db.collection("geoJSON").insertOne(geojson)
        .then(geo => {

            console.log('\n\ngeojson = ' + geojson._id + '\n\n')
            // set all parcelles shapes     for     GeoMap
            let all_Parcelle = [];

            // counter
            let j = 0;

            // set Tables data List         for     GeoTable
            let dataList = [];

            geo.ops.forEach(G => {


                console.log('\n\nG[' + j + '] = \n' + (geo))

                // set single parcelle shape    for     GeoRapport
                let one_parcelle = {};

                //console.log("\ngeo.ops.G " + j + "  : " + JSON.stringify(G) + "\n")

                // set Table data List
                dataList.push(
                    {
                        N_ordre: G.N_ordre,
                        NUMERO_DOSSIER: G.NUMERO_DOSSIER,
                        Nom_AR: G.Nom_AR,
                        NOm_FR: G.NOm_FR,
                        CIN: G.CIN,
                        PROVINCE: G.PROVINCE,
                        CERCLE: G.CERCLE,
                        CAIDAT: G.CAIDAT,
                        COMMUNE: G.COMMUNE,
                        LIEUX_RESIDENCE: G.LIEUX_RESIDENCE,
                        QUALITE: G.QUALITE,
                        cote_part_empietement: G.cote_part_empietement,
                        COLLECTIVITE_REF: G.COLLECTIVITE_REF,
                        REF_FONCIERE: G.REF_FONCIERE,
                        CONSISTANCE: G.CONSISTANCE,
                        CODE_PARCELLE: G.CODE_PARCELLE,
                        SEXE: G.SEXE,
                        FRACTION: G.FRACTION,
                        LISTE_AD: G.LISTE_AD,
                        N_ORDRE_LISTE_AD: G.N_ORDRE_LISTE_AD,
                        Superficie_Si: G.Superficie_Si,
                        PLU_VALU_EXPLOITATION: G.PLU_VALU_EXPLOITATION,
                        LIVRAISON: G.LIVRAISON,
                        INTEGRATION: G.INTEGRATION,
                        ORGANISME: G.ORGANISME,
                        _id: G._id,
                        //DXF: G.DXF
                    }
                );

                // set single parcelle shape
                one_parcelle.coordinates = G.Location.coordinates;
                //console.log('\n\n\nG.Location.coordinates :  ' + JSON.stringify(G.Location.coordinates) + '\n\n\n')

                one_parcelle.type = G.Location.type;
                //console.log('\n\n\nG.Location.type :  ' + JSON.stringify(G.Location.type) + '\n\n\n')

                one_parcelle._id = G._id;
                //console.log('\n\n\nG._id :  ' + JSON.stringify(G._id) + '\n\n\n')


                //console.log("\ngeo.ops." + j + " - one_parcelle : " + JSON.stringify(one_parcelle) + "\n")


                // set all parcelles shapes
                all_Parcelle.push(one_parcelle);
                //console.log("\ngeo.ops." + j + "  : all_Parcelle" + all_Parcelle + "\n")
                //console.log("\ngeo.ops." + j + "  : all_Parcelle    count" + all_Parcelle.length + "\n")

                //console.log('\n\n\nshape ' + j + " = " + JSON.stringify(geo)+"\n\n\n")
                j++;
            });

            //console.log('\n\n\nFinally :  ' + JSON.stringify(all_Parcelle) + '\n\n\n')
            //console.log('\n\n\nFInally :  ' + JSON.stringify(dataList) + '\n\n\n')

            res.send({
                'all_parcelles': all_Parcelle,
                'response': geo,
                'dataList': dataList
            });
        })
        .catch(err => {
            console.log('\n\n Error DTB: ' + JSON.stringify(err))
            res.send(err)
        });


    /* geojson.save()
    .then(G => {
        // set Tables data List         for     GeoTable
        let dataList = [];
 


        // geo.ops.forEach(G => {
             console.log('\n\nG['+i+'] of await geojson.save() = :n' + JSON.stringify(G) + '\n\n')
             i++;
        // })

        res.send({
            //'all_parcelles': all_Parcelle,
            'response': G,
            'dataList': dataList
        });
    }).
    catch(err => {
        console.log('\n\n Error DTB - insert(): ' + JSON.stringify(err))
        res.send(err)
    }) */

}

// Handle view geojson info         ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++     Done
exports.view = function (req, res) {
    let Parcelle = req.params.geo_id;

    //console.log('\n\nParcell id = ' + Parcelle + '\n\n')

    geoJSON.findById(Parcelle, function (err, geojson) {
        if (err) {
            res.send(err);
        } else {



            //console.log('\n\ngeojson = ' + geojson.ops._id + '\n\n')

            db.collection("geoJSON").findOne({ "SEXE": "H" }, function (err, parcelle) {

                if (err) {
                    res.err("Something went wrong:\n " + JSON.stringify(err))
                } else if (parcelle == null || parcelle == {}) {
                    res.send("ID not Found !\n   " + JSON.stringify(parcelle))
                } else {

                    let cartouche = JSON.parse(parcelle.DXF);

                    res.json(cartouche);
                }
            });

        }
    });
};

// Handle update geojson info       --------------------------------------------------------------------------------     not yet
exports.update = function (req, res) {
    geoJSON.findById(req.params.contact_id, function (err, geojson) {
        if (err)
            res.send(err);
        geojson.name = req.body.name ? req.body.name : geojson.name;
        geojson.gender = req.body.gender;
        geojson.email = req.body.email;
        geojson.phone = req.body.phone;
        // save the geojson and check for errors
        geojson.save(function (_err) {
            if (_err)
                res.json(_err);
            res.json({
                message: 'geoJSON Info updated',
                data: geojson
            });
        });
    });
};


// Handle delete geojson    ----------------------------------------------------------------------------------------     not yet
exports.delete = function (req, res) {
    geoJSON.remove({
        _id: req.params.contact_id
    }, function (err, geojson) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'geoJSON deleted'
        });
    });
}



//--------------------------------------------------------------------------------------------------\\



let cartouche = (parcelle) => {

    var output = {
      	layer : "white",
      	//origin: [-6.840067596247336,32.34626023936869],
        units: makerjs.unitType.Meter,
        paths: {
        },
        models: {
            block : {
              origine: [0, 0],
              layer: "blue",
              paths: {},
              models: {
                frame : new makerjs.models.Rectangle(202.00, 282.200),
          	centrer : {
                layer : "yellow",
              	origin: [0, 0],
            	models:	{
                  cartouche : {
              			layer : "lime",
                    	origin : [-202*3, -282],
                    	paths: {},
                    	models: {
                        	s1: new makerjs.models.Rectangle(404.00, 564.400),
                            // Outer Right Rectangle
                            s2: {
                                    layer: "silver",
                                    origin: [202, 282],
                                    models: {
                                        cadre : new makerjs.models.Rectangle(404.00, 564.400),
                                        
                                        shape: {
                                            layer: "red",

                                            units: makerjs.unitType.Meter,
                                            models: {
                                                parcelle: {


                                                }
                                            },
                                            paths: {
                                            }
                                        }
                                    },
                                    paths: {
                                    }
                                },
                            //Inner Left Rectangle
                            s3: new makerjs.models.Rectangle(364.660, 548.210),
                            //Inner Left Rectangle Title
                            s4: new makerjs.models.Rectangle(364.660, 34.260),
                            //Inner Left Rectangle Plan Parcellaire
                            s5: new makerjs.models.Rectangle(364.660, 31.040),
                            //Inner Left Rectangle Administratif fonciere
                            s6: new makerjs.models.Rectangle(364.660, 86.270),
                            //Inner Left Rectangle occupation et superfidie
                            s7: new makerjs.models.Rectangle(364.660, 91.600),
                            //Inner Left Rectangle photo
                            s8: new makerjs.models.Rectangle(364.660, 125.050),
                            //Inner Left Rectangle apercue exploitation
                            s9: new makerjs.models.Rectangle(364.660, 115.370),
                            //Inner Left Rectangle Visa
                            s10: new makerjs.models.Rectangle(364.660, 64.770),
                            //Inner right Rectangle KeyMap
                            s11: new makerjs.models.Rectangle(90.400, 53.550),
                            //Inner right Rectangle
                            s12: new makerjs.models.Rectangle(364.660, 548.210),
                            //Inner left Rectangle visa left           
                            s13: {
                                units: makerjs.unitType.Meter,
                                models: {
                                    RoundRectangle: new makerjs.models.RoundRectangle(173.850, 57.600, 8)
                                },
                                paths: {
                                }
                            },
                            //Inner left Rectangle visa right
                            s14: {
                                models: {
                                    RoundRectangle: new makerjs.models.RoundRectangle(170.940, 47.450, 8)
                                },
                                paths: {
                                }
                            },
                            //Inner left Rectangle visa left           
                            // s13: new makerjs.models.RoundRectangle(173.850, 57.600, 8),
                            // //Inner left Rectangle visa right
                            // s14: new makerjs.models.RoundRectangle(170.940, 47.450, 8),
                            //Inner left Rectangle
                            s15: new makerjs.models.Rectangle(92.820, 10.680),
                            //Inner left Rectangle
                            s16: new makerjs.models.Rectangle(174.690, 66.380),
                            //Inner left Rectangle
                            s17: new makerjs.models.Rectangle(174.420, 102.960),
                            //Inner left Rectangle
                            s18: new makerjs.models.Rectangle(187.460, 120.840),
                            //Inner left Rectangle
                            s19: new makerjs.models.Rectangle(174.980, 75.000),
                            //Inner left Rectangle
                            s20: new makerjs.models.Rectangle(364.660, 548.210),
                            //Inner left Rectangle                   
                            s21: new makerjs.models.Rectangle(174.440, 13.00),
                            //Inner left Rectangle
                            s22: new makerjs.models.Rectangle(174.440, 60.860),
                            //Inner left Rectangle
                            s23: new makerjs.models.Rectangle(174.690, 66.380),
                            s24: {
                              models: {
                                1: new makerjs.models.Rectangle(175.570, 66.3680)
                              }
                            },
                            //Inner left Rectangle
                            s25: new makerjs.models.Rectangle(327.070, 21.420)
                        }
                  }
            }
          }
          
            // Outer Left Rectangle  
              }
              
            }
            

        }
    };

    //set round rectangle corner's color
    
    
    //move Rectangle 
    output.models.block.models.centrer.models.cartouche.models.s2.origin = [404.00, 0];		//ok
    output.models.block.models.centrer.models.cartouche.models.s3.origin = [19.670, 6.330];    //ok
    output.models.block.models.centrer.models.cartouche.models.s4.origin = [19.670, 520];		//ok
    output.models.block.models.centrer.models.cartouche.models.s5.origin = [19.670, 488.96];	//ok
    output.models.block.models.centrer.models.cartouche.models.s6.origin = [19.670, 402.69];	//ok
    output.models.block.models.centrer.models.cartouche.models.s7.origin = [19.670, 311.09];	//ok
    output.models.block.models.centrer.models.cartouche.models.s8.origin = [19.670, 186.04];	//ok
    output.models.block.models.centrer.models.cartouche.models.s9.origin = [19.670, 70.67];	//ok
    output.models.block.models.centrer.models.cartouche.models.s10.origin = [19.670, 6];		//ok
    output.models.block.models.centrer.models.cartouche.models.s11.origin = [428.860, 14.130];	//ok
    output.models.block.models.centrer.models.cartouche.models.s12.origin = [19.670, 6];		//ok
    output.models.block.models.centrer.models.cartouche.models.s13.origin = [26, 9.500];		//ok
    output.models.block.models.centrer.models.cartouche.models.s14.origin = [205.110, 20.030];	//
    output.models.block.models.centrer.models.cartouche.models.s15.origin = [249.610, 7.280];		//
    output.models.block.models.centrer.models.cartouche.models.s16.origin = [25.720, 72.760];		//
    output.models.block.models.centrer.models.cartouche.models.s17.origin = [205.470, 72.760];		//
    output.models.block.models.centrer.models.cartouche.models.s18.origin = [102.400, 189.030];		//
    output.models.block.models.centrer.models.cartouche.models.s19.origin = [23.1, 313.580];		//
    output.models.block.models.centrer.models.cartouche.models.s20.origin = [19.670, 6];		//
    output.models.block.models.centrer.models.cartouche.models.s21.origin = [204.250, 313.580];		//
    output.models.block.models.centrer.models.cartouche.models.s22.origin = [204.250, 327.700];		//
    output.models.block.models.centrer.models.cartouche.models.s23.origin = [23.390, 406.470];		//
    output.models.block.models.centrer.models.cartouche.models.s24.origin = [204.720, 406.470];		//
    output.models.block.models.centrer.models.cartouche.models.s25.origin = [41.580, 493.750];		//
    //output.models.allShapes.origin = [250.00, 293.50];		//

    return output;
}
