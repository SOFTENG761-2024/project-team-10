import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const MiniDashboardCalendar = () => {
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

  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const numDays = daysInMonth(currentMonth, currentYear);

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = daysInMonth(prevMonth, prevYear);

    // Empty place with previous month's dates
    for (let i = 0; i < firstDay; i++) {
      const day = prevMonthDays - firstDay + i + 1;
      days.push(
        <Box key={`prev-${i}`} sx={styles.emptyDay}>
          {day}
        </Box>,
      );
    }

    // Render days of the current month
    for (let day = 1; day <= numDays; day++) {
      days.push(
        <Box key={day} sx={styles.calendarDay}>
          {day}
        </Box>,
      );
    }

    // Determine if the current month needs a 6th row
    const totalCells = firstDay + numDays;
    const remainingCells = totalCells > 35 ? 42 - totalCells : 35 - totalCells;

    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <Box key={`next-${i}`} sx={styles.emptyDay}>
          {i}
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
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const numDays = daysInMonth(currentMonth, currentYear);
  const totalCells = firstDay + numDays;
  const isSixRows = totalCells > 35;

  return (
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
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
          <Typography key={index} sx={styles.dayOfWeek}>
            {day}
          </Typography>
        ))}
      </Box>
      <Box sx={styles.calendarDays(isSixRows)}>{renderCalendarDays()}</Box>
    </Box>
  );
};

// Styles for the calendar component
const styles = {
  calendarContainer: {
    width: "306px",
    backgroundColor: "#CCCCCC",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    height: "300px",
  },
  calendarHeader: {
    width: "279px",
    height: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5px",
    marginLeft: "3px",
    position: "relative",
  },
  monthText: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "var(--Text-header-title, #8147FB)",
  },
  iconContainer: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    position: "absolute",
    right: "0",
    top: "0",
  },
  iconButton: {
    backgroundColor: "#F9F7FC",
    borderRadius: "30%",
    width: "32px",
    height: "32px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  arrowIcon: {
    color: "#8147FB",
    fontSize: "18px",
  },
  daysOfWeek: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
  },
  dayOfWeek: {
    fontWeight: "bold",
    textAlign: "center",
  },
  calendarDays: (isSixRows) => ({
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: isSixRows
      ? "repeat(6, calc(200px / 6))"
      : "repeat(5, calc(200px / 5))",
  }),
  calendarDay: {
    textAlign: "center",
    padding: "6px",
    backgroundColor: "transparent",
    borderRadius: "4px",
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
    color: "#333",
  },
  emptyDay: {
    textAlign: "center",
    padding: "6px",
    backgroundColor: "transparent",
    color: "#DDDDDD",
  },
};

export default MiniDashboardCalendar;
