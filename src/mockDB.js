export const MOCK_UNIT_USERS_DATA = {
  "be4289c7-2d97-4a07-aa85-70f42c0f195c": {
    id: "be4289c7-2d97-4a07-aa85-70f42c0f195c",
    type: "unit",
    username: "lahav",
    unitname: "להב זו הפלוגה",
    password: "7583",
    about: "חבורת שריונרים משועממים",
    location: "כיסופים",
  },
};

export const MOCK_VOLUNTEER_USERS_DATA = {
  "4cc3223-3bbf-1111-8045-3232233ff24": {
    id: "4cc3223-3bbf-1111-8045-3232233ff24",
    type: "volunteer",
    username: "yogev",
    password: "7583",
    fullname: "יוגב חדד",
    address: "פרידמן 13, פתח תקווה",
    phone: "0506793963",
    email: "yogev_83@hotmail.com",
    activeWish: "567eds76g0-77dd-aa12",
  },
};

export const MOCK_WISHS_DATA = {
  "43aad0-32vf-4d0e": {
    id: "43aad0-32vf-4d0e",
    dish: "ג'חנון",
    unitname: "פלוגת עורב",
    location: "אזור קרית שמונה",
    imageURL: "/soldiers2.jpeg",
    status: "Open", // Add status
    numSoldiers: 10, // Add numSoldiers
  },
  "555sa-ab23-3333": {
    id: "555sa-ab23-3333",
    dish: "קובה סלק",
    unitname: "גבעתי",
    location: "עוטף עזה",
    status: "Open", // Add status
    numSoldiers: 3, // Add numSoldiers
    specialRequests: "נשמח שיהיה פיקנטי",
  },
  "f84bbag0-11af-453e": {
    id: "f84bbag0-11af-453e",
    dish: "פנקייקים",
    unitname: "יחידת הנדסה",
    location: "אזור אשקלון",
    imageURL: "/soldiers1.jpeg",
    status: "Open", // Add status
    numSoldiers: 5, // Add numSoldiers
  },
  "567eds76g0-77dd-aa12": {
    id: "567eds76g0-77dd-aa12",
    dish: "שניצל וצ'פס",
    unitname: "להב",
    location: "עוטף עזה",
    imageURL: "/soldiers3.jpeg",
    status: "Active", // Add status
    numSoldiers: 2, // Add numSoldiers
    specialRequests: "מתים לשניצל וצ'יפס כמו בבית. נשמח להרבה קטשופ בבקשה",
    maker: "4cc3223-3bbf-1111-8045-3232233ff24",
  },
};
