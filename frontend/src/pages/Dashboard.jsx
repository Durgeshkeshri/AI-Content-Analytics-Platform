import React, { useState, useEffect } from "react";
import { api, getContent, addContent, deleteContent } from "../api";
import ContentTable from "../components/ContentTable";
import ChartSection from "../components/ChartSection";
import GeminiInsights from "../components/GeminiInsights";

export default function Dashboard({ token, onLogout }) {
  const [content, setContent] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    loadContent();
  }, [token]);

  async function loadContent() {
    try {
      setError("");
      const res = await getContent();
      setContent(res);
    } catch (err) {
      setError("Failed to fetch content.");
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await addContent(newTitle, newUrl);
      setNewTitle("");
      setNewUrl("");
      loadContent();
    } catch (err) {
      setError(err.response?.data?.detail || "Add failed");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteContent(id);
      loadContent();
    } catch (err) {
      setError("Delete failed");
    }
  }

  return (
    <div className="dashboard">
      <header>
        <h2>AI Content Analytics Dashboard</h2>
        <button onClick={onLogout}>Log out</button>
      </header>
      <section>
        <form className="add-content-form" onSubmit={handleAdd}>
          <input
            required
            placeholder="Content Title"
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
          <input
            required
            placeholder="Content URL"
            value={newUrl}
            onChange={e => setNewUrl(e.target.value)}
          />
          <button type="submit">Add Content</button>
        </form>
        {error && <div className="error">{error}</div>}
        <ContentTable
          content={content}
          onSelect={setSelectedId}
          onDelete={handleDelete}
          selectedId={selectedId}
        />
        {selectedId && (
          <>
            <ChartSection contentId={selectedId} />
            <GeminiInsights contentId={selectedId} />
          </>
        )}
      </section>
    </div>
  );
}
