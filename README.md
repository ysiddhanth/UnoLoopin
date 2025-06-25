
# UNOloopin – Build & Run Instructions

**UNOloopin** is your one stop online resource for the whole IITH community.

Its goal is to unite the IITH community in a genuine and anonymous way. This is your place to connect and develop, whether your goals are to review courses, join impactful projects, explore resources, or have open discussions.

---

##  App Features

### Anonymous Chat  
Students can communicate freely in the Anonymous Chat section without disclosing who they are. It promotes open communication and group discussion without passing judgement by providing features like:
- Global Chat  
- Queries  
- Polls  
- Course Reviews  
- Confessions page

###  Resources Section  
Resources section provides the students with notes, project ideas, study materials, and peer-shared campus guides.

###  Project Vacancies  
Students can find ongoing projects and apply according to their interests and skills in the Project Vacancies section. It provides a platform for practical experience, innovative teamwork, and skill development.

### Login System  
There are two login options available in UNOloopin:
- **Verified Login**: For accessing project vacancies and teamwork opportunities.
- **Anonymous Login**: For full access to chat and resource sections, encouraging honest discussions without revealing identity.

---

## Build & Run

This project is built using **React** with **Vite** and connected to **Firebase (Auth & Firestore)**.

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** (comes with Node.js)

---

###  Setup & Run

#### 1. Clone the Repository

```bash
git clone https://github.com/ysiddhanth/UnoLoopin.git
cd UnoLoopin
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Configure Firebase

Create a `.env` file in the project root and insert your Firebase config.  
_(Note: Currently, the config is hardcoded in the repo. This will be removed later.)_

#### 4. Run in Development Mode

```bash
npm run dev
```

Visit the app at: [http://localhost:3000](http://localhost:3000)

---
