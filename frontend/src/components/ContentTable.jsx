import React from "react";

export default function ContentTable({ content, onSelect, onDelete, selectedId }) {
  return (
    <div className="content-table">
      <h3>Your Content Registry</h3>
      {content.length === 0 ? (
        <div>No content registered yet.</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {content.map((item) => (
              <tr key={item.id} style={{ background: selectedId === item.id ? "#eee" : "inherit" }}>
                <td>{item.title}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                </td>
                <td>{new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => onSelect(item.id)}>Analytics</button>
                  <button onClick={() => onDelete(item.id)} style={{ color: "red" }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
