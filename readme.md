--- ONLINE APPOINTMENT SYSTEM ---

- enter "npm run dev" on the terminal to run both client and server.
- login page for applicant is http://localhost:3000/
- login page for reviewer is http://localhost:3000/reviewer
- database collections used are applicants, applications, documents, reviewers and doctypes.
- sample data for reviewers collection...
  [
  {
  "email" : "reviewer@email.com",
  "password" : "password"
  }
  ]
- sample data for doctypes collection...
  [
  {
  "name" : "document1",
  "requirements" : [
  "document4",
  "document5",
  "document6"
  ],
  "amount" : 1000
  }
  {
  "name" : "document2",
  "requirements" : [
  "document7",
  "document8",
  "document9"
  ],
  "amount" : 800
  }
  {
  "name" : "document3",
  "requirements" : [
  "document2",
  "document4",
  "document6",
  "document8"
  ],
  "amount" : 600
  }
  {
  "name" : "document4",
  "requirements" : [],
  "amount" : 0
  }
  {
  "name" : "document5",
  "requirements" : [],
  "amount" : 0
  }
  {
  "name" : "document6",
  "requirements" : [],
  "amount" : 0
  }
  {
  "name" : "document7",
  "requirements" : [],
  "amount" : 0
  }
  {
  "name" : "document8",
  "requirements" : [],
  "amount" : 0
  }
  {
  "name" : "document9",
  "requirements" : [],
  "amount" : 0
  }
  ]
