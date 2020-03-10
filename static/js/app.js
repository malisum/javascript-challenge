// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Main Script:
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //

// by Default: Load table data from data.js:
// This is an array of objects, elemnts are: datetime, city, state, country, shape, durationMinutes & comments
var tableData = data;

// Add table rows: 
displayTableRows(tableData);

// Filter dictionary 
filterValues = {}

// Datetime filter value:
dateTimeInput = d3.select("#datetime");
// State filter value:
stateInput = d3.select("#state");
// Shape filter value:
shapeInput = d3.select("#shape");

// Filter Button 
filterButton = d3.selectAll("button").select("#filter-btn");
// Reset Button 
resetButton = d3.selectAll("button").select("#reset-filter-btn");

// Apply Filter(s)
filterButton.on("click", applyFilters());

// Reset Filter(s)
// filterButton.on("click", resetFilters());

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Add Table Rows
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function displayTableRows(tableData) {
// Add table rows: 

    // Select the table id = ufo-table & add new elements
    d3.select("#ufo-table")
      .select("tbody")
      .selectAll("tr")
      .data(tableData)
      .exit()
      .remove();

    // Select the table id = ufo-table & add new elements
    d3.select("#ufo-table")
      .select("tbody")
      .selectAll("tr")
      .data(tableData)
      .enter()
      .append("tr")
      .html(function(d) {
            return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}</td><td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`;
      });

    // Return 
    return;
}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Apply filter  
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function applyFilters() {
// Apply filter based on date entered

    // Log
    console.log("Applying filter(s)...");

    // Get the Datetime filter value:
    filterValues.dateTimeValue = dateTimeInput.value;
    // Get the State filter value:
    filterValues.stateValue = stateInput.value;
    // Get the Shape filter value:
    filterValues.shapeValue = shapeInput.value;
  
    // Temp code
    filterValues.dateTimeValue = "1/1/2010";
    filterValues.stateValue = "ca";
    filterValues.shapeValue = "triangle";
    console.log(filterValues.dateTimeValue);
    console.log(filterValues.stateValue);
    console.log(filterValues.shapeValue);
    
    // Start with an empty array & load the entire data to filter 
    var filteredTableData = data;

    // Is there an input for datetime - apply filter if yes 
    if ((filterValues.dateTimeValue != "") || (filterValues.stateValue != "") && (filterValues.shapeValue != ""))
    {
        // Date Filter
        if (filterValues.dateTimeValue != "") {
            console.log(`Applying date filter... on... ${filterValues.dateTimeValue}`);
            filteredTableData = filteredTableData.filter(dateFilter);            
        }
        // State Filter
        if (filterValues.stateValue != "") {
            console.log(`Applying state filter... on... ${filterValues.stateValue}`);
            filteredTableData = filteredTableData.filter(stateFilter);            
        }
        if (filterValues.dateTimeValue != "") {
            console.log(`Applying shape filter... on... ${filterValues.shapeValue}`);
            filteredTableData = filteredTableData.filter(shapeFilter);            
        }
    }

    // Log the final output to be added to the table:     
    console.table(filteredTableData);

    // Date Filter function:
    function dateFilter(filterData) {
        if (filterData.datetime == filterValues.dateTimeValue) {
            return true;
        }
        else {
            return false;
        }
    }
    // State Filter function:
    function stateFilter(filterData) {
        if (filterData.state == filterValues.stateValue) {
            return true;
        }
        else {
            return false;
        }
    }
    // Date Filter function:
    function shapeFilter(filterData) {
        if (filterData.shape == filterValues.shapeValue) {
            return true;
        }
        else {
            return false;
        }
    }

    // Add filtered table rows 
    displayTableRows(filteredTableData);

    // Return
    return;
}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Reset filter  
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function resetFilters() {
// Reset filters 

    // Log
    console.log("Resetting filter(s)...");

    // Set the Datetime filter value:
    dateTimeInput.value = "";
    // Set the State filter value:
    stateInput.value = "";
    // Set the Shape filter value:
    shapeInput.value = "";
    
    
    // Start with an empty array & load the entire data to filter 
    var allTableData = data;

    // Add all table rows 
    displayTableRows(allTableData);

    // Return
    return;
}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
