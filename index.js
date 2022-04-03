const mongoose = require("mongoose");
const task = require("./model/tasks.js");


mongoose.connect("mongodb://localhost/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection
    .once("open", function () {
        console.log("Connect to db");
    })
    .on("error", function (error) {
        console.log("Error in Connection:", error);
    });


function add(desc, com) {
    var data = new task({
        Description: desc,
        Completed: com,
    });
    data.save().then(() => {
        console.log("Data Added");
    });
}

function read() {
    task.find({ Completed: false }).then(function (result) {
        if (result.length !== 0) {
            result.forEach((res) => {
                console.log(res);
            });
        } else {
            console.log("All Done");
        }
    });
}

function update() {
    task.updateMany({ Completed: false }, { Completed: true }).then(function (
        result
    ) {
        if (result.n !== 0) {
            console.log("Updation successfull");
        } else {
            console.log("No updation required");
        }
    });
}

function deletedata(data) {
    task.findOne({ Description: data }).then(function (result) {
        if (result !== null) {
            task.deleteOne({ _id: result._id }).then(function (res) {
                if (res.n !== 0) {
                    console.log(data + " task deleted");
                } else {
                    console.log("No task found");
                }
            });
        } else {
            console.log("No task found");
        }
    });
}

add("Hello world", true);
add("Welcome to Node.js", false);
read();
add("This is Express", true);
deletedata("This is Express");
add("Learn and Explore", false);
update();

