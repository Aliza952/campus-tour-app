import React, { useState, useEffect } from 'react';

const STORAGE_KEY = 'sakec_library_books';

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', available: true, dueDate: null },
  { id: 2, title: '1984', available: true, dueDate: null },
  { id: 3, title: 'To Kill a Mockingbird', available: true, dueDate: null },
  { id: 4, title: 'The Catcher in the Rye', available: true, dueDate: null },
  { id: 5, title: 'Pride and Prejudice', available: true, dueDate: null },
];

export default function LibrarySystem({ onBack }) {
  const [books, setBooks] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    try {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) && parsed.length ? parsed : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const borrowBook = (id) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);
    const updated = books.map(b =>
      b.id === id ? { ...b, available: false, dueDate: dueDate.toISOString() } : b
    );
    setBooks(updated);
  };

  const returnBook = (id) => {
    const updated = books.map(b =>
      b.id === id ? { ...b, available: true, dueDate: null } : b
    );
    setBooks(updated);
  };

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  const borrowedBooks = books.filter(b => !b.available);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'sans-serif',
      background: '#f4f6f8',
      minHeight: '100vh',
      padding: '40px',
      position: 'relative',
      overflow: 'hidden',
      zIndex: 1
    }}>
      <style>
        {`
          @keyframes backgroundGlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(-45deg, #e3f2fd, #fce4ec, #e8f5e9)',
        backgroundSize: '600% 600%',
        animation: 'backgroundGlow 8s ease infinite',
        zIndex: -1
      }} />

      <div style={{
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        marginBottom: '40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center', color: 'black' }}>📖 SAKEC Library</h1>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginTop: '20px',
          gap: '30px'
        }}>
          <img
            src="/libraryphoto.png"
            alt="SAKEC Library"
            style={{
              width: '300px',
              borderRadius: '10px',
              objectFit: 'cover',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}
          />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'black' }}>
              The Shah & Anchor Kutchhi Engineering College (SAKEC) Library offers a wide collection of academic and research materials across disciplines. It supports student success through curated books, journals, and digital access, and provides a comfortable, quiet space for learning and exploration.
            </p>
            <p>
              🔗 <a href="https://www.sakec.ac.in/library" target="_blank" rel="noopener noreferrer">Visit SAKEC Library Website</a>
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'black' }}>📚 Library Management System</h2>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
            <input
              type="text"
              placeholder="🔍 Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: '12px 18px',
                fontSize: '16px',
                width: '60%',
                borderRadius: '8px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
              }}
            />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '20px',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {books.length > 0 && filteredBooks.length === 0 && search.trim() !== '' ? (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888' }}>No books found.</p>
            ) : filteredBooks.map(book => (
              <div key={book.id} style={{
                padding: '20px',
                background: 'white',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ margin: 0, color: 'black' }}>{book.title}</h3>
                  <p style={{
                    color: book.available ? 'green' : 'red',
                    fontWeight: 'bold',
                    marginTop: 6
                  }}>
                    {book.available ? 'Available' : 'Borrowed'}
                  </p>
                </div>
                <div style={{ marginTop: 'auto' }}>
                  {book.available ? (
                    <button onClick={() => borrowBook(book.id)} style={{
                      marginTop: 10,
                      padding: '10px 16px',
                      background: '#4caf50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Borrow
                    </button>
                  ) : (
                    <button onClick={() => returnBook(book.id)} style={{
                      marginTop: 10,
                      padding: '10px 16px',
                      background: '#f44336',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}>
                      Return
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button onClick={onBack} style={{
              padding: '12px 24px',
              fontSize: '16px',
              background: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              ← Back to Place Selection
            </button>
          </div>
        </div>

        <div style={{
          flex: 1,
          paddingLeft: '30px',
          borderLeft: '1px solid #ddd',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h2 style={{ marginBottom: '20px', color: 'black' }}>📖 My Borrowed Books</h2>
          {borrowedBooks.length === 0 ? (
            <p style={{ color: '#888' }}>You haven't borrowed any books yet.</p>
          ) : (
            <ul style={{ paddingLeft: 20, color: 'black' }}>
              {borrowedBooks.map(book => {
                const due = book.dueDate ? new Date(book.dueDate) : null;
                const now = new Date();
                const isOverdue = due && due < now;

                return (
                  <li key={book.id} style={{ marginBottom: '12px' }}>
                    <strong style={{ color: 'black' }}>{book.title}</strong><br />
                    {due && (
                      <>
                        Due: {due.toLocaleDateString()}
                        {isOverdue && <span style={{ color: 'red', marginLeft: 8 }}>🔴 Overdue!</span>}
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
