import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { INITIAL_AUCTION } from '../data/initialAuctions';
import { INITIAL_TEAMS } from '../data/initialTeams';
import { INITIAL_PLAYERS } from '../data/initialPlayers';
import { getNextMinIncrement } from '../utils/currency';
import { useSound } from './SoundContext';

const AuctionContext = createContext(null);

export function AuctionProvider({ children }) {
  const { triggerBidSound, triggerGavelSound, triggerTickSound, triggerSoldFanfare, triggerUnsoldBuzzer } = useSound();

  // Load from localStorage or use initial seeds
  const [auction, setAuction] = useState(() => {
    const saved = localStorage.getItem('auction_hub_data');
    return saved ? JSON.parse(saved) : INITIAL_AUCTION;
  });

  const [teams, setTeams] = useState(() => {
    const saved = localStorage.getItem('auction_hub_teams');
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [players, setPlayers] = useState(() => {
    const saved = localStorage.getItem('auction_hub_players');
    return saved ? JSON.parse(saved) : INITIAL_PLAYERS;
  });

  const [soldModalData, setSoldModalData] = useState(null);
  const [unsoldModalData, setUnsoldModalData] = useState(null);
  const [autoSimulation, setAutoSimulation] = useState(false);
  const [bidFlash, setBidFlash] = useState(false);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('auction_hub_data', JSON.stringify(auction));
  }, [auction]);

  useEffect(() => {
    localStorage.setItem('auction_hub_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('auction_hub_players', JSON.stringify(players));
  }, [players]);

  // Current Player helper
  const currentPlayer = players.find(p => p.id === auction.currentPlayerId) || players[0];
  const leadingTeam = teams.find(t => t.id === auction.leadingTeamId) || null;
  const playerQueue = players.filter(p => p.status === 'UPCOMING');
  const soldPlayers = players.filter(p => p.status === 'SOLD');
  const unsoldPlayers = players.filter(p => p.status === 'UNSOLD');

  // Trigger bid flash animation helper
  const flashBid = () => {
    setBidFlash(true);
    setTimeout(() => setBidFlash(false), 600);
  };

  // Place a Bid action
  const placeBid = useCallback((teamId, customAmount = null) => {
    if (auction.status !== 'LIVE' || auction.isPaused) {
      return { success: false, error: 'Auction is not actively live.' };
    }

    const team = teams.find(t => t.id === teamId);
    if (!team) return { success: false, error: 'Team not found.' };

    if (team.squad.length >= team.squadLimit) {
      return { success: false, error: `${team.name} has already reached the squad limit of ${team.squadLimit} players.` };
    }

    const minIncrement = getNextMinIncrement(auction.currentBid || currentPlayer.basePrice);
    let newAmount;

    if (customAmount !== null) {
      newAmount = Number(customAmount);
      if (newAmount <= auction.currentBid) {
        return { success: false, error: `Bid must be higher than current bid of ₹${auction.currentBid.toLocaleString('en-IN')}.` };
      }
    } else {
      if (!auction.currentBid || auction.currentBid === 0) {
        newAmount = currentPlayer.basePrice;
      } else {
        newAmount = auction.currentBid + minIncrement;
      }
    }

    if (newAmount > team.remainingBudget) {
      return {
        success: false,
        error: `Insufficient purse! ${team.name} has only ₹${team.remainingBudget.toLocaleString('en-IN')} remaining.`
      };
    }

    // Register Bid
    const newBidObj = {
      id: `bid-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      teamId: team.id,
      teamName: team.name,
      teamColor: team.color,
      amount: newAmount,
      timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }),
      badge: auction.currentBid === 0 ? 'Base Price' : `+₹${(newAmount - (auction.currentBid || currentPlayer.basePrice)).toLocaleString('en-IN')}`
    };

    setAuction(prev => ({
      ...prev,
      currentBid: newAmount,
      leadingTeamId: team.id,
      leadingTeamName: team.name,
      leadingTeamColor: team.color,
      timerRemaining: prev.timerDuration || 25,
      bidHistory: [newBidObj, ...(prev.bidHistory || [])]
    }));

    // Increment team's bidding activity count
    setTeams(prevTeams => prevTeams.map(t => t.id === team.id ? { ...t, bidsCount: (t.bidsCount || 0) + 1 } : t));

    flashBid();
    triggerBidSound();
    return { success: true, bid: newBidObj };
  }, [auction, currentPlayer, teams, triggerBidSound]);

  // Admin Sell Player action
  const sellCurrentPlayer = useCallback((forcedTeamId = null, forcedAmount = null) => {
    const finalTeamId = forcedTeamId || auction.leadingTeamId;
    const finalPrice = forcedAmount || auction.currentBid || currentPlayer.basePrice;

    if (!finalTeamId) {
      return { success: false, error: 'No leading team to sell the player to.' };
    }

    const team = teams.find(t => t.id === finalTeamId);
    if (!team) return { success: false, error: 'Team not found.' };

    triggerGavelSound();
    setTimeout(() => triggerSoldFanfare(), 250);

    // Update Player
    setPlayers(prev => prev.map(p => {
      if (p.id === currentPlayer.id) {
        return {
          ...p,
          status: 'SOLD',
          soldPrice: finalPrice,
          soldToTeamId: team.id,
          soldToTeamName: team.name
        };
      }
      return p;
    }));

    // Update Team Purse & Squad
    setTeams(prev => prev.map(t => {
      if (t.id === team.id) {
        const updatedSquadItem = {
          id: currentPlayer.id,
          name: currentPlayer.name,
          role: currentPlayer.role,
          soldPrice: finalPrice,
          image: currentPlayer.image,
          playingStyle: currentPlayer.playingStyle
        };
        return {
          ...t,
          remainingBudget: t.remainingBudget - finalPrice,
          spentBudget: t.spentBudget + finalPrice,
          squad: [...t.squad, updatedSquadItem]
        };
      }
      return t;
    }));

    // Set Sold Celebration Modal Data
    const soldData = {
      player: currentPlayer,
      team: team,
      finalPrice: finalPrice
    };
    setSoldModalData(soldData);

    return { success: true, soldData };
  }, [auction, currentPlayer, teams, triggerGavelSound, triggerSoldFanfare]);

  // Admin Mark Unsold action
  const markCurrentPlayerUnsold = useCallback(() => {
    triggerUnsoldBuzzer();

    setPlayers(prev => prev.map(p => {
      if (p.id === currentPlayer.id) {
        return {
          ...p,
          status: 'UNSOLD',
          soldPrice: null,
          soldToTeamId: null,
          soldToTeamName: null
        };
      }
      return p;
    }));

    const unsoldData = {
      player: currentPlayer
    };
    setUnsoldModalData(unsoldData);
  }, [currentPlayer, triggerUnsoldBuzzer]);

  // Next Player selector
  const nextPlayer = useCallback((targetPlayerId = null) => {
    let nextP;
    if (targetPlayerId) {
      nextP = players.find(p => p.id === targetPlayerId);
    } else {
      nextP = players.find(p => p.status === 'UPCOMING');
    }

    if (!nextP) {
      // Auction completed
      setAuction(prev => ({
        ...prev,
        status: 'COMPLETED',
        currentPlayerId: null,
        currentBid: 0,
        leadingTeamId: null,
        leadingTeamName: null,
        bidHistory: []
      }));
      return;
    }

    // Set player to LIVE
    setPlayers(prev => prev.map(p => p.id === nextP.id ? { ...p, status: 'LIVE' } : p));

    // Reset auction state for this player
    setAuction(prev => ({
      ...prev,
      status: 'LIVE',
      isPaused: false,
      round: Math.min((prev.round || 1) + 1, prev.totalRounds || 10),
      currentPlayerId: nextP.id,
      currentBid: nextP.basePrice,
      leadingTeamId: null,
      leadingTeamName: null,
      leadingTeamColor: null,
      timerRemaining: prev.timerDuration || 25,
      bidHistory: []
    }));

    setSoldModalData(null);
    setUnsoldModalData(null);
  }, [players]);

  // Skip Player
  const skipCurrentPlayer = useCallback(() => {
    const upcoming = players.filter(p => p.status === 'UPCOMING' && p.id !== currentPlayer.id);
    if (upcoming.length > 0) {
      nextPlayer(upcoming[0].id);
    }
  }, [currentPlayer, players, nextPlayer]);

  // Pause / Resume
  const togglePause = useCallback(() => {
    setAuction(prev => ({ ...prev, isPaused: !prev.isPaused }));
  }, []);

  // Timer Tick Loop
  useEffect(() => {
    if (auction.status !== 'LIVE' || auction.isPaused || soldModalData || unsoldModalData) {
      return;
    }

    const interval = setInterval(() => {
      setAuction(prev => {
        if (prev.timerRemaining <= 1) {
          // Timer reached 0!
          if (prev.leadingTeamId && prev.currentBid > 0) {
            // Auto trigger sale
            sellCurrentPlayer();
          } else {
            // Unsold
            markCurrentPlayerUnsold();
          }
          return { ...prev, timerRemaining: 0 };
        }

        const newTime = prev.timerRemaining - 1;
        if (newTime <= 5) {
          triggerTickSound(true); // Urgent tick sound
        } else if (newTime <= 10) {
          triggerTickSound(false);
        }

        return { ...prev, timerRemaining: newTime };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [auction.status, auction.isPaused, soldModalData, unsoldModalData, sellCurrentPlayer, markCurrentPlayerUnsold, triggerTickSound]);

  // Auto-Bid Competitor Simulation (Optional toggle for exciting live atmosphere)
  useEffect(() => {
    if (!autoSimulation || auction.status !== 'LIVE' || auction.isPaused || soldModalData || unsoldModalData) {
      return;
    }

    const delay = Math.floor(Math.random() * 4000) + 3500; // 3.5s to 7.5s
    const timer = setTimeout(() => {
      const eligibleTeams = teams.filter(t => 
        t.id !== auction.leadingTeamId && 
        t.remainingBudget > (auction.currentBid + 50000) &&
        t.squad.length < t.squadLimit
      );

      if (eligibleTeams.length > 0 && auction.timerRemaining > 3) {
        const randomTeam = eligibleTeams[Math.floor(Math.random() * eligibleTeams.length)];
        placeBid(randomTeam.id);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [autoSimulation, auction, soldModalData, unsoldModalData, teams, placeBid]);

  // Reorder Player Queue
  const reorderQueue = (sourceIndex, destinationIndex) => {
    const upcoming = [...playerQueue];
    const [removed] = upcoming.splice(sourceIndex, 1);
    upcoming.splice(destinationIndex, 0, removed);

    // Reconstruct full player list with updated upcoming order
    const nonUpcoming = players.filter(p => p.status !== 'UPCOMING');
    setPlayers([...nonUpcoming, ...upcoming]);
  };

  // Reset Auction State to Factory Seeds
  const resetAuction = () => {
    localStorage.removeItem('auction_hub_data');
    localStorage.removeItem('auction_hub_teams');
    localStorage.removeItem('auction_hub_players');
    setAuction(INITIAL_AUCTION);
    setTeams(INITIAL_TEAMS);
    setPlayers(INITIAL_PLAYERS);
    setSoldModalData(null);
    setUnsoldModalData(null);
  };

  return (
    <AuctionContext.Provider
      value={{
        auction,
        teams,
        players,
        currentPlayer,
        leadingTeam,
        playerQueue,
        soldPlayers,
        unsoldPlayers,
        soldModalData,
        unsoldModalData,
        setSoldModalData,
        setUnsoldModalData,
        autoSimulation,
        setAutoSimulation,
        bidFlash,
        placeBid,
        sellCurrentPlayer,
        markCurrentPlayerUnsold,
        nextPlayer,
        skipCurrentPlayer,
        togglePause,
        reorderQueue,
        resetAuction,
        setAuction,
        setTeams,
        setPlayers,
      }}
    >
      {children}
    </AuctionContext.Provider>
  );
}

export function useAuction() {
  const context = useContext(AuctionContext);
  if (!context) {
    throw new Error('useAuction must be used within an AuctionProvider');
  }
  return context;
}
