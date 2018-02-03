Based on [tutorial](https://medium.freecodecamp.org/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2)

Hometask is below, but according to tutorial above I've used **/notes** instead of **/blogs**

-------------------------------------------------------------------------------------------------------------------
# Hometask 7

Implement blog system web-server based on Node.js + express framework.  *To get max point 5 implement advanced part.

##### Part 1:
1.	Install NodeJS. Use npm to install express framework to your project folder.
2.	Implement and run simple web-server which will always (any route, any request) return JSON of fixed blog article object.
3.	Extend web-server functionality from #2. Use Rest API to implement CRUD operations endpoints for blog articles. You can log to console all operations until part 2. Use postman, or fiddler or other tool to test your endpoints.

    Example of routes:
    - GET    /blogs
    - GET    /blogs/{id}
    - POST   /blogs
    - PUT    /blogs/{id}
    - DELETE /blogs/{id}
4.	Use any express view engine to return welcome page to user when accessing any route that server doesn’t understand/not configured. This will replace implementation from #2.

##### *Advanced:
- Use http://nodemon.io/ for development.
- Add simple logging mechanism to write URL and Date info to file per each request (try https://github.com/winstonjs/winston or any other library).

---

## Notes:
- inside of */config* should be *'db.js'* file with contents similar to the below one
    ```
    module.exports = {
        url : 'mongodb://<user name>:<user password>@ds217138.mlab.com:17138/node_js_frontcamp'
    };
    ```
- logs write to *'/app/access.log'* file (morgan logger is in use)

---
---

# Hometask 8

*To get max point 5 implement advanced part.

##### Part 2:
1. Install and setup mongoose.
2. Create Mongoose scheme for blog article model.
3. Replace "console logs"/stubs from part 1 to real communication with database.
    * Find all blogs
    * Find blog by ID
    * Insert blog
    * Update blog record
    * Delete blog from DB
4. Implement error handling middleware (examples here) which will send an error without stack trace to client.

##### *Advanced:
Describe mongoose scheme for User model. Implement user registration, add authorization and authentication using [passportjs](http://www.passportjs.org/) (any strategy) for accessing blog article.
