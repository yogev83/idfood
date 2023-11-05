import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import {
  MOCK_UNIT_USERS_DATA,
  MOCK_VOLUNTEER_USERS_DATA,
  MOCK_WISHS_DATA,
} from "./mockDB"; // Import MOCK_USER_DATA

// Store MOCK_USER_DATA in sessionStorage under "backend/users"
let users = JSON.parse(sessionStorage.getItem("backend/users"));
if (!users) {
  const units = MOCK_UNIT_USERS_DATA;
  const volunteers = MOCK_VOLUNTEER_USERS_DATA;
  users = { units, volunteers };
  sessionStorage.setItem("backend/users", JSON.stringify(users));
}

// Store MOCK_WISHS_DATA in sessionStorage under "backend/wishs"
let wishs = JSON.parse(sessionStorage.getItem("backend/wishs"));
if (!wishs) {
  wishs = MOCK_WISHS_DATA;
  sessionStorage.setItem("backend/wishs", JSON.stringify(wishs));
}

const handleLogin = (type) => (req, res, ctx) => {
  const { username, password } = req.body; // Get username and password from wish body
  let user;

  // Check if user exists and password is correct
  if (type === "unit") {
    user = Object.values(users.units).find(
      (user) => user.username === username && user.password === password
    );
  } else {
    user = Object.values(users.volunteers).find(
      (user) => user.username === username && user.password === password
    );
  }

  if (!user) {
    return res(
      ctx.status(401),
      ctx.json({ message: `Invalid ${type}name or password` })
    );
  }

  const token = uuidv4(); // Generate a new GUID token
  const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
  tokens[token] = user.id;
  sessionStorage.setItem("backend/tokens", JSON.stringify(tokens)); // Store the token and its data in sessionStorage

  sessionStorage.setItem("backend/sessionToken", token);
  sessionStorage.setItem("sessionToken", token); //Should this be replaced with a cookie in the real backend?...

  return res(ctx.status(200), ctx.json({ ...user, token }));
};

const handleUnitRegitration = async (req, res, ctx) => {
  const { unitname, username, password, email, about } = await req.json();

  // Check if user already exists
  const userExists = Object.values(users.units).find(
    (user) => user.username === username
  );

  if (userExists) {
    return res(
      ctx.status(400),
      ctx.json({ message: `User with username ${username} already exists` })
    );
  }

  // Create new user
  const newUser = {
    id: uuidv4(),
    unitname,
    username,
    password,
    email,
    about,
    type: "unit",
  };

  // Add new user to users
  users.units[newUser.id] = newUser;
  sessionStorage.setItem("backend/users", JSON.stringify(users));

  // Automatically log in the new user
  const token = uuidv4();
  const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
  tokens[token] = newUser.id;
  sessionStorage.setItem("backend/tokens", JSON.stringify(tokens));

  sessionStorage.setItem("backend/sessionToken", token);
  sessionStorage.setItem("sessionToken", token);

  return res(ctx.status(200), ctx.json({ ...newUser, token }));
};

const handleVolunteerRegitration = async (req, res, ctx) => {
  const { fullname, username, password, email, phone, address } =
    await req.json();

  // Check if user already exists
  const userExists = Object.values(users.volunteers).find(
    (user) => user.username === username
  );

  if (userExists) {
    return res(
      ctx.status(400),
      ctx.json({ message: `User with username ${username} already exists` })
    );
  }

  // Create new user
  const newUser = {
    id: uuidv4(),
    fullname,
    username,
    password,
    email,
    phone,
    address,
    type: "volunteer",
  };

  // Add new user to users
  users.volunteers[newUser.id] = newUser;
  sessionStorage.setItem("backend/users", JSON.stringify(users));

  // Automatically log in the new user
  const token = uuidv4();
  const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
  tokens[token] = newUser.id;
  sessionStorage.setItem("backend/tokens", JSON.stringify(tokens));

  sessionStorage.setItem("backend/sessionToken", token);
  sessionStorage.setItem("sessionToken", token);

  return res(ctx.status(200), ctx.json({ ...newUser, token }));
};

export const handlers = [
  rest.post("/api/login/unit", handleLogin("unit")),
  rest.post("/api/login/volunteer", handleLogin("volunteer")),
  rest.post("api/register/unit", handleUnitRegitration),
  rest.post("api/register/volunteer", handleVolunteerRegitration),

  rest.get("/api/user/:loginToken", (req, res, ctx) => {
    const { loginToken } = req.params;
    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};

    const userData =
      users.units[tokens[loginToken]] || users.volunteers[tokens[loginToken]]; // Retrieve the user data associated with this token from sessionStorage

    if (!userData) {
      return res(ctx.status(404), ctx.json({ error: "Invalid login token" }));
    }

    return res(
      ctx.status(200),
      ctx.json({
        ...userData,
        token: loginToken,
      })
    );
  }),

  rest.get("/api/wishs", (req, res, ctx) => {
    // // Get the session token from the wish headers
    // const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // // Check if there is a logged-in user and if their session token matches the one from the wish
    // const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    // if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
    //   return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    // }

    const wishs = JSON.parse(sessionStorage.getItem("backend/wishs")) || {};
    let filteredWishs = Object.values(wishs);

    // Check if a status filter was provided in the query parameters
    const userFilter = req.url.searchParams.get("user");

    // Filter wishs where the current user is either the maker or deliverer
    if (userFilter) {
      filteredWishs = filteredWishs.filter(
        (wish) => wish.maker === userFilter || wish.deliverer === userFilter
      );
    }

    // Check if a status filter was provided in the query parameters
    const statusFilter = req.url.searchParams.get("status");

    if (statusFilter) {
      filteredWishs = filteredWishs.filter(
        (wish) => wish.status === statusFilter
      );
    }

    return res(ctx.status(200), ctx.json(filteredWishs));
  }),

  rest.post("/api/wishs", async (req, res, ctx) => {
    // Get the session token from the wish headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the wish
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const newWish = await req.json(); // Get the new wish from the wish body
    newWish.id = uuidv4(); // Assign a random id to the new wish
    newWish.status = "Open";

    wishs[newWish.id] = newWish;
    sessionStorage.setItem("backend/wishs", JSON.stringify(wishs)); // Store the new wish in sessionStorage under "/wishs"

    // Update the relevant user with the new active wish
    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
    const currentUserId = tokens[sessionToken];
    users.units[currentUserId].activeWish = newWish.id;

    sessionStorage.setItem("backend/users", JSON.stringify(users)); // Store the updated users in sessionStorage under "/users"

    return res(ctx.status(201), ctx.json(users.units[currentUserId]));
  }),

  rest.get("/api/wishs/:id", (req, res, ctx) => {
    // Get the session token from the wish headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the wish
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const wishs = JSON.parse(sessionStorage.getItem("backend/wishs")) || {};

    // Get the wish id from the request parameters
    const wishId = req.params.id;

    // Find the wish by its id
    const wish = wishs[wishId];

    if (!wish) {
      return res(ctx.status(404), ctx.json({ error: "Wish not found" }));
    }

    return res(ctx.status(200), ctx.json(wish));
  }),

  rest.put("/api/wishs/:wishId", async (req, res, ctx) => {
    // Get the session token from the wish headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the wish
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const { wishId } = req.params;
    const wish = wishs[wishId];

    if (!wish) {
      return res(ctx.status(404), ctx.json({ error: "Invalid wish id" }));
    }

    const update = await req.json();

    // Update the wish with the new data
    Object.assign(wish, update);

    // If both maker and deliverer are populated, update status to Active
    if (wish.maker && wish.deliverer) {
      wish.status = "Active";
    }

    let currentUserId;
    if (update.status === "Closed") {
      // Remove the activeWish field from the relevant user
      const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
      currentUserId = tokens[sessionToken];
      delete users.units[currentUserId].activeWish;
      sessionStorage.setItem("backend/users", JSON.stringify(users));
    }

    // Save the updated wishs back to sessionStorage
    sessionStorage.setItem("backend/wishs", JSON.stringify(wishs));

    return res(ctx.status(200), ctx.json(users.units[currentUserId]));
  }),

  rest.get("/api/wishs/:wishId", (req, res, ctx) => {
    const { wishId } = req.params;
    const wishs = JSON.parse(sessionStorage.getItem("backend/wishs")) || {};
    const wish = wishs[wishId]; // Retrieve the wish associated with this id from sessionStorage

    if (!wish) {
      return res(ctx.status(404), ctx.json({ error: "Invalid wish id" }));
    }

    return res(ctx.status(200), ctx.json(wish));
  }),

  rest.delete("/api/wishs/:wishId", async (req, res, ctx) => {
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];
    const wishId = req.params.wishId;

    // Check if there is a logged-in user and if their session token matches the one from the wish
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
    const currentUserId = tokens[sessionToken];
    delete users.units[currentUserId].activeWish;
    sessionStorage.setItem("backend/users", JSON.stringify(users));

    delete wishs[wishId];
    sessionStorage.setItem("backend/wishs", JSON.stringify(wishs));

    return res(ctx.status(204));
  }),

  rest.post("/api/logout", (req, res, ctx) => {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return res(ctx.status(401), ctx.json({ message: "Not authorized" }));
    }

    const token = authHeader.split(" ")[1];
    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};

    if (!tokens[token]) {
      return res(ctx.status(401), ctx.json({ message: "Invalid token" }));
    }

    delete tokens[token];
    sessionStorage.setItem("backend/tokens", JSON.stringify(tokens));

    return res(
      ctx.status(200),
      ctx.json({ message: "Logged out successfully" })
    );
  }),

  rest.get("/api/wishs/:wishId", (req, res, ctx) => {
    const { wishId } = req.params;
    const wishs = JSON.parse(sessionStorage.getItem("backend/wishs")) || {};
    const wish = wishs[wishId]; // Retrieve the wish associated with this id from sessionStorage

    if (!wish) {
      return res(ctx.status(404), ctx.json({ error: "Invalid wish id" }));
    }

    return res(ctx.status(200), ctx.json(wish));
  }),
];
