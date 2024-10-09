import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { GlobalStyles } from "@mui/material";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ProfileHeader from "../Profile/SidebarAndHeader/ProfileHeader";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";

// Dummy data for the events
const dummyEvents = [
  // October 2024 Events
  { date: "2024-10-02", title: "Development", tag: "orange" },
  { date: "2024-10-02", title: "Edit file", tag: "red" },
  { date: "2024-10-03", title: "Development", tag: "orange" },
  { date: "2024-10-03", title: "Note taking", tag: "green" },
  { date: "2024-10-04", title: "Green Tag", tag: "green" },
  { date: "2024-10-08", title: "Design", tag: "blue" },
  { date: "2024-10-09", title: "Regular Tag", tag: "gray" },
  { date: "2024-10-09", title: "Blue Tag", tag: "blue" },
  { date: "2024-10-10", title: "Design", tag: "blue" },
  { date: "2024-10-10", title: "Note taking", tag: "green" },
  { date: "2024-10-12", title: "Edit file", tag: "red" },
  { date: "2024-10-15", title: "Development", tag: "orange" },
  { date: "2024-10-17", title: "Green Tag", tag: "green" },
  { date: "2024-10-22", title: "Design", tag: "blue" },
  { date: "2024-10-23", title: "Blue Tag", tag: "blue" },
  { date: "2024-10-23", title: "Orange Tag", tag: "orange" },
  { date: "2024-10-25", title: "Edit file", tag: "red" },

  // November 2024 Events
  { date: "2024-11-01", title: "Planning", tag: "orange" },
  { date: "2024-11-05", title: "Design Review", tag: "blue" },
  { date: "2024-11-07", title: "Development", tag: "orange" },
  { date: "2024-11-09", title: "Team Meeting", tag: "green" },
  { date: "2024-11-10", title: "Client Feedback", tag: "gray" },
  { date: "2024-11-12", title: "UI Update", tag: "blue" },
  { date: "2024-11-15", title: "Code Review", tag: "red" },
  { date: "2024-11-20", title: "Testing", tag: "orange" },
  { date: "2024-11-22", title: "Sprint Planning", tag: "green" },
  { date: "2024-11-25", title: "Release", tag: "blue" },

  // December 2024 Events
  { date: "2024-12-01", title: "Sprint Retrospective", tag: "red" },
  { date: "2024-12-03", title: "Project Demo", tag: "blue" },
  { date: "2024-12-05", title: "Design Finalization", tag: "orange" },
  { date: "2024-12-07", title: "Code Freeze", tag: "red" },
  { date: "2024-12-10", title: "Client Presentation", tag: "green" },
  { date: "2024-12-12", title: "Feedback Session", tag: "gray" },
  { date: "2024-12-15", title: "QA Testing", tag: "blue" },
  { date: "2024-12-18", title: "Bug Fixes", tag: "red" },
  { date: "2024-12-22", title: "Final Release", tag: "orange" },
];

const EventManagementCalendar = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderEvents = (day) => {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(currentMonth + 1).padStart(2, "0");
    const currentDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

    const events = dummyEvents.filter((event) => event.date === currentDate);

    return events.map((event, index) => (
      <Box
        key={index}
        sx={{
          backgroundColor:
            event.tag === "red"
              ? "#FFCDD2"
              : event.tag === "blue"
                ? "#BBDEFB"
                : event.tag === "orange"
                  ? "#FFE0B2"
                  : "#C8E6C9",
          borderRadius: "4px",
          padding: "2px",
          marginTop: "5px",
          marginLeft: "2px",
        }}
      >
        <Typography
          sx={{
            color:
              event.tag === "red"
                ? "#D32F2F"
                : event.tag === "blue"
                  ? "#1976D2"
                  : event.tag === "orange"
                    ? "#F57C00"
                    : "#388E3C",
            fontSize: "14px",
            fontWeight: "500",
            marginLeft: "3px",
          }}
        >
          {event.title}
        </Typography>
      </Box>
    ));
  };

  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const numDays = daysInMonth(currentMonth, currentYear);

    // Calculate days from the previous month to display
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    // Add placeholders for days from the previous month
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1;
      days.push(
        <Box key={`prev-${i}`} sx={styles.emptyDay(isSixRows)}>
          <Typography variant="body2" sx={styles.lightDayNumber}>
            {day}
          </Typography>
        </Box>,
      );
    }

    // Render days of the current month
    for (let day = 1; day <= numDays; day++) {
      days.push(
        <Box key={day} sx={styles.calendarDay(isSixRows)}>
          <Typography variant="body2" sx={styles.dayNumber}>
            {day}
          </Typography>
          {renderEvents(day)}
        </Box>,
      );
    }

    // check if the current month needs 6 rows (42 days)
    const totalCells = firstDay + numDays;
    const remainingCells = totalCells <= 35 ? 35 - totalCells : 42 - totalCells;

    // Add holders for the next month's days
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <Box key={`next-${i}`} sx={styles.emptyDay(isSixRows)}>
          <Typography variant="body2" sx={styles.lightDayNumber}>
            {i}
          </Typography>
        </Box>,
      );
    }

    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Determine if the calendar needs 6 rows or 5 rows
  const totalCells =
    new Date(currentYear, currentMonth, 1).getDay() +
    daysInMonth(currentMonth, currentYear);
  const isSixRows = totalCells > 35;

  return (
    <>
      <GlobalStyles styles={styles.global} />
      <Box sx={styles.wrapperContainer}>
        <ProfileSidebar />
        <ProfileHeader />
        <Box sx={styles.calendarContainer}>
          <Box sx={styles.calendarHeader}>
            <Typography variant="h6" sx={styles.monthText}>
              {monthNames[currentMonth]} {currentYear}
            </Typography>
            <Box sx={styles.iconContainer}>
              <IconButton sx={styles.iconButton} onClick={handlePreviousMonth}>
                <ArrowBackIosIcon sx={styles.arrowIcon} />
              </IconButton>
              <IconButton sx={styles.iconButton} onClick={handleNextMonth}>
                <ArrowForwardIosIcon sx={styles.arrowIcon} />
              </IconButton>
            </Box>
          </Box>
          <Box sx={styles.daysOfWeek}>
            {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(
              (day, index) => (
                <Typography key={index} sx={styles.dayOfWeek}>
                  {day}
                </Typography>
              ),
            )}
          </Box>
          <Box sx={styles.calendarDays}>{renderCalendarDays()}</Box>
        </Box>
      </Box>
    </>
  );
};

const styles = {
  global: {
    "html, body": {
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "auto",
    },
  },
  wrapperContainer: {
    display: "flex",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
    background: "#F9F9F9",
    position: "relative",
  },
  calendarContainer: {
    height: "720px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
    width: "calc(100% - 130px)",
    marginTop: "120px",
    marginLeft: "155px",
    marginBottom: "25px",
    marginRight: "25px",
    background: "#ffffff",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  monthText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#585757",
  },
  iconContainer: {
    display: "flex",
    gap: "10px",
  },
  iconButton: {
    backgroundColor: "#4B5A6880",
    borderRadius: "30%",
    width: "36px",
    height: "36px",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },
  arrowIcon: {
    color: "#333",
  },
  daysOfWeek: {
    display: "grid",
    height: "40px",
    gridTemplateColumns: "repeat(7, 1fr)",
    fontSize: "12px",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },

  dayOfWeek: {
    fontWeight: "bold",
    textAlign: "center",
    color: "#969696",
    backgroundColor: "#ffffff",
    border: "1px solid #e0e0e0",
    borderRadius: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },

  calendarDays: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    color: "#969696",
  },
  calendarDay: (isSixRows) => ({
    textAlign: "left",
    padding: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    minHeight: isSixRows ? "100px" : "120px",
    border: "1px solid #e0e0e0",
  }),
  dayNumber: {
    marginBottom: "5px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  emptyDay: (isSixRows) => ({
    backgroundColor: "#F1F1F1",
    minHeight: isSixRows ? "100px" : "120px",
    border: "1px solid #e0e0e0",
    padding: "10px",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
  }),

  lightDayNumber: {
    color: "#A0A0A0",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "left",
  },
};

export default EventManagementCalendar;
