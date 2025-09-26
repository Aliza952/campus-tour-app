import React, { useState, useEffect } from 'react';

export default function Cafeteria({ onBack }) {
  const [tokens, setTokens] = useState(() => {
    const saved = localStorage.getItem('tokens');
    return saved !== null && !isNaN(saved) ? parseInt(saved) : 0;
  });

  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [viewAllReceipts, setViewAllReceipts] = useState(false);

  useEffect(() => {
    localStorage.setItem('tokens', tokens);
  }, [tokens]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const handleBuyTokens = () => {
    const amount = parseInt(prompt("Enter number of tokens to buy:"));
    if (!isNaN(amount) && amount > 0) {
      setTokens(prev => prev + amount);
    }
  };

  const handleEarnTokens = () => {
    alert("✅ You earned 5 tokens!");
    setTokens(prev => prev + 5);
  };

  const handleOrder = (item, cost) => {
    if (tokens < cost) {
      alert("❌ Not enough tokens!");
      return;
    }

    const newOrder = {
      id: Date.now(),
      item,
      cost,
      time: new Date().toLocaleString()
    };

    setTokens(prev => prev - cost);
    setOrderHistory(prev => [...prev, newOrder]);

    alert("✅ Order placed! Go to 'View All Receipts' to see your receipt.");
  };

  const handleClearHistory = () => {
    if (window.confirm("Clear all receipts?")) {
      setOrderHistory([]);
    }
  };

  const handleDownloadPDF = () => {
    const text = orderHistory.map(order =>
      `${order.item} - ${order.cost} tokens\n${order.time}\n`
    ).join('\n');

    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "order_receipts.txt";
    link.click();
  };

  const categorizedMenu = {
    "🥤 Drinks": [
      { item: "Cold Coffee 🧋", cost: 7 },
      { item: "Tea 🍵", cost: 2 },
      { item: "Hot Chocolate 🍫", cost: 6 },
      { item: "Mango Juice 🥭", cost: 5 },
      { item: "Lassi 🥤", cost: 4 },
      { item: "Lemonade 🍋", cost: 3 },
      { item: "Soda 🥤", cost: 3 },
      { item: "Iced Tea 🍹", cost: 4 }
    ],
    "🍟 Snacks": [
      { item: "Veg Sandwich 🥪", cost: 10 },
      { item: "Samosa 🥟", cost: 4 },
      { item: "Cheese Balls 🧀", cost: 6 },
      { item: "Aloo Tikki 🍘", cost: 5 },
      { item: "Fries 🍟", cost: 6 },
      { item: "Vada Pav 🍔", cost: 5 },
      { item: "Paneer Roll 🌯", cost: 8 },
      { item: "Nachos 🌮", cost: 7 }
    ],
    "🍱 Meals": [
      { item: "Pizza Slice 🍕", cost: 10 },
      { item: "Pav Bhaji 🍛", cost: 12 },
      { item: "Masala Dosa 🥞", cost: 9 },
      { item: "Rajma Chawal 🍲", cost: 10 },
      { item: "Chole Bhature 🍽️", cost: 11 },
      { item: "Paneer Biryani 🍚", cost: 14 },
      { item: "Fried Rice 🍚", cost: 9 },
      { item: "Maggie Noodles 🍜", cost: 5 }
    ],
    "🍰 Sweets": [
      { item: "Gulab Jamun 🍯", cost: 5 },
      { item: "Ice Cream Sundae 🍨", cost: 6 },
      { item: "Chocolate Brownie 🍫", cost: 7 },
      { item: "Cupcake 🧁", cost: 4 },
      { item: "Rasgulla 🍥", cost: 5 },
      { item: "Fruit Custard 🍓", cost: 6 }
    ]
  };

  const groupedRows = [
    ["🥤 Drinks", "🍟 Snacks"],
    ["🍱 Meals", "🍰 Sweets"]
  ];

  return (
    <div style={{
      padding: '60px 30px',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center',
      background: '#fff8e1',
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '20px', color: 'black' }}>☕ SAKEC Cafeteria</h1>
      <img
        src="/cafeteria.jpg"
        alt="Cafeteria"
        style={{
          width: '70%',
          maxWidth: '600px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          marginBottom: '10px'
        }}
      />
      <p style={{ fontSize: '18px', color: '#444', marginBottom: '10px', lineHeight: 1.6 }}>
        The SAKEC Cafeteria is a vibrant hub for students to relax and enjoy fresh meals.
      </p>
      <p style={{ fontSize: '18px', color: '#444', marginBottom: '10px', lineHeight: 1.6 }}>
        Whether it's a quick snack or a hearty lunch, it's the place to be!
      </p>

      <h2 style={{ marginBottom: '20px', color: 'black' }}>💰 Tokens: {tokens}</h2>

      <div style={{ margin: '20px 0' }}>
        <button onClick={handleBuyTokens} style={btnStyle}>➕ Buy Tokens</button>
        <button onClick={handleEarnTokens} style={btnStyle}>🎁 Earn Tokens</button>
        {orderHistory.length > 0 && (
          <>
            <button onClick={() => setViewAllReceipts(true)} style={btnStyle}>📜 View All Receipts</button>
            <button onClick={handleDownloadPDF} style={btnStyle}>⬇️ Download</button>
            <button onClick={handleClearHistory} style={{ ...btnStyle, background: '#f44336' }}>🗑️ Clear</button>
          </>
        )}
      </div>

      <h2 style={{ marginTop: '20px', color: 'black' }}>📋 Menu</h2>

      {groupedRows.map((row, i) => (
        <div key={i} style={menuGridContainer}>
          {row.map(category => (
            <div key={category} style={menuSection}>
              <h3 style={{ color: '#333', marginBottom: '15px' }}>{category}</h3>
              {categorizedMenu[category].map((item, idx) => (
                <div key={idx} style={menuItemRow}>
                  <div style={menuItemLeft}>
                    <strong style={{ color: 'black' }}>{item.item}</strong>
                    <span style={{ color: '#666' }}> - {item.cost} tokens</span>
                  </div>
                  <button onClick={() => handleOrder(item.item, item.cost)} style={orderBtn}>Order</button>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      <button onClick={onBack} style={{
        marginTop: '20px',
        padding: '12px 24px',
        fontSize: '16px',
        background: '#ff9800',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        ← Back to Place Selection
      </button>

      {viewAllReceipts && (
        <>
          <div style={modalOverlay} onClick={() => setViewAllReceipts(false)} />
          <div style={receiptPopup}>
            <h2 style={{ color: 'black' }}>📜 Order History</h2>
            {orderHistory.map(order => (
              <div key={order.id} style={{
                marginBottom: '12px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px'
              }}>
                <p style={{ color: '#111', fontWeight: 'bold', fontSize: '16px' }}>
                  <strong>{order.item}</strong> - {order.cost} tokens
                </p>
                <p style={{ fontSize: '14px', color: '#555' }}>{order.time}</p>
              </div>
            ))}
            <button
              onClick={() => setViewAllReceipts(false)}
              style={{ ...btnStyle, background: '#607d8b', marginTop: '15px' }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Styles
const btnStyle = {
  margin: '10px 8px',
  padding: '10px 20px',
  fontSize: '14px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const orderBtn = {
  padding: '6px 16px',
  fontSize: '13px',
  background: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer'
};

const menuGridContainer = {
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  flexWrap: 'wrap',
  marginTop: '30px'
};

const menuSection = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '10px',
  padding: '20px',
  width: '320px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  flexShrink: 0
};

const menuItemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 0',
  borderBottom: '1px solid #eee'
};

const menuItemLeft = {
  textAlign: 'left',
  fontSize: '16px'
};

const receiptPopup = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  background: '#fff',
  padding: '30px',
  border: '2px solid #333',
  borderRadius: '10px',
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  zIndex: 1000,
  width: '90%',
  maxWidth: '400px',
  maxHeight: '80vh',
  overflowY: 'auto'
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 999
};
