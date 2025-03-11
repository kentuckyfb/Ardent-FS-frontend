
---

### **Project Description**
A **file search API** that uses **NLP** and **TF-IDF** to find files/folders based on natural language queries. It ranks results by relevance and returns the top 5 matches with relevancy scores.

---

### **Current Features**
1. **Natural Language Query Parsing**.
2. **File Indexing** with metadata (name, creation/modification dates).
3. **TF-IDF Search** for ranking files.
4. **Relevancy Scores** (0 to 1) for each result.
5. **REST API** (`/search`) for easy integration.

---

### **Future Developments**
1. **Advanced NLP**: Intent/entity recognition.
2. **File Content Search**: Extract text from PDFs, Word docs, etc.
3. **Improved Ranking**: Semantic search, custom algorithms.
4. **User Feedback**: Relevance feedback, personalization.
5. **Cloud Integration**: Search Google Drive, Dropbox, etc.
6. **UI**: Web or desktop app.
7. **Security**: API key authentication, access control.
8. **Advanced Queries**: Boolean search, fuzzy matching.
9. **Analytics**: Track search trends and usage.

---

### **Example Use Cases**
- Find invoices: "mullen lowe invoice march opex".
- Retrieve reports: "clientx report april budget".
- Search personal files: "vacation photos 2023".
- Cloud search: "resume pdf" across Google Drive.

---

### **Technologies**
- **Backend**: Python, FastAPI.
- **NLP**: spaCy, NLTK.
- **Search**: TF-IDF, Scikit-learn.

---


![image](https://github.com/user-attachments/assets/c92cb71d-8c28-4703-8a35-6f9186dc1ef3)
