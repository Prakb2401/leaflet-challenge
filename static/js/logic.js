var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function (data) {
    createFeatures(data.features);
   
  });

  function createFeatures(Data) {
    var quakes = [];

    for (var i = 0; i < Data.length; i++) {
        var color = "";
        if (Data[i].geometry.coordinates[2] < 10){
            color = "#6efa96";
        }
        else if (Data[i].geometry.coordinates[2] > 10 && Data[i].geometry.coordinates[2] < 20) {
            color = "#6efa73";
        }
        else if (Data[i].geometry.coordinates[2] > 20 && Data[i].geometry.coordinates[2] < 30) {
            color = "#96fa6e";
        }
        else if (Data[i].geometry.coordinates[2] > 30 && Data[i].geometry.coordinates[2] < 50) {
            color = "#b6fa6e";
        }
        else if (Data[i].geometry.coordinates[2] > 50 && Data[i].geometry.coordinates[2] < 100) {
            color = "#ecfa6e";
        }
        else if (Data[i].geometry.coordinates[2] > 100 && Data[i].geometry.coordinates[2] < 200) {
            color = "#fad96e";
        }
        else if (Data[i].geometry.coordinates[2] > 200 && Data[i].geometry.coordinates[2] < 300) {
            color = "#fabb6e";
        }
        else if (Data[i].geometry.coordinates[2] > 300 && Data[i].geometry.coordinates[2] < 400) {
            color = "#fa916e";
        }
        else if (Data[i].geometry.coordinates[2] > 400 && Data[i].geometry.coordinates[2] < 500) {
            color = "#fa6e6e";
        }
        else {
            color = "red"
        }
        let coord = [Data[i].geometry.coordinates[1],Data[i].geometry.coordinates[0]];
        quakes.push(
            L.circle(coord,{
                color: "white",
                fillColor: color,
                fillOpacity: 0.75,
                radius: (Data[i].properties.mag)*30000,
            })
            .bindPopup(`
            <h1>${Data[i].id}</h1><hr>
            <h2>EarthQuake Depth:${Data[i].geometry.coordinates[2]}</h2><hr>
            <h2>EathQuake Magnitude:${Data[i].properties.mag}</h2><hr>
            `)
        );
        var quakes_layer = L.layerGroup(quakes);
    };
        createMap(quakes_layer);
  };


function createMap(map) {
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
    
    var baseMaps = {
        "Street": street,
    };
    var overlayMaps = {
        Earthquakes: map
      };
    var Map1 = L.map("map", {
        center: [
          50.7749, 122.4194
        ],
        zoom: 5,
        layers: [street, map]
      });
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(Map1);
}
