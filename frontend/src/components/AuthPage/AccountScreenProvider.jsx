import React, { useState, createContext, useContext, useEffect } from 'react';

const AccountScreenContext = createContext({});

export const useAccountScreenPage = () => useContext(AccountScreenContext);

const AccountScreenPageProvider = () => { };

export default AccountScreenPageProvider;