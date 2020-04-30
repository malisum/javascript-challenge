// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Main Script:
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //

// By Default: Load table data from data.js:
// This is an array of objects, elemnts are: datetime, city, state, country, shape, durationMinutes & comments
var tableData = data;

// Add table rows: 
displayAllTableRows();

// Filter dictionary 
filterValues = {}

// Filter Button 
// filterButton = d3.select("button").select("#filter-btn");
filterButton = d3.select("#filter-btn");
// Reset Button 
resetButton = d3.select("#reset-filter-btn");

// Apply Filter(s)
filterButton.on("click", applyFilters);

// Reset Filter(s)
resetButton.on("click", resetFilters);


// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Display all table rows
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function displayAllTableRows() {
// Add all table rows: 

    // Select the table id = ufo-table & add new elements
    var allTableRows = d3.select("#ufo-table")
                            .select("tbody")
                            .selectAll("tr")
                            .data(tableData);

    // Remove extra rows
    allTableRows.exit()
                .remove();
                
    // Add filtered rows
    allTableRows.enter()
                .append("tr")
                .html(function(d) {
                            return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}</td><td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`;
                 });

    // Return 
    return;

}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Display filtered table rows
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function displayFilteredTableRows(pTableData) {
// Add filtered table rows: 
    
    // Select the table id = ufo-table & add new elements
    var filteredTableRows = d3.select("#ufo-table")
                              .select("tbody")
                              .selectAll("tr")
                              .data(pTableData);
    
    // Remove extra rows
    filteredTableRows.exit()
                     .remove();
                
    // Add filtered rows
    filteredTableRows.enter()
                     .append("tr")
                     .merge(filteredTableRows)
                     .html(function(d) {
                            return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}</td><td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`;
                      });

    // Return 
    return;
}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// Function: Clear all table rows
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
function clearAllTableRows() {

    // empty array to clear all rows 
    var wTableData = [];
    
    // Reset all table data
    tableData = data;

    // Select the table id = ufo-table & add new elements
    var allTableRows = d3.select("#ufo-table")
                            .select("tbody")
                            .selectAll("tr")
                            .data(wTableData);

    // Remove rows
    allTableRows.exit()
                .remove();
                
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
    filterValues.dateTimeValue = d3.selectAll(".filter").select("#datetime").property("value");
    // Get the State filter value:
    filterValues.stateValue = d3.selectAll(".filter").select("#state").property("value");
    // Get the Shape filter value:
    filterValues.shapeValue = d3.selectAll(".filter").select("#shape").property("value");
    
    // Start array with tableData 
    var filteredTableData = tableData;


    // Is there an input for datetime - apply filter if yes 
    if ((filterValues.dateTimeValue != "") || (filterValues.stateValue != "") || (filterValues.shapeValue != ""))
 
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
        if (filterValues.shapeValue != "") {
            console.log(`Applying shape filter... on... ${filterValues.shapeValue}`);
            filteredTableData = filteredTableData.filter(shapeFilter);            
        }
    }

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
    displayFilteredTableRows(filteredTableData);

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

    // Reset values:
    // Set the Datetime filter value:
    d3.selectAll(".filter").select("#datetime").property("value", "");
    // Set the State filter value:
    d3.selectAll(".filter").select("#state").property("value", "");
    // Set the Shape filter value:
    d3.selectAll(".filter").select("#shape").property("value", "");
    
    // Clear exisitng data  
    clearAllTableRows();

    // Load all table rows 
    displayAllTableRows();

    // Return
    return;
}

// ********************************************************************************************************************************************* //
// --------------------------------------------------------------------------------------------------------------------------------------------- //
// ********************************************************************************************************************************************* //
