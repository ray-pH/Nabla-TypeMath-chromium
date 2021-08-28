// Saves options to chrome.storage
function save_options() {
    var color = document.getElementById('color').value;

    var useAdditionalSym_val = document.getElementById('useAdditionalSym').checked;
    var useDiacritics_val    = document.getElementById('useDiacritics').checked;
    var latexMode_val        = document.getElementById('latexMode').checked;
    var keepSpace_val        = document.getElementById('keepSpace').checked;

    chrome.storage.sync.set({
        favoriteColor    : color,
        useAdditionalSym : useAdditionalSym_val,
        useDiacritics    : useDiacritics_val,
        latexMode        : latexMode_val,
        keepSpace        : keepSpace_val
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        favoriteColor: 'red',
        // likesColor: true
        useAdditionalSym : false,
        useDiacritics    : false,
        latexMode        : false,
        keepSpace        : false
    }, function(items) {
        document.getElementById('color').value = items.favoriteColor;
        // document.getElementById('like').checked = items.likesColor;
        document.getElementById('useAdditionalSym').checked = items.useAdditionalSym
        document.getElementById('useDiacritics').checked    = items.useDiacritics   
        document.getElementById('latexMode').checked        = items.latexMode       
        document.getElementById('keepSpace').checked        = items.keepSpace       
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
