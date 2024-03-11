require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./passport.js");
const passport = require("passport");
const cookieSession = require("cookie-session");
const app = express();
const authRoute = require("./routes/auth");
const userRoutes = require("./routes/users");
const courseRoutes=require('./routes/course.js');
const announcementRoutes=require('./routes/announcement.js')
const db = require('./db/conn')
const emailRoutes = require("./routes/email");
const searchRoute = require("./routes/search");
const port = process.env.PORT || 3000;

const assignmentRoutes = require("./routes/assignment.js");
const enrollmentRoutes = require("./routes/enrollment.js");
const submissionRoutes = require("./routes/submission.js");
const adminRoutes = require("./routes/admin.js");
const uploadFilesRoutes=require("./routes/file.js");
const chatRoutes = require("./routes/chat.js");

app.use(
    cors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,PATCH",
        credentials: true,
        headers: "Content-Type,X-Auth-Token,Origin,Authorization,X-Requested-With,Access-Control-Allow-Headers,access-control-allow-credentials",
    })
);

app.use(
    cookieSession({
        name:"session",
        keys:["etmeyers"],
        maxAge: 864 * 100 * 100,
    })
);
// app.get('/about',(req,res)=>{
//   res.send('<p>Check</p>');
// });

app.use(userRoutes);
app.use(emailRoutes);
app.use(assignmentRoutes);
app.use(enrollmentRoutes);
app.use(submissionRoutes);
app.use(announcementRoutes);
app.use(searchRoute);
app.use(adminRoutes);
app.use(chatRoutes);
//app.use(uploadFilesRoutes);
app.use("/auth", authRoute);
app.use(courseRoutes)
app.use(passport.initialize());
app.use(passport.session());
db.run()
app.listen(port, () => console.log(`Listening on port ${port}...`));

