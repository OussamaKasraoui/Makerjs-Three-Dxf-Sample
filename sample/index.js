const makerjs = require('makerjs');
//var opentype = require('https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.0.0/opentype.min.js');

var progress = document.getElementById('file-progress-bar');
var $progress = $('.progress');

var $cadview = $('#cad-view');
var dxfContentEl = $('#dxf-content')[0];
var cadCanvas;

var _font;
const data = [];
var row_selected;
var boundaries;

// Setup the dnd listeners.
var dropZone = $('.drop-zone');
dropZone.on('dragover', handleDragOver, false);
dropZone.on('drop', onFileSelected, false);

document.getElementById('dxf').addEventListener('change', onFileSelected, false);


function onFileSelected(evt) {
    progress.style.width = '0%';
    progress.textContent = '0%';

    var file = evt.target.files[0];

    $progress.addClass('loading');

    var reader = new FileReader();
    reader.onprogress = updateProgress;
    reader.onloadend = onSuccess;
    reader.onabort = abortUpload;
    reader.onerror = errorHandler;
    reader.readAsText(file);
}

function abortUpload() {
    console.log('Aborted read!')
}

function errorHandler(evt) {
    switch (evt.target.error.code) {
        case evt.target.error.NOT_FOUND_ERR:
            alert('File Not Found!');
            break;
        case evt.target.error.NOT_READABLE_ERR:
            alert('File is not readable');
            break;
        case evt.target.error.ABORT_ERR:
            break; // noop
        default:
            alert('An error occurred reading this file.');
    }
}

function updateProgress(evt) {
    console.log('progress');
    console.log(Math.round((evt.loaded / evt.total) * 100));
    if (evt.lengthComputable) {
        var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
        if (percentLoaded < 100) {
            progress.style.width = percentLoaded + '%';
            progress.textContent = percentLoaded + '%';
        }
    }
}

function onSuccess(evt) {
    var fileReader = evt.target;
    if (fileReader.error) return console.log("error onloadend!?");
    progress.style.width = '100%';
    progress.textContent = '100%';
    setTimeout(function () { $progress.removeClass('loading'); }, 2000);

    var jsonObject = JSON.parse(fileReader.result)
    var tableRows = '';

    for (var i = 0; i < jsonObject.features.length; i++) {
        jsonObject.features[i].idRow = i;
        var arr = jsonObject.features[i];
        data.push(arr);
        tableRows +=
            "<tr>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.N_ordre + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.NUMERO_DOSSIER + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.Nom_AR + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.NOm_FR + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CIN + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.PROVINCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CERCLE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CAIDAT + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.COMMUNE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LIEUX_RESIDENCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.QUALITE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.cote_part_empietement + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.COLLECTIVITE_REF + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.REF_FONCIERE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CONSISTANCE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.CODE_PARCELLE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.SEXE + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.FRACTION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LISTE_AD + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.N_ORDRE_LISTE_AD + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.Superficie_Si + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.PLU_VALU_EXPLOITATION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.LIVRAISON + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.INTEGRATION + "</td>"
            + "<td scope='row' id='row_" + i + "'>" + arr.properties.ORGANISME + "</td>" +
            + "<td scope='row' id='row_" + i + "_bu' hidden>" + JSON.stringify(arr) + "</td>" +
            "</tr>";

    }
    $('#jsonTable').html(tableRows);


    var model = allShapes(jsonObject);

    boundaries = model;

    render(model);

}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


// Oussama Kasraoui
/*      get Scaling Factor        */
function getScale(model, container){
    // scale Factor 
    var factor;

    // object to change its size
    var m = makerjs.measure.modelExtents(model);
    var modelWidth = m.high[0] - m.low[0];
    var modelHeight = m.high[1] - m.low[1];
    var mBase = (modelHeight > modelWidth ? modelHeight : modelWidth);

    // container that holds the object 
    var c = makerjs.measure.modelExtents(container);
    var containerWidth = c.high[0] - c.low[0];
    var containerHeight = c.high[1] - c.low[1];
    var cBase = containerHeight > containerWidth ? containerHeight : containerWidth;

    // finding the scalling direction small2big or big2small
    if(cBase > mBase){
        factor = (parseInt(cBase / mBase));
    }else{
        factor = parseInt(mBase /cBase);
    }
    
    return factor / 2.5;
}
/*      loading Open Types.js fonts     */
$(document).ready(function () {

    opentype.load('/sample/fonts/FreeSans-LrmZ.ttf', function (err, fontOpenTypeJS) {

        if (err) {
            aler('the font could not be loaded :(');
        } else {
            _font = fontOpenTypeJS;
        }
    });
});

/*      render xdf object       */
function render(object) {
    // XDF file handling
    var parser = new window.DxfParser();
    var loader = new THREE.FontLoader();
    var model;

    model = makerjs.exporter.toDXF(object);

    var dxf = parser.parseSync(model);

    // Three.js changed the way fonts are loaded, and now we need to use FontLoader to load a font
    //  and enable TextGeometry. See this example http://threejs.org/examples/?q=text#webgl_geometry_text
    //  and this discussion https://github.com/mrdoob/three.js/issues/7398 
    loader.load('fonts/helvetiker_regular.typeface.json', function (font) {
        $('#cad-view').empty();
        cadCanvas = new window.ThreeDxf.Viewer(dxf, document.getElementById('cad-view'), 760, 600, font);
    });

}

/*     Table Row Selected     */
$(document).on("click", "#jsonT td", function (e) {
    row_selected = e.currentTarget.id.slice(4);
    var data_backup = $('#row_' + row_selected + '_bu').html();

    var model = myModel();
    var coords = [];

    var textLayer = {
        origin: [0, 0],
        layer: 'black',
        models: {
            titre:{
                layer: 'black',
                models: {
                }
            },
            localisation_administratif: {
                layer: 'black',
                models: {
                }
            },
            donnees_fonciere: {
                layer: 'black',
                models: {
                }
            },
            donnees_de_l_occupation:{
                models: {
                }
            },
            superficie:{
                layer: "black",
                models: {
                }
            },
            satellitaire:{
                layer: "black",
                models: {
                }
            },
            exploitation:{
                layer: "black",
                models: {
                }
            }
        },
        paths: {
        }
    };


    if (!data) {
        data = [data_backup];
    }

    
    // get parcelle points
    data[row_selected].geometry.coordinates.forEach(element => {
        element.forEach(elm => {
            elm.forEach(el => {
                coords.push(el);
            })
        });
    });

    // make model of points
    var mdl = new makerjs.models.ConnectTheDots(false, coords);
    var _mdl = mdl;

    /////////////   TEXT     ////////////////
    ////////////    Variables to use:   ayant-droit
    var ayant_droit = "plan parcellaire d'une exploitation d'un ayant droit";
    // /* textLayer.models.title = new makerjs.models.Text(_font, data[row_selected].properties.CAIDAT, 72);

    /*title  s4*/
    textLayer.models.titre.models.l1 = new makerjs.models.Text(_font, 'ROYAUME DU MAROCF', 6);
    textLayer.models.titre.models.l1.origin = [154.440, 547.760]
    textLayer.models.titre.models.l1.layer = "red";

    textLayer.models.titre.models.l2 = new makerjs.models.Text(_font, 'Ministère de l\'interieurF', 6);
    textLayer.models.titre.models.l2.origin = [154.440, 539.760]
    textLayer.models.titre.models.l2.layer = "green";

    textLayer.models.titre.models.l3 = new makerjs.models.Text(_font, 'Secrétariat GénéralF', 6);
    textLayer.models.titre.models.l3.origin = [154.440, 531.760]
    textLayer.models.titre.models.l3.layer = "black";

    textLayer.models.titre.models.l4 = new makerjs.models.Text(_font, 'Direction des affairesF', 6);
    textLayer.models.titre.models.l4.origin = [154.440, 523.760]
    textLayer.models.titre.models.l4.layer = "black";


    // /*plan parcellaire */ 
    textLayer.models.parcellaire = new makerjs.models.Text(_font, ayant_droit, 14);
    textLayer.models.parcellaire.origin = [44, 500]
    textLayer.models.parcellaire.layer = "lime";


    // /* localisation administratif */
    textLayer.models.localisation_administratif = new makerjs.models.Text(_font, "Localisation AdministratiF", 10);
    textLayer.models.localisation_administratif.origin = [23.790, 475];
    textLayer.models.localisation_administratif.layer = "black";

    textLayer.models.localisation_administratif.models.l1 = new makerjs.models.Text(_font, "Province: " + data[row_selected].properties.PROVINCE, 8);
    textLayer.models.localisation_administratif.models.l1.origin = [2, -15] ;
    textLayer.models.localisation_administratif.models.l1.layer = "black";

    textLayer.models.localisation_administratif.models.l2 = new makerjs.models.Text(_font, "Cercle: " + data[row_selected].properties.CERCLE, 8);
    textLayer.models.localisation_administratif.models.l2.origin = [2, -27];
    textLayer.models.localisation_administratif.models.l2.layer = "black";
 
    textLayer.models.localisation_administratif.models.l3 = new makerjs.models.Text(_font, "Caidat: " + data[row_selected].properties.CAIDAT, 8);
    textLayer.models.localisation_administratif.models.l3.origin = [2, -39];
    textLayer.models.localisation_administratif.models.l3.layer = "black";

    textLayer.models.localisation_administratif.models.l4 = new makerjs.models.Text(_font, "Commune: " + data[row_selected].properties.COMMUNE, 8);
    textLayer.models.localisation_administratif.models.l4.origin = [2, -51];
    textLayer.models.localisation_administratif.models.l4.layer = "clack";

    textLayer.models.localisation_administratif.models.l5 = new makerjs.models.Text(_font, "douar/Fraction: " + data[row_selected].properties.FRACTION, 8);
    textLayer.models.localisation_administratif.models.l5.origin = [2, -65];
    textLayer.models.localisation_administratif.models.l5.layer = "black";


    // /* données fonciere */
    textLayer.models.donnees_fonciere = new makerjs.models.Text(_font, 'données fonciere', 10);
    textLayer.models.donnees_fonciere.origin = [207, 475];
    textLayer.models.donnees_fonciere.layer = "black";

    textLayer.models.donnees_fonciere.models.l1 = new makerjs.models.Text(_font, "reférence fonciere: " + data[row_selected].properties.REF_FONCIERE, 8);
    textLayer.models.donnees_fonciere.models.l1.origin = [2, -20] ;
    textLayer.models.donnees_fonciere.models.l1.layer = "black";

    textLayer.models.donnees_fonciere.models.l2 = new makerjs.models.Text(_font, "Nom d'immeuble: " + data[row_selected].properties.CERCLE, 8);
    textLayer.models.donnees_fonciere.models.l2.origin = [2, -40];
    textLayer.models.donnees_fonciere.models.l2.layer = "black";
 
    textLayer.models.donnees_fonciere.models.l3 = new makerjs.models.Text(_font, "Collectivité Ethnique Proprietaire: " + data[row_selected].properties.COLLECTIVITE_REF, 7);
    textLayer.models.donnees_fonciere.models.l3.origin = [2, -60];
    textLayer.models.donnees_fonciere.models.l3.layer = "black";


    // /* données de l'occupation */
    textLayer.models.donnees_de_l_occupation = new makerjs.models.Text(_font, 'données de l\'occupation', 10);
    textLayer.models.donnees_de_l_occupation.origin = [23.790, 392];
    textLayer.models.donnees_de_l_occupation.layer = "black";

    textLayer.models.donnees_de_l_occupation.models.l1 = new makerjs.models.Text(_font, "Numéro du Dossier: " + data[row_selected].properties.NUMERO_DOSSIER, 6);
    textLayer.models.donnees_de_l_occupation.models.l1.origin = [2, -16] ;
    textLayer.models.donnees_de_l_occupation.models.l1.layer = "black";

    textLayer.models.donnees_de_l_occupation.models.l2 = new makerjs.models.Text(_font, "Numéro de la prcelle: " + data[row_selected].properties.CODE_PARCELLE, 6);
    textLayer.models.donnees_de_l_occupation.models.l2.origin = [2, -34];
    textLayer.models.donnees_de_l_occupation.models.l2.layer = "black";

    textLayer.models.donnees_de_l_occupation.models.l3 = new makerjs.models.Text(_font, "Nom de l'expaloitant: " + data[row_selected].properties.NOm_FR, 6);
    textLayer.models.donnees_de_l_occupation.models.l3.origin = [2, -52];
    textLayer.models.donnees_de_l_occupation.models.l3.layer = "black";

    textLayer.models.donnees_de_l_occupation.models.l4 = new makerjs.models.Text(_font, "Qualité de l'exploitant: " + data[row_selected].properties.QUALITE, 6);
    textLayer.models.donnees_de_l_occupation.models.l4.origin = [2, -70];
    textLayer.models.donnees_de_l_occupation.models.l4.layer = "clack";

    // /* ta bleau des superficie */  //données de l'occupation
    textLayer.models.superficie = new makerjs.models.Text(_font, 'Tableau des Superficies', 10);
    textLayer.models.superficie.origin = [207, 392];
    textLayer.models.superficie.layer = "black";

    textLayer.models.superficie.models.frame = new makerjs.models.Text(_font, "Numéro du Dossier: " + data[row_selected].properties.NUMERO_DOSSIER, 8);
    textLayer.models.superficie.models.frame.origin = [2, -24] ;
    textLayer.models.superficie.models.frame.layer = "black";

    textLayer.models.superficie.models.l2 = new makerjs.models.Text(_font, "Numéro de la prcelle: " + data[row_selected].properties.CODE_PARCELLE, 8);
    textLayer.models.superficie.models.l2.origin = [2, -48];
    textLayer.models.superficie.models.l2.layer = "black";



    /* echel */
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    // /* photo */
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    // /* apercue satellitaire */
    textLayer.models.satellitaire = new makerjs.models.Text(_font, 'Aperçu sur fond d\'image Satellitaire en date du ' + new Date().toLocaleDateString(), 6.5);
    textLayer.models.satellitaire.origin = [207, 178];
    textLayer.models.satellitaire.layer = "black";

    textLayer.models.satellitaire.models.parcelle = makerjs.cloneObject(model.models.s17);
    textLayer.models.satellitaire.models.parcelle.origin = [-1.7, -103] ;
    //textLayer.models.satellitaire.models.parcelle.layer = "black";

    var _plan = {
        layer: "red",
        origin: [87.21, 51.48],
        models: {
            frame: new makerjs.models.Rectangle(87.21, 51.48),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: makerjs.model.scale(_mdl, /* 100000 */ getScale(_mdl, model.models.s17.models.mainFrame))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    };
    
    // hide sub template frames
    delete _plan.models.frame;
    delete textLayer.models.satellitaire.models.parcelle;
    // append sub template to  S2  sub Model in myModel() 
    model.models.s17.models.shape = _plan;
    // let sub template centering sub models  
    makerjs.model.center(_plan.models.shape);

    

    // /* appercue de l'exploiteur */
    textLayer.models.exploitation = new makerjs.models.Text(_font, 'Aperçu de l\'exploitation par rapport à l\'immeuble Collectif', 6.5);
    textLayer.models.exploitation.origin = [26.740, 177.760];
    textLayer.models.exploitation.layer = "black";

    textLayer.models.exploitation.models.parcelle = makerjs.cloneObject(model.models.s16); //new makerjs.models.Rectangle(174.420, 102.960);//new makerjs.models.Text(_font, "Numéro du Dossier: " + data[row_selected].properties.NUMERO_DOSSIER, 6);
    textLayer.models.exploitation.models.parcelle.origin = [-1.7, -105] ;
    //textLayer.models.satellitaire.models.parcelle.layer = "black";

    //var b = makerjs.model.outline(mdl, 10);

    var _plan_ = {
        layer: "blue",
        origin: [87.345, 51.48],
        models: {
            frame: new makerjs.models.Rectangle(87.345, 51.48),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: (makerjs.model.scale(boundaries, /* 100000 */ getScale(boundaries, model.models.s16.models.mainFrame)*1.2))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    };
    
    // hide sub template frames
    delete _plan_.models.frame;
    delete textLayer.models.exploitation.models.parcelle;
    // append sub template to  S2  sub Model in myModel() 
    model.models.s16.models.shape = _plan_;
    // let sub template centering sub models  
    makerjs.model.center(_plan_.models.shape);

    // /* topographe */
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);

    // /* Visa */
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24);
    // textLayer.models.title = new makerjs.models.Text(_font, 'plan parcellaire Green - AEFHIKLMNTVWXYZ', 24); */


    model.models["textLayer"] = textLayer;

    ////////////////////////////////////////






    // sub template makes the "Parcell" gets to the center of the container
    var plan =  {
        layer: "red",
        origin: [202, 282],
        models: {
            frame: new makerjs.models.Rectangle(202.00, 282.200),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: makerjs.model.scale(new makerjs.models.ConnectTheDots(false, coords) , /* 100000 */ getScale(new makerjs.models.ConnectTheDots(false, coords), model.models.s2.models.mainFrame))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    }

    // hide sub template frames
    delete plan.models.frame;
    // append sub template to  S2  sub Model in myModel() 
    model.models.s2.models.shape = plan;
    // let sub template centering sub models  
    makerjs.model.center(plan.models.shape);


    //plan.models.shape.models.parcelle = makerjs.model.scale(mdl, /* 100000 */ getScale(mdl, model.models.s18.models.mainFrame))
    /* var miniPlan =  {
        layer: "red",
        origin: [202, 282],
        models: {
            frame: new makerjs.models.Rectangle(202.00, 282.200),
            shape: {
                units: makerjs.unitType.Centimeter,
                models: {
                    parcelle: makerjs.model.scale(_mdl, /* 100000 / getScale(_mdl, model.models.s18.models.mainFrame))
                },
                paths: {
                }
            }
        },
        paths: {
        }
    }

    model.models.s18.models.shape = miniPlan;  */


    // append textLayer to  S1  sub Model in myModel() 
    model.models.s1.models.text = textLayer;





    ///////////////////////////////////////////////var model = singleShape(row_selected);
    render(model);


});


/*      Render SVG      */
function renderSVG(SVGobject) {
    /*      SVGR    endrer     */
    let renderer = new THREE.SVGRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(600, 350);
    document.getElementById('cad-view').appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(75, 600 / 350, 0.1, 1000);
    camera.position.z = 35;
    var scene = new THREE.Scene();

    //3.1. Controls
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    //3.2 GUI
    var options = {
        Rotation: false
    };

    var gui = new dat.GUI();
    var f = gui.addFolder('Movement');
    f.open();
    f.add(options, 'Rotation');

    var ambient = new THREE.AmbientLight(0x80ffff);
    scene.add(ambient);
    var directional = new THREE.DirectionalLight(0xffff00);
    directional.position.set(-1, 0.5, 0);
    scene.add(directional);

    //4. Geometric Obj
    var geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
    console.log('\n\ninfo geometry1:\n' + JSON.stringify(geometry))
    var geometry1 = SVGobject
    console.log('\n\ninfo geometry:\n' + geometry1.toString())

    var material = new THREE.MeshBasicMaterial({
        color: 0x1c1c1c,
        wireframe: true
    });
    var torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    //To start the infinite loop
    function render() {
        requestAnimationFrame(render);
        if (options.Rotation) {
            animateGeom();
        }
        renderer.render(scene, camera);
    }

    render();

    function animateGeom() {
        torusKnot.rotation.x += 0.01;
        torusKnot.rotation.y += 0.01;
    };

    window.addEventListener('resize', function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);

    }, false);
}

/*      DXF Plan Model            */
function myModel() {

    var output = {
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
            //Inner left Rectangle  ichelle                 
             s21: {
                layer: "red",
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
                layer: "silver",
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
    
    // aperçu de l'exploitation
    output.models.s15.origin = [249.610, 7.280];		//
    output.models.s16.origin = [25.720, 72.760];		
    //cadre photo
   output.models.s17.origin = [205.470, 72.760];
   	// image satellitaire
    output.models.s18.origin = [102.400, 189.030];		
    //
    output.models.s19.origin = [23.1, 313.580];		
    //
    output.models.s20.origin = [19.670, 6];		
    //
    output.models.s21.origin = [204.250, 313.580];		//
    output.models.s22.origin = [204.250, 327.700];		//
    output.models.s23.origin = [23.390, 406.470];		//
    output.models.s24.origin = [204.720, 406.470];		//
    output.models.s25.origin = [41.580, 493.750];		//
    //output.models.allShapes.origin = [250.00, 293.50];		//

    return output;
}

// takes json object
// return array of coordination
function allShapes(jsonCoords) {

    var model = {
        layer: "black",
        units: makerjs.unitType.Millimeter,
        models: {},
        paths: {}
    }


    var coords = [];
    var i = 1;

    jsonCoords.features.forEach(element => {
        element.geometry.coordinates.forEach(elm => {
            elm.forEach(el => {
                coords.push(el);
                /* handle   edges*/
            })

            model.models[i] = new makerjs.models.ConnectTheDots(false, coords);

            coords = [];
            i++;
        });
    });
    return model;
}