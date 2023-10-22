import { rest } from "msw";
import { v4 as uuidv4 } from "uuid";
import { MOCK_USER_DATA, MOCK_REQUESTS_DATA } from "./mockDB"; // Import MOCK_USER_DATA

// Store MOCK_USER_DATA in sessionStorage under "backend/users"
let users = JSON.parse(sessionStorage.getItem("backend/users"));
if (!users) {
  users = MOCK_USER_DATA;
  sessionStorage.setItem("backend/users", JSON.stringify(users));
}

// Store MOCK_REQUESTS_DATA in sessionStorage under "backend/requests"
let requests = JSON.parse(sessionStorage.getItem("backend/requests"));
if (!requests) {
  requests = MOCK_REQUESTS_DATA;
  sessionStorage.setItem("backend/requests", JSON.stringify(requests));
}

const handleLogin = (type) => (req, res, ctx) => {
  const { username, password } = req.body; // Get username and password from request body

  // Check if user exists and password is correct
  const user = Object.values(users).find(
    (user) =>
      user.type === type &&
      user.username === username &&
      user.password === password
  );

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

export const handlers = [
  rest.post("/api/login/unit", handleLogin("unit")),
  rest.post("/api/login/volunteer", handleLogin("volunteer")),

  rest.get("/api/user/:loginToken", (req, res, ctx) => {
    const { loginToken } = req.params;
    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
    const userData = users[tokens[loginToken]]; // Retrieve the user data associated with this token from sessionStorage

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

  rest.get("/api/requests", (req, res, ctx) => {
    // Get the session token from the request headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the request
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const requests =
      JSON.parse(sessionStorage.getItem("backend/requests")) || {};
    let filteredRequests = Object.values(requests);

    // Check if a status filter was provided in the query parameters
    const userFilter = req.url.searchParams.get("user");

    // Filter requests where the current user is either the maker or deliverer
    if (userFilter) {
      filteredRequests = filteredRequests.filter(
        (request) =>
          request.maker === userFilter || request.deliverer === userFilter
      );
    }

    // Check if a status filter was provided in the query parameters
    const statusFilter = req.url.searchParams.get("status");

    if (statusFilter) {
      filteredRequests = filteredRequests.filter(
        (request) => request.status === statusFilter
      );
    }

    return res(ctx.status(200), ctx.json(filteredRequests));
  }),

  rest.post("/api/requests", async (req, res, ctx) => {
    // Get the session token from the request headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the request
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const newRequest = await req.json(); // Get the new request from the request body
    newRequest.id = uuidv4(); // Assign a random id to the new request
    newRequest.status = "Open";

    let requests = JSON.parse(sessionStorage.getItem("backend/requests")) || {};
    requests[newRequest.id] = newRequest;
    sessionStorage.setItem("backend/requests", JSON.stringify(requests)); // Store the new request in sessionStorage under "/requests"

    // Update the relevant user with the new active request
    const tokens = JSON.parse(sessionStorage.getItem("backend/tokens")) || {};
    const currentUserId = tokens[sessionToken];
    users[currentUserId].activeRequest = newRequest.id;

    sessionStorage.setItem("backend/users", JSON.stringify(users)); // Store the updated users in sessionStorage under "/users"

    return res(ctx.status(201), ctx.json(users[currentUserId]));
  }),

  rest.put("/api/requests/:requestId", async (req, res, ctx) => {
    // Get the session token from the request headers
    const sessionToken = req.headers.get("Authorization")?.split(" ")[1];

    // Check if there is a logged-in user and if their session token matches the one from the request
    const loggedInUserToken = sessionStorage.getItem("backend/sessionToken");

    if (!loggedInUserToken || loggedInUserToken !== sessionToken) {
      return res(ctx.status(401), ctx.json({ error: "Not authorized" }));
    }

    const { requestId } = req.params;
    const requests =
      JSON.parse(sessionStorage.getItem("backend/requests")) || {};
    const request = requests[requestId];

    if (!request) {
      return res(ctx.status(404), ctx.json({ error: "Invalid request id" }));
    }

    const update = await req.json();

    // Update the request with the new data
    Object.assign(request, update);

    // If both maker and deliverer are populated, update status to Active
    if (request.maker && request.deliverer) {
      request.status = "Active";
    }

    // Save the updated requests back to sessionStorage
    sessionStorage.setItem("backend/requests", JSON.stringify(requests));

    return res(ctx.status(200), ctx.json(request));
  }),

  rest.get("/api/requests/:requestId", (req, res, ctx) => {
    const { requestId } = req.params;
    const requests =
      JSON.parse(sessionStorage.getItem("backend/requests")) || {};
    const request = requests[requestId]; // Retrieve the request associated with this id from sessionStorage

    if (!request) {
      return res(ctx.status(404), ctx.json({ error: "Invalid request id" }));
    }

    return res(ctx.status(200), ctx.json(request));
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
];
