 # HomeTask at One More Game

 A simple blockchain learning project with an Express backend and a React frontend. This README reflects recent changes made to the repo (startup fee computation, added helper, and security notes).

 See also: [INSTRUCTIONS.md](./INSTRUCTIONS.md) and [SETUP.md](./SETUP.md).

 ## Project overview

 - Backend: Node.js + Express — API lives in the repository root and serves the built React app in production.
 - Frontend: React (create-react-app / `react-scripts`) — source under `src/`.

 Core folders:
 - `config/` — runtime configuration (ports, blockchain defaults, fee defaults)
 - `models/` — domain classes (Block, Transaction, Blockchain)
 - `controllers/`, `routes/`, `middleware/` — normal Express layering
 - `utils/` — helpers including `logger.js`, `response.js`, and `fee.js`
 - `src/` — React app

 ---

 ## Getting started

 ### Prerequisites

 - Node.js v16+ (v18 or v22 recommended)
 - npm

 ### Install

 ```powershell
 npm install
 ```

 Note: `npm install` may report vulnerabilities from transitive dependencies — review `npm audit` as appropriate.

 ### Run the app in development

 Open two terminals:

 Terminal 1 — React dev server (http://localhost:3000):
 ```powershell
 npm start
 ```

 Terminal 2 — API server with auto-reload (http://localhost:3002):
 ```powershell
 npm run dev
 ```

 The API server logs startup information and computes a startup fee (logged as `Startup Fee : <value>`). The React dev server proxies `/api/*` requests to the API in development via `src/setupProxy.js`.

 ### Production

 Build the frontend and serve from the API server on a single port:
 ```powershell
 npm run serve
 ```

 ---

 ## Configuration

 Main runtime config is in `config/index.js`. Relevant env vars:
 - `PORT` — API server port (default 3002)
 - `CORS_ORIGIN` — allowed origin for the frontend (default http://localhost:3000)
 - `BLOCKCHAIN_DIFFICULTY`, `BLOCKCHAIN_MINING_REWARD` — blockchain tuning
 - `FEE_AMOUNT`, `FEE_PERCENTAGE` — controls startup fee computation

 ---

 ## API (short)

 The API follows the structure in the original task. Responses use a common envelope `{ success: true, ... }`.

 Important endpoints (examples):
 - GET `/api/chain`
 - POST `/api/transactions` — body `{ fromAddress, toAddress, amount }`
 - POST `/api/mine` — body `{ miningRewardAddress }`
 - GET `/api/balance/:address`
 - GET `/health`

 See the `routes/` and `controllers/` folders for full details.

 ---

 ## Troubleshooting

 **Server crashes on boot**
 - Ensure dependencies are installed (`npm install`).

 **Port already in use**
 ```powershell
 $env:PORT='3003'; npm run dev
 ```

 **Frontend can't reach the API**
 - Confirm the API server is running and the port matches `src/setupProxy.js` (or your `PORT`).

 **Chain resets on restart**
 - Persistent storage is not implemented by default. See `INSTRUCTIONS.md` Task 2 for guidance on adding persistence (services/persistence.service.js).

 ---

 ## License

 OMG — for learning and assessment purposes.
