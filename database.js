import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;
if (Platform.OS !== 'web') {
  db = SQLite.openDatabase('userDatabase.db');
}

// Initialize the database table
export const initializeDatabase = () => {
  if (Platform.OS === 'web') {
    console.log('Using localStorage for web.');
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        username TEXT NOT NULL,
        password TEXT NOT NULL
      );`,
      [],
      () => console.log('Table created successfully'),
      (error) => console.error('Error creating table', error)
    );
  });
};

// Function to add a user to the database
export const addUser = (email, username, password, successCallback, errorCallback) => {
  if (Platform.OS === 'web') {
    console.log('Saving user to localStorage.');
    try {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      users.push({ email, username, password });
      localStorage.setItem('users', JSON.stringify(users));
      successCallback({ insertId: users.length });
    } catch (error) {
      errorCallback(error);
    }
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (email, username, password) values (?, ?, ?)',
      [email, username, password],
      (_, result) => successCallback(result),
      (_, error) => errorCallback(error)
    );
  });
};

// Function to check if a user exists in the database
export const checkUser = (username, password, successCallback, errorCallback) => {
  if (Platform.OS === 'web') {
    console.log('Checking user in localStorage.');
    try {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(user => user.username === username && user.password === password);
      successCallback(user ? true : false);
    } catch (error) {
      errorCallback(error);
    }
    return;
  }

  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (_, { rows }) => successCallback(rows.length > 0),
      (_, error) => errorCallback(error)
    );
  });
};
