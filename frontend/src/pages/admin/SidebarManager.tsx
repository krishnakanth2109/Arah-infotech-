import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus, ExternalLink } from "lucide-react";

interface SidebarLink {
  _id: string;
  name: string;
  link: string;
}

const SidebarManager = () => {
  const [links, setLinks] = useState<SidebarLink[]>([]);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/sidebar`);
      const data = await res.json();
      setLinks(data);
    } catch (error) {
      console.error("Error fetching sidebar links:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return alert("Please fill all fields.");

    try {
      const endpoint = editingId 
        ? `${API_URL}/api/sidebar/${editingId}` 
        : `${API_URL}/api/sidebar`;
      
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, link: url }),
      });

      if (res.ok) {
        setName("");
        setUrl("");
        setEditingId(null);
        fetchLinks();
      }
    } catch (error) {
      console.error("Error saving link:", error);
    }
  };

  const handleEdit = (link: SidebarLink) => {
    setName(link.name);
    setUrl(link.link);
    setEditingId(link._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return;

    try {
      const res = await fetch(`${API_URL}/api/sidebar/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchLinks();
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  return (
    <div className="p-6 bg-card rounded-xl shadow-sm border border-border">
      <h2 className="text-2xl font-bold mb-6">Manage Custom Sidebar Links</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 bg-muted/50 p-4 rounded-lg">
        <input
          type="text"
          placeholder="UI Name (e.g. Analytics Portal)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          // ✅ FIXED CLASSNAME: Added bg-background, text-foreground, border-input, and placeholder colors
          className="flex-1 px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <input
          type="url"
          placeholder="Redirect Link (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          // ✅ FIXED CLASSNAME: Added bg-background, text-foreground, border-input, and placeholder colors
          className="flex-1 px-4 py-2 bg-background text-foreground placeholder:text-muted-foreground border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <Button type="submit" className="min-w-[120px]">
          {editingId ? "Update Link" : <><Plus className="w-4 h-4 mr-2" /> Add Link</>}
        </Button>
        {editingId && (
          <Button type="button" variant="outline" onClick={() => { setEditingId(null); setName(""); setUrl(""); }}>
            Cancel
          </Button>
        )}
      </form>

      {/* List of Links */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-3 px-4 font-medium">UI Name</th>
              <th className="py-3 px-4 font-medium">Redirect URL</th>
              <th className="py-3 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-muted-foreground">
                  No custom links added yet.
                </td>
              </tr>
            ) : (
              links.map((item) => (
                <tr key={item._id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4">
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                      {item.link} <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(item)}>
                      <Pencil className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item._id)}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SidebarManager;