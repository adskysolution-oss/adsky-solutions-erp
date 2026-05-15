/**
 * AdSky Solution - Dynamic Form Handler
 * Ye script data ko sheet mein append karega aur documents ko Drive mein save karega.
 */

// 1. APNE DRIVE FOLDER KI ID YAHAN DAALEIN (Optionally)
// Agar aap documents ko Drive mein save karna chahte hain toh Folder ID daalein.
var DRIVE_FOLDER_ID = ""; 

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Header Row check/create karein
    var headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
    if (headers.length <= 1 && headers[0] === "") {
      headers = ["Timestamp", "Application Type"];
      for (var key in data) {
        if (key.indexOf("doc_") === -1) headers.push(key);
      }
      // Add document headers at the end
      for (var key in data) {
        if (key.indexOf("doc_") === 0) headers.push(key);
      }
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
    
    var row = [];
    headers.forEach(function(header) {
      if (header === "Timestamp") {
        row.push(new Date());
      } else if (header === "Application Type") {
        row.push(data.businessActivity || "Unknown");
      } else {
        var value = data[header] || "";
        
        // Agar value Base64 document hai toh use handle karein
        if (typeof value === 'string' && value.indexOf('data:') === 0) {
           if (DRIVE_FOLDER_ID !== "") {
             value = saveFileToDrive(value, header + "_" + (data.name || "doc"), data.mobile || "unknown");
           } else {
             // Agar Folder ID nahi hai toh link ke bajaye text daal dein agar data 50k chars se bada hai
             if (value.length > 45000) {
               value = "Document Received (Check Admin Panel)";
             }
           }
        }
        row.push(value);
      }
    });
    
    sheet.appendRow(row);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
      .setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Base64 ko Google Drive mein save karne ke liye helper function
function saveFileToDrive(base64Data, fileName, subFolder) {
  try {
    var parts = base64Data.split(',');
    var contentType = parts[0].split(':')[1].split(';')[0];
    var decodedData = Utilities.base64Decode(parts[1]);
    var blob = Utilities.newBlob(decodedData, contentType, fileName);
    
    var parentFolder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
    var folder;
    
    // Har applicant ke liye alag sub-folder (optional)
    var folders = parentFolder.getFoldersByName(subFolder);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = parentFolder.createFolder(subFolder);
    }
    
    var file = folder.createFile(blob);
    return file.getUrl(); // Sheet mein URL save hoga
  } catch (e) {
    return "Error saving file: " + e.toString();
  }
}
