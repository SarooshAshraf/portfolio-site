from datetime import datetime
import os
import sqlite3
from typing import List, Optional

from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DB_PATH = os.environ.get("SQLITE_PATH", "/data/notes.db")
ADMIN_PASSWORD = os.environ.get("NOTES_ADMIN_PASSWORD", "Nexus457*")

app = FastAPI(title="Notes API", version="1.1.0")

origins = [
    "https://sarooshashraf.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_conn() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def ensure_schema() -> None:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                image_data TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            );
            """
        )
        columns = {
            row["name"] for row in conn.execute("PRAGMA table_info(notes)").fetchall()
        }
        if "image_data" not in columns:
            conn.execute("ALTER TABLE notes ADD COLUMN image_data TEXT")
        conn.commit()


ensure_schema()


class NoteIn(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    content: str = Field(min_length=1)
    image_data: Optional[str] = Field(default=None, description="Data URL or base64 content")


class NoteOut(NoteIn):
    id: int
    created_at: str
    updated_at: str


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/notes", response_model=List[NoteOut])
def list_notes() -> List[NoteOut]:
    with get_conn() as conn:
        rows = conn.execute(
            "SELECT * FROM notes ORDER BY datetime(created_at) DESC, id DESC"
        ).fetchall()
        return [NoteOut(**dict(row)) for row in rows]


@app.get("/notes/{note_id}", response_model=NoteOut)
def get_note(note_id: int) -> NoteOut:
    with get_conn() as conn:
        row = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Note not found")
        return NoteOut(**dict(row))


@app.post("/notes", response_model=NoteOut, status_code=201)
def create_note(note: NoteIn) -> NoteOut:
    now = datetime.utcnow().isoformat()
    with get_conn() as conn:
        cur = conn.execute(
            """
            INSERT INTO notes (title, content, image_data, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?)
            """,
            (note.title, note.content, note.image_data, now, now),
        )
        new_id = cur.lastrowid
        row = conn.execute("SELECT * FROM notes WHERE id = ?", (new_id,)).fetchone()
        return NoteOut(**dict(row))


@app.put("/notes/{note_id}", response_model=NoteOut)
def update_note(note_id: int, note: NoteIn) -> NoteOut:
    now = datetime.utcnow().isoformat()
    with get_conn() as conn:
        cur = conn.execute(
            """
            UPDATE notes
            SET title = ?, content = ?, image_data = ?, updated_at = ?
            WHERE id = ?
            """,
            (note.title, note.content, note.image_data, now, note_id),
        )
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Note not found")
        row = conn.execute("SELECT * FROM notes WHERE id = ?", (note_id,)).fetchone()
        return NoteOut(**dict(row))


@app.delete("/notes/{note_id}", status_code=204)
def delete_note(note_id: int, admin_password: Optional[str] = Header(default=None, alias="X-Admin-Password")) -> None:
    if admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid password")
    with get_conn() as conn:
        cur = conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
        if cur.rowcount == 0:
            raise HTTPException(status_code=404, detail="Note not found")
    return None
