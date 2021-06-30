let makerjs = require("makerjs");
let makerjsCreator  = require('./makerjsCreator');
let opentype = require('opentype.js');
let _font = opentype.loadSync('./public/font/FreeSans-LrmZ.ttf');



const { Model } = require("mongoose");
var rel_origin = []; // iorigin of drawing relative to the drawing it self
var originer = () => {
    return a, b;
}


function Proto() {

    let MODEL = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        paths: {
        },
        models: {
            // Outer Left Rectangle               
            s1: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(404.00, 564.400),
                }
            },
            // Outer Right Rectangle
            s2: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(404.00, 564.400)
                }
            },
            //Inner Left Rectangle
            s3:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner Left Rectangle Title
            s4: {
                mainFrame: new makerjs.models.Rectangle(364.660, 34.260),
                l1: {
                    layer: "red",
                    origin: [135, 27],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Royaume du maroc", 60)
                    }
                },
                l2: {
                    layer: "green",
                    origin: [90, 19],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Ministère de l\'interieur", 60)
                    }
                },
                l3: {
                    layer: "black",
                    origin: [45, 11],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Secrétariat Général", 60)
                    }
                },
                l4: {
                    layer: "black",
                    origin: [0, 3],
                    paths: {},
                    models: {
                        text: new makerjs.models.Text(_font, "Direction des affaires", 60)
                    }
                }
            },
            //Inner Left Rectangle Plan Parcellaire
            s5:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 31.040)
                }
            },
            //Inner Left Rectangle Administratif fonciere
            s6:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 86.270)
                }
            },
            //Inner Left Rectangle occupation et superfidie
            s7: {
                layer: "red",
                origin: [0, 0],
                mainFrame: new makerjs.models.Rectangle(364.660, 91.600),
                l1: {
                    paths: {},
                    models: {
                    }
                },
                l2: {
                    layer: "green",
                    origin: [0, 20],
                    paths: {},
                    models: {
                    }
                }
            },
            //Inner Left Rectangle photo
            s8:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 125.050)
                }
            },
            //Inner Left Rectangle apercue exploitation holder
            s9:{
                
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 115.370)
                }
            },
            //Inner Left Rectangle Visa 
            s10:{
                layer: "teal",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 64.770)
                }
            },
            //Inner right Rectangle KeyMap
            s11:{
                layer: "fuchsia",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(90.400, 53.550)
                }
            },
            //Inner right Rectangle
            s12:{
                layer: "navy",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner left Rectangle visa left           
            s13: {
                units: makerjs.unitType.Millimeter,
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(173.850, 57.600, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            //Inner left Rectangle visa right
            s14: {
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(170.940, 47.450, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            // date visa
            s15: {
                layer: "olive",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(92.820, 10.680)
                }
            },
            //aperçu de l'exploitation
            s16: {
                layer: "maroon",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.690, 102.960)
                }
            },
            //?
            s17: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.420, 102.960)
                }
            } ,
            //cadre photo
            s18: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(187.460, 120.840)
                }
            },
            //Inner left Rectangle
            s19:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.980, 75.000)
                }
            } ,
            //Inner left Rectangle 
            s20: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
                }
            },
            //Inner left Rectangle  echelle                 
             s21: {
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.440, 13.00)
                }
            },
            //Inner left Rectangle
            s22:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.440, 60.860)
                }
            },
            //Inner left Rectangle
            s23:{
                layer: "pink",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(174.690, 66.380)
                }
            },
            //Inner left Rectangle
            s24:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(175.570, 66.3680)
                }
            },
            //Inner left Rectangle Title
            s25:{
                layer: "black",
                paths: {},
                models: {
                    mainFrame: new makerjs.models.Rectangle(327.070, 21.420)
                }
            },
        }
    }


    //move Rectangle 
    MODEL.models.s2.origin = [404.00, 0];		//ok
    MODEL.models.s3.origin = [19.670, 6.330];    //ok
    MODEL.models.s4.origin = [19.670, 520];		//ok
    MODEL.models.s5.origin = [19.670, 488.96];	//ok
    MODEL.models.s6.origin = [19.670, 402.69];	//ok
    MODEL.models.s7.origin = [19.670, 311.09];	//ok
    MODEL.models.s8.origin = [19.670, 186.04];	//ok
    MODEL.models.s9.origin = [19.670, 70.67];	//ok
    MODEL.models.s10.origin = [19.670, 6];		//ok
    MODEL.models.s11.origin = [428.860, 14.130];	//ok
    MODEL.models.s12.origin = [19.670, 6];		//ok
    MODEL.models.s13.origin = [26, 9.500];		//ok
    MODEL.models.s14.origin = [205.110, 20.030];	//

    // aperçu de l'exploitation
    MODEL.models.s15.origin = [249.610, 7.280];		//
    MODEL.models.s16.origin = [25.720, 72.760];
    //cadre photo
    MODEL.models.s17.origin = [205.470, 72.760];
    // image satellitaire
    MODEL.models.s18.origin = [102.400, 189.030];
    //
    MODEL.models.s19.origin = [23.1, 313.580];
    //
    MODEL.models.s20.origin = [19.670, 6];
    //
    MODEL.models.s21.origin = [204.250, 313.580];		//
    MODEL.models.s22.origin = [204.250, 327.700];		//
    MODEL.models.s23.origin = [23.390, 406.470];		//
    MODEL.models.s24.origin = [204.720, 406.470];		//
    MODEL.models.s25.origin = [41.580, 493.750];		//
    //MODEL.models.allShapes.origin = [250.00, 293.50];		//

    

return MODEL;
}

function getScale(model, container, stage){
    // scale Factor 
    var factor;


    //console.log('\n\nL model li dayer lina l 3ella : ' + JSON.stringify(model) + '\n\n')
    // object to change its size
    var _m = makerjs.measure.modelExtents(model);
    //console.log('L m li dayer lina l 3ella : ' + JSON.stringify(_m)+ '\n\n')
    var modelWidth = _m.high[0] - _m.low[0];
    var modelHeight = _m.high[1] - _m.low[1];
    var mBase = (modelHeight > modelWidth ? modelHeight : modelWidth);

    // container that holds the object 
    var c = makerjs.measure.modelExtents(container);
    var containerWidth = c.high[0] - c.low[0];
    var containerHeight = c.high[1] - c.low[1];
    var cBase = containerHeight > containerWidth ? containerHeight : containerWidth;

    // finding the scalling direction small2big or big2small
    if(cBase > mBase){
        factor = (parseInt(cBase / mBase));
        stage ==="loading" ? echelle = " 1 / " + factor.toString() : null;
    }else{
        factor = parseInt(mBase /cBase);
        stage ==="loading" ? echelle = factor.toString() + " : 1" : null;
    }

    
    
    return factor / 2.5;
}

function main(points, parcelle) {

    // makerjs Container Model
    let model = Proto();

    //console.log('\n\nmakerjsModel.js    main(points, parcelle)  points :\n ' + JSON.stringify(points))
    //console.log('\n\nmakerjsModel.js    main(points, parcelle)  parcelle :\n ' + JSON.stringify(parcelle))

    //parcelle makerjs model
    let parcelleMakerjs = new makerjs.models.ConnectTheDots(false, points);

    // Parcelle Layer container
    var plan = {
        layer: "red",
        origin: [202, 282],
        models: {
            frame: new makerjs.models.Rectangle(202.00, 282.200),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: makerjs.model.scale(parcelleMakerjs, /* 100000 */
                        getScale(parcelleMakerjs, model.models.s2, "loading"))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    }

    
    //console.log('\n\nmakerjsModel.js    main(points, parcelle)  yes i made it ... whatever ! :\n ')

    // hide container's frames
    //delete plan.models.frame;
    // append container to  S2  sub Model in myModel() 
    model.models.s2.models.shape = plan;
    // center Parcell into the container  
    makerjs.model.center(plan.models.shape);



    //RightRect : right parcelle holder
    var _plan = {
        layer: "red",
        origin: [87.21, 51.48],
        models: {
            frame: new makerjs.models.Rectangle(87.21, 51.48),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: makerjs.model.scale(parcelleMakerjs, /*_mdl 100000 _mdl*/ getScale(parcelleMakerjs, model.models.s17.models.mainFrame, null))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    };

    // //   hide sub template frames
    // //   delete _plan.models.frame;
    //delete textLayer.models.satellitaire.models.parcelle;
    // append sub template to  S2  sub Model in myModel() 
    model.models.s17.models.shape = _plan;
    // let sub template centering sub models  
    makerjs.model.center(_plan.models.shape);



    //Left Rect : left parcelle holder
    var _plan_ = {
        layer: "blue",
        origin: [87.345, 51.48],
        models: {
            frame: new makerjs.models.Rectangle(87.345, 51.48),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: (makerjs.model.scale(parcelleMakerjs, /*boundaries 100000 boundaries*/ getScale(parcelleMakerjs, model.models.s16.models.mainFrame, null) * 1.2))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    };

    // // hide sub template frames
    // delete _plan_.models.frame;
    // delete textLayer.models.exploitation.models.parcelle;
    // append sub template to  S2  sub Model in myModel() 
    model.models.s16.models.shape = _plan_;
    // let sub template centering sub models  
    makerjs.model.center(_plan_.models.shape);

    // ADD text Layer
    //model.models.s1.models.text = makerjsCreator.textLayer();

    return makerjs.exporter.toDXF(model);
}

function testor() {
    let output = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        paths: {
        },
        models: {
            // Outer Left Rectangle               
            s1: new makerjs.models.Rectangle(404.00, 564.400),
            // Outer Right Rectangle
            s2: {
                layer: "red",
                origin: [202, 282],
                models: {
                    frame: new makerjs.models.Rectangle(202.00, 282.200),
                    shape: {
                        units: makerjs.unitType.Centimeter,
                        models: {
                            parcelle: {}
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
                units: makerjs.unitType.Millimeter,
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(173.850, 57.600, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            //Inner left Rectangle visa right
            s14: {
                models: {
                    RoundRectangle: new makerjs.models.RoundRectangle(170.940, 47.450, 8)
                },
                paths: {
                    BottomLeft: {
                        layer: "black"
                    },
                    BottomRight: {
                        layer: "black"
                    },
                    TopRight: {
                        layer: "black"
                    },
                    TopLeft: {
                        layer: "black"
                    }
                }
            },
            //Inner left Rectangle visa left           
            // s13: new m.models.RoundRectangle(173.850, 57.600, 8),
            // //Inner left Rectangle visa right
            // s14: new m.models.RoundRectangle(170.940, 47.450, 8),
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
            //Inner left Rectangle
            s24: new makerjs.models.Rectangle(175.570, 66.3680),
            //Inner left Rectangle
            s25: new makerjs.models.Rectangle(327.070, 21.420)

        }
    };

    //set round rectangle corner's color
    output.models.s13.paths.BottomLeft.layer = "black";
    output.models.s13.paths.BottomRight.layer = "black";
    output.models.s13.paths.TopRight.layer = "black";
    output.models.s13.paths.TopLeft.layer = "black";

    output.models.s14.paths.BottomLeft.layer = "black";
    output.models.s14.paths.BottomRight.layer = "black";
    output.models.s14.paths.TopRight.layer = "black";
    output.models.s14.paths.TopLeft.layer = "black";

    //move Rectangle 
    output.models.s2.origin = [404.00, 0];		//ok
    output.models.s3.origin = [19.670, 6.330];    //ok
    output.models.s4.origin = [19.670, 520];		//ok
    output.models.s5.origin = [19.670, 488.96];	//ok
    output.models.s6.origin = [19.670, 402.69];	//ok
    output.models.s7.origin = [19.670, 311.09];	//ok
    output.models.s8.origin = [19.670, 186.04];	//ok
    output.models.s9.origin = [19.670, 70.67];	//ok
    output.models.s10.origin = [19.670, 6];		//ok
    output.models.s11.origin = [428.860, 14.130];	//ok
    output.models.s12.origin = [19.670, 6];		//ok
    output.models.s13.origin = [26, 9.500];		//ok
    output.models.s14.origin = [205.110, 20.030];	//
    output.models.s15.origin = [249.610, 7.280];		//
    output.models.s16.origin = [25.720, 72.760];		//
    output.models.s17.origin = [205.470, 72.760];		//
    output.models.s18.origin = [102.400, 189.030];		//
    output.models.s19.origin = [23.1, 313.580];		//
    output.models.s20.origin = [19.670, 6];		//
    output.models.s21.origin = [204.250, 313.580];		//
    output.models.s22.origin = [204.250, 327.700];		//
    output.models.s23.origin = [23.390, 406.470];		//
    output.models.s24.origin = [204.720, 406.470];		//
    output.models.s25.origin = [41.580, 493.750];		//
    //output.models.allShapes.origin = [250.00, 293.50];		//

    return output;

}

module.exports = main;