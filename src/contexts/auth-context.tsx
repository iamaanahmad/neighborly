'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { User } from '@/lib/types';
import { users } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  firebaseUser: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        // In a real app, you would fetch user profile from Firestore
        // For this prototype, we'll find the user in our mock data
        const userProfile = users.find(u => u.id === fbUser.uid);
        if (userProfile) {
          setUser(userProfile);
        } else {
            // If user not in mock data, create a basic user profile
            const newUser: User = {
                id: fbUser.uid,
                name: fbUser.email?.split('@')[0] || 'New User',
                avatarUrl: `https://picsum.photos/seed/${fbUser.uid}/100/100`,
            }
            setUser(newUser);
        }

      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, firebaseUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
