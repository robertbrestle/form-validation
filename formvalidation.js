FormValidationJS = {
    init:function(id) {
        // get form
        let form = document.getElementById(id);

        // register event listener
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            FormValidationJS.submit(id);
        });
    }//init
    ,
    validate:function(id) {
        // response bool
        let isValid = true;
        
        // get form
        let form = document.getElementById(id);

        // get fields and validate
        let fields = form.querySelectorAll("input, select, textarea");
        for(let i = 0; i < fields.length; i++) {
            // validate required fields
            if(fields[i].required) {
                // if empty, error
                if(fields[i].value == "") {
                    console.log("Missing field value for " + fields[i].name);
                    isValid = false;
                    continue;
                }
            }//if: required

            // validate fields with regex datasets
            if(typeof fields[i].dataset.validateRegex !== "undefined" && fields[i].dataset.validateRegex != "") {
                // set optional regex flags for field validation
                let flags = fields[i].dataset.validateRegexFlags;
                if(typeof flags === "undefined" || flags == "") {
                    flags = 'g';
                }
                // construct regex
                let regex = new RegExp(fields[i].dataset.validateRegex, flags);
                // if invalid pattern, error
                if(!regex.test(fields[i].value)) {
                    console.log("Invalid field value for " + fields[i].name);
                    isValid = false;
                    continue;
                }
            }//if: regex validation
        }

        return isValid;
    }//validate
    ,
    submit:function(id) {
        // validate form
        if(FormValidationJS.validate(id)) {
            // submit form
            FormValidationJS.sendRequestAsync(id, function(response) {
                // handle response
                console.log(response);
            });
        }else {
            // handle invalid form
            console.log("Form is invalid");
        }
    }//submit
    ,
    sendRequestAsync:function(id, callback) {
        let form = document.getElementById(id);
        // construct request body for POST
        let requestBody = {};
        if(form.method.toUpperCase() == "POST") {
            let fields = document.querySelectorAll("input, select, textarea");
            for(let i = 0; i < fields.length; i++) {
                requestBody[fields[i].name] = fields[i].value;
            }//for
        }

        // construct http request
        let http = new XMLHttpRequest();
        http.open(form.method, form.action, true);
        // set header
        http.setRequestHeader("Content-Type", "text/javascript");
        // handle response
        http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                // send callback
                callback(http.responseText);
            }
        };

        // submit
        if(form.method.toUpperCase() == "POST") {
            http.send(requestBody);
        }else {
            http.send();
        }
    }//sendRequestAsync
}//FormValidationJS