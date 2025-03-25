# CodeGuard: AI-Powered Code Quality Analyzer

## Overview
CodeGuard is a lightweight tool that analyzes JavaScript (React) and Python (FastAPI) code files, scoring them on clean coding practices and providing recommendations for improvement. It helps developers maintain high-quality, readable, and maintainable code by evaluating aspects like naming conventions, modularity, documentation, formatting, and best practices.

## Features
- Supports JavaScript & Python – Analyze .js, .jsx, and .py files
- Automated Code Scoring – Provides a score out of 100 based on clean coding principles
-  Detailed Feedback – Highlights issues in naming, function length, comments, formatting, reusability, and best practices
-  Actionable Recommendations – Offers clear suggestions for improving code quality
-  Simple Web Interface – Upload and analyze files using a React-based UI
-  Fast & Efficient API – Powered by FastAPI with static analysis tools like pylint, flake8, radon, and eslint
-  Implement AI-based suggestions using LLMs
-  Generate reports with visual insights

## Tech Stack
**Frontend**  
React (File Upload + Result Display)

**Backend**  
FastAPI (Python)

**Libraries & Tools**  
Python: pylint, flake8, radon (for Python code analysis)  
JavaScript: eslint, regex-based static analysis

## Installation & Setup
1. **Clone the Repository**
```bash
git clone https://github.com/yourusername/codeguard.git
cd codeguard
```

2. **Install Backend Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

3. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

4. **Run the Backend (FastAPI)**
```bash
uvicorn main:app --reload
```

5. **Run the Frontend (React)**
```bash
npm start
```

## Usage
1. Upload a .js, .jsx, or .py file via the React UI
2. The backend will analyze the code and return a score
3. View a category-wise breakdown of your score
4. Get recommendations to improve code quality

## Scoring Criteria
-------------------------------------------
| Category                    | Weightage |
|-----------------------------|-----------|
| Naming Conventions          | 10%       |
| Function Length & Modularity| 20%       |
| Comments & Documentation    | 20%       |
| Formatting & Indentation    | 15%       |      
| Reusability & DRY           | 15%       |
| Best Practices in Web Dev   | 20%       |
-------------------------------------------
## Future Improvements
- 🚀 Add support for more languages like TypeScript and Go

## Contributing
We welcome contributions! Feel free to fork the repo and submit pull requests.

## License
MIT License