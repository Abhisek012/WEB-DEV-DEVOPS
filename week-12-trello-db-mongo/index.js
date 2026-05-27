const express = require("express");

const jwt = require("jsonwebtoken");

const { authmiddleware } = require("./middleware");

//usersname , password | USERS table
//organisation | ORGANISATION table
//boards | BOARDS table
//issues | ISSUES table

let USERS_ID = 1;
let ORGANISATION_ID = 1;
let BOARDS_ID = 1;
let ISSUES_ID = 1;

const USERS = [
];

const ORGANISATION = [

];

const BOARDS = [
  {
    id: 1,
    title: "100xdevs website frontend",
    organistion: 1,
  },
];

const ISSUES = [
  {
    id: 1,
    title: "Add dark mode",
    boradID: 1,
    state: "IN_PROGRESS", // NEXT_UP | IN_PROGRESS | DONE | ARCHIEVED
  },
  {
    id: 2,
    title: "Add 100xdevs dashboard",
    boradID: 2,
    state: "DONE",
  },
];

const app = express();
app.use(express.json()); //Backend receives it as raw data.
// express.json() converts that raw JSON into a JavaScript object.
//app.use --> middlware executed bedore every request.

// CRATE END POINTS
app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = USERS.find((u) => u.username === username);
  if (userExists) {
    res.status(411).json({
      message: "Username already exists !",
    });
    return;
  }

  USERS.push({
    username,
    password,
    id: USERS_ID++,
  });

  res.json({
    message: "You have successfully signed up !",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userExists = USERS.find(
    (u) => u.username === username && u.password === password,
  );
  if (!userExists) {
    res.json(403).json({
      message: "Invalid credentials",
    });
  }

  //create a jwt token for user
  const token = jwt.sign(
    {
      userId: userExists.id,
    },
    "attlasiansuperpassword123123",
  );

  res.json({
    token,
  });
});

// Authneticated Route -- should use middleware
app.post("/organisation", authmiddleware, (req, res) => {
  const userId = req.userId;
  ORGANISATION.push({
    id: ORGANISATION_ID++,
    title: req.body.title,
    description: req.body.description,
    admin: userId,
    members: [],
  });

  res.json({
    message: "Org created",
    id: ORGANISATION_ID - 1,
  });
});

app.post("/add-member-to-organisation", authmiddleware, (req, res) => {
  const userId = req.userId;
  const organisationID = parseInt(req.body.organisationID);
  const memberUserUsername = req.body.memberUserUsername;

  const organisation = ORGANISATION.find((org) => org.id === organisationID);

  if (!organisation || organisation.admin !== userId) {
    res.status(411).json({
      message:
        "Either this organisation does not exist or you are not the admin",
    });
    return;
  }

  const memberUser = USERS.find((u) => u.username === memberUserUsername);

  if (!memberUser) {
    res.status(411).json({
      message: "No user with this username exists in our DB",
    });
    return;
  }

  if (organisation.members.includes(memberUser.id)) {
    return res.status(411).json({
      message: "User is already a member",
    });
  }

  organisation.members.push(memberUser.id);

  res.json({
    message: "New member added.",
  });
});

app.post("/board", (req, res) => {});
app.post("/issue", (req, res) => {});

//READ END POINTS(GET) --
app.get("/organisation", authmiddleware, (req, res) => {
  const userId = req.userId;
  const organisationID = parseInt(req.query.organisationID);

  const organisation = ORGANISATION.find((org) => org.id === organisationID);

  if (!organisation || organisation.admin !== userId) {
    res.status(411).json({
      message:
        "Either this organisation does not exist or you are not the admin",
    });
    return;
  }

  res.json({
    organisation: {
      ...organisation,
      memners: organisation.members.map((memberId) => {
        const user = USERS.find((user) => user.id === memberId);
        return {
          id: user.id,
          username: user.username,
        };
      }),
    },
  });
});
app.get("/boards", (req, res) => {});
app.get("/issues", (req, res) => {});
app.get("/members", (req, res) => {});

//PUT END POINTS  i,e UPDATE

app.put("/issues", (req, res) => {});

// DELETE END POINTS
app.delete(
  "/members/:organisationID/:memberUsername",
  authmiddleware,
  (req, res) => {
    const userId = req.userId;

    const organisationID = parseInt(req.params.organisationID);

    const memberUsername = req.params.memberUsername;

    // Find organisation
    const organisation = ORGANISATION.find((org) => org.id === organisationID);

    // Check organisation exists and requester is admin
    if (!organisation || organisation.admin !== userId) {
      return res.status(403).json({
        message: "Either organisation does not exist or you are not admin",
      });
    }

    // Find member user
    const memberUser = USERS.find((u) => u.username === memberUsername);

    // Check user exists
    if (!memberUser) {k
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Check user is actually a member
    if (!organisation.members.includes(memberUser.id)) {
      return res.status(403).json({
        message: "User is not a member of this organisation",
      });
    }

    // Remove member
    organisation.members = organisation.members.filter(
      (id) => id !== memberUser.id,
    );

    res.json({
      message: "Member removed successfully",
    });
  },
);

app.listen(3000);


//this is for in memory db. we will see actual database impolementation in coming weeks