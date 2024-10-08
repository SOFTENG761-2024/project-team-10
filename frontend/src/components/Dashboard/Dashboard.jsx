import React, { useState, useEffect } from "react";
import ProfileSidebar from "../Profile/SidebarAndHeader/ProfileSidebar";
import { ProfileHeader } from "../Profile/SidebarAndHeader";
import MiniDashboardCalendar from "./MiniDashboardCalendar";

import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  GlobalStyles,
  Divider,
  Button,
  Avatar,
  Link,
} from "@mui/material";

const tabs = ["Tasks", "Projects", "Events", "Groups"];

// Dummy data for projects, tasks, and events
const dummyProfileData = {
  tasks: [
    {
      title: "Task 1",
      description: "Complete frontend development",
    },
    {
      title: "Task 2",
      description: "Fix bugs in the authentication module",
    },
  ],
  projects: [
    {
      title: "Project A",
      deadline: "June 30, 2024",
      avatar: "/path/to/projectA-avatar.png",
    },
    {
      title: "Project B",
      deadline: "July 15, 2024",
      avatar: "/path/to/projectB-avatar.png",
    },
  ],
  events: [
    {
      title: "Event 1",
      date: "April 10, 2024",
      location: "Auckland",
      description: "This is a technology conference.",
    },
    {
      title: "Event 2",
      date: "May 5, 2024",
      location: "Wellington",
      description: "This is an AI and Machine Learning Workshop.",
    },
  ],
  groups: [
    {
      name: "Commodity and Stock Analysis",
      next: "Next meeting on June 10, 2024",
      members: [
        { name: "John Doe", avatar: "/path/to/avatar1.png" },
        { name: "Jane Smith", avatar: "/path/to/avatar2.png" },
        { name: "Alice Johnson", avatar: "/path/to/avatar3.png" },
        { name: "Bob Williams", avatar: "/path/to/avatar4.png" },
      ],
    },
    {
      name: "Business Development",
      next: "Next meeting on July 1, 2024",
      members: [
        { name: "Michael Brown", avatar: "/path/to/avatar5.png" },
        { name: "Emily Davis", avatar: "/path/to/avatar6.png" },
        { name: "Sophia Martinez", avatar: "/path/to/avatar7.png" },
      ],
    },
  ],
  notifications: [
    {
      message: "Business school scholarship deadline approaching",
      date: "June 5, 2024",
    },
    {
      message: "New event: AI and Machine Learning Workshop",
      date: "May 5, 2024",
    },
    { message: "Your group meeting is coming up", date: "June 10, 2024" },
    {
      message: "Complete your task: Fix bugs in the authentication module",
      date: "April 15, 2024",
    },
  ],
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Groups");
  const [dashboardData, setDashboardData] = useState(dummyProfileData);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  const handleBackToGroupList = () => {
    setSelectedGroup(null);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Tasks":
        return (
          <Box sx={styles.contentBox}>
            <Typography variant="h6" sx={styles.listHeading}>
              List of Tasks
            </Typography>
            {dashboardData?.tasks?.length > 0 ? (
              dashboardData.tasks.map((task, index) => (
                <Card key={index} sx={styles.taskCard}>
                  <CardContent sx={styles.taskContent}>
                    <Typography variant="h6" sx={styles.taskTitle}>
                      {task.title}
                    </Typography>
                    <Typography variant="body2" sx={styles.taskDescription}>
                      {task.description}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No tasks available.
              </Typography>
            )}
          </Box>
        );

      case "Projects":
        return (
          <Box sx={styles.contentBox}>
            <Typography variant="h6" sx={styles.listHeading}>
              List of Projects
            </Typography>
            {dashboardData?.projects?.length > 0 ? (
              dashboardData.projects.map((project, index) => (
                <Card key={index} sx={styles.projectCard}>
                  <CardContent sx={styles.projectContent}>
                    <Avatar
                      alt={project.title}
                      src={project.avatar || "/default-avatar.png"}
                      sx={styles.projectAvatar}
                    />
                    <Box sx={styles.projectDetails}>
                      <Typography variant="h6" sx={styles.projectTitle}>
                        {project.title || "Project title"}
                      </Typography>
                      <Typography variant="body2" sx={styles.projectDeadline}>
                        {project.deadline || "Deadline date"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No projects available.
              </Typography>
            )}
          </Box>
        );

      case "Events":
        return (
          <Box sx={styles.contentBox}>
            <Typography variant="h6" sx={styles.listHeading}>
              List of Events
            </Typography>
            {dashboardData?.events?.length > 0 ? (
              dashboardData.events.map((event, index) => (
                <Card key={index} sx={styles.eventCard}>
                  <CardContent sx={styles.eventContent}>
                    <Box sx={styles.eventDetails}>
                      <Typography variant="h6" sx={styles.eventTitle}>
                        {event.title || "Event title"}
                      </Typography>
                      <Typography variant="body2" sx={styles.eventDate}>
                        {event.date || "Date"}
                      </Typography>
                      <Typography variant="body2" sx={styles.eventLocation}>
                        {event.location || "Location"}
                      </Typography>
                      <Typography variant="body2" sx={styles.eventDescription}>
                        {event.description || "Event description"}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No events available.
              </Typography>
            )}
          </Box>
        );

      case "Groups":
        // If a group is selected, show the group details view
        if (selectedGroup) {
          return (
            <Box sx={styles.contentBox}>
              <Button onClick={handleBackToGroupList} sx={styles.backButton}>
                Back
              </Button>
              <Box sx={styles.groupDetailsContainer}>
                {/* Group Info on the Left */}
                <Box sx={styles.groupInfo}>
                  <Typography variant="h6" sx={styles.groupTitle}>
                    {selectedGroup.name || "Group Title"}
                  </Typography>
                  {selectedGroup.members.map((member, index) => (
                    <Box key={index} sx={styles.memberItem}>
                      <Avatar
                        src={member.avatar || "/default-avatar.png"}
                        sx={styles.memberAvatarList}
                      />
                      <Typography>{member.name}</Typography>
                    </Box>
                  ))}
                </Box>

                {/* Avatars on the Right */}
                <Box sx={styles.groupMemberAvatars}>
                  {selectedGroup.members.map((member, idx) => (
                    <Avatar
                      key={idx}
                      src={member.avatar || "/default-avatar.png"}
                      sx={styles.avatar}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          );
        }

        // If no group is selected, show up the group list
        return (
          <Box sx={styles.contentBox}>
            <Typography variant="h6" sx={styles.listHeading}>
              List of Groups
            </Typography>
            {dashboardData?.groups?.length > 0 ? (
              dashboardData.groups.map((group, index) => (
                <Card
                  key={index}
                  sx={styles.groupCard}
                  onClick={() => handleGroupClick(group)}
                >
                  <CardContent sx={styles.groupContent}>
                    <Box sx={styles.groupDetails}>
                      <Typography variant="h6">
                        Group name: {group.name}
                      </Typography>
                      <Typography variant="body2">
                        Coming next: {group.next}
                      </Typography>
                    </Box>
                    <Box sx={styles.groupAvatars}>
                      {group.members.slice(0, 4).map((member, idx) => (
                        <Avatar
                          key={idx}
                          src={member.avatar || "/default-avatar.png"}
                          sx={styles.avatar}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Typography sx={styles.descriptionSectionParagraph}>
                No groups available.
              </Typography>
            )}
          </Box>
        );

      default:
        return <Box sx={styles.contentBox}>No data available</Box>;
    }
  };

  return (
    <>
      <GlobalStyles styles={styles.global} />
      <Box sx={styles.wrapperContainer}>
        <ProfileSidebar />
        <ProfileHeader />
        <Box sx={styles.dashboardViewContainer}>
          {/* Dashboard tabs and content rendering */}
          <Box sx={styles.dashboardTabsContent}>
            <Box sx={styles.tabs}>
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "contained" : "outlined"}
                  onClick={() => setActiveTab(tab)}
                  sx={{
                    ...styles.tabButton,
                    ...(activeTab === tab && styles.tabButtonActive),
                  }}
                >
                  {tab}
                </Button>
              ))}
            </Box>
            <div className="tab-content">{renderTabContent()}</div>
          </Box>
          <Box sx={styles.rightSectionContainer}>
            <Box sx={styles.notificationsContainer}>
              <Typography variant="h5" sx={styles.notificationTitle}>
                Notifications
              </Typography>
              {dashboardData?.notifications?.length > 0 ? (
                <Box sx={styles.notificationList}>
                  {dashboardData.notifications.map((notification, index) => (
                    <Box key={index} sx={styles.notificationItem}>
                      <Typography variant="body2">
                        {notification.message}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "gray" }}>
                        {notification.date}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography>No notifications available.</Typography>
              )}
            </Box>

            {/* Calendar Section */}
            <Box sx={styles.calendarContainer}>
              <MiniDashboardCalendar />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;

// styles.js
const styles = {
  global: {
    "html, body": {
      height: "100%",
      margin: 0,
      padding: 0,
      overflow: "hidden",
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
  dashboardViewContainer: {
    display: "flex",
    width: "calc(100% - 130px)",
    padding: "15px",
    marginTop: "120px",
    marginLeft: "125px",
    marginBottom: "25px",
    marginRight: "25px",
    background: "#ffffff",
    borderRadius: "8px",
  },

  rightSectionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: "8px",
    width: "306px",
  },

  notificationsContainer: {
    marginBottom: "20px",
    padding: "20px",
    backgroundColor: "#f3f5f7",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    width: "306px",
    height: "700px",
    textAlign: "center",
  },

  notificationList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  notificationItem: {
    textAlign: "left",
  },

  calendarContainer: {
    // width: "100%",
    textAlign: "center",
    width: "306px",
    height: "438px",
  },

  notificationTitle: {
    fontWeight: "bold",
    marginBottom: "15px",
    fontSize: "18px",
  },

  dashboardTabsContent: {
    position: "relative",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f3f5f7",
    marginLeft: "20px",
    marginRight: "16px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    width: "950px",
    overflowY: "auto",
    maxHeight: "calc(100vh - 160px)",
  },
  tabs: {
    display: "flex",
    height: "40px",
    top: "171px",
    left: "436px",
    gap: "0px",
    borderRadius: "8px 8px 0px 0px",
    opacity: 1,
    background: "#c0c3c680",
  },
  tabButton: {
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "500",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    border: "none",
    outline: "2px solid #ccc",
    cursor: "pointer",
    backgroundColor: "#ddd",
    transition: "background-color 0.3s ease",
    width: "250px",
    "&:hover": {
      backgroundColor: "#bbb",
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
  },
  tabButtonActive: {
    backgroundColor: "#4b5a6880",
    color: "black",
    border: "none",
    outline: "none",
    borderRadius: "8px 8px 0 0",
  },
  contentBox: {
    flexGrow: 1,
    padding: "20px",
    backgroundColor: "#f3f5f7",
    borderRadius: "4px",
    border: "1px solid #ddd",
    minHeight: "300px",
    overflowY: "auto",
  },
  tabContent: {
    padding: "20px",
    backgroundColor: "#f3f5f7",
    borderRadius: "4px",
    overflowY: "auto",
  },

  TasksTab: {
    backgroundColor: "#f3f5f7",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  taskCard: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#dadcde",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  taskTitle: {
    marginBottom: "5px",
    fontSize: "18px",
    color: "#333",
  },
  taskDescription: {
    fontSize: "16px",
    color: "#666",
  },
  listHeading: {
    fontWeight: "bold",
    marginBottom: "20px",
    marginLeft: "20px",
    marginTop: "20px",
    textAlign: "left",
  },
  projectCard: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#dadcde",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  projectContent: {
    display: "flex",
    alignItems: "center",
  },
  projectAvatar: {
    width: 50,
    height: 50,
    marginRight: "20px",
  },
  projectDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  projectTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  projectDeadline: {
    fontSize: "14px",
    color: "#666",
  },
  eventCard: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    marginBottom: "15px",
    backgroundColor: "#dadcde",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  },
  eventContent: {
    display: "flex",
    alignItems: "center",
  },
  eventDetails: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  eventTitle: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: "14px",
    color: "#666",
  },
  eventLocation: {
    fontSize: "14px",
    color: "#666",
  },
  eventDescription: {
    fontSize: "16px",
    color: "#666",
  },
  groupCard: {
    cursor: "pointer",
    backgroundColor: "#dadcde",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  groupContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  groupDetailsContainer: {
    marginTop: "40px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "20px",
    backgroundColor: "#dadcde",
    borderRadius: "15px",
  },

  groupInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "70%",
  },

  groupMemberAvatars: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    gap: "2px",
    width: "30%",
    marginTop: "30px",
    marginRight: "0px",
  },

  memberAvatarList: {
    width: "30px",
    height: "30px",
  },

  groupDetails: {
    display: "flex",
    flexDirection: "column",
  },
  groupAvatars: {
    display: "flex",
    gap: "5px",
  },
  avatar: {
    width: 50,
    height: 50,
  },
  memberItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px",
    marginLeft: "30px",
  },
  backButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    width: "150px",
    height: "30px",
    marginTop: "50px",
    marginRight: "30px",
    backgroundColor: "#4b5a6880",
    color: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
    "&:hover": {
      backgroundColor: "#ccc",
    },
  },

  groupTitle: {
    fontWeight: "bold",
    marginBottom: "20px",
    marginTop: "20px",
    marginLeft: "30px",
  },
  descriptionSectionParagraph: {
    fontSize: "20px",
    lineHeight: 1.6,
    color: "#333",
    textAlign: "justify",
    marginBottom: "30px",
    marginTop: "30px",
    wordBreak: "break-word",
    overflowWrap: "break-word",
    marginLeft: "20px",
  },
};
