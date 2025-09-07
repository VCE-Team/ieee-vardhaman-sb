import { Notification } from '../../../types';

export const notifications: Notification[] = [
  {
    id: 1,
    title: "New Event Registration Open",
    message: "5G Technology Symposium registration is now open",
    time: "2 hours ago",
    type: "event",
    unread: true
  },
  {
    id: 2,
    title: "Achievement Unlocked",
    message: "IEEE Vardhaman wins Best Student Branch Award 2024",
    time: "1 day ago",
    type: "achievement",
    unread: true
  },
  {
    id: 3,
    title: "Workshop Reminder",
    message: "Machine Learning Bootcamp starts tomorrow",
    time: "2 days ago",
    type: "reminder",
    unread: false
  },
  {
    id: 4,
    title: "New Society Member",
    message: "Welcome to Computer Society! Check your email for details",
    time: "3 days ago",
    type: "membership",
    unread: false
  },
  {
    id: 5,
    title: "Newsletter Published",
    message: "IEEE Vardhaman Monthly Newsletter - April 2024",
    time: "1 week ago",
    type: "newsletter",
    unread: false
  }
];
