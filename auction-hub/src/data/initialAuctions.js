export const INITIAL_AUCTION = {
  id: 'cpl-2026',
  name: 'College Premier League 2026',
  tournament: 'National Championship - Season 5',
  sport: 'Cricket',
  date: '2026-09-02',
  time: '18:00 IST',
  status: 'LIVE', // 'UPCOMING' | 'LIVE' | 'PAUSED' | 'COMPLETED'
  round: 3,
  totalRounds: 10,
  timerDuration: 25, // 25 seconds countdown
  minIncrement: 5000,
  totalPursePerTeam: 5000000, // ₹50 Lakhs
  maxSquadSize: 15,
  minSquadSize: 11,
  currentPlayerId: 'p-1', // Rohan Kumar
  currentBid: 280000,
  leadingTeamId: 'team-1', // Royal Warriors
  leadingTeamName: 'Royal Warriors',
  leadingTeamColor: '#F59E0B',
  timerRemaining: 18,
  isPaused: false,
  bidHistory: [
    {
      id: 'bid-1',
      teamId: 'team-2',
      teamName: 'Titans United',
      teamColor: '#06B6D4',
      amount: 50000,
      timestamp: '18:14:02',
      badge: 'Base Price'
    },
    {
      id: 'bid-2',
      teamId: 'team-1',
      teamName: 'Royal Warriors',
      teamColor: '#F59E0B',
      amount: 80000,
      timestamp: '18:14:15',
      badge: '+₹30k'
    },
    {
      id: 'bid-3',
      teamId: 'team-5',
      teamName: 'Red Strikers',
      teamColor: '#EF4444',
      amount: 140000,
      timestamp: '18:14:32',
      badge: '+₹60k'
    },
    {
      id: 'bid-4',
      teamId: 'team-2',
      teamName: 'Titans United',
      teamColor: '#06B6D4',
      amount: 200000,
      timestamp: '18:14:50',
      badge: '🔥 Bidding War'
    },
    {
      id: 'bid-5',
      teamId: 'team-1',
      teamName: 'Royal Warriors',
      teamColor: '#F59E0B',
      amount: 240000,
      timestamp: '18:15:08',
      badge: '+₹40k'
    },
    {
      id: 'bid-6',
      teamId: 'team-1',
      teamName: 'Royal Warriors',
      teamColor: '#F59E0B',
      amount: 280000,
      timestamp: '18:15:22',
      badge: '⚡ Current High'
    }
  ]
};
