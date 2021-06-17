var m = require("makerjs");

var rel_origin = []; // iorigin of drawing relative to the drawing it self
var originer = () => {
  return a, b;
}


function outerLeftRect(object) {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(404.00, 564.400),
    }
  };
}

function outerRighttRect() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(404.00, 564.400)
    }
  }
}

function innerLeftRect() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
    }
  };
}

function innerLeftRecTitle() {
  return {
    paths: {
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
    origin: [19.670, 520],
    models: {
      inner: new m.models.Rectangle(364.660, 34.260)
    },
    caption: {
      text: "B2",
      anchor: new m.paths.Line([5, 5], [5, 5])
    }
  };
}

function planParcellaire() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 31.040)
    }
  };
}

function administratifFonciere() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 86.270)
    }
  }
};

function occupationSuperficie() {
  return {
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
  };
}

function LeftRectanglePhoto() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 125.050)
    }
  };
}

function apercueExploitationHolder() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 115.370)
    }
  };
}

function Visa() {
  return {
    layer: "teal",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 64.770)
    }
  };
}

function keyMap() {
  return {
    layer: "fuchsia",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(90.400, 53.550)
    }
  };
}

function box12() {
  return {
    layer: "navy",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
    }
  };
}

function visaLeft() {
  return {
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
  };
}

function visaRight() {
  return {
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
  };
}

function dateVisa() {
  return {
    layer: "olive",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(92.820, 10.680)
    }
  };
}

function apercuEploitation() {
  return {
    layer: "maroon",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.690, 102.960)
    }
  };
}

function box17() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.420, 102.960)
    }
  };
}

function cadrePhoto() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(187.460, 120.840)
    }
  };
}

function box19() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.980, 75.000)
    }
  };
}

function box20() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(364.660, 548.210)
    }
  };
}

function box21() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.440, 13.00)
    }
  };
}

function box22() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.440, 60.860)
    }
  };
}

function box23() {
  return {
    layer: "pink",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(174.690, 66.380)
    }
  };
}

function box24() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(175.570, 66.3680)
    }
  };
}

function box25() {
  return {
    layer: "black",
    paths: {},
    models: {
      mainFrame: new makerjs.models.Rectangle(327.070, 21.420)
    }
  };
}



function main(_origin, _color) {
  return {
    layer: _color,
    origin: _origin,
    paths: {},
    models: {
      box1: outerLeftRect(),
      box2: outerRighttRect(),
      box3: innerLeftRect(),
      box4: innerLeftRecTitle(),
      box5: planParcellaire(),
      box6: administratifFonciere(),
      box7: occupationSuperficie(),
      box8: LeftRectanglePhoto(),
      box9: apercueExploitationHolder(),
      box10: Visa(),
      box11: keyMap(),
      box12: box12(),
      box13: visaLeft(),
      box14: visaRight(),
      box15: dateVisa(),
      box16: apercuEploitation(),
      box17: box17(),
      box18: cadrePhoto(),
      box19: box19(),
      box20: box20(),
      box21: box21(),
      box22: box22(),
      box23: box23(),
      box24: box24(),
      box25: box25()
    }
  };
}

module.exports = main();