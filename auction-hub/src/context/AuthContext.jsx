import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const ROLES = {
  ADMIN: 'ADMIN',
  TEAM_MANAGER: 'TEAM_MANAGER',
  VIEWER: 'VIEWER',
};

const DEFAULT_USERS = {
  ADMIN: {
    id: 'user-admin',
    name: 'Auctioneer Chief (Admin)',
    email: 'admin@auctionhub.live',
    role: ROLES.ADMIN,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    teamId: null,
  },
  TEAM_MANAGER: {
    id: 'user-tm-1',
    name: 'Vikramaditya (Royal Warriors)',
    email: 'manager@royalwarriors.com',
    role: ROLES.TEAM_MANAGER,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    teamId: 'team-1', // Default to Royal Warriors
  },
  VIEWER: {
    id: 'user-viewer',
    name: 'Sports Fan (Viewer)',
    email: 'fan@cricketlovers.com',
    role: ROLES.VIEWER,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
    teamId: null,
  }
};

export function AuthProvider({ children }) {
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('auction_role') || ROLES.ADMIN;
  });

  const [managedTeamId, setManagedTeamId] = useState(() => {
    return localStorage.getItem('auction_managed_team') || 'team-1';
  });

  const [user, setUser] = useState(DEFAULT_USERS[currentRole] || DEFAULT_USERS.ADMIN);

  useEffect(() => {
    localStorage.setItem('auction_role', currentRole);
    localStorage.setItem('auction_managed_team', managedTeamId);

    const baseUser = DEFAULT_USERS[currentRole] || DEFAULT_USERS.VIEWER;
    setUser({
      ...baseUser,
      teamId: currentRole === ROLES.TEAM_MANAGER ? managedTeamId : null,
    });
  }, [currentRole, managedTeamId]);

  const switchRole = (newRole, teamId = null) => {
    if (Object.values(ROLES).includes(newRole)) {
      setCurrentRole(newRole);
      if (teamId) {
        setManagedTeamId(teamId);
      }
    }
  };

  const switchManagedTeam = (teamId) => {
    setManagedTeamId(teamId);
    if (currentRole === ROLES.TEAM_MANAGER) {
      setUser(prev => ({ ...prev, teamId }));
    }
  };

  const loginAs = (role, teamId = 'team-1') => {
    switchRole(role, teamId);
  };

  const logout = () => {
    switchRole(ROLES.VIEWER, null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        managedTeamId,
        isAdmin: currentRole === ROLES.ADMIN,
        isTeamManager: currentRole === ROLES.TEAM_MANAGER,
        isViewer: currentRole === ROLES.VIEWER,
        switchRole,
        switchManagedTeam,
        loginAs,
        logout,
        ROLES
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
