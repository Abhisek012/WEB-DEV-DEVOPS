const express = require("express");
const jwt = require("jsonwebtoken");
const { authmiddleware } = require("./middleware");
const { userModel, organisationModel } = require("./models");

const cors = require("cors"); 


//usersname , password | USERS table
//organisation | ORGANISATION table
//boards | BOARDS table
//issues | ISSUES table


const app = express();
app.use(express.json()); //Backend receives it as raw data.
// express.json() converts that raw JSON into a JavaScript object.
//app.use --> middlware executed bedore every request.


app.use(cors()); 

// CRATE END POINTS
app.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // const userExists = USERS.find((u) => u.username === username);
  const userExists = await userModel.findOne({
    username: username,
  });

  if (userExists) {
    res.status(411).json({
      message: "Username already exists !",
    });
    return;
  }

  // USERS.push({
  //   username,
  //   password,
  //   id: USERS_ID++,
  // });

  const newUser = await userModel.create({
    username: username,
    password: password,
  });

  res.json({
    id: newUser._id,
    message: "You have successfully signed up !",
  });
});

app.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // const userExists = USERS.find(
  //   (u) => u.username === username && u.password === password,
  // );

  const userExists = await userModel.findOne({
    username: username,
    password: password,
  });
  if (!userExists) {
    res.json(403).json({
      message: "Invalid credentials",
    });
    return;
  }

  //create a jwt token for user
  const token = jwt.sign(
    {
      userId: userExists._id,
    },
    "harkirat123123",
  );

  res.json({
    token,
  });
});

// Authneticated Route -- should use middleware
app.post("/organisation", authmiddleware, async (req, res) => {
  const userId = req.userId;

  const newOrg = await organisationModel.create({
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [],
  });

  res.json({
    message: "Org created",
    id: newOrg._id,
  });
});

app.post("/add-member-to-organisation", authmiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationID = req.body.organisationID;
  const memberUserUsername = req.body.memberUserUsername;

  // const organisation = ORGANISATION.find((org) => org.id === organisationID); //In memory DB
  const organisation = await organisationModel.findOne({
    _id: organisationID,
  }); //stroed in actual db i.e. mongodb

  if (!organisation || organisation.admin.toString() !== userId) {
    res.status(411).json({
      message:
        "Either this organisation does not exist or you are not the admin",
    });
    return;
  }

  // const memberUser = USERS.find((u) => u.username === memberUserUsername);
  const memberUser = await userModel.findOne({
    username: memberUserUsername,
  });

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists in our DB",
    });
    return;
  }

  //syntax of push array in mongoose
  // organisation.updateOne({
  //   _id:organisationID
  // },{
  //   $push:{
  //     "members": memberUser._id
  //   }
  // })

  organisation.members.push(memberUser._id);
  await organisation.save();

  res.json({
    message: "New member added.",
  });
});

app.post("/board", (req, res) => {});
app.post("/issue", (req, res) => {});

//READ END POINTS(GET) --
app.get("/organisation", authmiddleware, async (req, res) => {
  const userId = req.userId;
  const organisationID = req.query.organisationID;
  const memberUserUsername = req.query.memberUserUsername; //right now we do not using this but it is a reminder that in get request we use query insead of body to get the data

  // const organisation = ORGANISATION.find((org) => org.id === organisationID);
  const organisation = await organisationModel.findOne({
    _id: organisationID,
  });

  console.log("userId from JWT:", userId);
  console.log("admin:", organisation?.admin?.toString());
  if (!organisation || organisation.admin.toString() !== userId) {
    res.status(403).json({
      message:
        "Either this organisation does not exist or you are not the admin",
    });
    return;
  }

  const members = await userModel.find({
    _id: organisation.members
  })

  res.json({
    organisation: {
      title: organisation.title,
      description: organisation.description,
      members: members.map(m=> ({
        username: m.username,
        _id: m._id
      }))
      
    },
  });
});

app.get("/boards",authmiddleware,async  (req, res) => {

});

app.get("/issues", (req, res) => {});

app.get("/members", authmiddleware, async (req, res) => {

  const userId = req.userId;
  const organisationId = req.query.organisationId

  const organisation = await organisationModel.findOne({
    _id: organisationId
  })

  if(!organisation){
    res.status(404).json({
      message: "Organisation not found."
    })
    return
  }

  const members = await userModel.find({
    _id: organisation.members
  })
 

  
  const isAdmin = organisation.admin.toString() === req.userId;


  const isMember = organisation.members.some(
  m => m.toString() === req.userId
  );


  if(!isAdmin && !isMember){
    res.status(403).json({
      message: "You are not the part of this Organisation."
    })
    return
  }

  res.json({
    members: members.map(m => ({
      id: m._id,
      username: m.username
    }))
  })

});

//PUT END POINTS  i,e UPDATE

app.put("/issues", (req, res) => {});


app.delete("/members", authmiddleware, async (req, res) => {
  const userId = req.userId;

  const { organisationID, memberUsername } = req.body;

  console.log(req.body);

  // Find organisation
  const organisation = await organisationModel.findById(organisationID);

  if (!organisation) {
    return res.status(404).json({
      message: "Organisation does not exist",
    });
  }

  // Check admin
  if (organisation.admin.toString() !== userId) {
    return res.status(403).json({
      message: "Only admin can remove members",
    });
  }

  // Find member user
  const memberUser = await userModel.findOne({
    username: memberUsername,
  });

  if (!memberUser) {
    return res.status(404).json({
      message: "User does not exist",
    });
  }


  console.log("memberUser._id =", memberUser._id);
  console.log("members =", organisation.members);

  // Check membership
  const isMember = organisation.members.some(
    member => member.toString() === memberUser._id.toString()
  );

  if (!isMember) {
    return res.status(403).json({
      message: "User is not a member of this organisation",
    });
  }

  console.log("Members before: ")
  console.log(organisation.members)
  // Remove member
const result = await organisationModel.updateOne(
  { _id: organisationID },
  {
    $pull: {
      members: memberUser._id
    }
  }
);

console.log(result);
  console.log("Updated members list: ")
  console.log(organisation.members)

  res.json({
    message: "Member removed successfully",
  });
});

app.listen(3000);

//this is for in memory db. we will see actual database impolementation in coming weeks
