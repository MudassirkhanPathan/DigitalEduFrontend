import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Question from "../ScheduleMeeting/Question.png";
import "../ScheduleMeeting/ScheduleMeeting.css";

export default function ScheduleMeeting() {
  const { state: teacher } = useLocation();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const dates = [
    { date: "07 Sep", day: "Sun", available: false },
    { date: "08 Sep", day: "Mon", available: true },
    { date: "09 Sep", day: "Tue", available: true },
    { date: "10 Sep", day: "Wed", available: true },
    { date: "11 Sep", day: "Thu", available: true },
    { date: "12 Sep", day: "Fri", available: true },
  ];

  const times = [
    "05:00 PM",
    "05:15 PM",
    "05:30 PM",
    "05:45 PM",
    "06:00 PM",
    "06:15 PM",
    "06:30 PM",
    "06:45 PM",
    "07:00 PM",
    "07:15 PM",
    "07:30 PM",
    "07:45 PM",
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select date and time first!");
      return;
    }

    const res = await fetch(
      "https://digitaledubackend.onrender.com/api/payment/create-order",
      {
        method: "POST",
      },
    );
    const order = await res.json();

    const options = {
      key: "rzp_test_WfU34ZmSyXYxQW",
      amount: order.amount,
      currency: order.currency,
      name: "EduConnect",
      description: `Payment for ${teacher.name} on ${selectedDate} at ${selectedTime}`,
      order_id: order.id,
      handler: function (response) {
        // Payment successful
        setShowPopup(true);
      },
      theme: { color: "#3182ce" },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (!teacher) return <h2 className="teacher-not-found">Teacher not found</h2>;

  return (
    <div className="meeting-container">
      {/* Teacher Profile */}
      <div className="meeting-teacher-card">
        <img
          src={teacher.img}
          alt={teacher.name}
          className="meeting-teacher-img"
        />
        <div className="meeting-teacher-info">
          <h2>{teacher.name}</h2>
          <p>{teacher.subject}</p>
          <p>{teacher.qualification}</p>
          <p className="exp">{teacher.experience}</p>
          <p className="price">₹399</p>
        </div>
        <img src={Question} alt="Extra" className="meeting-extra-img" />
      </div>

      {/* Date Selection */}
      <h3>Select Date</h3>
      <div className="meeting-date-container">
        {dates.map((d, idx) => (
          <div
            key={idx}
            onClick={() => d.available && setSelectedDate(d.date)}
            className={`meeting-date-card ${
              selectedDate === d.date ? "selected" : ""
            } ${d.available ? "" : "disabled"}`}
          >
            <p>{d.date}</p>
            <p>{d.day}</p>
            <p className={d.available ? "available" : "not-available"}>
              {d.available ? "Available" : "Not Available"}
            </p>
          </div>
        ))}
      </div>

      {/* Time Selection */}
      <h3>Select Time</h3>
      <div className="meeting-time-container">
        {times.map((t, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedTime(t)}
            className={`meeting-time-card ${
              selectedTime === t ? "selected" : ""
            }`}
          >
            {t}
          </div>
        ))}
      </div>

      {/* Pay Button */}
      <div className="meeting-pay-btn-container">
        <button onClick={handlePayment}>Pay ₹399 & Confirm Meeting</button>
      </div>

      {/* ✅ Payment Success Popup */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <img src={teacher.img} alt={teacher.name} />
            <h2>Thanks for booking your slot, {teacher.name}!</h2>
            <p>
              Your meeting is scheduled on <strong>{selectedDate}</strong> at{" "}
              <strong>{selectedTime}</strong>.
            </p>
            <p>
              Be ready for the talk at that time and ask questions. Best of
              luck! 🌟
            </p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
