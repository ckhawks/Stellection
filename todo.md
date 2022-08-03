# To-do, prioritized
Error handling (return HTTP codes with standardized error messages)
https://stackoverflow.com/a/67494652
https://opensource.com/article/17/3/python-flask-exceptions
https://stackoverflow.com/a/29332131
https://stackoverflow.com/a/70259840 <--

Standardize request responses
- util.responses
- - Incorrect_Arguments, 400
- - Completed

PATCH request should return the modified object
- In the case of multiple modified objects, it could return an array of all of them
  
stellaric: replace cfg usages
stellaric: replace print with logs
stellaric: add some debug logging

Database reloading bullshit
https://stackoverflow.com/questions/9561832/what-if-i-dont-close-the-database-connection-in-python-sqlite
https://stackoverflow.com/a/47501337

```
from flask import abort, jsonify

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.route("/cheese")
def get_one_cheese():
    resource = get_resource()

    if resource is None:
        abort(404, description="Resource not found")

    return jsonify(resource)
```