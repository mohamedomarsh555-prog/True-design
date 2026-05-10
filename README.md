# TRUE System — UX Redesign

React app implementing the redesigned navigation UX for CPTIT TRUE.

## Project Structure

```
src/
├── components/
│   ├── Sidebar.jsx       # Navigation sidebar
│   ├── Topbar.jsx        # Top breadcrumb bar
│   ├── ReportCard.jsx    # Reusable report type card
│   └── HistoryScreen.jsx # Submission history screen
├── pages/
│   ├── Dashboard.jsx     # Home dashboard
│   ├── CoursePage.jsx    # Course report types + history
│   └── ProgramPage.jsx   # Program report types + history
├── data.js               # All courses, programs, report types
├── App.js                # Routing
└── index.css             # All styles
```

## User Flow

1. Sidebar → Courses → pick a course → **Report Types screen**
   - Main: Course Specification / CRNs / Course Report
   - Additional: Course Portfolio / Student Survey / Peer Review
2. Click any card → **History screen** (newest entry first + Add button)
3. Back button → returns to Report Types

Same flow for Programs:
- Main: Program Specification / Program Report / Program Self Study
- Additional: KPIs & Indicators / Stakeholder Survey / Accreditation Evidence

## Run locally

```bash
npm install
npm start
```

## Deploy to Netlify

**Option A — Netlify UI (drag & drop):**
1. `npm run build`
2. Go to netlify.com → "Add new site" → "Deploy manually"
3. Drag the `build/` folder

**Option B — Netlify CLI:**
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

**Option C — Connect GitHub:**
1. Push this repo to GitHub
2. Netlify → "Add new site" → "Import from Git"
3. Build command: `npm run build`
4. Publish directory: `build`

The `netlify.toml` file handles SPA routing automatically.

## Customization

- **Add courses:** edit `src/data.js` → `courses` array
- **Add programs:** edit `src/data.js` → `programs` array  
- **Add report types:** edit `courseReportTypes` or `programReportTypes` in `data.js`
- **Colors:** all in `src/index.css`
