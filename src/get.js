var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
var ULR = require("url-parse");


// function searchForWord($, word) {
//     var bodyText = $('html > body').text();
//     if(bodyText.toLowerCase().indexOf(word.toLowerCase()) != -1)
//         return true;
//     else
//         return false;
// }

// // Parameter loading for Testing 
// let params = JSON.parse(fs.readFileSync("uri.json"));

/**
 * Handler function for 'request'
 */
function requestHanlder(error, response, body) {


    // Tables to iterate on, built explicitly to comment with their content
    var interests = ["dati2",   // Anagrafica
                     "dati3",   // Origine sociale
                     "dati4",   // Studi secondari superiori
                     "dati5",   // Riuscita negli studi universitari
                     "dati6",   // Condizioni di studio
                     "dati7",   // Lavoro durante gli studi
                     "dati8",   // Giudizi sull'esperienza universitaria
                     "dati9",   // Conoscenze linguistiche ed informatiche
                     "dati10",  // Prospettive di studio
                     "dati11"]; // Prospettive di lavoro
                     
                     
    // TODO Check response == 200
    if(error) {
        console.log(error);
    }
    else {

        var $ = cheerio.load(body);
        let parsedTable = {}
        
        interests.forEach((table) => {

            parsedTable[table] = {};

            const rows = $('#'+table).find("tr");
            
            // Start explore fields of table
            for(let i=0; i<rows.length; i++) {

                const key = $(rows[i]).children("th").text();
                const value = $(rows[i]).children("td").text();
                const keyClass = rows[i].attribs.class;
                
                if(keyClass &&                          // keyClass != undefined
                    keyClass.indexOf("gruppo") != -1 && // keyClass contains substring "gruppo"
                    i < rows.length-1) {                // if last row, skip this check

                    // Class "gruppo*" should may children, check with hasSubList
                    parsedTable[table][key] = {};
                    let hasSublist = false;
                    let subKey = $(rows[i+1]).children("th").text();
                    let subValue = $(rows[i+1]).children("td").text();    
                    let subKeyClass = rows[i+1].attribs.class;

                    while(subKeyClass && subKeyClass.indexOf("gruppo") == -1) {

                        hasSublist = true;
                        parsedTable[table][key][subKey] = subValue;
                        i++;

                        if(i >= rows.length) break;

                        subKey = $(rows[i]).children("th").text();
                        subValue = $(rows[i]).children("td").text();
                        subKeyClass = rows[i].attribs.class;
                    }

                    if(hasSublist) i--; // If this gruppo has children step back (we are 1 step further)
                    else parsedTable[table][key] = value; // otherwise, set value to key

                }
                else if(key != "" && value != "") {
                    // Standalone table row
                    parsedTable[table][key] = value;
                }
            }
        });

        console.log(parsedTable);
        const json = JSON.stringify(parsedTable, null, 2);
        //fs.writeFileSync("./table.json", json, "utf8");
        // Invece invia a chiamante
    }
}


/**
 * Almalaurea Params
 * key-value: example, "anno": "2017"
 * Update with these parameters the defaul params object
 */
export function getAlmalaureaData(paramsInput) {

    let header = "http://www2.almalaurea.it/cgi-php/universita/statistiche/visualizza.php?";
    let uri = header;
    // Replace (partially) default params with those in input
    // Params for the search in the url (order is important)
    let params = {
        "anno": "" + (new Date().getFullYear() - 1),    // Default: current year - 1
        "corstipo": "tutti",                    
        "ateneo": "tutti",
        "facolta": "tutti",
        "gruppo": "tutti",
        "pa": "tutti",
        "classe": "tutti",
        "corso": "tutti",
        "postcorso": "tutti",
        "isstella": "0",
        "disaggregazione": "",
        "LANG": "it",
        "CONFIG": "profilo"
    }

    for(let k in paramsInput) {

        if(params[k] == undefined)
            console.log(k + ": This param is not a supported")
        else
            params[k] = paramsInput[k]
    }


    // Build online ulr
    for(let key in params) {
        uri += key + 
                "=" +
                params[key] + 
                "&";
    }
    uri = uri.slice(0, -1); // Remove last character == &

    //                 
    // Load online Almalaurea page and get its HTML                 
    //
    request({uri: uri}, requestHanlder);
}


// Test correctness, call 
//getAlmalaureaData({"anno": "2017", "ateneo": "70024"});