import React, { useEffect ,useState} from 'react'

export default function order() {
  const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  useEffect(()=>{
      const fecthuserorder=async()=>{
        const url=`${import.meta.env.VITE_BACKEND_URL}/api/order/fecthorder`
        const res= await fetch(url,{
          method:"GET",
          headers:{
                "Content-Type": "application/json",
                 token: localStorage.getItem('token')
          }
        })
        const data= await res.json();
        console.log(data.allorder)
        setOrders(data.allorder);
        setLoading(false);
        
      }
      fecthuserorder();
  },[])
 if (loading) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>All Orders</h2>
        <div style={styles.empty}>Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <h2 style={styles.heading}>All Orders</h2>
        <div style={styles.error}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>All Orders</h2>
      <div style={styles.list}>
        {orders && orders.length > 0 ? (
          orders.map((order, idx) => (
            <div key={order.id || idx} style={styles.card}>
              <div style={styles.row}>
                <span style={styles.label}>item:</span>
                <span>{order.items}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Address:</span>
                <span>
                  {order.address?.street}, {order.address?.city}, {order.address?.state}, {order.address?.country} - {order.address?.pincode}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Amount:</span>
                <span>₹{order.amount}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Date:</span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Payment:</span>
                <span style={order.payment ? styles.paid : styles.unpaid}>
                  {order.payment ? "Paid" : "Unpaid"}
                </span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Status:</span>
                <span style={styles.status}>{order.status}</span>
              </div>
            </div>
          ))
        ) : (
          <div style={styles.empty}>No orders found</div>
        )}
      </div>
    </div>
  );
}


// Example theme colors (replace with your actual theme if needed)
const theme = {
  primary: "#1e293b",
  secondary: "#f59e42",
  background: "#f8fafc",
  card: "#fff",
  border: "#e2e8f0",
  text: "#1e293b",
  accent: "#f59e42",
  paid: "#22c55e",
  unpaid: "#ef4444"
};

const styles = {
  container: {
    borderRadius: "12px",
    background: theme.background,
    minHeight: "100vh",
    padding: "32px",
    fontFamily: "Segoe UI, Arial, sans-serif"
  },
  heading: {
    color: theme.primary,
    marginBottom: "24px",
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "1px"
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px"
  },
  card: {
    background: theme.card,
    border: `1px solid ${theme.border}`,
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(30,41,59,0.07)",
    padding: "24px",
    minWidth: "320px",
    maxWidth: "400px",
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  label: {
    fontWeight: 600,
    color: theme.secondary,
    marginRight: "8px"
  },
  paid: {
    color: theme.paid,
    fontWeight: 700
  },
  unpaid: {
    color: theme.unpaid,
    fontWeight: 700
  },
  empty: {
    color: theme.text,
    fontSize: "1.1rem"
  }
};

