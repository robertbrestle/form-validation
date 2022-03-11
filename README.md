# Form Validation JS
A vanilla JavaScript implementation of form validation and asynchronous submission.

# Usage
Set up your HTML form with the required fields and validations (see `index.html`).  

Include the script and register your forms:  
```
<script src="formvalidation.js"></script>
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function () {
        FormValidationJS.init("example-form");
    }, false);
</script>
```

&nbsp;