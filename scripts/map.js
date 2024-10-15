//Set the dimensions of the SVG container
const width = 650;
const height = 600;

//Create an SVG element
const svg = d3.select("svg")
  .attr("width", width)
  .attr("height", height);

//projection
const projection = d3.geoNaturalEarth1()
  .center([-3.5, 55.4]) 
  .translate([width / 2, height / 2]);

//Create a path generator using the projection
const path = d3.geoPath().projection(projection);

//Load the map data for UK
d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(worldData => {
  const countries = topojson.feature(worldData, worldData.objects.countries).features;
  const uk = countries.filter(d => d.id === "826"); 

  //add blue rectangle to represent the sea
  svg.append('rect')
    .attr("width", width)
    .attr("height", height)
    .attr('fill', '#87CEEB');

  //add UK
  svg.selectAll('path')
    .data(uk)
    .enter().append('path')
    .attr('d', path)
    .attr('fill', '#3f9b0b')
    .attr('stroke', '#000')
    .attr('stroke-width', 0.5);
}).catch(error => {
  console.error('Error loading or parsing the TopoJSON file:', error);
});